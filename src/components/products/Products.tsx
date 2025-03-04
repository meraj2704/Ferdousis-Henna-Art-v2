"use client";
import SectionTitle from "@/components/customUi/SectionTitle";
import ProductCart from "@/components/share/ProductsCart";
import { useFetchData } from "@/hooks/useApi";
import { addToCart } from "@/redux/Reducer/cartSlice";
import { useAppDispatch } from "@/redux/Store/store";
import { Product } from "@/types/Types";
import React from "react";
import { toast } from "sonner";
import Loader from "../share/Loader";
import { Skeleton } from "../ui/skeleton";

const Products = () => {
  const dispatch = useAppDispatch();
  const {
    data: products,
    isLoading,
    error,
  } = useFetchData(["clientAllProducts"], `product/client/all-products`);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success("Product added successfully!");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto w-full  flex items-center justify-between gap-5">
        <Skeleton className="w-[300px] h-[300px] md:h-[400px] rounded-xl" />
        <Skeleton className="w-[300px] h-[300px] md:h-[400px] rounded-xl" />
        <Skeleton className="w-[300px] h-[300px] md:h-[400px] rounded-xl hidden md:block" />
        <Skeleton className="w-[300px] h-[300px] md:h-[400px] rounded-xl hidden lg:block" />
      </div>
    );
  }
  if (error) return <p>Error fetching products: {error.message}</p>;

  console.log("products data", products);

  return (
    <div className="container mx-auto px-2 2xl:px-0">
      <SectionTitle title="All Products" subtitle="Enhance Your Elegance with Our Premium Henna Collection"/>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-4">
        {products?.map((product: Product) => (
          <ProductCart
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
