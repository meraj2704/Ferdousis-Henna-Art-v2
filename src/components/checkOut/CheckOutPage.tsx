"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Input from "../share/Input";
import CustomSelect from "../share/CustomSelect";
import { RootState, useAppSelector } from "@/redux/Store/store";
import SuccessModal from "./SuccessModal";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/Reducer/cartSlice";
import { useAddData, useFetchData } from "@/hooks/useApi";
import { toast } from "sonner";
import FormSubmitButton from "../share/FormSubmitButton";

interface CheckoutInputs {
  state: string;
  district: string;
  upazila: string;
  address: string;
  fullName: string;
  email: string;
  phone: string;
  addressDetails: string;
  // paymentMethod: string;
  // paymentNumber?: string;
  // transactionId?: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [statesWithDistricts, setStatesWithDistricts] = useState<any>({});
  const [upazilas, setUpazilas] = useState<any[]>([]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CheckoutInputs>({});

  const { isLoading, data, error } = useFetchData(
    ["divisions"],
    `divisions-get-all`
  );

  const newOrder = useAddData(["orders", "dashboard"], "orders/new-order");

  useEffect(() => {
    if (data && data.length > 0) {
      const divisions = data;
      const statesDistricts = divisions.reduce((acc: any, division: any) => {
        acc[division.name] = division.districts.map((district: any) => ({
          label: district.name,
          value: district.name,
          upazilas: district.upazilas.map((upazila: any) => ({
            label: upazila,
            value: upazila,
          })),
        }));
        return acc;
      }, {});
      setStatesWithDistricts(statesDistricts);
    }
  }, [data]);

  useEffect(() => {
    if (watch("district")) {
      const selectedDistrictUpazilas = statesWithDistricts[
        watch("state")
      ]?.find(
        (district: any) => district.value === watch("district")
      )?.upazilas;
      if (selectedDistrictUpazilas) {
        setUpazilas(selectedDistrictUpazilas);
      }
    }
  }, [watch("district"), watch("state"), statesWithDistricts]);

  useEffect(() => {
    // Clear district and upazila when state changes
    setValue("district", "");
    setValue("upazila", "");
    if (watch("state")) {
      const selectedDistrictUpazilas =
        statesWithDistricts[watch("state")] || [];
      setUpazilas([]);
    }
  }, [watch("state")]);

  useEffect(() => {
    // Clear upazila when district changes
    setValue("upazila", "");
    if (watch("district")) {
      const selectedDistrictUpazilas = statesWithDistricts[
        watch("state")
      ]?.find(
        (district: any) => district.value === watch("district")
      )?.upazilas;
      if (selectedDistrictUpazilas) {
        setUpazilas(selectedDistrictUpazilas);
      }
    }
  }, [watch("district"), watch("state"), statesWithDistricts]);
  const cartItems = useAppSelector((state: RootState) => state.cart);
  const selectedState = watch("state");
  const selectedDistrict = watch("district");
  const selectedUpazila = watch("upazila");

  const onSubmit: SubmitHandler<CheckoutInputs> = (data) => {
    const orderData = {
      cartItems: cartItems?.items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      customerInformation: {
        name: data.fullName,
        phone: data.phone,
        address: {
          state: data.state,
          district: data.district,
          upazila: data.upazila,
          courierOffice: data.address,
          details: data.addressDetails,
        },
      },
      courierServiceFee: selectedUpazila === "Hajiganj" ? 60 : 120,
      totalAmount: cartItems.totalAmount,
    };

    try {
      newOrder.mutate(orderData, {
        onSuccess: () => {
          setOpenSuccessModal(true);
          dispatch(clearCart()); // Clear the cart after successful order placement
          // toast.success("Order placed successfully!");
          reset(); // Reset the form or state if applicable
          router.push(`/products`); // Navigate to products or any relevant page
        },
        onError: (error: any) => {
          console.error("Error placing order:", error); // Log the error for debugging
          toast.error("Failed to place the order. Please try again.");
        },
      });
    } catch (error: any) {
      console.error("Unexpected error while placing the order:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const closSuccessModal = () => {
    setOpenSuccessModal(false);
    router.push("/products");
  };

  const districts =
    selectedState && selectedState in statesWithDistricts
      ? statesWithDistricts[selectedState]
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
            label="Full Name (পূর্ণ নাম)"
            name="fullName"
            type="text"
            placeholder="Enter your full name (আপনার পূর্ণ নাম লিখুন)"
            register={register}
            error={errors.fullName}
            required
          />

          <Input
            label="Phone Number (ফোন নম্বর)"
            name="phone"
            type="text"
            placeholder="Enter your phone number (আপনার ফোন নম্বর লিখুন)"
            register={register}
            error={errors.phone}
            required
          />

          <CustomSelect
            label="Division (বিভাগ)"
            name="state"
            control={control}
            options={Object.keys(statesWithDistricts).map((state) => ({
              label: state,
              value: state,
            }))}
            rules={{ required: "Division is required (বিভাগ প্রয়োজন)" }}
            placeholder="Select your division (আপনার বিভাগ নির্বাচন করুন)"
            error={errors.state}
            required={true}
          />

          <CustomSelect
            label="District (জেলা)"
            name="district"
            control={control}
            options={districts}
            rules={{ required: "District is required (জেলা প্রয়োজন)" }}
            placeholder="Select your district (আপনার জেলা নির্বাচন করুন)"
            error={errors.district}
            required={true}
          />

          <CustomSelect
            label="Upazila (উপজেলা)"
            name="upazila"
            control={control}
            options={upazilas}
            rules={{ required: "Upazila is required (উপজেলা প্রয়োজন)" }}
            placeholder="Select your upazila (আপনার উপজেলা নির্বাচন করুন)"
            error={errors.upazila}
            required={true}
          />

          <Input
            label="Courier Office Address (কুরিয়ার অফিসের ঠিকানা)"
            name="address"
            type="text"
            placeholder="Enter the courier office address (কুরিয়ার অফিসের ঠিকানা লিখুন)"
            register={register}
            error={errors.address}
            required
          />

          <Input
            label="Address Details (ঠিকানার বিবরণ)"
            name="addressDetails"
            type="text"
            placeholder="House No , Road No (বাড়ি নম্বর, রোড নম্বর)"
            register={register}
            error={errors.addressDetails}
            required
          />
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Payment Information
        </h2>
        <div className="bg-white rounded-md border border-primary w-full h-auto p-4 space-y-3">
          <h1 className="text-center text-xl font-semibold text-primary">
            Cash On Delivery Only
          </h1>
          <p className="text-center">
            Currently, we are accepting <strong>Cash on Delivery</strong> only.
            The payment will be completed once the product is delivered to your
            address.
          </p>
        </div>

        <div className="mt-6 border-t border-t-accent pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            {cartItems?.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b border-b-accent pb-2 text-sm"
              >
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-gray-500">x {item.quantity}</p>
                <p className="font-medium text-gray-800">
                  ({item.discountedPrice} * {item.quantity}) ={" "}
                  {(item.discountedPrice * item.quantity).toFixed(2)} TK
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center  text-sm font-medium">
              <p>Subtotal</p>
              <p>{cartItems?.totalAmount.toFixed(2)} TK</p>
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
              <p>Delivery Fee</p>
              <p>{selectedUpazila === "Hajiganj" ? "60 TK." : "120 TK."}</p>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
              <p>Total</p>
              <p>
                {(
                  cartItems?.totalAmount +
                  (selectedUpazila === "Hajiganj" ? 60 : 120)
                ).toFixed(2)}{" "}
                TK
              </p>
            </div>
          </div>
          <FormSubmitButton
            status={newOrder.status}
            buttonName="Place Order"
            context="Ordering..."
          />
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
