import Footer from "@/components/share/footer/Footer";
import Navbar from "@/components/share/Nav/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <>{children}</>
      <>
        <Footer />
      </>
    </div>
  );
};

export default Layout;
