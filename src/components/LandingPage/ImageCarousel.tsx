"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import ButtonF from "../customUi/ButtonF";
import Link from "next/link";
import { useFetchData } from "@/hooks/useApi";
import { ClientPostI } from "@/types/Types";
import Loader from "../share/Loader";
import { Skeleton } from "../ui/skeleton";

const ImageCarousel = () => {
  const { data, isLoading } = useFetchData(
    ["allPosts"],
    `hero-post/get-all-client-posts`
  );

  if (isLoading) {
    return (
      <div className="mt-20 px-10 w-full h-[calc(100vh-600px)] lg:h-[calc(100vh-550px)] flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    );
  }

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      opts={{ loop: true }}
      className="w-full h-[40vh] lg:h-[calc(100vh-550px)]"
    >
      <CarouselContent>
        {data?.map((post: ClientPostI, index: number) => (
          <CarouselItem key={index} className="w-full h-full relative">
            <div className="w-full h-full">
              <Image
                src={post.image}
                alt={post.buttonName}
                width={1920}
                height={620}
                className="w-full h-[40vh] lg:h-[calc(100vh-550px)] object-cover"
              />
            </div>
            <div className="absolute w-full h-full  top-0 left-0 right-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-center items-center p-8 ">
              {post?.title && (
                <h2 className="text-white text-4xl md:5xl lg:6xl xl:text-8xl font-semibold text-opacity-90 mb-4 ">
                  {post.title}
                </h2>
              )}
              {post?.description && (
                <p className="text-white text-center text-lg mb-6">
                  {post.description}
                </p>
              )}
              <Link href={post.link}>
                <ButtonF variant="primary">{post.buttonName}</ButtonF>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden" />
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden" />
    </Carousel>
  );
};
export default ImageCarousel;
