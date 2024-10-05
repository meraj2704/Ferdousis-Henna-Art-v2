// components/Navbar.tsx
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/assets/logo.png";
import logoLight from "../../../../public/assets/logoLight.png";

import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import Link from "next/link";

const Nav = () => {
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full top-0 z-50  ${
        isScrolled
          ? "fixed bg-background  shadow-lg"
          : "absolute bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex justify-between items-center font-bold py-4 px-5 md:px-10 xl:px-0">
        <div></div>
        <div className="flex items-center gap-5">
          <Link href={"/"}>
            <p className="relative inline-block uppercase text-textColor transition duration-300 group">
              <span className="relative z-[60] group-hover:text-primary">Home</span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
            </p>
          </Link>
          <Link href={"/"}>
            <p className="relative inline-block uppercase text-textColor transition duration-300 group">
              <span className="relative z-[60] group-hover:text-primary">All Products</span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
            </p>
          </Link>
          <Link href={"/"}>
            <p className="relative inline-block uppercase text-textColor transition duration-300 group">
              <span className="relative z-[60] group-hover:text-primary">Booking</span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
            </p>
          </Link>
          <Link href={"/"}>
            <p className="relative inline-block uppercase text-textColor transition duration-300 group">
              <span className="relative z-[60] group-hover:text-primary">Contact Us</span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
            </p>
          </Link>

          
        </div>
        <div className="flex gap-4">
          <CiSearch className="text-textColor hover:text-primary" />
          <CiShoppingCart className="text-textColor hover:text-primary" />
          <MdFavorite className="text-red-700" />
          <IoPersonCircleOutline className="text-textColor hover:text-primary" />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
