"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Copy,
  Check,
  Sun,
  Moon,
  ExternalLink,
  Code2,
  User,
  Mail,
  FolderGit2,
  Sparkles,
  Command as CommandIcon,
  X,
} from "lucide-react";
import { heroContent, projects, socialLinks } from "@/lib/data";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Actions" | "Projects" | "Socials";
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, [isOpen]);

  // Toast feedback banner inside palette / overlay
  const showFeedback = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // Scroll to section helper
  const scrollTo = useCallback(
    (id: string) => {
      onClose();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [onClose]
  );

  // Copy email action
  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(heroContent.email);
    setCopied(true);
    showFeedback("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => onClose(), 1000);
  }, [onClose]);

  // Toggle Theme
  const handleToggleTheme = useCallback(() => {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    try {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    } catch {}
    setIsDark(nextDark);
    showFeedback(`Switched to ${nextDark ? "dark" : "light"} mode`);
    setTimeout(() => onClose(), 800);
  }, [onClose]);

  // Build commands list
  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Go to Overview (Home)",
      category: "Navigation",
      icon: User,
      action: () => scrollTo("home"),
      shortcut: "H",
    },
    {
      id: "nav-tech",
      title: "Go to Tech Stack",
      category: "Navigation",
      icon: Code2,
      action: () => scrollTo("tech"),
      shortcut: "T",
    },
    {
      id: "nav-projects",
      title: "Go to Projects",
      category: "Navigation",
      icon: FolderGit2,
      action: () => scrollTo("projects"),
      shortcut: "P",
    },
    {
      id: "nav-contact",
      title: "Go to Contact",
      category: "Navigation",
      icon: Mail,
      action: () => scrollTo("contact"),
      shortcut: "C",
    },

    // Actions
    {
      id: "action-copy-email",
      title: "Copy Email Address",
      subtitle: heroContent.email,
      category: "Actions",
      icon: copied ? Check : Copy,
      action: handleCopyEmail,
      shortcut: "⌘E",
    },
    {
      id: "action-toggle-theme",
      title: `Switch to ${isDark ? "Light" : "Dark"} Mode`,
      category: "Actions",
      icon: isDark ? Sun : Moon,
      action: handleToggleTheme,
      shortcut: "⌘M",
    },

    // Projects
    ...projects.map((proj) => ({
      id: `project-${proj.id}`,
      title: proj.title,
      subtitle: proj.description,
      category: "Projects" as const,
      icon: Sparkles,
      action: () => {
        onClose();
        if (proj.deployedUrl) {
          window.open(proj.deployedUrl, "_blank");
        } else {
          scrollTo("projects");
        }
      },
    })),

    // Socials
    ...socialLinks.map((social) => ({
      id: `social-${social.name.toLowerCase()}`,
      title: `Visit ${social.name}`,
      subtitle: social.url,
      category: "Socials" as const,
      icon: ExternalLink,
      action: () => {
        onClose();
        window.open(social.url, "_blank");
      },
    })),
  ];

  // Filter commands
  const filtered = commands.filter((cmd) => {
    const searchStr = `${cmd.title} ${cmd.subtitle || ""} ${cmd.category}`.toLowerCase();
    return searchStr.includes(query.toLowerCase().trim());
  });

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, filtered.length - 1) : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Command Modal */}
        <motion.div
          className="relative w-full max-w-xl glass-strong border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-10"
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Toast Notification Alert Banner if triggered */}
          {toastMsg && (
            <div className="bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold text-center flex items-center justify-center gap-2">
              <Check className="size-3.5" /> {toastMsg}
            </div>
          )}

          {/* Input field */}
          <div className="flex items-center px-4 border-b border-border/60 py-3">
            <Search className="size-5 text-muted-foreground mr-3 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base font-medium"
              autoFocus
            />
            {query ? (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground px-2 py-1 rounded bg-muted/60 border border-border">
                ESC
              </kbd>
            )}
          </div>

          {/* Command list */}
          <div className="max-h-[340px] overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No matching commands found.
              </div>
            ) : (
              <div className="space-y-1">
                {filtered.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg flex-shrink-0 ${
                            isSelected
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>
                        <div className="truncate">
                          <div className="font-medium text-foreground truncate">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-xs text-muted-foreground truncate">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-muted/50 text-muted-foreground">
                          {item.category}
                        </span>
                        {item.shortcut && (
                          <kbd className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-muted border border-border">
                            {item.shortcut}
                          </kbd>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer hints */}
          <div className="px-4 py-2 border-t border-border/50 bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">
                  ↑↓
                </kbd>{" "}
                navigate
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">
                  ↵
                </kbd>{" "}
                select
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CommandIcon className="size-3 text-primary" />
              <span className="text-[11px] font-medium">Quick Command Palette</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
