"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@/components/ui/checkbox";
import Input from "@/components/share/Input";
import ImageInput from "@/components/share/ImageInput";
import { DynamicBreadcrumb } from "@/components/share/DynamicBreadCrumb";
import { useParams } from "next/navigation";
import { getAllPosts } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { PostI } from "@/types/Types";
import { useFetchData } from "@/hooks/useApi";

const schema = yup.object().shape({
  type: yup
    .string()
    .oneOf(["poster", "manual"], "Type must be either 'poster' or 'manual'")
    .required("Please select a type"),
  title: yup.string().when("type", ([val]) => {
    if (val === "manual") return yup.string().required("Title is required");
    else return yup.string().notRequired();
  }),
  description: yup.string().when("type", ([val]) => {
    if (val === "manual")
      return yup.string().required("Description is required");
    else return yup.string().notRequired();
  }),
  buttonName: yup.string().required("Button name is required"),
  link: yup.string().required("Link is required"),
  image: yup
    .mixed()
    .nullable()
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

const EditPost: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [isManual, setIsManual] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const {
    isLoading,
    error,
    data: post,
  } = useFetchData(["postDetails"], `hero-post/post-details/${id}`);
  useEffect(() => {
    if (post) {
      const resetData = {
        type: post.type,
        title: post.title,
        description: post.description,
        buttonName: post.buttonName,
        link: post.link,
        image: post.image,
      };
      reset(resetData);
      if (post.type === "manual") {
        setIsManual(true);
      }
    }
  }, [reset, post]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  const breadCrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "All Posts", href: "/admin/post/all-posts" },
    { label: "Edit Post" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto px-3 mt-5 space-y-4"
    >
      <div>
        <DynamicBreadcrumb items={breadCrumbItems} />
      </div>
      <h2 className="text-xl font-semibold text-primary">Edit Post</h2>
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
        defaultImage={post?.image}
        required
      />
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring"
      >
        Update Post
      </button>
    </form>
  );
};

export default EditPost;
