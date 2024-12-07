"use client";
import ButtonF from "@/components/customUi/ButtonF";
import SectionTitle from "@/components/customUi/SectionTitle";
import Loader from "@/components/share/Loader";
import ProductCart from "@/components/share/ProductsCart";
import { useFetchData } from "@/hooks/useApi";
import { addToCart } from "@/redux/Reducer/cartSlice";
import { useAppDispatch } from "@/redux/Store/store";
import { Product } from "@/types/Types";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const ProductsHome = () => {
  const dispatch = useAppDispatch();
  const {
    data: products,
    isLoading,
    error,
  } = useFetchData(["homeProducts"], `product/home-products`);
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success("Product added successfully");
  };
  console.log("data", products);

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching products: {error.message}</p>;

  console.log("products data", products);

  return (
    <div className="container mx-auto px-1 md:px-2 2xl:px-0">
      <SectionTitle title="Products" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-4">
        {products?.map((product: Product) => (
          <ProductCart
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 lg:mt-6">
        <Link href={"/products"}>
          {" "}
          <ButtonF variant="primary">See All</ButtonF>
        </Link>
      </div>
    </div>
  );
};

export default ProductsHome;
