import React from "react";
import { ImageCarousel } from "./ImageCarousel";
import Services from "./Services/Services";
import ProductsHome from "./products/ProductsHome";
import Review from "./review/Review";

const Hero = () => {
  return (
    <div className="w-full h-full space-y-10 lg:space-y-16">
      <ImageCarousel />
      <ProductsHome/>
      <Review/>
      <Services />
    </div>
  );
};

export default Hero;
