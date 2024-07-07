"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import config from "@/config";

import Loading from "@/app/Loading";

const FormDataComponent = dynamic(
  () => import("@/components/Forms/Business/BusinessForm"),
  { ssr: false }
);

const getBusinessLimit = (priceId: string): number => {
  const allPlans = [
    ...config.stripe.monthlyPlans,
    ...config.stripe.yearlyPlans,
  ];
  const plan = allPlans.find((p) => p.priceId === priceId);
  return plan ? plan.businessLimit : 1;
};

const BusinessInfo: React.FC = () => {
  const { loggedInUser, businesses, loading } = useBusiness();
  const router = useRouter();

  useEffect(() => {
    if (!loading && loggedInUser && businesses.length > 0) {
      const businessLimit = getBusinessLimit(loggedInUser.priceId);
      if (businesses.length >= businessLimit) {
        router.push("/pricing");
      }
    }
  }, [loggedInUser, businesses, loading, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FormDataComponent />
    </div>
  );
};

export default BusinessInfo;
