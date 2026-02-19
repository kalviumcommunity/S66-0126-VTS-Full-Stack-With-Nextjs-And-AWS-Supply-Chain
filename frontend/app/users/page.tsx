"use client";

import useSWR, { useSWRConfig } from "swr";
import { User } from "@/types/user";
import { fetcher } from "@/lib/fetcher";
import AddUser from "./AddUser";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Users Page - Client Component with Error Handling
 *
 * Features:
 * - Data fetching with SWR (client-side)
 * - Error simulation via ?simulate=error query parameter
 * - Artificial delay to demonstrate loading state
 * - Integrates with route-level error.tsx boundary
 *
 * Query Parameters:
 * - ?simulate=error - Throws error that's caught by error.tsx
 * - ?delay=3000 - Adds artificial delay (in ms)
 *
 * Try it:
 * - /users?simulate=error - Shows error boundary
 * - /users - Normal operation
 */

export default function UsersPage() {
  const searchParams = useSearchParams();
  const shouldSimulateError = searchParams.get("simulate") === "error";
  const customDelay = parseInt(searchParams.get("delay") || "0");
  const { data, error, isLoading } = useSWR<User[]>(
    "/api/users",
    fetcher,
    {
      refreshInterval: 10000, // Revalidate every 10 seconds
      revalidateOnFocus: true, // Revalidate when window regains focus
      onErrorRetry(error, key, config, retryer, { retryCount }) {
        // Retry max 3 times
        if (retryCount >= 3) return;
        setTimeout(() => retryer({ retryCount }), 5000);
      },
    }
  );

  const { cache } = useSWRConfig();

  // Throw error if simulation is enabled (caught by error.tsx)
  useEffect(() => {
    if (shouldSimulateError) {
      throw new Error(
        "Simulated error: Unable to fetch users from API. This error is caught by the error.tsx boundary and demonstrates production error handling."
      );
    }
  }, [shouldSimulateError]);

  // Add artificial delay for loading state demonstration
  useEffect(() => {
    if (customDelay > 0) {
      console.log(`[UsersPage] Adding artificial delay of ${customDelay}ms`);
    }
  }, [customDelay]);

  return (
    <main className="
      max-w-7xl mx-auto
      px-4 sm:px-6 lg:px-8
      py-8 sm:py-12 md:py-16 lg:py-20
      min-h-screen
    ">
      {/* Page Header */}
      <h1 className="
        text-3xl sm:text-4xl md:text-5xl
        font-bold mb-8 sm:mb-12
        text-gray-900 dark:text-white
      ">
        Users
      </h1>

      {/* Demo Info Banner */}
      <div className="
        mb-6 sm:mb-8
        p-4 sm:p-6
        bg-blue-50 dark:bg-blue-900/30
        border border-blue-200 dark:border-blue-800
        rounded-lg md:rounded-xl
        text-sm text-blue-700 dark:text-blue-300
      ">
        <p className="flex items-start gap-2 sm:gap-3">
          <span className="text-lg sm:text-xl flex-shrink-0">ℹ️</span>
          <span>
            Data served from cache or network. 
            <a 
              href="?simulate=error"
              className="ml-2 underline font-semibold hover:no-underline"
            >
              Test error boundary
            </a>
          </span>
        </p>
      </div>

      {/* Add User Form */}
      <div className="mb-8 sm:mb-12">
        <AddUser />
      </div>

      {/* Users Table */}
      <div className="
        bg-white dark:bg-gray-950
        rounded-lg md:rounded-xl
        shadow-sm
        border border-gray-200 dark:border-gray-800
        overflow-hidden
      ">
        <div className="overflow-x-auto">
          <table className="
            w-full
            [&_thead]:bg-gray-50 [&_thead]:dark:bg-gray-900
            [&_th]:px-4 [&_th]:sm:px-6 [&_th]:py-3 sm:py-4
            [&_th]:text-left [&_th]:text-xs [&_th]:sm:text-sm
            [&_th]:font-semibold
            [&_th]:text-gray-700 [&_th]:dark:text-gray-300
            [&_thead]:border-b [&_thead]:border-gray-200 [&_thead]:dark:border-gray-800
          ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((user) => (
                  <tr
                    key={user.id}
                    className="
                      border-b border-gray-200 dark:border-gray-800
                      last:border-b-0
                      hover:bg-gray-50 dark:hover:bg-gray-900/50
                      transition-colors duration-200
                    "
                  >
                    <td className="
                      px-4 sm:px-6 py-3 sm:py-4
                      text-xs sm:text-sm
                      text-gray-600 dark:text-gray-400
                      font-mono
                    ">
                      {user.id}
                    </td>
                    <td className="
                      px-4 sm:px-6 py-3 sm:py-4
                      text-xs sm:text-sm
                      text-gray-900 dark:text-gray-100
                      font-medium
                    ">
                      {user.name}
                    </td>
                    <td className="
                      px-4 sm:px-6 py-3 sm:py-4
                      text-xs sm:text-sm
                      text-gray-600 dark:text-gray-400
                    ">
                      {user.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="
                      px-4 sm:px-6 py-8 sm:py-12
                      text-center text-sm
                      text-gray-500 dark:text-gray-400
                    "
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="
        mt-6 sm:mt-8
        text-sm
        text-gray-600 dark:text-gray-400
      ">
        <p>
          Total Users:{" "}
          <span className="
            font-semibold
            text-gray-900 dark:text-white
          ">
            {data?.length || 0}
          </span>
        </p>
      </div>
    </main>
  );
}
