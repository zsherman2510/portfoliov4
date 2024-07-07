"use client";

import React, { useState, useEffect, ReactNode } from "react";
import {
  FaFileAlt,
  FaDraftingCompass,
  FaClock,
  FaCheck,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import BusinessSelector from "@/components/BusinessSelector";

interface Tab {
  label: string;
  icon?: ReactNode;
}

interface SocialTopNavProps {
  type: string;
}

const pageConfigurations: { [key: string]: Tab[] } = {
  socialPosts: [
    { label: "Generated", icon: <FaFileAlt /> },
    { label: "Drafts", icon: <FaDraftingCompass /> },
    { label: "Scheduled", icon: <FaClock /> },
    { label: "Published", icon: <FaCheck /> },
    { label: "Trash", icon: <FaTrash /> },
  ],
  // Add other page configurations as needed
};

const SocialTopNav: React.FC<SocialTopNavProps> = ({ type }) => {
  const [activeTab, setActiveTab] = useState("Generated");
  const pathname = usePathname();

  useEffect(() => {
    const pathParts = pathname.split("/");
    if (pathParts.length > 2) {
      const activePage = pathParts[1];
      setActiveTab(activePage);
    }
  }, [pathname]);

  const tabs = pageConfigurations[type] || [{ label: type, icon: null }];

  return (
    <>
      <div className="bg-white border-b border-slate-300 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold"></h1>
        <BusinessSelector />
      </div>
      {type === "socialPosts" && (
        <div className="bg-white border-b border-slate-300 p-4 flex flex-wrap justify-between items-center">
          <div className="flex space-x-2 lg:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                className={`btn flex justify-center ${
                  activeTab.toLowerCase() === tab.label.toLowerCase()
                    ? "bg-primary text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab(tab.label)}
              >
                {tab.icon}
                <span className="ml-2 hidden lg:inline">{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="flex space-x-2 lg:mt-0">
            <button className="btn btn-accent lg:mr-4">
              <FaUpload />
              <span className="ml-2 hidden lg:inline">Upload Post</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialTopNav;
