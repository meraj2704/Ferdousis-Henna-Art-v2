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
import { Skeleton } from "../ui/skeleton";
import { aclonica } from "../font/fonts";

const ImageCarousel = () => {
  const { data, isLoading } = useFetchData(
    ["allPosts"],
    `hero-post/get-all-client-posts`
  );

  if (isLoading) {
    return (
      <div className="container mx-auto w-full h-[40vh] lg:h-[calc(100vh-550px)] flex items-center justify-center">
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
      // className="w-full h-[40vh] md:h-[50vh] 2xl:h-[calc(100vh-550px)]"
    >
      <CarouselContent>
        {data?.map((post: ClientPostI, index: number) => (
          <CarouselItem key={index} className="w-full h-full relative">
            <div className="w-full h-[220px] md:h-[425px] lg:h-[768px] overflow-hidden">
              <Image
                src={post.image}
                alt={post.buttonName}
                width={1920}
                height={620}
                className={`w-full h-full object-cover `}
                priority={index === 0}
              />
            </div>
            <div
              className={`bg-accent w-full flex flex-col justify-center items-center p-2 space-y-1`}
            >
              {post?.title && (
                <h2
                  className={`${aclonica.className} text-center text-white text-xl md:2xl lg:3xl xl:text-4xl font-semibold `}
                >
                  {post.title}
                </h2>
              )}
              {post?.description && (
                <div className="flex justify-center items-center">
                  <p className=" text-white text-center text-xs md:text-sm lg:text-base line-clamp-1">
                    {post.description}
                  </p>
                </div>
              )}
              <Link href={post.link}>
                <ButtonF variant="light">{post.buttonName}</ButtonF>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 " />
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 " />
    </Carousel>
  );
};
export default ImageCarousel;
