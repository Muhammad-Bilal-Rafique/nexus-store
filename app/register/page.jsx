"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, Users, Eye, EyeOff, Loader2 } from "lucide-react";
import LogoBox from "@/app/components/UI/LogoBox.jsx";
import axios from "axios";
import { toast , Toaster } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize react-hook-form with form state management
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/register", {
        name: data.fullname,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      const result = response.data;

      if (result.success) {
        toast.success(result.message || "Account created successfully!");
        // TODO: Redirect to login or dashboard
        router.push('/');
      }
    } catch (error) {
      // Handle axios error responses
      if (error.response) {
        const result = error.response.data;


        // Handle general error message
         if (result.error) {
          toast.error(result.error);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }
      // Handle network errors
      else if (error.request) {
        toast.error("Network error. Please check your connection.");
      }
      // Handle other errors
      else {
        toast.error("An unexpected error occurred.");
      }

      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-4 py-8">
      <Toaster position="top-right" richColors />
      <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-4 py-8">
        {/* ... rest of your JSX ... */}
      </div>
      {/* Main registration card container */}
      <div className="w-full max-w-md bg-bg-primary rounded-lg shadow-lg p-8">
        {/* Logo and heading section */}
        <LogoBox heading="Register" detail="Create your account" />

        {/* Registration form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* Full Name input field */}
          <div className="space-y-2">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-text-primary"
            >
              Full Name
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="fullname"
                disabled={loading}
                {...register("fullname", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Full name must be at least 2 characters",
                  },
                })}
                placeholder="Enter your full name"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-action transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.fullname ? "border-state-error" : "border-gray-300"
                }`}
              />
            </div>
            {/* Error message for full name */}
            {errors.fullname && (
              <span className="text-sm text-state-error flex items-center gap-1">
                {errors.fullname.message}
              </span>
            )}
          </div>

          {/* Username input field */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-text-primary"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="username"
                disabled={loading}
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^\S+$/,
                    message: "Username cannot contain spaces",
                  },
                })}
                placeholder="Enter your username"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-action transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.username ? "border-state-error" : "border-gray-300"
                }`}
              />
            </div>
            {/* Error message for username */}
            {errors.username && (
              <span className="text-sm text-state-error flex items-center gap-1">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Email input field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-primary"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                disabled={loading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-action transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.email ? "border-state-error" : "border-gray-300"
                }`}
              />
            </div>
            {/* Error message for email */}
            {errors.email && (
              <span className="text-sm text-state-error flex items-center gap-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password input field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-primary"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                disabled={loading}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-action transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.password ? "border-state-error" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none disabled:cursor-not-allowed"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {/* Error message for password */}
            {errors.password && (
              <span className="text-sm text-state-error flex items-center gap-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit button with loading state */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-action text-white py-2.5 rounded-lg font-medium hover:bg-action-hover focus:outline-none focus:ring-2 focus:ring-action focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login link for existing users */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/pages/login" className="text-action font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;