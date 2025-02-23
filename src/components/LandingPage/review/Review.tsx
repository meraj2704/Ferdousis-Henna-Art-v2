"use client";
import React from "react";
import ReviewCard from "./ReviewCard";
import SectionTitle from "@/components/customUi/SectionTitle";
import { useFetchData } from "@/hooks/useApi";
import { ReviewI } from "@/types/Types";
import { Skeleton } from "@/components/ui/skeleton";

const Review: React.FC = () => {
  const { isLoading, data, error } = useFetchData(
    ["reviews"],
    "reviews/get-all-client-reviews"
  );

  if (isLoading) {
    return (
      <div className="container mx-auto w-full  flex flex-col lg:flex-row items-center justify-between gap-5">
        <Skeleton className="w-full h-[200px] rounded-xl" />
        <Skeleton className="w-full h-[200px] rounded-xl" />
        <Skeleton className="w-full h-[200px] rounded-xl" />
      </div>
    );
  }
  return (
    <section className="container mx-auto">
      <SectionTitle title="Customer Reviews" className="mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4">
        {data?.map((review: ReviewI, index: number) => (
          <ReviewCard key={index} imageUrl={review.image} />
        ))}
      </div>
    </section>
  );
};

export default Review;
