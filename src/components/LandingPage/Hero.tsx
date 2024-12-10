import React from "react";
import Services from "./Services/Services";
import ProductsHome from "./products/ProductsHome";
import Review from "./review/Review";
import ImageCarousel from "./ImageCarousel";

const Hero = () => {
  return (
    <div className="w-full h-full space-y-5 md:space-y-10 lg:space-y-16">
      <ImageCarousel />
      <ProductsHome />
      <Review />
      <Services />
    </div>
  );
};

export default Hero;
