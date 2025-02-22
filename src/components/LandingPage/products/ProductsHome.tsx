"use client";
import ButtonF from "@/components/customUi/ButtonF";
import SectionTitle from "@/components/customUi/SectionTitle";
import ProductCart from "@/components/share/ProductsCart";
import { Skeleton } from "@/components/ui/skeleton";
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

  const handleAddToCart = React.useCallback(
    (product: Product) => {
      dispatch(addToCart(product));
      toast.success("Product added successfully");
    },
    [dispatch]
  );

  if (isLoading) {
    const skeletonCount = 4;
    return (
      <div className="container mx-auto mt-20 w-full   flex flex-col md:flex-row items-center justify-between gap-5">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-[300px] h-[300px] md:h-[400px] rounded-xl"
          />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto mt-20 text-center">
        <p className="text-lg text-red-600">
          Failed to fetch products: {error.message}
        </p>
        <ButtonF variant="primary" onClick={() => window.location.reload()}>
          Retry
        </ButtonF>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-1 md:px-2 ">
      <SectionTitle title="Products" />
      <div className="grid grid-cols-1 smL:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-4">
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
