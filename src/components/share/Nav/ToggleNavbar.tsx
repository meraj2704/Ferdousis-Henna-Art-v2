import { useEffect } from "react";
import Link from "next/link";

interface DrawerCompProps {
  isOpen: boolean;
  onClose: () => void;
  isNavbarFixed: boolean;
  pathName: string;
}

const menu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All Products",
    path: "",
  },
  {
    name: "Booking",
    path: "",
  },
  {
    name: "Contact",
    path: "",
  },
];

const ToggleNavbar = ({
  isOpen,
  onClose,
  isNavbarFixed,
  pathName,
}: DrawerCompProps) => {
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

  return (
    <div
      className={`fixed w-screen ${
        isNavbarFixed ? "top-24" : "h-32"
      }  left-0 right-0 z-[999] transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } bg-background transition-transform duration-300 ease-in-out text-textColor border-t border-t-primary`}
      style={{ height: "calc(100vh - 6rem)" }}
    >
      {menu.map((item, index) => (
        <Link href={item.path} key={index}>
          <div
            onClick={onClose}
            className={`w-full py-2 font-bold border-b border-b-primary ${
              pathName === item.path ? "bg-accent text-white" : ""
            }  hover:bg-accent hover:text-white flex justify-center items-center`}
          >
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ToggleNavbar;
