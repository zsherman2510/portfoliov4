"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Pricing from "@/components/Pricing";

const PricingPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Upgrade your account
      </h1>
      <Pricing showFreeTier={true} />
      {session ? (
        <button
          onClick={() => router.push("/socialPosts")}
          className="mb-4 px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      ) : (
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600"
        >
          Back
        </button>
      )}
    </div>
  );
};

export default PricingPage;
