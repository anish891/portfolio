"use client";

import { useState, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  // Always start false (SSR-safe). The real value is synced in useEffect
  // after mount, which avoids a server/client hydration mismatch caused by
  // the inline theme-init script that may have already added the "dark" class.
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
      setIsDark(document.documentElement.classList.contains("dark"));
    });
  }, []);

  // Keep state in sync if something else changes the class externally
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  }, [isDark]);

  // Render a placeholder until mounted to keep SSR/client HTML identical
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all duration-200 cursor-pointer"
      >
        <span className="block size-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all duration-200 cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="block"
          >
            <Sun className="size-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="block"
          >
            <Moon className="size-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
