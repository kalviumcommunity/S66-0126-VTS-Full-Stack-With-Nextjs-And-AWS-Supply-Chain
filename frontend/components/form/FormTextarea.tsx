/**
 * FormTextarea Component
 * 
 * Reusable, accessible textarea with error handling.
 * Similar to FormInput but for textarea elements.
 */

import { TextareaHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export default function FormTextarea({
  label,
  error,
  register,
  rows = 4,
  ...textareaProps
}: FormTextareaProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={textareaProps.id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <textarea
        {...register}
        {...textareaProps}
        id={textareaProps.id}
        rows={rows}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${textareaProps.id}-error` : undefined}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-vertical ${
          error
            ? "border-red-500 bg-red-50"
            : "border-gray-300 bg-white"
        }`}
      />
      {error && (
        <p
          id={`${textareaProps.id}-error`}
          className="mt-1 text-sm text-red-600"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
