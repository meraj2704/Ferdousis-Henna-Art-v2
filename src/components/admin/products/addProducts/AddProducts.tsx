"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/share/Input";
import ImageInput from "@/components/share/ImageInput";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import { useAddData } from "@/hooks/useApi";
import { Checkbox } from "@/components/ui/checkbox";
import MiniLoader from "@/components/share/MiniLoader";
import { AddProductI } from "@/types/Types";
import { schema } from "./Schema";
const AddProductForm: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddProductI>({
    resolver: yupResolver(schema) as any,
  });
  // states
  const [loading, setLoading] = useState<boolean>(false);
  // add product api mutations
  const addProduct = useAddData(["products"], "product/add-product");
// 
  const price = watch("price");
  const discountPercentage = watch("discountPercentage");
  if (discountPercentage) {
    const discountedPrice = price - (price * discountPercentage) / 100;
    setValue("discountedPrice", discountedPrice);
  } else {
    const discountedPrice = price;
    setValue("discountedPrice", discountedPrice);
  }

  const onSubmit: SubmitHandler<AddProductI> = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append(
      "discountPercentage",
      data.discountPercentage?.toString() || "0"
    );
    formData.append("discountedPrice", data.discountedPrice?.toString() || "0");
    formData.append("quantity", data.quantity?.toString() || "0");
    formData.append("description", data.description);
    formData.append("active", data.active ? "true" : "false");
    if (data.image) {
      formData.append("file", data.image[0]);
    }
    try {
      addProduct.mutate(formData, {
        onSuccess: () => {
          alert("Product added successfully");
          reset();
          setLoading(false);
        },
        onError: (error: any) => {
          console.error("Error adding product:", error);
          // Handle error here
          setLoading(false);
        },
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setLoading(false);
      // Handle error hereset
    } finally {
      setLoading(false);
    }
  };

  const onError = (e: any) => {
    console.error("Form validation error:", e);
  };
  const breadCrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "All Products", href: "/admin/products/all-products" },
    { label: "Add New product" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="container mx-auto px-3 mt-5 space-y-4"
    >
      <div>
        <DynamicBreadcrumb items={breadCrumbItems} />
      </div>
      <h2 className="text-xl font-semibold text-primary">Add New Product</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Input
          label="Product Name"
          name="name"
          type="text"
          placeholder="Enter product name"
          register={register}
          error={errors.name}
          required
        />

        {/* Price */}
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Enter product price"
          register={register}
          error={errors.price}
          required
        />
        <Input
          label="Discount (%)"
          name="discountPercentage"
          type="number"
          placeholder="Enter discount percentage"
          register={register}
          error={errors.discountPercentage}
          // required
        />
        <Input
          label="Discounted price"
          name="discountedPrice"
          type="number"
          placeholder="Enter discount percentage"
          register={register}
          error={errors.discountPercentage}
          // required
        />
        <Input
          label="Stock Quantity"
          name="quantity"
          type="number"
          placeholder="Enter product quantity"
          register={register}
          error={errors.quantity}
          required
        />

        {/* Description */}
        <Input
          label="Description"
          name="description"
          type="text"
          placeholder="Enter product description"
          register={register}
          error={errors.description}
          required
        />

        {/* Image Upload */}
        <ImageInput
          label="Image"
          name="image"
          register={register}
          error={errors.image}
          required
        />
        <div className="flex items-center space-x-2">
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mr-2"
              />
            )}
          />
          <label
            htmlFor="active"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Active
          </label>
        </div>
        {errors.active && (
          <p className="text-red-500 text-sm">{errors.active.message}</p>
        )}
      </div>
      {/* Product Name */}

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring flex items-center justify-center"
        disabled={loading} // Optional: Disables button while loading
      >
        {loading ? (
          <>
            <MiniLoader />
            <span className="ml-2">Adding...</span>{" "}
            {/* Optional text while loading */}
          </>
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
};

export default AddProductForm;
