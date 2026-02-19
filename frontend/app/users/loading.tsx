/**
 * Loading Skeleton for /app/users route
 *
 * This file provides automatic loading UI while the page is suspending.
 * Renders a skeleton loader with Tailwind animate-pulse for smooth UX.
 * Supports both light and dark modes.
 *
 * - Shows immediately when navigating to /users
 * - Replaced by page content once loaded
 * - Uses semantic HTML for accessibility
 */

export default function UsersLoading() {
  return (
    <main className="
      max-w-7xl mx-auto
      px-4 sm:px-6 lg:px-8
      py-8 sm:py-12 md:py-16 lg:py-20
      min-h-screen
    ">
      {/* Page Header Skeleton */}
      <div className="mb-8 sm:mb-12">
        <div className="
          h-8 sm:h-9 md:h-10
          w-48 sm:w-56 md:w-64
          bg-gray-200 dark:bg-gray-800
          rounded-lg animate-pulse
        " aria-hidden="true" />
      </div>

      {/* Info Banner Skeleton */}
      <div className="
        mb-6 sm:mb-8
        p-4 sm:p-6
        bg-gray-100 dark:bg-gray-900
        rounded-lg md:rounded-xl
        border border-gray-200 dark:border-gray-800
        animate-pulse
      " aria-hidden="true">
        <div className="
          h-4 w-64 sm:w-80
          bg-gray-300 dark:bg-gray-700
          rounded
        " />
      </div>

      {/* Add User Form Skeleton */}
      <div className="
        mb-8 sm:mb-12
        p-4 sm:p-6 md:p-8
        bg-white dark:bg-gray-950
        rounded-lg md:rounded-xl
        border border-gray-200 dark:border-gray-800
        shadow-sm
      " aria-hidden="true">
        {/* Form header */}
        <div className="
          h-6 sm:h-7
          w-40 sm:w-48
          bg-gray-200 dark:bg-gray-800
          rounded animate-pulse mb-6 sm:mb-8
        " />

        {/* Form fields */}
        <div className="space-y-4 sm:space-y-6">
          {/* Name field */}
          <div className="space-y-2 sm:space-y-3">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="
              h-10 sm:h-11
              bg-gray-100 dark:bg-gray-900
              rounded-lg border border-gray-200 dark:border-gray-800
              animate-pulse
            " />
          </div>

          {/* Email field */}
          <div className="space-y-2 sm:space-y-3">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="
              h-10 sm:h-11
              bg-gray-100 dark:bg-gray-900
              rounded-lg border border-gray-200 dark:border-gray-800
              animate-pulse
            " />
          </div>

          {/* Submit button */}
          <div className="
            h-10 sm:h-11
            w-32 sm:w-40
            bg-brand dark:bg-brand-light
            rounded-lg animate-pulse mt-4 sm:mt-6
          " />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="
        bg-white dark:bg-gray-950
        rounded-lg md:rounded-xl
        shadow-sm
        border border-gray-200 dark:border-gray-800
        overflow-hidden
      " aria-hidden="true">
        {/* Table header */}
        <div className="
          bg-gray-50 dark:bg-gray-900
          border-b border-gray-200 dark:border-gray-800
          p-4 sm:p-6
          grid grid-cols-3 gap-4 sm:gap-6
        ">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Table rows */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="
              border-b border-gray-200 dark:border-gray-800
              p-4 sm:p-6
              grid grid-cols-3 gap-4 sm:gap-6
              last:border-b-0
              hover:bg-gray-50 dark:hover:bg-gray-900
              transition-colors
            "
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Stats Skeleton */}
      <div className="
        mt-6 sm:mt-8
        space-y-3
        text-sm
      " aria-hidden="true">
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      </div>

      {/* Accessibility: Loading indicator */}
      <div className="sr-only" role="status" aria-live="polite" aria-label="Loading users page">
        Loading users page...
      </div>
    </main>
  );
}
