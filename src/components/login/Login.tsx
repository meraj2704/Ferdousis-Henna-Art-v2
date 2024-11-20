"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../share/Input";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Login Data:", data);
    // Handle login logic here
  };

  return (
    <div className="container mx-auto flex items-center justify-center bg-background">
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
