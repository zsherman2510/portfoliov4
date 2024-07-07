"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import Loading from "../Loading";

const SocialPostsRedirect: React.FC = () => {
  const { selectedBusinessId, businesses, setSelectedBusinessId, loading } =
    useBusiness();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    console.log("selectedBusinessId", selectedBusinessId);
    if (!selectedBusinessId) {
      if (businesses.length > 0) {
        setSelectedBusinessId(businesses[0].id);
        router.push(`/socialPosts/${businesses[0].id}`);
      } else {
        router.push("/welcome");
      }
    } else {
      router.push(`/socialPosts/${selectedBusinessId}`);
    }
  }, [selectedBusinessId, businesses, router, setSelectedBusinessId]);

  return <Loading />;
};

export default SocialPostsRedirect;
