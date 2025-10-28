import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  login: (code: string) => boolean;
  logout: () => void;
}

const STORAGE_KEY = "shopperyas:admin-access";
const DEFAULT_CODE = import.meta.env.VITE_ADMIN_ACCESS_CODE ?? "admin";

const AdminAuthContext = createContext<AdminAuthContextValue>({
  isAuthenticated: false,
  login: () => false,
  logout: () => undefined
});

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "true";
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const value = useMemo<AdminAuthContextValue>(() => {
    return {
      isAuthenticated,
      login: (code: string) => {
        const normalized = code.trim();
        if (normalized && normalized === DEFAULT_CODE) {
          setIsAuthenticated(true);
          return true;
        }
        return false;
      },
      logout: () => setIsAuthenticated(false)
    };
  }, [isAuthenticated]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthContextValue {
  return useContext(AdminAuthContext);
}
