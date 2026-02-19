import { useUIContext } from "@/context/UIContext";

interface UseUIReturn {
  theme: "light" | "dark";
  toggleTheme: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function useUI(): UseUIReturn {
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUIContext();

  return {
    theme,
    toggleTheme,
    sidebarOpen,
    toggleSidebar,
  };
}
