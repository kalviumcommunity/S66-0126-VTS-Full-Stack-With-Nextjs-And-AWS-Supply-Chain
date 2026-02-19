import { useAuthContext } from "@/context/AuthContext";

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const { user, login, logout } = useAuthContext();

  return {
    isAuthenticated: user !== null,
    user,
    login,
    logout,
  };
}
