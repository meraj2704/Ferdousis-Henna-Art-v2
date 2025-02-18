import { useEffect, useState } from "react";
import Link from "next/link";
import { adminSidebarItems } from "../sidebar/Sidebar";
import { IoIosArrowDown } from "react-icons/io";

interface DrawerCompProps {
  isOpen: boolean;
  onClose: () => void;
  pathName: string;
}

const ToggleSidebar = ({ isOpen, onClose, pathName }: DrawerCompProps) => {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
    <div
      className={`fixed w-screen h-[calc(100vh-80px)] top-20  left-0 right-0 z-[999] transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-primary transition-transform duration-300 ease-in-out text-textColor border-t border-t-primary `}
    >
      {adminSidebarItems.menu.map((item, index) => (
        <div key={index} className="w-full grow">
          {item.subItems ? (
            <>
              <div
                onClick={() => handleToggle(index)}
                className={`w-full h-12 pl-10 flex justify-start items-center gap-3 hover:bg-secondary border-t-[0.5px] border-t-background ${
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
                        onClick={onClose}
                        className={`h-12 pl-16 flex justify-start items-center gap-3 w-full hover:bg-secondary group border-t-[0.5px] border-t-background ${
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
                onClick={onClose}
                className={`h-12 pl-10 flex justify-start items-center gap-3 w-full hover:bg-secondary group border-t-[0.5px] border-t-background ${
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
  );
};

export default ToggleSidebar;
