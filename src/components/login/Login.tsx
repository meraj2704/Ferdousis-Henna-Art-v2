"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../share/Input";
import { useAddData } from "@/hooks/useApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const cookies = useCookies();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const userLogin = useAddData(["user"], `auth/login`);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    try {
      userLogin.mutate(loginData, {
        onSuccess: (responseData) => {
          console.log("responseData", responseData);
          cookies.set("henna-token", responseData?.data?.token);
          toast.success("Login successfully");
          reset();
          router.push(`/admin/dashboard`);
        },
        onError: (error: any) => {
          toast.error("Failed to login");
          console.log(error);
        },
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="container mx-auto my-auto h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl text-primary font-bold text-center mb-8">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email}
            required
          />

          {/* Password Input */}
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password}
            required
          />

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition duration-300"
            >
              Login
            </button>
          </div>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center text-sm text-textColor">
          <p>
            Forgot your password?{" "}
            <a href="/reset-password" className="text-accent hover:underline">
              Reset it here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
