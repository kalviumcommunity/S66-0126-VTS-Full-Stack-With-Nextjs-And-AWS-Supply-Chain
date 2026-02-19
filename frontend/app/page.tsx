"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUI } from "@/hooks/useUI";

export default function Home() {
  const { isAuthenticated, user, login, logout } = useAuth();
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUI();

  const handleLogin = () => {
    login("John Doe");
  };

  const bgColor = theme === "light" ? "bg-white" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-900" : "text-white";

  return (
    <div className={`${bgColor} ${textColor} min-h-screen transition-colors duration-300`}>
      {/* CONTROL PANEL */}
      <section className="max-w-7xl mx-auto px-12 py-8 border-b border-gray-300">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">State Management Demo</h3>
            <p className="text-sm">
              {isAuthenticated ? `Logged in as: ${user}` : "Not authenticated"}
            </p>
            <p className="text-sm">
              Theme: <span className="font-semibold">{theme}</span> | Sidebar: <span className="font-semibold">{sidebarOpen ? "Open" : "Closed"}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Login
              </button>
            )}

            <button
              onClick={toggleTheme}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Toggle Theme ({theme})
            </button>

            <button
              onClick={toggleSidebar}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Toggle Sidebar
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="flex">
        {/* SIDEBAR */}
        {sidebarOpen && (
          <aside className={`${theme === "light" ? "bg-gray-100" : "bg-gray-800"} w-64 px-6 py-8 border-r border-gray-300`}>
            <h4 className="font-bold mb-4">Sidebar Menu</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
              <li className="hover:text-blue-600 cursor-pointer">Articles</li>
              <li className="hover:text-blue-600 cursor-pointer">Settings</li>
              <li className="hover:text-blue-600 cursor-pointer">Logout</li>
            </ul>
          </aside>
        )}

        {/* MAIN SECTION */}
        <section className="flex-1 px-12 py-16">
          <h2 className="text-2xl font-bold mb-10">
            React Context API Demo
          </h2>

          {/* FEATURED ARTWORKS */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6">Featured Artworks</h3>
            <div className="grid md:grid-cols-3 gap-10">
              {/* CARD 1 */}
              <div className={`${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-xl shadow-md p-6 flex flex-col border ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                <div className={`h-64 ${theme === "light" ? "bg-gray-100" : "bg-gray-700"} rounded-lg mb-6 flex items-center justify-center`}>
                  <img
                    src="/images/mask.png"
                    alt="Tribal mask artwork"
                    className="max-h-full object-contain"
                  />
                </div>
                <h4 className="font-bold text-lg mb-2">Tribal Mask</h4>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  This mask represents the vibrant cultural expressions of tribal communities.
                </p>
              </div>

              {/* CARD 2 */}
              <div className={`${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-xl shadow-md p-6 flex flex-col border ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                <div className={`h-64 ${theme === "light" ? "bg-gray-100" : "bg-gray-700"} rounded-lg mb-6 flex items-center justify-center`}>
                  <img
                    src="/images/sculpture.png"
                    alt="Wooden sculpture artwork"
                    className="max-h-full object-contain"
                  />
                </div>
                <h4 className="font-bold text-lg mb-2">Wooden Sculpture</h4>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  A wooden sculpture capturing the essence of tribal artistry.
                </p>
              </div>

              {/* CARD 3 */}
              <div className={`${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-xl shadow-md p-6 flex flex-col border ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
                <div className={`h-64 ${theme === "light" ? "bg-gray-100" : "bg-gray-700"} rounded-lg mb-6 flex items-center justify-center`}>
                  <img
                    src="/images/painting.png"
                    alt="Tribal painting artwork"
                    className="max-h-full object-contain"
                  />
                </div>
                <h4 className="font-bold text-lg mb-2">Tribal Painting</h4>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  A painting showcasing rich artistic traditions and motifs.
                </p>
              </div>
            </div>
          </div>

          {/* ABOUT SECTION */}
          <section className={`${theme === "light" ? "bg-gray-50" : "bg-gray-800"} rounded-lg p-8`}>
            <h3 className="text-xl font-bold mb-4">About the Marketplace</h3>
            <p className={`text-sm leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
              The Tribal Art Marketplace is a curated collection of traditional and contemporary
              tribal artworks. Our mission is to preserve and promote the cultural heritage
              of tribal communities through art. Explore our diverse selection of masks,
              sculptures, and paintings, each piece telling a unique story.
            </p>
          </section>
        </section>
      </div>
    </div>
  );
}
