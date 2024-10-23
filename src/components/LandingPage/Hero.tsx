import React from "react";
import { ImageCarousel } from "./ImageCarousel";
import Services from "./Services/Services";
import ProductsHome from "./products/ProductsHome";

const Hero = () => {
  return (
    <div className="w-full h-full space-y-3 lg:space-y-6">
      <ImageCarousel />
      <ProductsHome/>
      <Services />
    </div>
  );
};

export default Hero;
