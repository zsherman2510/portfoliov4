// app/socialPosts/layout.tsx
import React, { ReactNode } from "react";
import PrivateLayout from "@/components/PrivateLayout";
import { BusinessProvider } from "@/context/BusinessContext";

interface LayoutProps {
  children: ReactNode;
}

const SocialPostsLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <BusinessProvider>
      <PrivateLayout>{children}</PrivateLayout>
    </BusinessProvider>
  );
};

export default SocialPostsLayout;
