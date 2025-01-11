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
  const truncatedDescription =
    product.description?.length > 100
      ? product.description.substring(0, 100) + "..."
      : product.description || "No description available.";

  return (
    <div className="max-w-sm rounded overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-40 lg:h-64">
        <Image
          src={product.image || "/fallback-image.jpg"}
          alt={product.name || "Product image"}
          width={300}
          height={350}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="p-2 lg:p-6 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${product._id}`}
            aria-label={`View details of ${product.name}`}
          >
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 hover:underline">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-xs md:text-sm mb-4">
            {truncatedDescription}
          </p>
        </div>
        {/* Product Price and Add to Cart */}
        <div className="flex justify-between items-center">
          <div>
            {product.discountPercentage > 0 && (
              <p className="text-xs text-red-500">
                Save {product.discountPercentage}%!
              </p>
            )}
            <span className="text-lg md:text-xl font-bold text-primary">
              {product.discountedPrice} <span className="text-sm">TK</span>
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm line-through text-gray-500 ml-2">
                {product.price} TK
              </span>
            )}
          </div>
          <ButtonF variant="primary" onClick={() => onAddToCart(product)}>
            Add To Cart
          </ButtonF>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
