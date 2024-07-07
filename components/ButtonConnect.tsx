"use client";

import React from "react";
import { IconType } from "react-icons";

interface ConnectButtonProps {
  platform: string;
  displayName: string;
  icon: IconType;
  isConnected: boolean;
  businessId: string;
}

const ButtonConnect: React.FC<ConnectButtonProps> = ({
  platform,
  displayName,
  icon: Icon,
  isConnected,
  businessId,
}) => {
  const handleConnect = () => {
    let authUrl = "";
    const redirectUri = encodeURIComponent(window.location.href);
    const clientId =
      process.env[`NEXT_PUBLIC_${platform.toUpperCase()}_CLIENT_ID`];

    switch (platform) {
      case "twitter":
        authUrl = `https://api.twitter.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=read+write&state=${businessId}`;
        break;
      case "instagram":
        authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code&state=${businessId}`;
        break;
      case "linkedin":
        authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=r_liteprofile%20r_emailaddress%20w_member_social&state=${businessId}`;
        break;
      case "facebook":
        authUrl = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email,public_profile&response_type=code&state=${businessId}`;
        break;
      case "tiktok":
        authUrl = `https://open-api.tiktok.com/platform/oauth/connect/?client_key=${clientId}&response_type=code&scope=user.info.basic,video.list,video.upload&redirect_uri=${redirectUri}&state=${businessId}`;
        break;
      case "pinterest":
        authUrl = `https://api.pinterest.com/oauth/?response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}&scope=read_public,write_public&state=${businessId}`;
        break;
      default:
        break;
    }

    window.location.href = authUrl;
  };

  return (
    <div className="flex items-center justify-between space-x-3 mb-4 p-4 border rounded-lg">
      <div className="flex items-center space-x-3">
        <Icon className="text-2xl" />
        <span className="text-lg">{displayName}</span>
      </div>
      <button
        onClick={handleConnect}
        className={`py-2 px-4 ${
          isConnected ? "bg-green-600" : "bg-primary"
        } text-white font-semibold rounded-md shadow-sm hover:bg-primary-focus`}
      >
        {isConnected ? "Connected" : "Connect"}
      </button>
    </div>
  );
};

export default ButtonConnect;
