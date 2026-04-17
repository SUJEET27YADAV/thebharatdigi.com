// components/ThemeToggle.tsx
"use client";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="w-14 h-7 rounded-full p-1 bg-indigo-200 dark:bg-slate-700 light:bg-indigo-100 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        layout
        className="w-5 h-5 rounded-full flex items-center justify-center bg-white dark:bg-slate-900"
        animate={{ x: theme === "dark" ? 0 : 28 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === "dark" ? (
          <Moon className="w-3 h-3 text-indigo-400" />
        ) : (
          <Sun className="w-3 h-3 text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
