import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";

interface ReviewCardProps {
  fullName: string;
  rating: number;
  reviewText: string;
  imageUrl?: string; // Optional Image
  date: string;
  verifiedBuyer?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  fullName,
  rating,
  reviewText,
  imageUrl,
  date,
  verifiedBuyer = false,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      {/* User Info & Rating */}
      <div className="flex items-center gap-4">
        {/* Profile Image or Placeholder */}
        

        <div className="flex flex-col">
          {/* User Name */}
          <h3 className="font-semibold text-gray-800">{fullName}</h3>
          {/* Verified Buyer Badge */}
          {verifiedBuyer && <span className="text-sm text-green-600">✔ Verified Buyer</span>}
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center gap-1 mt-2">
        {[...Array(5)].map((_, index) =>
          index < rating ? (
            <FaStar key={index} className="text-yellow-500" />
          ) : (
            <FaRegStar key={index} className="text-gray-300" />
          )
        )}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mt-2">{reviewText}</p>

      {/* Date of Review */}
      <p className="text-gray-500 text-sm mt-2">{date}</p>
    </div>
  );
};

export default ReviewCard;
