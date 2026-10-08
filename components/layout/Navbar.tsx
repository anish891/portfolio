"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/data";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CommandPalette } from "@/components/ui/CommandPalette";

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Scrolled state drives the stronger shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section: whichever section crosses the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ⌘K / Ctrl+K toggles the palette; Escape closes the mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (href: string) => {
    setIsMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4">
        <motion.nav
          aria-label="Primary"
          className={cn(
            "pointer-events-auto relative w-full max-w-md md:w-auto md:max-w-none",
            "flex items-center justify-between gap-1 rounded-full border bg-background/70 p-1.5 backdrop-blur-xl transition-shadow duration-300",
            isScrolled
              ? "border-border shadow-lg shadow-foreground/10"
              : "border-border/60 shadow-sm shadow-foreground/5"
          )}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Logo mark */}
          <button
            onClick={() => goTo("#home")}
            aria-label="Back to top"
            className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan-400 text-xs font-bold text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-black"
          >
            AT
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 md:flex md:px-1">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={item.href} className="relative">
                  <button
                    onClick={() => goTo(item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative z-10 cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </button>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/12 ring-1 ring-primary/20"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <span className="mx-1 hidden h-5 w-px bg-border md:block" />

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsCommandOpen(true)}
              aria-label="Open command palette"
              className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-primary/8 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
            >
              <Search className="size-4" />
              <kbd className="hidden rounded border border-border bg-muted/70 px-1.5 py-0.5 font-mono text-[10px] md:inline">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <button
              onClick={() => setIsMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
              className="cursor-pointer rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/8 hover:text-foreground md:hidden"
            >
              {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-3xl border border-border bg-background/90 p-2 shadow-xl backdrop-blur-xl md:hidden"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
              >
                {navItems.map((item) => {
                  const id = item.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={item.href}
                      onClick={() => goTo(item.href)}
                      className={cn(
                        "flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {item.label}
                      {isActive && <span className="size-1.5 rounded-full bg-primary" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
}
