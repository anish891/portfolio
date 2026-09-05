"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, ArrowRight } from "lucide-react";
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
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % (heroContent.roles?.length || 1));
    }, 2500);

    return () => {
      clearInterval(roleTimer);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-start justify-center overflow-hidden pt-28 pb-12"
    >
      {/* Dynamic Animated Gradient Mesh Layer */}
      <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-violet-600/20 via-purple-500/15 to-transparent blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-bl from-amber-500/15 via-orange-500/10 to-transparent blur-[110px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent blur-[100px] animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Interactive Mouse-following Dual Light Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, var(--primary) 0.07, transparent 80%),
            radial-gradient(800px circle at ${mouse.x}px ${mouse.y}px, oklch(0.72 0.18 215 / 12%), transparent 70%)
          `,
        }}
      />

      {/* Background dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 w-full">

        {/* ── Profile header ───────────────────────────── */}
        <motion.div
          className="flex items-center gap-4 mb-7"
          {...fadeUp(0.05)}
        >
          {/* Avatar with Animated Glow Ring */}
          <div className="relative flex-shrink-0 group">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary via-cyan-500 to-teal-400 opacity-60 blur-sm group-hover:opacity-100 transition duration-500 animate-tilt" />
            <div className="relative w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary/20 select-none">
              AT
            </div>
            {/* Availability dot */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-background" />
            </span>
          </div>

          {/* Name + tagline */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              <span className="gradient-text">{heroContent.name}</span>
            </h1>
            <div className="text-muted-foreground text-sm sm:text-[15px] mt-1 font-semibold flex items-center h-6 overflow-hidden">
              <div className="relative h-6 w-56 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroContent.roles[roleIndex]}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="absolute left-0 top-0 text-primary font-semibold whitespace-nowrap"
                  >
                    {heroContent.roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
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
