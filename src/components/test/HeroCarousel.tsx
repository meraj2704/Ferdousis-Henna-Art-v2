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
import useEmblaCarousel from "embla-carousel-react";
import ButtonF from "../customUi/ButtonF";
import Link from "next/link";

const images = [
  {
    url: "/images/test/image1.jpeg",
  },
  {
    url: "/images/test/image2.png",
  },
  {
    url: "/images/test/image3.png",
  },
  {
    url: "/images/test/image4.png",
  },
];

export function HeroCarousel() {
  // const [emblaRef] = useEmblaCarousel({ loop: true });
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{ loop: true }}
      className="w-full h-full"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="w-full h-full">
            <Image
              src={image.url}
              alt={"carousel-image for hero"}
              width={1440}
              height={680}
              className="w-full h-[704px] object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden" />
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden" />
    </Carousel>
  );
}

export default HeroCarousel;
