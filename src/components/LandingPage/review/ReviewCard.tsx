import React from "react";

interface ReviewProps {
  imageUrl: string; // URL or path to the review screenshot
}

const ReviewCard: React.FC<ReviewProps> = ({ imageUrl }) => {
  return (
    <div className="bg-[#E7F0DC] border border-[#729762] rounded-lg shadow-lg p-4 max-w-md mx-auto mb-6">
      <img src={imageUrl} alt="Review Screenshot" className="rounded-lg" />
    </div>
  );
};

export default ReviewCard;
