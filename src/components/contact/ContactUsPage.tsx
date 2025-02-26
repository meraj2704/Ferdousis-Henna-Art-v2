"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"; // Assuming your Input component is in this path
import Input from "../share/Input";
import { useAddData } from "@/hooks/useApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormSubmitButton from "../share/FormSubmitButton";
import SectionTitle from "../customUi/SectionTitle";

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

const ContactUsPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();
  const newMessage = useAddData(["messages"], `messages/create-message`);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data); // Simulate form submission (e.g., API call)
    const formData = new FormData();
    formData.append("fullName", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    try {
      newMessage.mutate(formData, {
        onSuccess: () => {
          toast.success("Message send successfully");
          reset();
          router.push(`/`);
        },
        onError: (error: any) => {
          toast.error("Failed to send message");
        },
      });
    } catch (error: any) {
      console.error("Error uploading message:", error);
    }
  };

  return (
    <div className=" bg-background">
      <div className="max-w-4xl mx-auto p-6 rounded-lg">
      <SectionTitle title="Contacts" width="w-28" />

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Name Field */}
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Your full name"
              register={register}
              error={errors.name}
              required
              />

            {/* Email Field */}
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Your email address"
              register={register}
              error={errors.email}
              required
            />

            {/* Message Field */}
            <div className="flex flex-col gap-2 col-span-1">
              <label className="text-gray-800 font-medium">Message</label>
              <textarea
                {...register("message", { required: true })}
                placeholder="Write your message"
                className={`w-full px-4 py-2 border rounded-md focus:outline-primary ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.message && (
                <p className="text-sm text-red-500">Message is required</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <FormSubmitButton
                status={newMessage.status}
                buttonName="Send Message"
                context="Sending..."
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
