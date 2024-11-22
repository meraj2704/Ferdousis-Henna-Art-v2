import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Example for user icon, you can replace it with your custom icon
import Logo from "../Logo";
import UserInfo from "./UserInfo";

const DashboardHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-primary text-textLight shadow-md">
      <div className="block lg:hidden">
        <Logo context="dashboard" />
      </div>
      <div className="hidden lg:block">
        <UserInfo userName="Ferdousi" />
      </div>
      <div className="flex flex-grow max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <div className="flex items-center space-x-6">
        <button className="px-4 py-2 bg-secondary text-textLight rounded-lg hover:bg-accent focus:outline-none">
          Notifications
        </button>
        <FaUserCircle className="text-3xl text-textLight cursor-pointer" />
      </div>
    </header>
  );
};

export default DashboardHeader;
