"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Input from "../share/Input";
import { RootState, useAppSelector } from "@/redux/Store/store";

interface CheckoutInputs {
  state: string;
  district: string;
  address: string;
  fullName: string;
  email: string;
  phone: string;
}

const statesWithDistricts = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj"],
  Chittagong: ["Chittagong", "Cox's Bazar", "Rangamati"],
  Rajshahi: ["Rajshahi", "Pabna", "Natore"],
  // Add more states and districts as needed
};

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutInputs>();

  const onSubmit: SubmitHandler<CheckoutInputs> = (data) => {
    console.log("Form Data:", data);
    // Handle order placement logic here
  };
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const selectedState = watch("state");
  const selectedDistrict = watch("district");

  const districts =
    selectedState && selectedState in statesWithDistricts
      ? statesWithDistricts[selectedState as keyof typeof statesWithDistricts]
      : [];

  return (
    <div className="container mx-auto px-2 py-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Billing Information */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Billing Information
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            register={register}
            error={errors.fullName}
            required
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email}
            required
          />
          <Input
            label="Phone Number"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
            register={register}
            error={errors.phone}
            required
          />

          {/* State Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-800 font-medium">State</label>
            <select
              {...register("state", { required: "State is required" })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-primary ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select your state</option>
              {Object.keys(statesWithDistricts).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-sm text-red-500">{errors.state.message}</p>
            )}
          </div>

          {/* District Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-800 font-medium">District</label>
            <select
              {...register("district", { required: "District is required" })}
              disabled={!selectedState}
              className={`w-full px-4 py-2 border rounded-md focus:outline-primary ${
                errors.district ? "border-red-500" : "border-gray-300"
              } ${!selectedState ? "bg-gray-200 cursor-not-allowed" : ""}`}
            >
              <option value="">Select your district</option>
              {districts.map((district: string) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-sm text-red-500">{errors.district.message}</p>
            )}
          </div>

          {/* Address Input */}
          <Input
            label="Courier Office Address"
            name="address"
            type="text"
            placeholder="Enter the courier office address"
            register={register}
            error={errors.address}
            required
          />
        </div>

        {/* Order Summary */}
        <div className="flex justify-between items-center mt-6 border-t pt-6">
          <div className="text-lg font-semibold text-gray-800">
            <p>Total: {getTotalPrice().toFixed(2)} TK</p>
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-secondary transition"
          >
            Place Order
          </button>
        </div>
      </form>

      {/* Back to Cart Link */}
      <div className="mt-6 text-center">
        <Link href="/cart" className="text-primary hover:underline text-lg">
          Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
