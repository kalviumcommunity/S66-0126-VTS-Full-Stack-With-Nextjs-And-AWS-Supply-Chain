"use client";

/**
 * Signup Page using React Hook Form + Zod
 * 
 * Why React Hook Form?
 * - Minimal re-renders (field-level validation)
 * - Small bundle size
 * - Excellent performance for large forms
 * - Built-in resolver for Zod
 * 
 * Why zodResolver?
 * - Integrates Zod validation with React Hook Form
 * - Provides type-safe validation
 * - Reuses same schema for client and server validation
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "@/schemas/signup.schema";
import FormInput from "@/components/form/FormInput";
import { useState } from "react";

export default function SignupPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Log form data (in production, send to API)
      console.log("[Signup] Form submitted with data:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      reset();
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("[Signup] Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Create Account</h1>

        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              ✓ Account created successfully!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            register={register("name")}
            error={errors.name}
          />

          <FormInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            register={register("email")}
            error={errors.email}
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="••••••"
            register={register("password")}
            error={errors.password}
          />

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
