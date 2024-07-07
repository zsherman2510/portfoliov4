import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";
import {
  businessLimits,
  postsPerDayLimits,
  postsPerMonthLimits,
  socialAccountsLimits,
} from "@/components/constants";

const config = {
  // REQUIRED
  appName: "SocialGo",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "SocialGo is a platform that offers automated content creation and scheduling services for social media to assist entrepreneurs and businesses in managing their online presence more efficiently.",
  // REQUIRED (no https://, no trailing slash at the end, just the naked domain)
  domainName: "socialgo.cc",
  crisp: {
    id: "5b56e419-de52-463f-a9c1-104071395234",
  },
  stripe: {
    monthlyPlans: [
      {
        priceId: "free-plan-monthly",
        name: "Free",
        description: "Manage 1 account and make one post per day",
        price: 0,
        priceAnchor: "",
        businessLimit: businessLimits.free,
        features: [
          { name: `${businessLimits.free} Business` },
          { name: `${postsPerMonthLimits.free} Posts Per Month` },
          { name: "Generate 30 posts per month" },
          { name: "Schedule out 30 days of content" },
        ],
      },
      {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PERSONAL_MONTHLY_PRICE_ID,
        name: "Personal",
        description: "Manage your personal social media accounts",
        price: 17,
        priceAnchor: "",
        businessLimit: businessLimits.personal,
        features: [
          { name: `${businessLimits.personal} Business` },
          { name: `${postsPerDayLimits.personal} Posts Per Day` },
          { name: `Generate ${postsPerMonthLimits.personal} posts per month` },
          { name: "Schedule out 90 days of content" },
        ],
      },
      {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID,
        name: "Professional",
        description: "Manage up to 3 social media accounts",
        price: 38,
        priceAnchor: "",
        businessLimit: businessLimits.professional,
        isFeatured: true,
        features: [
          { name: `${businessLimits.professional} Businesses` },
          { name: `${postsPerDayLimits.professional} Posts Per Day` },
          {
            name: `Generate ${postsPerMonthLimits.professional} posts per month`,
          },
          { name: "Schedule out 180 days of content" },
        ],
      },
      {
        priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
        name: "Enterprise",
        description: "Manage up to 10 social media accounts",
        price: 129,
        priceAnchor: "",
        businessLimit: businessLimits.enterprise,
        features: [
          { name: `${businessLimits.enterprise} Businesses` },
          { name: `${postsPerDayLimits.enterprise} Posts Per Day` },
          { name: `${postsPerMonthLimits.enterprise}` },
          { name: "Schedule out one year of content" },
        ],
      },
    ],
    yearlyPlans: [
      {
        priceId: "free-plan-yearly",
        name: "Free",
        description: "Manage 1 account and make one post per day",
        price: 0,
        priceAnchor: "",
        businessLimit: businessLimits.free,
        features: [
          { name: `${businessLimits.free} Business` },
          { name: `${postsPerMonthLimits.free} Posts Per Month` },
          { name: "Generate 30 posts per month" },
          { name: "Schedule out 30 days of content" },
        ],
      },
      {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PERSONAL_YEARLY_PRICE_ID,
        name: "Personal",
        description: "Manage your personal social media accounts",
        price: (169 / 12).toFixed(0),
        originalMonthlyPrice: 17,
        priceAnchor: 17,
        businessLimit: businessLimits.personal,
        features: [
          { name: `${businessLimits.personal} Business` },
          { name: `${postsPerDayLimits.personal} Posts Per Day` },
          { name: `Generate ${postsPerMonthLimits.personal} posts per month` },
          { name: "Schedule out 90 days of content" },
        ],
      },
      {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_YEARLY_PRICE_ID,
        name: "Professional",
        description: "Manage up to 5 social media accounts",
        price: (379 / 12).toFixed(0),
        originalMonthlyPrice: 38,
        isFeatured: true,
        priceAnchor: 38,
        businessLimit: businessLimits.professional,
        features: [
          { name: `${businessLimits.professional} Businesses` },
          { name: ` ${postsPerDayLimits.professional} Posts Per Day` },
          {
            name: `Generate ${postsPerMonthLimits.professional} posts per month`,
          },
          { name: "Schedule out 180 days of content" },
        ],
      },
      {
        priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID,
        name: "Enterprise",
        description: "Manage up to 10 social media accounts",
        price: (1399 / 12).toFixed(0),
        originalMonthlyPrice: 129,
        priceAnchor: 129,
        businessLimit: businessLimits.enterprise,
        features: [
          { name: `${businessLimits.enterprise} Businesses` },
          { name: `${postsPerDayLimits.enterprise} Posts Per Day` },
          { name: `Generate ${postsPerMonthLimits.enterprise}` },
          { name: "Schedule out one year of content" },
        ],
      },
    ],
  },
  aws: {
    bucket: "autopostthat",
    bucketUrl: `https://autopostthat.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    subdomain: "",
    fromNoReply: ``,
    fromAdmin: ``,
    supportEmail: "",
    forwardRepliesTo: "",
  },
  brevo: {
    fromNoReply: `SocialGo <noreply@mail.socialgo.cc>`,
    fromAdmin: `Zavion at SocialGo <zavion@socialgo.cc>`,
    supportEmail: "zavion@socialgo.cc",
    forwardRepliesTo: "shermanzavion@gmail.com",
  },
  colors: {
    theme: "winter",
    main: themes["winter"]["primary"],
  },
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/socialPosts",
  },
} as ConfigProps;

export default config;
