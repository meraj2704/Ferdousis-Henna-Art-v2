"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import social icons
import Link from "next/link";

const logo = "/images/logo.PNG";

const Nav = () => {
  const [isScrolled, setScrolled] = useState(false);
  const [navbarPosition, setNavbarPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled past the navbar's initial position
      setScrolled(window.scrollY > navbarPosition);
    };

    // Get the navbar's position after the component mounts
    const navbar = document.getElementById("navbar");
    if (navbar) {
      setNavbarPosition(navbar.getBoundingClientRect().top + window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarPosition]);

  return (
    <>
      {/* Top Header for Social Links */}
      <div className="bg-gray-800 text-white py-2 flex justify-center space-x-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-xl hover:text-primary transition duration-300" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-xl hover:text-primary transition duration-300" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-xl hover:text-primary transition duration-300" />
        </a>
      </div>

      {/* Navbar */}
      <div
        id="navbar"
        className={`w-full top-0 z-50 ${
          isScrolled
            ? "fixed bg-background shadow-lg"
            : "relative bg-transparent"
        }`}
      >
        <nav className="container mx-auto flex justify-between items-center font-bold py-4 px-2  2xl:px-0">
          <div>
            <Image src={logo} alt="Logo" width={50} height={50} priority />
          </div>
          <div className="flex items-center gap-5">
            <Link href={"/"}>
              <p className="relative inline-block uppercase text-textColor transition duration-300 group">
                <span className="relative z-[60] group-hover:text-primary">
                  Home
                </span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
              </p>
            </Link>
            <Link href={"/"}>
              <p className="relative inline-block uppercase text-textColor transition duration-300 group">
                <span className="relative z-[60] group-hover:text-primary">
                  All Products
                </span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
              </p>
            </Link>
            {/* <Link href={"/"}>
              <p className="relative inline-block uppercase text-textColor transition duration-300 group">
                <span className="relative z-[60] group-hover:text-primary">
                  Booking
                </span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
              </p>
            </Link> */}
            <Link href={"/contact"}>
              <p className="relative inline-block uppercase text-textColor transition duration-300 group">
                <span className="relative z-[60] group-hover:text-primary">
                  Contact Us
                </span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
              </p>
            </Link>
          </div>
          <div className="flex gap-4">
            <CiShoppingCart className="text-textColor hover:text-primary" />
            <MdFavorite className="text-red-700" />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
