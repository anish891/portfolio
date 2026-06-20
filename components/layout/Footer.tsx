"use client";

import { Mail, Heart } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { socialLinks } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Mail,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      {/* Gradient divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[oklch(0.70_0.14_55/40%)] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold gradient-text">
              Anish Tejwani
            </span>
            <p className="text-sm text-muted-foreground">
              AI Engineer • Full-Stack Developer • Builder
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon] || Mail;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-primary/5 border border-primary/10 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 shadow-xs"
                  aria-label={link.name}
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            © {year} Anish Tejwani. Built with{" "}
            <Heart className="size-3 text-red-400 inline" /> using Next.js &
            Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
