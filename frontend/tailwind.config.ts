import type { Config } from "tailwindcss";

const config: Config = {
  /**
   * Enable dark mode using class strategy.
   * This allows manual control: <html class="dark"> or <html>
   * Controlled via JavaScript/React for user preference persistence
   */
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      /**
       * Custom brand colors for consistent theming
       * Usage:
       * - bg-brand (uses DEFAULT)
       * - bg-brand-light
       * - bg-brand-dark
       */
      colors: {
        brand: {
          light: "#3b82f6", // Light blue
          DEFAULT: "#1e3a8a", // Default brand blue
          dark: "#0c2340", // Dark brand blue
        },
      },

      /**
       * Responsive breakpoints
       * Tailwind default breakpoints work well, but can be customized here
       * Mobile-first approach: start with base styles, override at larger viewports
       */
      screens: {
        sm: "640px", // Small devices
        md: "768px", // Tablets
        lg: "1024px", // Desktops
        xl: "1280px", // Large desktops
        "2xl": "1536px", // Extra large screens
      },

      /**
       * Smooth transitions for theme switching
       */
      transitionDuration: {
        200: "200ms",
        300: "300ms",
      },
    },
  },

  plugins: [],
};

export default config;
