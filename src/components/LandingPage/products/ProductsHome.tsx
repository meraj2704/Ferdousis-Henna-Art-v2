"use client";
import { getAlProducts, getAlProductsHome } from "@/api/api";
import ButtonF from "@/components/customUi/ButtonF";
import SectionTitle from "@/components/customUi/SectionTitle";
import { ProductI } from "@/components/interface/Products";
import ProductCart from "@/components/share/ProductsCart";
import { addToCart } from "@/redux/Reducer/cartSlice";
import { useAppDispatch } from "@/redux/Store/store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const ProductsHome = () => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["allProductsHome"],
    queryFn: getAlProductsHome,
  });

  const handleAddToCart = (product: ProductI) => {
    dispatch(addToCart(product));
    toast.success("Product added successfully")
  };
  console.log("data", products);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  console.log("products data", products);

  return (
    <div className="container mx-auto px-1 md:px-2 2xl:px-0">
      <SectionTitle title="Products" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-4">
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
