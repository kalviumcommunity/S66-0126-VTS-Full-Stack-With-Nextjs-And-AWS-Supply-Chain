"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="
      bg-white dark:bg-gray-950
      border-b border-gray-200 dark:border-gray-800
      transition-colors duration-300
    ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

        {/* LEFT SIDE - LOGO */}
        <h1 className="
          text-gray-900 dark:text-white
          font-bold text-xl sm:text-2xl
          hover:scale-110 transition-transform duration-300 cursor-pointer
        ">
          TribalArtMarketplace
        </h1>

        {/* RIGHT SIDE - NAV LINKS + THEME TOGGLE */}
        <nav className="flex items-center gap-3 sm:gap-6 text-sm sm:text-base font-bold">
          {/* Navigation Links */}
          <Link
            href="/"
            className="
              text-gray-700 dark:text-gray-300
              hover:text-orange-600 dark:hover:text-orange-400
              hover:scale-110 transition-all duration-300
            "
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="
              hidden sm:inline
              text-gray-700 dark:text-gray-300
              hover:text-orange-600 dark:hover:text-orange-400
              hover:scale-110 transition-all duration-300
            "
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="
              hidden md:inline
              text-gray-700 dark:text-gray-300
              hover:text-orange-600 dark:hover:text-orange-400
              hover:scale-110 transition-all duration-300
            "
          >
            About Us
          </Link>
          <Link
            href="/artists"
            className="
              hidden lg:inline
              text-gray-700 dark:text-gray-300
              hover:text-orange-600 dark:hover:text-orange-400
              hover:scale-110 transition-all duration-300
            "
          >
            Artist Profiles
          </Link>
          <Link
            href="/contact"
            className="
              hidden sm:inline
              text-gray-700 dark:text-gray-300
              hover:text-orange-600 dark:hover:text-orange-400
              hover:scale-110 transition-all duration-300
            "
          >
            Contact
          </Link>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Login Button */}
          <Link
            href="/login"
            className="
              bg-brand hover:bg-brand-dark
              dark:bg-brand-light dark:hover:bg-brand
              text-white dark:text-gray-900
              px-4 py-2 rounded-lg
              transition-colors duration-300
              font-bold text-sm sm:text-base
            "
          >
            Login
          </Link>
        </nav>

      </div>
    </header>
  );
}
