"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/share/Input";
import ImageInput from "@/components/share/ImageInput";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAlProducts } from "@/api/api";

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  category?: string;
  stock?: number;
  createdAt?: string;
  totalSales?: number;
  revenueGenerated?: number;
  active?: boolean;
};

interface ProductFormValues {
  name: string;
  price: number;
  discountPercentage: number | null;
  discountedPrice: number | null;
  stockQuantity: number | null;
  description: string;
  image: FileList | null;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.number().required("Price is required"),
  discountPercentage: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .min(0, "Discount percentage can not be negative")
    .max(100, "Discount percentage can not exceed 100"),
  discountedPrice: yup.number(),
  stockQuantity: yup.number().nullable(),
  description: yup.string().required("Description is required"),
  image: yup.mixed().required("Image is required"),
});

const EditProduct: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {},
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAlProducts,
  });
  const product = data?.find((product: Product) => product.id === Number(id));

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("discountPercentage", product.discountPercentage);
      setValue("discountedPrice", product.discountedPrice);
      setValue("stockQuantity", product.stockQuantity);
      setValue("description", product.description);
      setValue("image", product.imageUrl);
    } else {
      reset();
    }
  }, [product, reset]);

  const price = watch("price");
  const discountPercentage = watch("discountPercentage");
  if (discountPercentage) {
    const discountedPrice = price - (price * discountPercentage) / 100;
    setValue("discountedPrice", discountedPrice);
  } else {
    const discountedPrice = price;
    setValue("discountedPrice", discountedPrice);
  }

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    console.log("Product Data:", data);
    reset();
  };

  const onError = (e: any) => {
    console.error("Form validation error:", e);
  };
  const breadCrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "All Products", href: "/admin/products/all-products" },
    { label: "Edit product" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="container mx-auto px-3 mt-5 space-y-4"
    >
      <div>
        <DynamicBreadcrumb items={breadCrumbItems} />
      </div>
      <h2 className="text-xl font-semibold text-primary">
        Edit Product : {product?.name}
      </h2>
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
          //   required
        />
        <Input
          label="Discounted price"
          name="discountedPrice"
          type="number"
          placeholder="Enter discount percentage"
          register={register}
          error={errors.discountPercentage}
          //   required
        />
        <Input
          label="Stock Quantity"
          name="stockQuantity"
          type="number"
          placeholder="Enter product quantity"
          register={register}
          error={errors.stockQuantity}
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
          defaultImage={product?.imageUrl || null}
          required
        />
      </div>
      {/* Product Name */}

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring"
      >
        Add Product
      </button>
    </form>
  );
};

export default EditProduct;
