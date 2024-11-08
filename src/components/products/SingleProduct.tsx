"use client";
import { getAlProducts } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { ProductI } from "../interface/Products";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineFavoriteBorder } from "react-icons/md";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";
import ButtonF from "../customUi/ButtonF";
import Delivery from "./Delivery";
import { useAppDispatch, useAppSelector } from "@/redux/Store/store";
import { addToCart } from "@/redux/Reducer/cartSlice";
import { toast } from "sonner";

const SingleProduct: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { id } = params;
  const [product, setProduct] = useState<any>(null);
  const counter = useAppSelector((state) => console.log("state", state));

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
  const handleAddToCart = (product: ProductI) => {
    dispatch(addToCart(product));
    toast.success("Product added successfully");
  };

  if (!product) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="container mx-auto px-2 2xl:px-0">
      {/* Product Image */}
      <div className="my-4 flex items-center gap-3">
        <Link href="/">
          <IoIosArrowRoundBack />
        </Link>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-primary font-semibold" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="md:w-1/2 h-[415px] md:h-[515px]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full rounded-lg "
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 space-y-4">
          <div className="flex justify-start items-center">
            <div className="rounded-full border border-primary py-1 px-8">
              Mehendi
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-primary">
            {product.name}
          </h2>
          <p className="text-xl font-bold text-accent">
            {product.price} <span className="text-sm">TK</span>
          </p>
          <div className="w-full flex items-center gap-4 ">
            <ButtonF
              className="flex-1"
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </ButtonF>
            <div className="rounded-full border border-primary flex justify-center items-center p-2 group hover:bg-primary">
              <MdOutlineFavoriteBorder className="text-primary" />
            </div>
          </div>
          <p className="text-gray-600">{product.description}</p>
          <Delivery />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
