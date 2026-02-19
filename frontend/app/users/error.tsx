"use client";

import { useEffect } from "react";

/**
 * Error Boundary for /app/users route
 *
 * This error boundary catches errors thrown from the route segment and its children.
 * Provides user-friendly error UI with retry functionality.
 *
 * Features:
 * - Displays error message with context
 * - Retry button using reset() to re-render segment
 * - Accessible error messaging
 * - Responsive design with dark mode support
 * - Error logging for debugging
 *
 * Usage: Automatically invoked by Next.js when errors occur in the route
 */

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function UsersError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error for debugging/monitoring
    console.error("[Users Route Error]", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  const isNetworkError =
    error.message.includes("fetch") || error.message.includes("network");
  const isValidationError = error.message.includes("validation");
  const isTimeoutError = error.message.includes("timeout");

  const getErrorIcon = () => {
    if (isNetworkError) return "🌐";
    if (isValidationError) return "✗";
    if (isTimeoutError) return "⏱️";
    return "⚠️";
  };

  const getErrorTitle = () => {
    if (isNetworkError) return "Network Error";
    if (isValidationError) return "Validation Error";
    if (isTimeoutError) return "Request Timeout";
    return "Something went wrong";
  };

  const getErrorDescription = () => {
    if (isNetworkError)
      return "Unable to connect to the server. Please check your internet connection.";
    if (isValidationError)
      return "The data format is invalid. Please try again or contact support.";
    if (isTimeoutError)
      return "The request took too long. Please try again.";
    return "An unexpected error occurred. Our team has been notified.";
  };

  return (
    <main className="
      min-h-screen
      max-w-7xl mx-auto
      px-4 sm:px-6 lg:px-8
      py-8 sm:py-12 md:py-16 lg:py-20
      flex items-center justify-center
    ">
      <article className="
        w-full max-w-md
        bg-white dark:bg-gray-950
        border-2 border-red-200 dark:border-red-900
        rounded-lg md:rounded-xl
        p-6 sm:p-8
        shadow-lg
      " role="alert">
        {/* Error Icon */}
        <div className="
          text-4xl sm:text-5xl
          mb-4
          text-center
        ">
          {getErrorIcon()}
        </div>

        {/* Error Title */}
        <h1 className="
          text-2xl sm:text-3xl
          font-bold
          text-red-600 dark:text-red-400
          text-center
          mb-3 sm:mb-4
        ">
          {getErrorTitle()}
        </h1>

        {/* Error Description */}
        <p className="
          text-sm sm:text-base
          text-gray-700 dark:text-gray-300
          text-center
          mb-6 sm:mb-8
          leading-relaxed
        ">
          {getErrorDescription()}
        </p>

        {/* Error Details (for debugging) */}
        {process.env.NODE_ENV === "development" && (
          <details className="
            mb-6 sm:mb-8
            p-4
            bg-gray-50 dark:bg-gray-900
            rounded-lg
            border border-gray-200 dark:border-gray-800
            text-xs sm:text-sm
            text-gray-600 dark:text-gray-400
          ">
            <summary className="
              cursor-pointer
              font-semibold
              mb-2
              text-gray-900 dark:text-gray-100
              hover:text-gray-700 dark:hover:text-gray-300
            ">
              Error Details (Development)
            </summary>
            <pre className="
              overflow-x-auto
              whitespace-pre-wrap
              break-words
              font-mono
            ">
              {error.message}
              {error.digest && `\n\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        {/* Action Buttons */}
        <div className="
          flex flex-col sm:flex-row
          gap-3 sm:gap-4
        ">
          {/* Retry Button */}
          <button
            onClick={reset}
            className="
              flex-1
              px-4 sm:px-6 py-2.5 sm:py-3
              bg-red-600 dark:bg-red-700
              hover:bg-red-700 dark:hover:bg-red-600
              text-white font-semibold
              rounded-lg
              transition-colors duration-200
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950
              focus:ring-red-600 dark:focus:ring-red-500
            "
          >
            Try Again
          </button>

          {/* Go Home Button */}
          <a
            href="/"
            className="
              flex-1
              px-4 sm:px-6 py-2.5 sm:py-3
              bg-gray-200 dark:bg-gray-800
              hover:bg-gray-300 dark:hover:bg-gray-700
              text-gray-900 dark:text-white
              font-semibold text-center
              rounded-lg
              transition-colors duration-200
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950
              focus:ring-gray-400 dark:focus:ring-gray-500
            "
          >
            Go Home
          </a>
        </div>

        {/* Support Message */}
        <p className="
          mt-6 sm:mt-8
          pt-6 sm:pt-8
          border-t border-gray-200 dark:border-gray-800
          text-center text-xs sm:text-sm
          text-gray-600 dark:text-gray-400
        ">
          If the problem persists, please
          {" "}
          <a
            href="/contact"
            className="
              text-red-600 dark:text-red-400
              font-semibold
              hover:underline
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950
              focus:ring-red-600 dark:focus:ring-red-500
              rounded
            "
          >
            contact support
          </a>
        </p>
      </article>
    </main>
  );
}
