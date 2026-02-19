"use client";

/**
 * Contact Page using React Hook Form + Zod
 * 
 * Demonstrates:
 * - Form validation with Zod
 * - Reusable form components
 * - Proper error handling
 * - Success feedback
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/schemas/contact.schema";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Log form data (in production, send to API)
      console.log("[Contact] Form submitted with data:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      reset();
      alert("Thank you for contacting us! We'll get back to you soon.");
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("[Contact] Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          Have a question? We'd love to hear from you.
        </p>

        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              ✓ Message sent successfully!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            id="contact-name"
            label="Your Name"
            type="text"
            placeholder="Jane Smith"
            register={register("name")}
            error={errors.name}
          />

          <FormInput
            id="contact-email"
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            register={register("email")}
            error={errors.email}
          />

          <FormTextarea
            id="contact-message"
            label="Message"
            placeholder="Tell us what you think..."
            rows={5}
            register={register("message")}
            error={errors.message}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          <p>
            <strong>Demo:</strong> Form validation happens in real-time with
            Zod. Try leaving fields empty or entering invalid data.
          </p>
        </div>
      </div>
    </div>
  );
}
