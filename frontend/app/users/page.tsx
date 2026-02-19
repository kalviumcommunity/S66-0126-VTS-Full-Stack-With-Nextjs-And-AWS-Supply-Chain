"use client";

import useSWR, { useSWRConfig } from "swr";
import { User } from "@/types/user";
import { fetcher } from "@/lib/fetcher";
import AddUser from "./AddUser";
import { useEffect } from "react";

export default function UsersPage() {
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

  // Log cache keys for debugging
  useEffect(() => {
    const cacheKeys = Array.from(cache.keys());
    console.log("[UsersPage] Cache keys:", cacheKeys);
  }, [cache, data]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-red-600">Error Loading Users</h2>
          <p className="text-red-600 mt-2">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Users</h1>

      {/* Data Source Info */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          ✓ Data served from cache or network
        </p>
      </div>

      {/* Add User Form */}
      <div className="mb-8">
        <AddUser />
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 text-sm text-gray-600">
        <p>Total Users: <span className="font-semibold">{data?.length || 0}</span></p>
      </div>
    </div>
  );
}
