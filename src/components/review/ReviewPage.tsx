"use client";
import React, { useState } from "react";
import SectionTitle from "@/components/customUi/SectionTitle";
import { useFetchData } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewForm from "../LandingPage/review/ReviewForm";
import ReviewCard from "../LandingPage/review/ReviewCard";

const ReviewPage: React.FC = () => {
  const { isLoading, data, error } = useFetchData(
    ["reviews"],
    "reviews/get-all-client-reviews"
  );
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return (
      <div className="container mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-5">
        <Skeleton className="w-full h-[200px] rounded-xl" />
        <Skeleton className="w-full h-[200px] rounded-xl" />
        <Skeleton className="w-full h-[200px] rounded-xl" />
      </div>
    );
  }

  return (
    <section className="container mx-auto">
      <SectionTitle title="Customer Reviews" className="mb-4" width="w-32" />
      <div className="flex flex-col md:flex-row justify-between items-center mb-6  p-4 ">
        {/* Left Section - Review Count & Average Rating */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-800">
            {data?.length || 0} Customer Reviews
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <h1 className="text-xl font-semibold text-primary">4.5</h1>
            <div className="flex">
              {/* Display Stars */}
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`h-5 w-5 ${
                    index < 4 ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15.27L16.18 19l-1.64-7.03L19 7.5l-7.19-.61L10 1 8.19 6.89 1 7.5l5.46 4.47L4.82 19z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 text-sm">/ 5</span>
          </div>
        </div>

        {/* Right Section - Write a Review Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition mt-3 md:mt-0"
        >
          {showForm ? "Close Review Form" : "Write a Review"}
        </button>
      </div>
      {showForm && <ReviewForm />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {data?.map((review: any, index: number) => (
          <ReviewCard
            key={index}
            fullName={review.fullName}
            rating={review.rating}
            reviewText={review.reviewText}
            date={review.date}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewPage;
