"use client";
import React from "react";
import UserProfile from "@/components/Forms/UserProfile";
import { useBusiness } from "@/context/BusinessContext";

const UserPage: React.FC = () => {
  const { loggedInUser } = useBusiness();
  //const user = await getData(userId);
  console.log(loggedInUser, "logged in user");
  if (!loggedInUser) {
    return <div>User not found</div>;
  }

  const initialData = {
    name: loggedInUser.name,
    email: loggedInUser.email,
    customerId: loggedInUser.customerId,
    priceId: loggedInUser.priceId,
    hasAccess: loggedInUser.hasAccess,
    isAdmin: loggedInUser.isAdmin,
    businesses: loggedInUser.businesses.map((business: any) =>
      business.toString()
    ),
  };

  let plan = "Free Account";
  let businessLimit = 1; // Free accounts can have only one business

  if (loggedInUser.customerId) {
    switch (loggedInUser.priceId) {
      case process.env.NEXT_PUBLIC_STRIPE_PERSONAL_MONTHLY_PRICE_ID:
      case process.env.NEXT_PUBLIC_STRIPE_PERSONAL_YEARLY_PRICE_ID:
        plan = "Personal";
        businessLimit = 1;
        break;
      case process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID:
      case process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_YEARLY_PRICE_ID:
        plan = "Professional";
        businessLimit = 5;
        break;
      case process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID:
      case process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID:
        plan = "Enterprise";
        businessLimit = 10;
        break;
      default:
        plan = "Unknown Plan";
        businessLimit = 0;
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">User Information</h1>
      <UserProfile
        initialData={initialData}
        plan={plan}
        businessLimit={businessLimit}
        userId={loggedInUser.id}
      />
    </div>
  );
};

export default UserPage;
