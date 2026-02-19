/**
 * Toaster Provider Component
 * 
 * Wraps react-hot-toast Toaster
 * Must be in a client component to work properly
 * 
 * Why use react-hot-toast?
 * - Auto-dismiss with built-in timers
 * - Accessible toast messages
 * - Multiple toast types (success, error, loading)
 * - Non-intrusive positioning
 * - Lightweight and performant
 */

"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#fff",
          color: "#000",
          borderRadius: "0.375rem",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        },
        success: {
          style: {
            background: "#ecfdf5",
            color: "#065f46",
          },
          iconTheme: {
            primary: "#10b981",
            secondary: "#ecfdf5",
          },
        },
        error: {
          style: {
            background: "#fef2f2",
            color: "#7f1d1d",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fef2f2",
          },
        },
        loading: {
          style: {
            background: "#eff6ff",
            color: "#1e40af",
          },
        },
      }}
    />
  );
}
