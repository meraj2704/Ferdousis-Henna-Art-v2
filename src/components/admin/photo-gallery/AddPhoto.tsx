"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/share/Input";
import ImageInput from "@/components/share/ImageInput";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { useAddData } from "@/hooks/useApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormSubmitButton from "@/components/share/FormSubmitButton";
import { useCookies } from "next-client-cookies";

interface ProductFormValues {
  title: string;
  image: FileList | null;
  active: boolean;
}

const schema = yup.object().shape({
  title: yup.string().required("Name is required"),
  active: yup.boolean().required("Active is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "File is too large", (value: any) => {
      console.log("value of image is", value);
      return value && value[0] && value[0].size <= 5000000;
    })
    .test("fileType", "Unsupported File Format", (value: any) => {
      return (
        value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type)
      );
    }),
});

const AddPhoto: React.FC = () => {
  const cookies = useCookies();
  const token = cookies.get("henna-token");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(schema) as any,
  });
  const router = useRouter();
  const addPhoto = useAddData(["photos"], `photos/create-photo`, token);

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    console.log("Product Data:", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("active", data.active ? "true" : "false");
    if (data.image) {
      formData.append("image", data.image[0]);
    }
    try {
      addPhoto.mutate(formData, {
        onSuccess: () => {
          toast.success("Photo added successfully");
          reset();
          router.push(`/admin/photo-gallery/all-photos`);
        },
        onError: (error: any) => {
          toast.error("Failed to add photo");
        },
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
    }
  };

  const onError = (e: any) => {
    console.error("Form validation error:", e);
  };
  const breadCrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "All Photos", href: "/admin/photo-gallery/all-photos" },
    { label: "Add New Photo" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="container mx-auto px-3 mt-5 space-y-4"
    >
      <div>
        <DynamicBreadcrumb items={breadCrumbItems} />
      </div>
      <h2 className="text-xl font-semibold text-primary">Add New Photo</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Input
          label="Title"
          name="title"
          type="text"
          placeholder="Enter title"
          register={register}
          error={errors.title}
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
      </div>
      {/* Product Name */}

      <FormSubmitButton
        status={addPhoto.status}
        buttonName="Add Photo"
        context="Adding"
      />
    </form>
  );
};

export default AddPhoto;
