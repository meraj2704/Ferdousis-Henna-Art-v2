"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FaGlobe,
  FaSearch,
  FaBars,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";
import ToggleNavbar from "./ToggleNavbar";
import { TfiClose } from "react-icons/tfi";
import { CiShoppingCart } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";

const products = [
  {
    name: "Kitchen",
    path: "/kitchen-area",
    submenu: [
      {
        name: "Trending Now",
        path: "/trending-now",
      },
      {
        name: "Standard Kitchen",
        path: "",
      },
      {
        name: "Luxury Kitchen",
        path: "",
      },
      {
        name: "Economy Kitchen",
        path: "",
      },
      {
        name: "Couple Kitchen",
        path: "",
      },
      {
        name: "Parallel Kitchen",
        path: "",
      },
    ],
  },
  {
    name: "Counter Top",
    path: "",
    submenu: [
      {
        name: "Granite",
        path: "",
      },
      {
        name: "Acrylic Solid Surface",
        path: "",
      },
      {
        name: "Sintered",
        path: "",
      },
      {
        name: "HPL",
        path: "",
      },
      {
        name: "CPL",
        path: "",
      },
    ],
  },
  {
    name: "Wardrobes",
    path: "",
  },
  {
    name: "Walk-In Closets",
    path: "/walk-in-closets",
  },
  {
    name: "Vanities",
    path: "/vanities",
  },
  {
    name: "Accessories",
    path: "/accessories",
  },
];
const logo = "/images/logo.PNG";
const KitchenLogoColored = "/images/navbar/colorLogo.png";
const KitchenLogoWhite = "/images/navbar/whiteLogo.png";
const kitchenLogo = "/images/kitchen/kitchen-logo.png";
const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [isNavbarFixed, setNavbarFixed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();
  // const [activeSubmenu]

  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const handleMouseEnter = (productName: string) => {
    setActiveProduct(productName);
  };

  const handleMouseLeave = () => {
    setActiveProduct(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const topbarHeight = 80;
      setNavbarFixed(window.scrollY > topbarHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
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

      <div
        className={`navbar font-semibold transition duration-30 h-20 lg:h-24   ${
          isNavbarFixed
            ? "fixed top-0 left-0 w-full z-[100] bg-background shadow-2xl"
            : ""
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative h-full">
          <div className="container mx-auto h-full  flex justify-between gap-5 px-5">
            <div className="flex justify-center items-center">
              <Image src={logo} alt="Logo" width={50} height={50} priority />
            </div>
            <div className="hidden md:flex items-center gap-5">
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
              <Link href={"/"}>
                <p className="relative inline-block uppercase text-textColor transition duration-300 group">
                  <span className="relative z-[60] group-hover:text-primary">
                    Booking
                  </span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
                </p>
              </Link>
              <Link href={"/"}>
                <p className="relative inline-block uppercase text-textColor transition duration-300 group">
                  <span className="relative z-[60] group-hover:text-primary">
                    Contact Us
                  </span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
                </p>
              </Link>
            </div>
            <div className="flex justify-center items-center text-xl text-primary md:hidden">
              Ferdousi's Henna Art
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <CiShoppingCart className="text-textColor text-2xl hover:text-primary" />
                <MdFavorite className="text-red-700 text-2xl" />
              </div>
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
            </div>
          </div>
        </div>
      </div>
      <ToggleNavbar
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isNavbarFixed={isNavbarFixed}
        pathName={pathName}
      />

      {isNavbarFixed && <div className="h-20"></div>}
    </div>
  );
};

export default Navbar;
