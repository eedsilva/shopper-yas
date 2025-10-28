import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { ADMIN_ACCESS_CODE, USE_MOCK_DATA } from "../config";
import * as adminApi from "../api/admin";

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
}

const STORAGE_KEY = "shopperyas:admin-access";

const AdminAuthContext = createContext<AdminAuthContextValue>({
  isAuthenticated: false,
  login: async () => false,
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
      login: async (code: string) => {
        const normalized = code.trim();
        if (!normalized) {
          return false;
        }

        if (USE_MOCK_DATA) {
          if (normalized === ADMIN_ACCESS_CODE) {
            setIsAuthenticated(true);
            return true;
          }
          return false;
        }

        try {
          const success = await adminApi.login(normalized);
          if (success) {
            setIsAuthenticated(true);
          }
          return success;
        } catch (error) {
          console.error("Failed to authenticate admin", error);
          throw error;
        }
      },
      logout: () => setIsAuthenticated(false)
    };
  }, [isAuthenticated]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthContextValue {
  return useContext(AdminAuthContext);
}
