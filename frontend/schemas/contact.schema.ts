import { z } from "zod";

/**
 * Contact Schema using Zod
 * 
 * Why Zod?
 * - Declarative validation rules
 * - Type inference with z.infer
 * - Automatic error messages
 * - Single source of truth for validation
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

/**
 * Derive TypeScript type from schema
 * Ensures UI and validation layer are always in sync
 */
export type ContactFormData = z.infer<typeof contactSchema>;
