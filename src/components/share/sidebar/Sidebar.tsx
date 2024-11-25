"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../Logo";
import { PiSignpostDuotone } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { BringToFront, Image, LayoutDashboard, ListPlus, Plus, ShoppingBasket } from "lucide-react";

// LayoutDashboard
export const adminSidebarItems: SidebarMenu = {
  menu: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      label: "Orders",
      icon: BringToFront,
      href: "/admin/orders",
    },
    {
      label: "Products",
      icon: ShoppingBasket,
      subItems: [
        {
          label: "All Products",
          icon: ListPlus,
          href: "/admin/products/all-products",
        },
        {
          label: "Add Product",
          icon: Plus,
          href: "/admin/products/add-product",
        },
      ],
    },
    {
      label: "Photo Gallery",
      icon: Image,
      subItems: [
        {
          label: "All Photos",
          icon: ListPlus,
          href: "/admin/products/all-products",
        },
        {
          label: "Add Photos",
          icon: Plus,
          href: "/admin/products/add-product",
        },
      ],
    },
    {
      label: "Post",
      icon: PiSignpostDuotone,
      subItems: [
        {
          label: "All Posts",
          icon: ListPlus,
          href: "/admin/all-posts",
        },
        {
          label: "Add post",
          icon: Plus,
          href: "/admin/add-post",
        },
      ],
    },
  ],
  extra: {
    label: "Logout",
    icon: CiLogout,
    href: "/",
  },
};

export interface SidebarItem {
  label: string;
  icon: any;
  href?: string;
  subItems?: SidebarItem[];
}

export interface SidebarMenu {
  menu: SidebarItem[];
  extra: SidebarItem;
}

const Sidebar = () => {
  const pathName = typeof window !== "undefined" ? usePathname() : "";
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());
  // const selectedSidebarItems: SidebarMenu = useSidebarItems(pathName);

  const handleToggle = (index: number) => {
    setOpenIndexes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section
      className={`print:hidden bg-primary h-screen fixed w-64 z-10 overflow-auto scrollbar`}
    >
      <aside className="h-full flex flex-col pb-10">
        <div className="h-20 w-full bg-secondary py-4 pr-4 flex justify-between items-center">
          <Logo context="" />
        </div>
        <main className="grow w-full flex flex-col justify-between">
          <div className="grow">
            {adminSidebarItems.menu.map((item, index) => (
              <div key={index} className="w-full grow">
                {item.subItems ? (
                  <>
                    <div
                      onClick={() => handleToggle(index)}
                      className={`w-full h-16 pl-10 flex justify-start items-center gap-3 hover:bg-secondary ${
                        openIndexes.has(index) ? "bg-complementary" : ""
                      } group ${pathName === `${item.href}` ? "bg-white" : ""}`}
                    >
                      <div className="w-full flex items-center gap-4 pr-5">
                        {item.icon && (
                          <item.icon
                            className={`w-6 h-6 group-hover:text-white ${
                              pathName === `${item.href}`
                                ? "text-primary"
                                : "text-white"
                            }`}
                          />
                        )}
                        <div className="flex-1 flex justify-between items-center">
                          <h1
                            className={`text-base font-normal group-hover:text-white ${
                              pathName === `${item.href}`
                                ? "text-primary"
                                : "text-white"
                            }`}
                          >
                            {item.label}
                          </h1>
                          <div>
                            <IoIosArrowDown
                              className={`text-white transition duration-300 ${
                                openIndexes.has(index) ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {openIndexes.has(index) && (
                      <div className="bg-accent flex flex-col text-sm text-[#444444] animation transition duration-300">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link key={subIndex} href={`${subItem.href}`}>
                            <div
                              className={`h-16 pl-16 flex justify-start items-center gap-3 w-full hover:bg-secondary group ${
                                pathName === `${subItem.href}` ? "bg-white" : ""
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                {subItem.icon && (
                                  <subItem.icon
                                    className={`w-6 h-6 group-hover:text-white ${
                                      pathName === `${subItem.href}`
                                        ? "text-primary"
                                        : "text-white"
                                    }`}
                                  />
                                )}
                                <h1
                                  className={`text-base font-normal group-hover:text-white ${
                                    pathName === `${subItem.href}`
                                      ? "text-primary"
                                      : "text-white"
                                  }`}
                                >
                                  {subItem.label}
                                </h1>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={`${item.href}`}>
                    <div
                      className={`h-16 pl-10 flex justify-start items-center gap-3 w-full hover:bg-secondary group ${
                        pathName === `${item.href}` ? "bg-white" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {item.icon && (
                          <item.icon
                            className={`w-6 h-6 group-hover:text-white ${
                              pathName === `${item.href}`
                                ? "text-primary"
                                : "text-white"
                            }`}
                          />
                        )}
                        <h1
                          className={`text-base font-normal group-hover:text-white ${
                            pathName === `${item.href}`
                              ? "text-primary"
                              : "text-white"
                          }`}
                        >
                          {item.label}
                        </h1>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </main>
      </aside>
    </section>
  );
};

export default Sidebar;
