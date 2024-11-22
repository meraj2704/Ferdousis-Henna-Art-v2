"use client";

import Link from "next/link";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

import { usePathname } from "next/navigation";
import useSidebarItems, { SidebarMenu } from "./useSidebarItems";
import "./sidebar.css";
// import { useCookies } from "next-client-cookies";
import { useState } from "react";
import Logo from "../Logo";

const Sidebar = () => {
  const pathName = usePathname();
  const [openDropDownItem, setOpenDropDownItem] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const logo = "/assets/images/home/Government_Seal_of_Bangladesh.png";
  const selectedSidebarItems: SidebarMenu = useSidebarItems(pathName);
  // const cookies = useCookies();
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const logout = () => {
    // cookies.remove("token");
    localStorage.removeItem("data");
    window.location.href = "/";
  };

  const handleDropdown = (name: string) => {
    setD
  };

  return (
    <>
      <section
        className={`print:hidden bg-primary h-screen fixed w-64 z-10 overflow-auto scrollbar`}
      >
        <aside className="h-full flex flex-col pb-10">
          <div className="w-full bg-secondary py-4 pr-4 flex justify-between items-center border-b-[1px] border-b-[#D4D4D4]">
            <Logo context="" />
          </div>

          <main className="grow w-full flex flex-col justify-between">
            <div className="grow">
              {selectedSidebarItems.menu.map((item, index) => (
                <div key={index} className="w-full grow">
                  {item.subItems ? (
                    <>
                      <div
                        onClick={() => setOpenDropDownItem(!openDropDownItem)}
                        className={`w-full h-16 pl-10 flex justify-start items-center gap-3 hover:bg-secondary ${
                          openDropDownItem ? "bg-complementary" : ""
                        } group ${
                          pathName === `${item.href}` ? "bg-white" : ""
                        }`}
                      >
                        <div className="w-full flex items-center gap-4 pr-5">
                          {item.icon && (
                            <item.icon
                              className={`w-6 h-6 group-hover:text-white  ${
                                pathName === `${item.href}`
                                  ? "text-primary"
                                  : "text-white"
                              } `}
                            />
                          )}
                          <div className=" flex-1 flex justify-between items-center">
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
                                className={` text-white transition duration-300 ${
                                  openDropDownItem ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {openDropDownItem && (
                        <div className="bg-accent flex flex-col text-sm text-[#444444] animation transition duration-300">
                          {item.subItems.map((subItem, subIndex) => (
                            <Link key={subIndex} href={`${subItem.href}`}>
                              <div
                                className={`h-16 pl-16 flex justify-start items-center gap-3 w-full hover:bg-secondary group ${
                                  pathName === `${subItem.href}`
                                    ? "bg-white"
                                    : ""
                                }`}
                              >
                                <div className="flex items-center gap-4">
                                  {subItem.icon && (
                                    <subItem.icon
                                      className={`w-6 h-6 group-hover:text-white  ${
                                        pathName === `${subItem.href}`
                                          ? "text-primary"
                                          : "text-white"
                                      } `}
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
                    <>
                      <Link href={`${item.href}`}>
                        <div
                          className={`h-16 pl-10 flex justify-start items-center gap-3 w-full hover:bg-secondary group ${
                            pathName === `${item.href}` ? "bg-white" : ""
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {item.icon && (
                              <item.icon
                                className={`w-6 h-6 group-hover:text-white  ${
                                  pathName === `${item.href}`
                                    ? "text-primary"
                                    : "text-white"
                                } `}
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
                    </>
                  )}
                </div>
              ))}
            </div>
            {/* <Link href={`/${selectedSidebarItems.extra.href}`}> */}
            <div
              className={`h-16 pl-10 flex justify-start items-center gap-3 w-full hover:bg-secondary group cursor-pointer ${
                pathName === `/${selectedSidebarItems.extra.href}`
                  ? "bg-white"
                  : ""
              }`}
              onClick={logout}
            >
              <div className="flex items-center gap-4">
                {selectedSidebarItems.extra.icon && (
                  <selectedSidebarItems.extra.icon
                    className={`w-6 h-6 group-hover:text-white  ${
                      pathName === `/${selectedSidebarItems.extra.href}`
                        ? "text-primary"
                        : "text-white"
                    } `}
                  />
                )}
                <h1
                  className={`text-base font-normal group-hover:text-white ${
                    pathName === `/${selectedSidebarItems.extra.href}`
                      ? "text-primary"
                      : "text-white"
                  }`}
                >
                  {selectedSidebarItems.extra.label}
                </h1>
              </div>
            </div>
            {/* </Link> */}
          </main>
        </aside>
      </section>
    </>
  );
};

export default Sidebar;
