import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const images = [
  {
    url: "/images/home/carousel1.jpg",
    title: "Beautiful Sunset",
  },
  {
    url: "/images/home/carousel2.jpg",
    title: "Mountain Adventure",
  },
  {
    url: "/images/home/carousel3.jpg",
    title: "City Lights",
  },
  {
    url: "/images/home/carousel1.jpg",
    title: "Forest Path",
  },
  {
    url: "/images/home/carousel2.jpg",
    title: "Ocean Breeze",
  },
];

export function ImageCarousel() {
  return (
    <Carousel className="w-full h-[calc(100vh-80px)] relative"> {/* Assuming your nav is 80px height */}
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="w-full h-full relative">
            <div className="w-full h-full">
              <Image
                src={image.url}
                alt={image.title}
                // width={1000}
                // height={900}
                fill
                objectFit="cover"  
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-white text-3xl md:text-5xl font-bold px-4 py-2 bg-black bg-opacity-60 rounded-lg">
                  {image.title}
                </h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
    </Carousel>
  );
}
