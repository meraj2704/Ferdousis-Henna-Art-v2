"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@/components/ui/checkbox";
import Input from "@/components/share/Input";
import ImageInput from "@/components/share/ImageInput";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import { schema } from "./Schema";
import { useAddData } from "@/hooks/useApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import MiniLoader from "@/components/share/MiniLoader";

const AddPost: React.FC = () => {
  const router = useRouter();
  const [isManual, setIsManual] = useState<boolean>(true);
  const addPost = useAddData(["allPosts"], `hero-post/create-post`);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "manual",
      active: true,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    const formData = new FormData();
    formData.append("type", data.type);
    if (data.type === "manual") {
      formData.append("title", data.title);
      formData.append("description", data.description);
    }
    formData.append("buttonName", data.buttonName);
    formData.append("link", data.link);
    formData.append("active", data.active ? "true" : "false");
    if (data.image) {
      formData.append("image", data.image[0]);
    }
    try {
      addPost.mutate(formData, {
        onSuccess: () => {
          toast.success("Post added successfully");
          reset();
          router.push(`/admin/post/all-posts`);
        },
        onError: (error: any) => {
          toast.error("Failed to add post");
        },
      });
    } catch (error: any) {
      console.error("Error uploading post:", error);
      toast.error("Failed to add post");
    }
  };

  const breadCrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "All Posts", href: "/admin/post/all-posts" },
    { label: "Add New Post" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto px-3 mt-5 space-y-4"
    >
      <div>
        <DynamicBreadcrumb items={breadCrumbItems} />
      </div>
      <h2 className="text-xl font-semibold text-primary">Add New Post</h2>
      <div className="flex items-center gap-4">
        <label className="text-gray-800 font-medium">Type:</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <>
              <Checkbox
                {...field}
                checked={!isManual}
                onCheckedChange={(checked) => {
                  if (checked) {
                    field.onChange("poster");
                    setIsManual(false);
                  } else {
                    field.onChange("manual");
                    setIsManual(true);
                  }
                }}
                id="poster"
                className="mr-2"
              />
              <label htmlFor="poster">Poster</label>

              <Checkbox
                {...field}
                checked={isManual}
                onCheckedChange={(checked) => {
                  if (checked) {
                    field.onChange("manual");
                    setIsManual(true);
                  } else {
                    field.onChange("poster");
                    setIsManual(false);
                  }
                }}
                id="manual"
                className="ml-4"
              />
              <label htmlFor="manual">Manual</label>
            </>
          )}
        />
      </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {isManual && (
          <>
            <Input
              label="Title"
              name="title"
              type="text"
              placeholder="Enter title"
              register={register}
              error={errors.title}
              required
            />
            <Input
              label="Description"
              name="description"
              type="text"
              placeholder="Enter description"
              register={register}
              error={errors.description}
              required
            />
          </>
        )}
        <Input
          label="Button Name"
          name="buttonName"
          type="text"
          placeholder="Enter button name"
          register={register}
          error={errors.buttonName}
          required
        />
        <Input
          label="Link"
          name="link"
          type="url"
          placeholder="Enter link"
          register={register}
          error={errors.link}
          required
        />
      </div>

      <ImageInput
        label="Image"
        name="image"
        register={register}
        error={errors.image}
        required
      />
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none flex justify-center items-center"
      >
        {addPost.status === "pending" ? (
          <>
            <MiniLoader />
            <span className="ml-2">Adding...</span>
          </>
        ) : (
          <>Add</>
        )}
      </button>
    </form>
  );
};

export default AddPost;
