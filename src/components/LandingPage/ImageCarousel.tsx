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
    url: "/images/home/carousel1.jpg",
    title: "Bridal Henna Masterpiece",
    description: "Elegant bridal Henna patterns for the perfect wedding look.",
    cta: "Book Now",
    link: "/services/bridal-henna",
  },
  {
    url: "/images/home/carousel2.jpg",
    title: "Festive Henna Designs",
    description: "Celebrate with intricate Henna designs for any festival.",
    cta: "Explore Designs",
    link: "/services/festive-henna",
  },
  {
    url: "/images/home/carousel3.jpg",
    title: "Custom Henna Tattoos",
    description: "Get unique Henna tattoos personalized to your style.",
    cta: "Contact Us",
    link: "/contact",
  },
];

export function ImageCarousel() {
  // const [emblaRef] = useEmblaCarousel({ loop: true });
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      opts={{ loop: true }}
      className="w-full h-[calc(100vh-600px)] lg:h-[calc(100vh-550px)]"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="w-full h-full relative">
            <div className="w-full h-full">
              <Image
                src={image.url}
                alt={image.title}
                width={1920}
                height={620}
                className="w-full h-[calc(100vh-600px)] lg:h-[calc(100vh-550px)] object-cover"
              />
            </div>
            <div className="absolute w-full h-full  top-0 left-0 right-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-center items-center p-8 ">
              <h2 className="text-white text-4xl md:5xl lg:6xl xl:text-8xl font-semibold text-opacity-90 mb-4 ">
                {image.title}
              </h2>
              <p className="text-white text-lg mb-6">{image.description}</p>
              <Link href={image.link}>
                <ButtonF variant="primary">{image.cta}</ButtonF>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden" />
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden" />
    </Carousel>
  );
}

// import React, { useEffect } from 'react'
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   CarouselApi,
// } from "@/components/ui/carousel"
// import Image from 'next/image'

// const imageUrls = [
//    "/images/rough/img1.jpg",
//    "/images/rough/img2.jpg",
//    "/images/rough/img3.jpg"
// ]

// const Rough = () => {
//   const carouselInterval = 3000 // Set the interval time in milliseconds
//   const [api, setApi] = React.useState<CarouselApi | null>(null)

//   useEffect(() => {
//     if (!api) return

//     const interval = setInterval(() => {
//       api.scrollNext()
//     }, carouselInterval)

//     return () => clearInterval(interval)
//   }, [api, carouselInterval])

//   return (
//     <div className="w-full h-screen overflow-hidden">
//       <Carousel className="w-full h-full" setApi={setApi} opts={{ loop: true }}> {/* Enable loop here */}
//         <CarouselContent>
//           {imageUrls.map((url, index) => (
//             <CarouselItem key={index}>
//               <div className="w-full h-full relative">
//                 <Image
//                   src={url}
//                   alt={`Slide ${index + 1}`}
//                   width={900}
//                   height={900}
//                   className="object-cover w-full h-full"
//                 />

//                 <div className='absolute inset-0 text-5xl text-red-400'>
//                   Hello World
//                 </div>
//               </div>
//             </CarouselItem>
//           )}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>

// }

// export default Rough
