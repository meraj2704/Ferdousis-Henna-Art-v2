"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/share/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useAddData } from "@/hooks/useApi";
import CustomSelect from "@/components/share/CustomSelect";
import FormSubmitButton from "@/components/share/FormSubmitButton";

interface ReviewInputs {
  fullName: string;
  rating?: number;
  reviewText: string;
}

const reviewSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  rating: yup
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
  reviewText: yup
    .string()
    .required("Review text is required")
    .max(300, "Review cannot exceed 300 characters"),
});

const ReviewForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<ReviewInputs>({
    resolver: yupResolver(reviewSchema),
  });

  const newReview = useAddData(["reviews"], "reviews/create-review");

  const onSubmit: SubmitHandler<ReviewInputs> = async (data) => {
    const reviewData = {
      fullName: data.fullName,
      rating: data.rating,
      reviewText: data.reviewText,
    };

    try {
      newReview.mutate(reviewData, {
        onSuccess: () => {
          toast.success("Review submitted successfully!");
          reset();
        },
        onError: (error: any) => {
          toast.error("Failed to submit review. Please try again.");
        },
      });
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" p-4 rounded-md mb-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Write a Review
      </h2>

      {/* Name Input */}
      <Input
        label="Full Name"
        name="fullName"
        type="text"
        placeholder="Enter your name"
        register={register}
        error={errors.fullName}
        required
      />

      {/* Star Rating Input */}
      <CustomSelect
        label="Rating"
        options={[
          { value: "5", label: "⭐⭐⭐⭐⭐" },
          { value: "4", label: "⭐⭐⭐⭐" },
          { value: "3", label: "⭐⭐⭐" },
          { value: "2", label: "⭐⭐" },
          { value: "1", label: "⭐" },
        ]}
        placeholder="Select Rating"
        name="rating"
        control={control}
      />

      {/* Review Text */}
      <Input
        label="Review"
        name="reviewText"
        type="text"
        placeholder="Write your review here..."
        register={register}
        error={errors.reviewText}
        required
        maxLength={300}
      />

      {/* Submit Button */}
      <FormSubmitButton
        status={newReview.status}
        buttonName="Upload"
        context="Uploading"
      
      />
    </form>
  );
};

export default ReviewForm;
