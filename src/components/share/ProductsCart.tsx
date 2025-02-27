"use client";
import React from "react";
import ButtonF from "../customUi/ButtonF";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/Types";
import { aclonica } from "../font/fonts";

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
    <div className=" rounded overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300 relative">
      {/* Discount Ribbon on Image Corner */}
      {product.discountPercentage > 0 && (
        <div className="absolute rotate-45 top-0 -right-8 bg-red-500 text-white  font-bold px-8 py-1 z-10 shadow-xl">
          -{product.discountPercentage}%
        </div>
      )}

      {/* Product Image */}
      <Link href={`/products/${product._id}`}>
        <div className="relative h-40 lg:h-64 overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/fallback-image.jpg"}
            alt={product.name || "Product image"}
            width={300}
            height={350}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-2 lg:p-6 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${product._id}`}
            aria-label={`View details of ${product.name}`}
          >
            <h3
              className={`${aclonica.className} text-lg md:text-lg font-semibold text-gray-800 mb-2 hover:underline`}
            >
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-base mb-4 line-clamp-1">
            {product.description}
          </p>
        </div>

        {/* Product Price and Add to Cart */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold text-primary">
              {product.discountedPrice} <span className="text-sm">TK</span>
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm line-through text-gray-500">
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
