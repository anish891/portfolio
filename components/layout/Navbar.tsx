"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { navItems, heroContent } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CommandPalette, type PaletteProps } from "@/components/ui/CommandPalette";

export function Navbar({ posts }: { posts: PaletteProps["posts"] }) {
  const pathname = usePathname();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // ⌘K / Ctrl+K toggles the palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="container-prose flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-[15px] font-semibold uppercase tracking-[0.08em] text-foreground"
          >
            <span className="size-2 bg-signal" aria-hidden />
            {heroContent.name.split(" ")[0]}
            <span className="hidden sm:inline"> {heroContent.name.split(" ").slice(1).join(" ")}</span>
          </Link>

          <nav aria-label="Main" className="flex items-center gap-1">
            {navItems.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors hover:text-foreground sm:px-2.5",
                    active
                      ? "text-foreground underline decoration-signal decoration-2 underline-offset-[6px]"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={() => setIsCommandOpen(true)}
              aria-label="Open search"
              className="ml-1 flex cursor-pointer items-center gap-2 rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Search className="size-4" />
            </button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        posts={posts}
      />
    </>
  );
}
