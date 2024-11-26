"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@/components/ui/checkbox";
import Input from "@/components/share/Input";
import ImageInput from "@/components/share/ImageInput";

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
  buttonName: yup.string().when("type", ([val]) => {
    if (val === "manual")
      return yup.string().required("Button Name is required");
    else return yup.string().notRequired();
  }),
  link: yup.string().when("type", ([val]) => {
    if (val === "manual") return yup.string().required("Link is required");
    else return yup.string().notRequired();
  }),

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

const AddPost: React.FC = () => {
  const [isManual, setIsManual] = useState<boolean>(false); // State to toggle between Poster and Manual
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "poster",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6  mx-auto"
    >
      {/* Checkbox for selecting Poster or Manual */}
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
                  }
                  else {
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
                  }
                  else {
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
          <Input
            label="Button Name"
            name="buttonName"
            type="text"
            placeholder="Enter button name"
            register={register}
            error={errors.buttonName}
          />
          <Input
            label="Link"
            name="link"
            type="url"
            placeholder="Enter link"
            register={register}
            error={errors.link}
          />
        </>
      )}
      <ImageInput
        label="Image"
        name="image"
        register={register}
        error={errors.image}
        required
      />
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default AddPost;
