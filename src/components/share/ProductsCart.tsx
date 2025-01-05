"use client";
import React from "react";
import ButtonF from "../customUi/ButtonF";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/Types";

interface ProductCartProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    discountPercentage: number;
    discountedPrice: number;
    description: string;
  };
  onAddToCart: (product: Product) => void;
}

const ProductCart: React.FC<ProductCartProps> = ({ product, onAddToCart }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-40 lg:h-64">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={350}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Information */}
      <div className="p-2 lg:p-6 flex flex-col justify-between">
        <div>
          <Link href={`/products/${product._id}`}>
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 hover:underline">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-xs md:text-sm mb-4">
            {product.description.length > 100
              ? product.description.substring(0, 100) + "..."
              : product.description}
          </p>
        </div>
        {/* Product Price */}
        <div className="flex justify-between items-center">
          <span className="text-lg md:text-xl font-bold text-primary">
            {product.price} <span className="text-sm">TK</span>
          </span>
          <ButtonF variant="primary" onClick={() => onAddToCart(product)}>
            Add To Cart
          </ButtonF>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
