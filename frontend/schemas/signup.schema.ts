import { z } from "zod";

/**
 * Signup Schema using Zod
 * 
 * Why Zod?
 * - Runtime validation with TypeScript support
 * - Declarative schema definition
 * - Automatic error messages
 * - Easy to refactor with type safety
 */
export const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

/**
 * Derive TypeScript type from schema
 * This ensures type safety and consistency between validation and UI
 */
export type SignupFormData = z.infer<typeof signupSchema>;
