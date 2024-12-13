"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaFacebook, FaInstagram } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import dynamic from "next/dynamic"; // For code-splitting
import Logo from "../Logo";
import NavItem from "./NavItem";
import CartIcon from "./CartIcon";

const ToggleNavbar = dynamic(() => import("./ToggleNavbar")); // Lazy-load

const Navbar = () => {
  const [isNavbarFixed, setNavbarFixed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const topbarHeight = 80;
    setNavbarFixed(window.scrollY > topbarHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto flex justify-between items-center space-x-4">
          <div>Haziganj, Chandpur</div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/ChandpurMehendi.Artist?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-xl hover:text-primary transition duration-300" />
            </a>
            <a
              href="https://www.instagram.com/ferdousis_henna_art?igsh=dzB4eXQ5dTkyc3g1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl hover:text-primary transition duration-300" />
            </a>
          </div>
          <div>01758486560</div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`navbar font-semibold transition duration-300 h-20 lg:h-24 ${
          isNavbarFixed
            ? "fixed top-0 left-0 w-full z-[100] bg-background shadow-2xl"
            : ""
        }`}
      >
        <div className="relative h-full">
          <div className="container mx-auto h-full flex justify-between gap-5 px-1 md:px-2 2xl:px-0">
            <Logo context="nav" />
            <div className="hidden md:flex items-center gap-5">
              <NavItem path="/" name="Home" />
              <NavItem path="/products" name="All Products" />
              <NavItem path="/about" name="About" />
              <NavItem path="/contact" name="Contact" />
            </div>
            <div className="flex justify-center items-center text-2xl text-primary md:hidden">
              Ferdousi's Henna Art
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <Link href="/cart">
                  <CartIcon />
                </Link>
              </div>
              <div className="transition-all duration-300">
                {isMobileMenuOpen ? (
                  <TfiClose
                    className="text-xl md:text-2xl lg:text-3xl xl:text-4xl hover:text-brandColor cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                ) : (
                  <FaBars
                    className="md:hidden text-xl md:text-2xl lg:text-3xl xl:text-4xl hover:text-brandColor cursor-pointer"
                    size={24}
                    onClick={toggleMobileMenu}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle Navbar */}
      <ToggleNavbar
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isNavbarFixed={isNavbarFixed}
        pathName={pathName}
      />

      {/* Placeholder for Fixed Navbar */}
      {isNavbarFixed && <div className="h-20"></div>}
    </div>
  );
};

export default Navbar;
