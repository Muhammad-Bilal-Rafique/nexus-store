"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import LogoBox from "@/app/components/UI/LogoBox.jsx";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleButton from "react-google-button";
import { Suspense } from "react";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // The page the user originally wanted to visit (default to Home)
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // --- 1. CREDENTIALS LOGIN HANDLER ---
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false, // We handle the redirect manually
        username: data.username,
        password: data.password,
      });

      if (result?.error) {
        toast.error("Invalid Username or Password");
      } else {
        toast.success("Login successful!");
        
        // 🔥 Send them to the Traffic Controller
        // It will check if they are Admin -> /admin, else -> callbackUrl
        router.push(`/auth-check?next=${encodeURIComponent(callbackUrl)}`);
        router.refresh(); 
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. GOOGLE LOGIN HANDLER ---
  const handleGoogleLogin = () => {
    // 🔥 Send Google users to the Traffic Controller too
    signIn("google", { 
      callbackUrl: `/auth-check?next=${encodeURIComponent(callbackUrl)}` 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-4 py-8">
      <Toaster position="top" richColors />
      
      {/* Main login card */}
      <div className="w-full max-w-md bg-bg-primary rounded-lg shadow-lg p-8">
        <LogoBox heading="Login" detail="Welcome back" />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-text-primary">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="username"
                type="text"
                disabled={loading}
                {...register("username", { required: "Username is required" })}
                placeholder="Enter your username"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-action transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                  errors.username ? "border-state-error" : "border-gray-300"
                }`}
              />
            </div>
            {errors.username && (
              <span className="text-sm text-state-error flex items-center gap-1">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-text-primary">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                disabled={loading}
                {...register("password", { required: "Password is required" })}
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
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-sm text-state-error flex items-center gap-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Google Button */}
          <div className="flex justify-center">
            <GoogleButton
              onClick={handleGoogleLogin} 
              label="Sign in with Google"
              disabled={loading}
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a
              href="/forgot-password?method=email"
              className="text-sm text-action font-medium hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-action text-white py-2.5 rounded-lg font-medium hover:bg-action-hover focus:outline-none focus:ring-2 focus:ring-action focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-action font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-4 py-8">
      <Toaster position="top" richColors />
      <Suspense fallback={<div className="text-center"><Loader2 className="animate-spin w-10 h-10 mx-auto" /></div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}