"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import Loading from "../Loading";

const BrandingRedirect: React.FC = () => {
  const { selectedBusinessId, businesses, setSelectedBusinessId } =
    useBusiness();
  const router = useRouter();

  useEffect(() => {
    if (!selectedBusinessId) {
      if (businesses.length > 0) {
        setSelectedBusinessId(businesses[0].id);
        router.push(`/branding/${businesses[0].id}`);
      } else {
        router.push("/welcome");
      }
    } else {
      router.push(`/branding/${selectedBusinessId}`);
    }
  }, [selectedBusinessId, businesses, router, setSelectedBusinessId]);

  return <Loading />;
};

export default BrandingRedirect;
