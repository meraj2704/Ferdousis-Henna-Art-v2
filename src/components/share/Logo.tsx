import Image from "next/image";
import Link from "next/link";
import React from "react";
const logo = "/images/logo.PNG";

const Logo = ({ context }: { context: string }) => {
  return (
    <div className="flex justify-center items-center ">
      <Link href={"/"}>
        <Image src={logo} alt="Logo" width={50} height={50} priority />
      </Link>
      <h1
        className={`${
          context === "nav" ? "text-primary" : "text-textLight"
        } ml-2 font-bold hidden lg:block text-xl lg:text-2xl`}
      >
        Ferdousi's Henna Art
      </h1>
    </div>
  );
};

export default Logo;
