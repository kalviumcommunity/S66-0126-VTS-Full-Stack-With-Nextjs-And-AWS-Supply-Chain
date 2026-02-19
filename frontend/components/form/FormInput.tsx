/**
 * FormInput Component
 * 
 * Reusable, accessible form input with error handling.
 * 
 * Why reusable components?
 * - Single source of truth for input styling
 * - Consistent error display across forms
 * - Easy to update all inputs at once
 * - Reduced code duplication
 * - Improves scalability and maintainability
 */

import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export default function FormInput({
  label,
  error,
  register,
  type = "text",
  ...inputProps
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={inputProps.id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        {...register}
        {...inputProps}
        type={type}
        id={inputProps.id}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputProps.id}-error` : undefined}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          error
            ? "border-red-500 bg-red-50"
            : "border-gray-300 bg-white"
        }`}
      />
      {error && (
        <p
          id={`${inputProps.id}-error`}
          className="mt-1 text-sm text-red-600"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
