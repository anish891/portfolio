"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/data";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CommandPalette } from "@/components/ui/CommandPalette";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass-strong shadow-md shadow-foreground/5 border-b border-border"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleClick("#home")}
                className="text-lg font-bold tracking-tight gradient-text cursor-pointer"
              >
                AT
              </button>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleClick(item.href)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-lg transition-all duration-200 cursor-pointer font-medium",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Command Palette Trigger */}
              <button
                onClick={() => setIsCommandOpen(true)}
                className="flex items-center gap-2 px-2.5 py-1.5 ml-1 text-xs text-muted-foreground bg-primary/5 border border-primary/15 rounded-lg hover:bg-primary/10 hover:text-foreground transition-all duration-200 cursor-pointer"
                title="Search / Command Palette (⌘K)"
              >
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted/80 border border-border">
                  ⌘K
                </kbd>
              </button>

              <ThemeToggle />
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsCommandOpen(true)}
                className="p-2 text-muted-foreground hover:text-foreground bg-primary/5 border border-primary/15 rounded-lg cursor-pointer"
                aria-label="Open command palette"
              >
                <span className="text-xs font-mono font-semibold">⌘K</span>
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-16 glass-strong md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center gap-2 p-6">
              {navItems.map((item, i) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => handleClick(item.href)}
                    className={cn(
                      "w-full text-center py-3 text-lg rounded-xl transition-colors cursor-pointer font-medium",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-2"
              >
                <ThemeToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
