"use client";
import { getAlProducts } from "@/api/api";
import ButtonF from "@/components/customUi/ButtonF";
import SectionTitle from "@/components/customUi/SectionTitle";
import { ProductI } from "@/components/interface/Products";
import ProductCart from "@/components/share/ProductsCart";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ProductsHome = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAlProducts,
  });

  const handleAddToCart = (id: number) => {
    console.log("Product added to cart:", id);
  };
  console.log("data", products);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return (
    <div className="container mx-auto px-5 2xl:px-0">
      <SectionTitle title="Products" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {products?.map((product: ProductI) => (
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
