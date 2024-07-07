import React, { ReactNode } from "react";
import PrivateLayout from "@/components/PrivateLayout";
import { BusinessProvider } from "@/context/BusinessContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <BusinessProvider>{children}</BusinessProvider>;
};

export default Layout;
