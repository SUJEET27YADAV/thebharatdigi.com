// contexts/ThemeContext.tsx
"use client";
import { createContext, use, useState, useLayoutEffect, useCallback, useMemo, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribePrefersDark(callback: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getPrefersDarkSnapshot() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const prefersDark = useSyncExternalStore(
    subscribePrefersDark,
    getPrefersDarkSnapshot,
    () => false,
  );
  const [theme, setTheme] = useState<Theme>("light");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useLayoutEffect(() => {
    if (!mounted) return;
    const saved = localStorage.getItem("theme") as Theme | null;
    const initial: Theme =
      saved === "dark" || saved === "light"
        ? saved
        : prefersDark
          ? "dark"
          : "light";
    setTheme(initial);
  }, [mounted, prefersDark]);

  useLayoutEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.add(theme);
    root.classList.remove(theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", theme);
  }, [mounted, theme]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    root.classList.add(next);
    root.classList.remove(theme);
    localStorage.setItem("theme", next);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
