"use client";

import Link from "next/link";
import Lottie from "lottie-react";
// import notfound from "../../public/assets/404.json";
import "./globals.css";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bgPrimary text-brandPrimary">
      <h1>Not Found</h1>
      {/* <Lottie
				animationData={notfound}
				loop={true}
				className="w-auto h-[460px]"
			/>
			<p className="text-center mb-8 text-greyPrimary">
				Sorry, the page you’re looking for doesn’t exist or has been moved.
			</p>*/}
      <Link
        href="/"
        className="px-6 py-3 rounded-lg text-white font-semibold bg-brandPrimary hover:bg-brandHover transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
