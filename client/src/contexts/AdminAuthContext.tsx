import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { ADMIN_ACCESS_CODE, USE_MOCK_DATA } from "../config";
import * as adminApi from "../api/admin";
import { setAuthToken } from "../api/products";

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
}

const STORAGE_KEY = "shopperyas:admin-access";

const AdminAuthContext = createContext<AdminAuthContextValue>({
  isAuthenticated: false,
  token: null,
  login: async () => false,
  logout: () => undefined
});

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps): JSX.Element {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    if (stored === "true" || stored === "false") {
      return null;
    }
    return stored;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (token) {
      window.localStorage.setItem(STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [token]);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const isAuthenticated = Boolean(token);

  const value = useMemo<AdminAuthContextValue>(() => {
    return {
      isAuthenticated,
      token,
      login: async (code: string) => {
        const normalized = code.trim();
        if (!normalized) {
          return false;
        }

        if (USE_MOCK_DATA) {
          if (normalized === ADMIN_ACCESS_CODE) {
            const mockToken = "mock-admin-token";
            setToken(mockToken);
            setAuthToken(mockToken);
            return true;
          }
          return false;
        }

        try {
          const authToken = await adminApi.login(normalized);
          if (authToken) {
            setToken(authToken);
            setAuthToken(authToken);
            return true;
          }
          return false;
        } catch (error) {
          console.error("Failed to authenticate admin", error);
          throw error;
        }
      },
      logout: () => {
        setToken(null);
        setAuthToken(null);
      }
    };
  }, [isAuthenticated, token]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthContextValue {
  return useContext(AdminAuthContext);
}
