"use client";

import {
  createContext,
  use,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminUser } from "@/types/types";

interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined,
);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [didInitialFetch, setDidInitialFetch] = useState(false);
  const loading = !didInitialFetch;
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/auth", {
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        setError(null);
        return;
      }

      const data = await response.json();

      if (data.success && data.authenticated) {
        setUser(data.user);
        setError(null);
      } else {
        setUser(null);
        setError(null);
      }
    } catch (err) {
      console.error("Auth fetch failed:", err);
      setError("Failed to authenticate");
      setUser(null);
    } finally {
      setDidInitialFetch(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoginPage) {
      fetchUser();
    }
    return () => {};
  }, [pathname, isLoginPage, fetchUser]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, [router]);

  const value = useMemo(
    () => ({ user, loading, error, refetch: fetchUser, logout }),
    [user, loading, error, fetchUser, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdmin() {
  const context = use(AdminAuthContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminAuthProvider");
  }
  return context;
}
