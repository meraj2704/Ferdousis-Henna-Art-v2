import Image from "next/image";
import React from "react";

interface ReviewProps {
  imageUrl: string; // URL or path to the review screenshot
}

const ReviewCard: React.FC<ReviewProps> = ({ imageUrl }) => {
  return (
    <div className="w-full h-[210px] bg-[#E7F0DC] border border-[#729762] rounded-lg shadow-lg p-4 max-w-md mx-auto mb-6">
      <Image
        src={imageUrl}
        width={300}
        height={200}
        alt="Review Screenshot"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};

export default ReviewCard;
