import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectMongo from "@/libs/mongoose";
import configFile from "@/config";
import User from "@/models/Users";
import { findCheckoutSession } from "@/libs/stripe";
import {
  businessLimits,
  postsPerDayLimits,
  postsPerMonthLimits,
  socialAccountsLimits,
  PlanName,
} from "@/components/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
  typescript: true,
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

function isValidPlanName(planName: string): planName is PlanName {
  return planName in businessLimits;
}

export async function POST(req: NextRequest) {
  await connectMongo();

  const body = await req.text();

  const signature = headers().get("stripe-signature");

  let eventType;
  let event;

  // Verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        const stripeObject: Stripe.Checkout.Session = event.data
          .object as Stripe.Checkout.Session;

        const session = await findCheckoutSession(stripeObject.id);

        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = stripeObject.client_reference_id;
        const allPlans = [
          ...configFile.stripe.monthlyPlans,
          ...configFile.stripe.yearlyPlans,
        ];
        const plan = allPlans.find((p) => p.priceId === priceId);

        if (!plan) break;

        const customer = (await stripe.customers.retrieve(
          customerId as string
        )) as Stripe.Customer;

        let user;

        // Get or create the user
        if (userId) {
          user = await User.findById(userId);
        } else if (customer.email) {
          user = await User.findOne({ email: customer.email });

          if (!user) {
            user = await User.create({
              email: customer.email,
              name: customer.name,
            });

            await user.save();
          }
        } else {
          console.error("No user found");
          throw new Error("No user found");
        }

        // Check and cancel existing subscription if it's a paid plan
        if (user.priceId) {
          const subscriptions = await stripe.subscriptions.list({
            customer: customerId as string,
            status: "active",
          });

          const existingSubscription = subscriptions.data.find(
            (subscription) =>
              subscription.items.data[0].price.id === user.priceId
          );

          if (existingSubscription) {
            await stripe.subscriptions.cancel(existingSubscription.id);
          }
        }

        // Update user data + Grant user access to your product
        user.priceId = priceId;
        user.customerId = customerId as string;
        user.hasAccess = true;

        const planName = plan.name.toLowerCase();
        if (isValidPlanName(planName)) {
          user.postsPerDay = (postsPerDayLimits[planName] as number) || 0;
          user.generatedPostsPerMonth =
            (postsPerMonthLimits[planName] as number) || 0;
        } else {
          console.error("Invalid plan name");
        }

        await user.save();

        break;
      }

      case "checkout.session.expired": {
        break;
      }

      case "customer.subscription.updated": {
        break;
      }

      case "customer.subscription.deleted": {
        const stripeObject: Stripe.Subscription = event.data
          .object as Stripe.Subscription;

        const subscription = await stripe.subscriptions.retrieve(
          stripeObject.id
        );
        console.log("subscription", subscription);

        const user = await User.findOne({ customerId: subscription.customer });

        console.log("user", user);
        // Revoke access to your product
        user.hasAccess = false;
        user.customerId = null;
        user.priceId = null;
        user.postsPerDay = postsPerDayLimits.free;
        user.generatedPostsPerMonth = postsPerMonthLimits.free;
        await user.save();

        break;
      }

      case "invoice.paid": {
        const stripeObject: Stripe.Invoice = event.data
          .object as Stripe.Invoice;

        const priceId = stripeObject.lines.data[0].price.id;
        const customerId = stripeObject.customer;

        const user = await User.findOne({ customerId });

        // Make sure the invoice is for the same plan (priceId) the user subscribed to
        if (user.priceId !== priceId) break;

        // Grant user access to your product
        user.hasAccess = true;
        await user.save();

        break;
      }

      case "invoice.payment_failed": {
        break;
      }

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error("Stripe error: ", e.message);
  }

  return NextResponse.json({});
}
