"use client";
import { getAlProducts } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { ProductI } from "../interface/Products";
import { IoIosArrowRoundBack } from "react-icons/io";

const SingleProduct: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<any>(null);

  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAlProducts,
  });

  console.log("data", products);

  useEffect(() => {
    const foundProduct = products?.find(
      (p: ProductI) => p.id === parseInt(id as string)
    );
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;
  const handleAddToCart = (id: number) => {
    console.log("Product added to cart:", id);
  };

  if (!product) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="container mx-auto px-10">
      {/* Product Image */}
      <div className="my-4 flex items-center gap-3">
        <IoIosArrowRoundBack />
        <p>Home</p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 h-1/2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 md:pl-6">
          <h2 className="text-3xl font-semibold text-primary mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-accent mb-4">${product.price}</p>
          <button
            className="bg-accent text-white py-3 px-6 rounded-lg hover:bg-primary transition-colors duration-300"
            onClick={() => handleAddToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
