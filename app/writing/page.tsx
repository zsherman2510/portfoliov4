"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import Loading from "../Loading";

const ProfileRedirect: React.FC = () => {
  const { selectedBusinessId, businesses, setSelectedBusinessId } =
    useBusiness();
  const router = useRouter();

  useEffect(() => {
    if (!selectedBusinessId) {
      if (businesses.length > 0) {
        setSelectedBusinessId(businesses[0].id);
        router.push(`/writing/${businesses[0].id}`);
      } else {
        router.push("/welcome");
      }
    } else {
      router.push(`/writing/${selectedBusinessId}`);
    }
  }, [selectedBusinessId, businesses, router, setSelectedBusinessId]);

  return <Loading />;
};

export default ProfileRedirect;
