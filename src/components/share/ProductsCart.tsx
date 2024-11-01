"use client";
import React from "react";
import ButtonF from "../customUi/ButtonF";
import Link from "next/link";

interface ProductCartProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
  };
  onAddToCart: (id: number) => void;
}

const ProductCart: React.FC<ProductCartProps> = ({ product, onAddToCart }) => {
  
  return (
    <div className="max-w-sm rounded overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-40 lg:h-64">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Information */}
      <div className="p-2 lg:p-6 flex flex-col justify-between">
        <div>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:underline">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mb-4">
            {product.description.length > 100
              ? product.description.substring(0, 100) + "..."
              : product.description}
          </p>
        </div>
        {/* Product Price */}
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary">
            {product.price} <span className="text-sm">TK</span>
          </span>
          <ButtonF variant="primary">Add To Cart</ButtonF>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
