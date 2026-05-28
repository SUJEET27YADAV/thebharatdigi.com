"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/auth", {
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();

      if (data.success && data.authenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth fetch failed:", err);
      setError("Failed to authenticate");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoginPage && !user) {
      fetchUser();
    }
  }, [pathname, user, isLoginPage, fetchUser]);

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

  return (
    <AdminAuthContext.Provider
      value={{ user, loading, error, refetch: fetchUser, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminAuthProvider");
  }
  return context;
}
