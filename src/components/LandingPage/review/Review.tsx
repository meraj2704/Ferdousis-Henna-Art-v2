import React from "react";
import ReviewCard from "./ReviewCard";
import SectionTitle from "@/components/customUi/SectionTitle";

const Review: React.FC = () => {
  // Sample review image URLs (social media review screenshots)
  const reviewImages = [
    {
      imageUrl: "/images/review/review1.jpg", // Replace with actual screenshot URL
    },
    {
      imageUrl: "/images/review/review1.jpg",
    },
    {
      imageUrl: "/images/review/review1.jpg",
    },
    // Add more review images here
  ];

  return (
    <section className="container mx-auto">
      <SectionTitle title="Customer Review" className="mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4">
        {reviewImages.map((review, index) => (
          <ReviewCard key={index} imageUrl={review.imageUrl} />
        ))}
      </div>
    </section>
  );
};

export default Review;
