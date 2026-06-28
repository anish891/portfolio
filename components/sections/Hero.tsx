"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Briefcase, ArrowRight } from "lucide-react";
import { heroContent, socialLinks, aboutContent } from "@/lib/data";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Github, Linkedin } from "@/components/ui/icons";
import { GitHubHeatmap } from "@/components/ui/GitHubHeatmap";

const socialIconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Mail: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

// Fade-up animation variant
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});


export function Hero() {
  const mouse = useMousePosition();

  return (
    <section
      id="home"
      className="relative flex items-start justify-center overflow-hidden pt-28 pb-12"
    >
      {/* Mouse-following gradient */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mouse.x}px ${mouse.y}px, oklch(0.70 0.14 55 / 6%), transparent 60%)`,
        }}
      />

      {/* Background dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-30" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[oklch(0.70_0.14_55/4%)] blur-[120px] animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[oklch(0.82_0.09_70/4%)] blur-[100px] animate-float"
        style={{ animationDelay: "3s" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 w-full">

        {/* ── Profile header ───────────────────────────── */}
        <motion.div
          className="flex items-center gap-4 mb-7"
          {...fadeUp(0.05)}
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-[oklch(0.70_0.14_55)] to-[oklch(0.82_0.09_70)] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary/20 select-none">
              AT
            </div>
            {/* Availability dot */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-background" />
            </span>
          </div>

          {/* Name + tagline */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              <span className="gradient-text">{heroContent.name}</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-[15px] mt-1 font-medium">
              {heroContent.tagline}
            </p>
          </div>
        </motion.div>

        {/* ── Meta info row ────────────────────────────── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 py-5 border-y border-border/60 mb-6"
          {...fadeUp(0.12)}
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-1.5">
              Location
            </p>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground font-medium">
                {heroContent.location}
              </span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-1.5">
              Email
            </p>
            <div className="flex items-center gap-1.5">
              <Mail className="size-3.5 text-primary flex-shrink-0" />
              <a
                href={`mailto:${heroContent.email}`}
                className="text-sm text-foreground font-medium hover:text-primary transition-colors truncate"
              >
                {heroContent.email}
              </a>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-1.5">
              Specialty
            </p>
            <div className="flex items-center gap-1.5">
              <Briefcase className="size-3.5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground font-medium">
                {heroContent.specialty}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Bio ──────────────────────────────────────── */}
        <motion.p
          className="text-foreground/80 leading-relaxed text-sm sm:text-[15px] mb-6"
          {...fadeUp(0.19)}
        >
          {heroContent.intro}
        </motion.p>

        {/* ── Social links ─────────────────────────────── */}
        <motion.div className="flex items-center gap-1 mb-8" {...fadeUp(0.25)}>
          {socialLinks.map((link) => {
            const Icon = socialIconMap[link.icon];
            if (!Icon) return null;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/8 transition-all duration-200"
              >
                <Icon className="size-5" />
              </a>
            );
          })}

          {/* CTA */}
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="ml-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
          >
            View Projects <ArrowRight className="size-4" />
          </a>
        </motion.div>

        {/* ── GitHub Heatmap ───────────────────────────── */}
        <motion.div {...fadeUp(0.32)}>
          <GitHubHeatmap username="anish891" />
        </motion.div>

        {/* ── Interests / Currently Into ───────────────── */}
        <motion.div className="mt-7" {...fadeUp(0.38)}>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">
            Currently Into
          </p>
          <div className="flex flex-wrap gap-2">
            {aboutContent.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 text-xs rounded-full bg-primary/5 border border-primary/10 text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:border-primary/25 transition-all duration-200 cursor-default"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
