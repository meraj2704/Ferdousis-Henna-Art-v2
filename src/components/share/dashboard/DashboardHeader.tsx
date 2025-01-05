"use client";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../Logo";
import UserInfo from "./UserInfo";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import ToggleNavbar from "../Nav/ToggleNavbar";
import { TfiClose } from "react-icons/tfi";
import { FaBars } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import ToggleSidebar from "./ToggleSidebar";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

const DashboardHeader: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState<any[]>([]);
  const pathName = usePathname();
  const router = useRouter();

  const routes = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Products", path: "/admin/products/all-products" },
    { name: "Photo Gallery", path: "/admin/photo-gallery/all-photos" },
    { name: "Notifications", path: "/notifications" },
    // Add more routes here
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (searchQuery) {
      const results = routes.filter((route) =>
        route.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRoutes(results);
    } else {
      setFilteredRoutes([]);
    }
  }, [searchQuery]);

  const handleSelect = (path: string) => {
    router.push(path); // Redirect to selected route
    setSearchQuery(""); // Clear the search query
    setFilteredRoutes([]); // Clear search results
  };

  return (
    <header className="fixed top-0 z-[999] h-20 w-full lg:w-[calc(100vw-270px)] flex items-center justify-between px-3 py-4 bg-primary text-textLight shadow-md gap-3">
      <div className="transition-all duration-300">
        {isMobileMenuOpen ? (
          <TfiClose
            className="lg:hidden text-xl md:text-2xl lg:text-3xl xl:text-4xl hover:text-brandColor"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <FaBars
            className="lg:hidden text-xl md:text-2xl lg:text-3xl xl:text-4xl cursor-pointer hover:text-brandColor"
            size={24}
            onClick={toggleMobileMenu}
          />
        )}
      </div>
      <div className="hidden lg:block">
        <UserInfo userName="Ferdousi" />
      </div>

      <div className="flex-1 flex justify-end items-center relative">
        <div
          className={`flex items-center transition-all duration-300`}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-accent"
            onFocus={() => {
              setIsSearchFocused(true);
            }}
            onBlur={() => setIsSearchFocused(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          {searchQuery && filteredRoutes.length > 0 && (
            <ul className="absolute top-full right-0 w-40 bg-white shadow-md rounded-lg mt-2 z-10">
              {filteredRoutes.map((route) => (
                <li
                  key={route.path}
                  className="p-2 rounded-lg cursor-pointer hover:bg-gray-200 text-accent"
                  onClick={() => handleSelect(route.path)}
                >
                  {route.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* {searchQuery && filteredRoutes.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white shadow-md rounded-lg mt-2 z-10">
            {filteredRoutes.map((route) => (
              <li
                key={route.path}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelect(route.path)}
              >
                {route.name}
              </li>
            ))}
          </ul>
        )} */}
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
