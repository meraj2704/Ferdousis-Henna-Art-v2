"use client";
import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import SectionTitle from "@/components/customUi/SectionTitle";
import { useFetchData } from "@/hooks/useApi";
import { ReviewI } from "@/types/Types";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewForm from "./ReviewForm";
import ButtonF from "@/components/customUi/ButtonF";

const dummyReviews = [
  {
    fullName: "John Doe",
    rating: 5,
    reviewText:
      "Amazing product! The quality exceeded my expectations. Fast delivery as well.",
    image: "/dummy-user-1.jpg",
    date: "2024-02-26",
    verifiedBuyer: true,
  },
  {
    fullName: "Sarah Smith",
    rating: 4,
    reviewText:
      "Good product, but the packaging could be better. Overall satisfied!",
    image: "/dummy-user-2.jpg",
    date: "2024-02-25",
    verifiedBuyer: false,
  },
  {
    fullName: "Ahmed Khan",
    rating: 5,
    reviewText: "Great customer service. I will definitely shop again!",
    image: "/dummy-user-3.jpg",
    date: "2024-02-20",
    verifiedBuyer: true,
  },
  {
    fullName: "Emily Johnson",
    rating: 3,
    reviewText: "The product is decent, but I expected better durability.",
    image: "/dummy-user-4.jpg",
    date: "2024-02-18",
    verifiedBuyer: false,
  },
  {
    fullName: "Michael Brown",
    rating: 4,
    reviewText: "Very useful and great design! Would recommend to others.",
    image: "/dummy-user-5.jpg",
    date: "2024-02-15",
    verifiedBuyer: true,
  },
  {
    fullName: "Jessica Lee",
    rating: 5,
    reviewText: "Absolutely love this! Best purchase I've made in a while.",
    image: "/dummy-user-6.jpg",
    date: "2024-02-12",
    verifiedBuyer: true,
  },
];

const Review: React.FC = () => {
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
        {dummyReviews?.map((review: any, index: number) => (
          <ReviewCard
            key={index}
            fullName={review.fullName}
            rating={review.rating}
            reviewText={review.reviewText}
            imageUrl={review.image}
            date={review.date}
            verifiedBuyer={review.verifiedBuyer}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-6">
        <ButtonF>See All</ButtonF>
      </div>
    </section>
  );
};

export default Review;
