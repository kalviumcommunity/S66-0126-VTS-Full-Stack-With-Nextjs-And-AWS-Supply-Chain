"use client";

import { useState } from "react";
import { User } from "@/types/user";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWR<User[]>("/api/users", fetcher);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Optimistic UI: Create temporary user object
    const tempUser: User = {
      id: Math.random(),
      name,
      email,
    };

    try {
      // Update UI optimistically
      await mutate(
        async (users) => [...(users || []), tempUser],
        false
      );

      console.log("[AddUser] Optimistic update applied");

      // Send request to server
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const newUser = await response.json();
      console.log("[AddUser] User added successfully:", newUser);

      // Revalidate cache to sync with server
      await mutate("/api/users");

      // Clear form
      setName("");
      setEmail("");
    } catch (error) {
      console.error("[AddUser] Error:", error);
      alert("Failed to add user. Please try again.");

      // Revalidate to rollback optimistic update
      await mutate("/api/users");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">Add New User</h2>
      <form onSubmit={handleAddUser} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isLoading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
}
