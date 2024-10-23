"use client";
import ButtonF from "@/components/customUi/ButtonF";
import SectionTitle from "@/components/customUi/SectionTitle";
import ProductCart from "@/components/share/ProductsCart";
import React from "react";

const ProductsHome = () => {
  const products = [
    {
      id: 1,
      name: "Beautiful Henna Pattern",
      price: 120,
      imageUrl: "/images/product/product1.jpeg",
      description:
        "A gorgeous henna pattern perfect for weddings and special occasions.",
    },
    {
      id: 2,
      name: "Elegant Henna Design",
      price: 110,
      imageUrl: "/images/product/product2.jpeg",
      description:
        "This elegant design brings out the beauty of traditional henna art.",
    },
    {
      id: 3,
      name: "Beautiful Henna Pattern",
      price: 105,
      imageUrl: "/images/product/product3.jpeg",
      description:
        "A gorgeous henna pattern perfect for weddings and special occasions.",
    },
    {
      id: 4,
      name: "Beautiful Henna Pattern",
      price: 90,
      imageUrl: "/images/product/product4.jpeg",
      description:
        "A gorgeous henna pattern perfect for weddings and special occasions.",
    },
  ];

  const handleAddToCart = (id: number) => {
    console.log("Product added to cart:", id);
  };

  return (
    <div className="container mx-auto px-5 2xl:px-0">
      <SectionTitle title="Products" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {products.map((product) => (
          <ProductCart
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 lg:mt-6">
        <ButtonF variant="primary">See All</ButtonF>
      </div>
    </div>
  );
};

export default ProductsHome;
