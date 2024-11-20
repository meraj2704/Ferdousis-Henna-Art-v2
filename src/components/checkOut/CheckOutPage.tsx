"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Input from "../share/Input";
import CustomSelect from "../share/CustomSelect";
import { RootState, useAppSelector } from "@/redux/Store/store";
import SuccessModal from "./SuccessModal";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/Reducer/cartSlice";

interface CheckoutInputs {
  state: string;
  district: string;
  address: string;
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  paymentNumber?: string;
  transactionId?: string;
}

const statesWithDistricts = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj"],
  Chittagong: ["Chittagong", "Cox's Bazar", "Rangamati"],
  Rajshahi: ["Rajshahi", "Pabna", "Natore"],
  // Add more states and districts as needed
};

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutInputs>();

  const onSubmit: SubmitHandler<CheckoutInputs> = (data) => {
    console.log("Form Data:", data);
    alert(JSON.stringify(data));
    if (data) {
      setOpenSuccessModal(true);
    }
    dispatch(clearCart());
  };

  const closSuccessModal = () => {
    setOpenSuccessModal(false);
    router.push("/products");
  };

  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  console.log("cartItems:", cartItems);
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const selectedState = watch("state");
  const selectedDistrict = watch("district");
  const paymentMethod = watch("paymentMethod");

  const districts =
    selectedState && selectedState in statesWithDistricts
      ? statesWithDistricts[selectedState as keyof typeof statesWithDistricts]
      : [];

  return (
    <div className="container mx-auto px-2 py-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Billing Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          <CustomSelect
            label="State"
            name="state"
            control={control}
            options={Object.keys(statesWithDistricts).map((state) => ({
              label: state,
              value: state,
            }))}
            rules={{ required: "State is required" }}
            placeholder="Select your state"
            error={errors.state}
          />
          <CustomSelect
            label="District"
            name="district"
            control={control}
            options={districts.map((district) => ({
              label: district,
              value: district,
            }))}
            rules={{ required: "District is required" }}
            placeholder="Select your district"
            error={errors.district}
          />
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
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Payment Information
        </h2>
        <CustomSelect
          label="Payment Method"
          name="paymentMethod"
          control={control}
          options={[
            { label: "Cash on Delivery", value: "cash" },
            { label: "Bkash", value: "bkash" },
            { label: "Nagad", value: "nagad" },
            { label: "Other", value: "other" },
          ]}
          rules={{ required: "Select Payment Method is Required" }}
          placeholder="Select Payment Method"
          error={errors.paymentMethod}
        />
        {paymentMethod !== "cash" && paymentMethod && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Payment Number"
              name="paymentNumber"
              type="text"
              placeholder="Enter payment number"
              register={register}
              error={errors.paymentNumber}
              required
            />
            <Input
              label="Transaction ID"
              name="transactionId"
              type="text"
              placeholder="Enter transaction ID"
              register={register}
              error={errors.transactionId}
              required
            />
          </div>
        )}

        <div className="mt-6 border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2 text-sm"
              >
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-gray-500">x {item.quantity}</p>
                <p className="font-medium text-gray-800">
                  ({item.price} * {item.quantity}) ={" "}
                  {(item.price * item.quantity).toFixed(2)} TK
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t text-sm font-medium">
              <p>Subtotal</p>
              <p>{getTotalPrice().toFixed(2)} TK</p>
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
              <p>Courier Service Fee</p>
              <p>50.00 TK</p>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
              <p>Total</p>
              <p>{(getTotalPrice() + 50).toFixed(2)} TK</p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 bg-primary text-white py-2 px-6 rounded-md hover:bg-secondary transition w-full"
          >
            Place Order
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <Link href="/cart" className="text-primary hover:underline text-lg">
          Back to Cart
        </Link>
      </div>
      <SuccessModal open={openSuccessModal} onClose={closSuccessModal} />
    </div>
  );
};

export default CheckoutPage;
