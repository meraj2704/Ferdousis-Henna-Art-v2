"use client";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa"; // Example for user icon, you can replace it with your custom icon
import Logo from "../Logo";
import UserInfo from "./UserInfo";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import ToggleNavbar from "../Nav/ToggleNavbar";
import { TfiClose } from "react-icons/tfi";
import { FaBars, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { usePathname } from "next/navigation";
import ToggleSidebar from "./ToggleSidebar";

const DashboardHeader: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 z-[999] h-20 w-full lg:w-[calc(100vw-256px)] flex items-center justify-between px-3 py-4 bg-primary text-textLight shadow-md gap-3">
      <div className="transition-all duration-300">
        {isMobileMenuOpen ? (
          <TfiClose
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl hover:text-brandColor"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <FaBars
            className="md:hidden text-xl md:text-2xl lg:text-3xl xl:text-4xl cursor-pointer hover:text-brandColor"
            size={24}
            onClick={toggleMobileMenu}
          />
        )}
      </div>
      <div className="hidden lg:block">
        <UserInfo userName="Ferdousi" />
      </div>
      <div className="flex-1 flex justify-end items-center">
        <div
          className={`flex items-center transition-all duration-300 ${
            isSearchFocused ? "flex-1" : ""
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-accent"
            onFocus={() => setIsSearchFocused(true)} // Expand on focus
            onBlur={() => setIsSearchFocused(false)} // Shrink on blur
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-6">
        <button className="px-2 py-2 bg-secondary text-textLight rounded-full hover:bg-accent focus:outline-none">
          <IoIosNotifications />
        </button>
        <FaUserCircle className="text-3xl text-textLight cursor-pointer" />
      </div>
      <ToggleSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathName={pathName}
      />
    </header>
  );
};

export default DashboardHeader;
