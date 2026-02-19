"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Mock login: set a token in cookies using document.cookie so no extra package is required
    // Set cookie for 1 day
    const maxAge = 60 * 60 * 24; // seconds
    document.cookie = `token=mock-token-123; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
    // Redirect to home (now acting as dashboard)
    router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input type="email" required className="w-full mt-1 px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input type="password" required className="w-full mt-1 px-3 py-2 border rounded" />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        </form>
      </div>
    </div>
  );
}
