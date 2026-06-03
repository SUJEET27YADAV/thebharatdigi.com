"use client";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="w-14 h-7 rounded-full p-1 bg-indigo-100 dark:bg-slate-800 btn relative"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        layout={!prefersReducedMotion}
        className="size-5 rounded-full flex items-center justify-center bg-white dark:bg-slate-900"
        animate={{ x: theme === "dark" ? 0 : 28 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 500, damping: 32 }
        }
      >
        {theme === "dark" ? (
          <Moon className="size-3 text-indigo-400" aria-hidden />
        ) : (
          <Sun className="size-3 text-amber-500" aria-hidden />
        )}
      </motion.div>
    </button>
  );
}
