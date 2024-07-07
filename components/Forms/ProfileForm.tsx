"use client";

import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTiktok,
  FaPinterest,
} from "react-icons/fa";
import ButtonConnect from "@/components/ButtonConnect";

interface ProfileFormProps {
  initialData: {
    xAccount: string;
    instagramAccount: string;
    linkedinAccount: string;
    facebookAccount: string;
    tiktokAccount: string;
    pinterestAccount: string;
  };
  businessId: string;
}

const socialPlatforms = [
  {
    name: "xAccount",
    displayName: "X (Twitter)",
    icon: FaTwitter,
    platform: "twitter",
  },
  {
    name: "instagramAccount",
    displayName: "Instagram",
    icon: FaInstagram,
    platform: "instagram",
  },
  {
    name: "linkedinAccount",
    displayName: "LinkedIn",
    icon: FaLinkedin,
    platform: "linkedin",
  },
  {
    name: "facebookAccount",
    displayName: "Facebook",
    icon: FaFacebook,
    platform: "facebook",
  },
  {
    name: "tiktokAccount",
    displayName: "TikTok",
    icon: FaTiktok,
    platform: "tiktok",
  },
  {
    name: "pinterestAccount",
    displayName: "Pinterest",
    icon: FaPinterest,
    platform: "pinterest",
  },
];

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  businessId,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Connect Socials</h1>
        <p className="text-gray-600">
          Connect your social media accounts to allow Marky to post on your
          behalf.
        </p>
      </div>
      {socialPlatforms.map(({ name, displayName, icon, platform }) => (
        <ButtonConnect
          key={platform}
          platform={platform}
          displayName={displayName}
          icon={icon}
          isConnected={!!initialData[name as keyof typeof initialData]}
          businessId={businessId}
        />
      ))}
    </div>
  );
};

export default ProfileForm;
