"use client";

import { useEffect } from "react";
import { useUI } from "@/hooks/useUI";

/**
 * DarkModeSync Component
 *
 * Ensures that the HTML element's class is synced with UIContext theme state.
 * This component reads the current theme and applies/removes the "dark" class
 * from document.documentElement whenever the theme changes.
 *
 * Works in conjunction with ThemeToggle component for complete theme management.
 * - ThemeToggle: User interaction + localStorage persistence
 * - DarkModeSync: Context to DOM synchronization
 *
 * Usage: Place at the top of layout providers to ensure theme is always synced
 * <DarkModeSync />
 */
export function DarkModeSync() {
  const { theme } = useUI();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return null;
}
