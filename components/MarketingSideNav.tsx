"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaFileAlt,
  FaPen,
  FaBuilding,
  FaUser,
  FaPalette,
} from "react-icons/fa";
import ButtonAccount from "./ButtonAccount";
import BusinessSelector from "@/components/BusinessSelector";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { label: "Posts", href: "/socialPosts", icon: <FaFileAlt /> },
  { label: "Writing", href: "/writing", icon: <FaPen /> },
  { label: "Profile", href: "/profile", icon: <FaUser /> },
  { label: "Brand", href: "/branding", icon: <FaPalette /> },
];

const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white border border-slate-300 flex flex-col transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0`}
      >
        <div className="p-4 flex justify-between items-center lg:block">
          <h1 className="text-2xl font-bold">SocialGo</h1>
          <button
            className="lg:hidden text-black"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col flex-grow">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-4 hover:bg-slate-300 flex items-center"
            >
              {item.icon && <span className="mr-4">{item.icon}</span>}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4">
          <ButtonAccount />
        </div>
      </div>
      {!isOpen && (
        <button
          className="fixed top-6 left-4 lg:hidden text-black p-2 rounded z-50"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>
      )}
    </>
  );
};

export default SideNav;
