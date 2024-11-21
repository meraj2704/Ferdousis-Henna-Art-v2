import Link from "next/link";
import React from "react";

const NavItem = ({ path, name }: { path: string; name: string }) => {
  return (
    <Link href={path}>
      <p className="relative inline-block uppercase text-textColor transition duration-300 group">
        <span className="relative z-[60] group-hover:text-primary">{name}</span>
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
      </p>
    </Link>
  );
};

export default NavItem;
