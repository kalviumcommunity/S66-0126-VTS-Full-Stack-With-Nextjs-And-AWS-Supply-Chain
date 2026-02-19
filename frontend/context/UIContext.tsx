"use client";

import React, { createContext, useState, ReactNode } from "react";

interface UIContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    console.log(`[UIContext] Theme toggled to: ${theme === "light" ? "dark" : "light"}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    console.log(`[UIContext] Sidebar toggled: ${!sidebarOpen}`);
  };

  return (
    <UIContext.Provider value={{ theme, toggleTheme, sidebarOpen, toggleSidebar }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUIContext() {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
}
