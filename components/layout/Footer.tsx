"use client";

import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { socialLinks, nowContent, quote, navItems, heroContent } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Mail,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-border">
      <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Now + quote */}
        <div className="grid gap-4 md:grid-cols-5">
          <div className="rounded-2xl border border-border/70 bg-card p-5 md:col-span-3">
            <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {nowContent.label}
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">{nowContent.text}</p>
          </div>
          <figure className="rounded-2xl border border-border/70 bg-card p-5 md:col-span-2">
            <blockquote className="text-sm italic leading-relaxed text-foreground/90">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-2 font-mono text-xs text-muted-foreground">
              — {quote.author}
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-border/60 pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <span className="text-lg font-bold gradient-text">{heroContent.name}</span>
            <p className="text-sm text-muted-foreground">
              AI Engineer • Full-Stack Developer • Builder
            </p>
          </div>

          <nav aria-label="Footer" className="flex items-center gap-5 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon] || Mail;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-card p-2.5 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                  aria-label={link.name}
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {year} {heroContent.name}. Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
