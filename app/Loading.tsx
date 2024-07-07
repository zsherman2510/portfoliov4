"use client";

import React from "react";
import Image from "next/image";
import logo from "@/public/logoAndName.png";
import config from "@/config";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center p-6">
      <div className="animate-pulse mb-6">
        <Image
          src={logo}
          alt={`${config.appName} logo`}
          className="w-48"
          placeholder="blur"
          priority={true}
        />
      </div>
      <p className="text-lg text-violet-400">Loading...</p>
      <div className="flex items-center justify-center mt-4">
        <div className="w-8 h-8 border-4 border-violet-400 border-dotted rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
