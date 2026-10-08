"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Copy,
  Check,
  Sun,
  Moon,
  ArrowUpRight,
  Code2,
  Home,
  Mail,
  FolderGit2,
  CornerDownLeft,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { heroContent, projects, siteConfig, socialLinks } from "@/lib/data";

type Group = "Navigate" | "Projects" | "Actions" | "Links";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  group: Group;
  icon: React.ElementType;
  external?: boolean;
  keepOpen?: boolean;
  run: () => void;
}

const GROUP_ORDER: Group[] = ["Navigate", "Projects", "Actions", "Links"];

const socialIcon: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Mail,
};

function subscribeTheme(cb: () => void) {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // The inner panel mounts only while open, so query/selection reset for free
  // and AnimatePresence can play the exit animation.
  return (
    <AnimatePresence>
      {isOpen && <PalettePanel onClose={onClose} />}
    </AnimatePresence>
  );
}

function PalettePanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const isDark = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.classList.contains("dark"),
    () => false
  );

  // Lock page scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);


  const scrollTo = useCallback(
    (id: string) => {
      onClose();
      // Wait a beat so scroll isn't fighting the closing overlay
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
    },
    [onClose]
  );

  const commands = useMemo<CommandItem[]>(() => {
    const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
    return [
      { id: "nav-home", title: "Home", group: "Navigate", icon: Home, run: () => scrollTo("home") },
      { id: "nav-tech", title: "Tech stack", group: "Navigate", icon: Code2, run: () => scrollTo("tech") },
      { id: "nav-projects", title: "Projects", group: "Navigate", icon: FolderGit2, run: () => scrollTo("projects") },
      { id: "nav-contact", title: "Contact", group: "Navigate", icon: Mail, run: () => scrollTo("contact") },

      ...projects.map<CommandItem>((p) => ({
        id: `project-${p.id}`,
        title: p.title,
        subtitle: p.deployedUrl ? "Open live site" : "Open source code",
        group: "Projects",
        icon: ArrowUpRight,
        external: true,
        run: () => {
          onClose();
          open(p.deployedUrl ?? p.githubUrl ?? siteConfig.githubUrl);
        },
      })),

      {
        id: "copy-email",
        title: copied ? "Email copied" : "Copy email address",
        subtitle: heroContent.email,
        group: "Actions",
        icon: copied ? Check : Copy,
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(heroContent.email).catch(() => {});
          setCopied(true);
          setTimeout(onClose, 700);
        },
      },
      {
        id: "toggle-theme",
        title: isDark ? "Switch to light mode" : "Switch to dark mode",
        group: "Actions",
        icon: isDark ? Sun : Moon,
        run: () => {
          const next = !document.documentElement.classList.contains("dark");
          document.documentElement.classList.toggle("dark", next);
          try {
            localStorage.setItem("theme", next ? "dark" : "light");
          } catch {}
          onClose();
        },
      },

      ...socialLinks.map<CommandItem>((s) => ({
        id: `link-${s.name.toLowerCase()}`,
        title: s.name,
        subtitle: s.url.replace(/^(https?:\/\/|mailto:)/, ""),
        group: "Links",
        icon: socialIcon[s.icon] ?? ArrowUpRight,
        external: true,
        run: () => {
          onClose();
          open(s.url);
        },
      })),
    ];
  }, [copied, isDark, onClose, scrollTo]);

  // Every typed word must match the title, subtitle or group
  const filtered = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return commands;
    return commands.filter((c) => {
      const hay = `${c.title} ${c.subtitle ?? ""} ${c.group}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [commands, query]);

  // Keep rows in group order so keyboard order matches visual order
  const ordered = useMemo(
    () => GROUP_ORDER.flatMap((g) => filtered.filter((c) => c.group === g)),
    [filtered]
  );

  const active = Math.min(selected, Math.max(ordered.length - 1, 0));

  // Keep the highlighted row visible when arrowing through a long list
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((active + 1) % Math.max(ordered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((active - 1 + ordered.length) % Math.max(ordered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      ordered[active]?.run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  let rowIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]"
      onKeyDown={onKeyDown}
    >
      <motion.div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-popover shadow-2xl shadow-black/20"
        initial={{ opacity: 0, scale: 0.97, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -8 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 border-b border-border px-5">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={ordered[active] ? `palette-${ordered[active].id}` : undefined}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            placeholder="Search pages, projects, actions…"
            className="h-14 w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
            esc
          </kbd>
        </div>

        <div
          ref={listRef}
          id="palette-list"
          role="listbox"
          className="max-h-[min(360px,50vh)] overflow-y-auto overscroll-contain p-2"
        >
          {ordered.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              Nothing matches &ldquo;{query}&rdquo;
            </p>
          ) : (
            GROUP_ORDER.map((group) => {
              const items = ordered.filter((c) => c.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group} className="mb-1 last:mb-0">
                  <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    {group}
                  </p>
                  {items.map((item) => {
                    rowIndex += 1;
                    const index = rowIndex;
                    const isActive = index === active;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        id={`palette-${item.id}`}
                        role="option"
                        aria-selected={isActive}
                        data-index={index}
                        onClick={item.run}
                        onMouseMove={() => setSelected(index)}
                        className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          isActive ? "bg-primary/10" : ""
                        }`}
                      >
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-lg border ${
                            isActive
                              ? "border-primary/30 bg-primary/15 text-primary"
                              : "border-border bg-muted/60 text-muted-foreground"
                          }`}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-foreground">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="block truncate text-xs text-muted-foreground">
                              {item.subtitle}
                            </span>
                          )}
                        </span>
                        {isActive && (
                          <CornerDownLeft className="size-3.5 shrink-0 text-muted-foreground" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-3">
            <span>
              <kbd className="font-mono">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="font-mono">↵</kbd> select
            </span>
          </span>
          <span className="font-mono">{ordered.length} {ordered.length === 1 ? "result" : "results"}</span>
        </div>
      </motion.div>
    </div>
  );
}
