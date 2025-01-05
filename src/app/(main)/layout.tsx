import Footer from "@/components/share/footer/Footer";
import Navbar from "@/components/share/Nav/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
