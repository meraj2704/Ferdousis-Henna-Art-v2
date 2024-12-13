import React from "react";
import dynamic from "next/dynamic";
const ImageCarousel = dynamic(() => import("./ImageCarousel"));
const ProductsHome = dynamic(() => import("./products/ProductsHome"));
const Review = dynamic(() => import("./review/Review"));
const Services = dynamic(() => import("./Services/Services"));

const LandingPage = () => {
  return (
    <div className="w-full h-full space-y-5 md:space-y-10 lg:space-y-16">
      <ImageCarousel />
      <ProductsHome />
      <Review />
      <Services />
    </div>
  );
};

export default LandingPage;
