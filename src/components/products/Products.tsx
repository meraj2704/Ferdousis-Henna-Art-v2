"use client";
import { getAlProducts } from "@/api/api";
import SectionTitle from "@/components/customUi/SectionTitle";
import { ProductI } from "@/components/interface/Products";
import ProductCart from "@/components/share/ProductsCart";
import { addToCart } from "@/redux/Reducer/cartSlice";
import { useAppDispatch } from "@/redux/Store/store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const Products = () => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAlProducts,
  });

  const handleAddToCart = (product: ProductI) => {
    console.log("Product added to cart:", product.id);
    dispatch(addToCart(product));
    toast.success('Product added successfully!')
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  console.log("products data", products);

  return (
    <div className="container mx-auto px-2 2xl:px-0">
      <SectionTitle title="All Products" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-4">
        {products?.map((product: ProductI) => (
          <ProductCart
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
