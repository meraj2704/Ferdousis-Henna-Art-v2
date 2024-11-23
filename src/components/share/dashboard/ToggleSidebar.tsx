import { useEffect } from "react";
import Link from "next/link";

interface DrawerCompProps {
  isOpen: boolean;
  onClose: () => void;
  pathName: string;
}

const menu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    name: "All Products",
    path: "/admin/products/all-products",
  },
  {
    name: "Add Products",
    path: "/admin/products/add-product",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const ToggleSidebar = ({ isOpen, onClose, pathName }: DrawerCompProps) => {
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
      className={`fixed w-screen h-[calc(100vh-80px)] top-20  left-0 right-0 z-[999] transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-background transition-transform duration-300 ease-in-out text-textColor border-t border-t-primary `}
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

export default ToggleSidebar;
