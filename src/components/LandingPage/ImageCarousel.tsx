'use client'
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from 'embla-carousel-autoplay'

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
  }
];

export function ImageCarousel() {
  return (
    <Carousel
     plugins={[
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        jump: true,
      }),
    ]} className="w-full h-[calc(100vh-80px)] relative">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="w-full h-full relative">
            <div className="w-full h-full">
              <Image
                src={image.url}
                alt={image.title}
                // fill
                width={1920}
                height={620}
                className="w-full h-[calc(100vh-110px)] object-cover"
               
              />
            </div>
            <div className="absolute w-full h-full top-0 left-0 right-0 bg-gradient-to-t from-black  bg-blur to-transparent">

            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
    </Carousel>
  );
}
// here is comments for regular update