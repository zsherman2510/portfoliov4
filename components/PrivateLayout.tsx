"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import MarketingSideNav from "@/components/MarketingSideNav";
import SocialTopNav from "@/components/SocialTopNav";
import { useBusiness } from "@/context/BusinessContext";
import Loading from "@/app/Loading";

interface LayoutProps {
  children: ReactNode;
}

const LayoutPrivate: React.FC<LayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname().replace("/", "");
  const path = pathname.split("/")[0];
  const { selectedBusinessId, businesses, loading } = useBusiness();

  useEffect(() => {
    if (status === "loading" || loading) return;

    if (!session) {
      router.push("/api/auth/signin");
    } else if (businesses.length === 0) {
      router.push("/welcome");
    }
  }, [session, status, router, businesses, loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      <MarketingSideNav />
      <div className="flex flex-col flex-grow">
        <SocialTopNav type={path} />
        <main className="flex-grow overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default LayoutPrivate;
