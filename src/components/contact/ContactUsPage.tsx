"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"; // Assuming your Input component is in this path
import Input from "../share/Input";

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

const ContactUsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data); // Simulate form submission (e.g., API call)
    alert("Message sent successfully!");
  };

  return (
    <div className=" bg-background">
      <div className="max-w-4xl mx-auto p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Contact Us
        </h1>

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
              <button
                type="submit"
                className="bg-[#729762] hover:bg-[#597445] text-white font-semibold py-2 px-6 rounded-lg focus:outline-none"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
