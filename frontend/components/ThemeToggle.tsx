"use client";

import { useEffect, useState } from "react";
import { useUI } from "@/hooks/useUI";

/**
 * ThemeToggle Component
 *
 * Provides light/dark mode toggle with:
 * - localStorage persistence for theme preference
 * - document.documentElement class manipulation
 * - Sync with UIContext for global theme state
 * - Hydration-safe implementation
 * - WCAG-compliant focus and contrast
 *
 * Usage:
 * <ThemeToggle />
 *
 * The component reads initial theme from:
 * 1. localStorage key "tribal-theme" (persisted user choice)
 * 2. system preference (prefers-color-scheme media query)
 * 3. defaults to "light"
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useUI();
  const [mounted, setMounted] = useState(false);

  /**
   * Initialize theme preference on first mount
   * Reads localStorage and syncs with DOM
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("tribal-theme") as
      | "light"
      | "dark"
      | null;
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const initialTheme = savedTheme || systemPreference || "light";

    // Sync DOM with theme preference
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setMounted(true);
  }, []);

  /**
   * Update DOM and localStorage when theme changes
   */
  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    // Update DOM class for Tailwind dark mode
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Persist to localStorage
    localStorage.setItem("tribal-theme", newTheme);

    // Update context state
    toggleTheme();
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="
        relative inline-flex items-center justify-center
        h-10 w-10 rounded-lg
        bg-gray-100 dark:bg-gray-900
        border border-gray-300 dark:border-gray-700
        text-gray-700 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-800
        focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-brand dark:focus:ring-offset-gray-900
        transition-colors duration-300
      "
      title={`Current theme: ${theme}`}
    >
      {isDark ? (
        // Moon icon (dark mode active)
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        // Sun icon (light mode active)
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.121 2.121a1 1 0 01-1.414-1.414l2.121-2.121a1 1 0 011.414 1.414zM2.05 6.464l2.121-2.121a1 1 0 011.414 1.414L3.464 7.878a1 1 0 01-1.414-1.414zM17.657 16.97l-2.121-2.121a1 1 0 011.414-1.414l2.121 2.121a1 1 0 01-1.414 1.414zM5.707 5.414L3.586 3.293a1 1 0 00-1.414 1.414l2.121 2.121a1 1 0 001.414-1.414zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm0-4a1 1 0 100-2 1 1 0 000 2zm4-11a1 1 0 100-2 1 1 0 000 2zm-8 4a1 1 0 110-2 1 1 0 010 2z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}
