"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Mail, ArrowRight, ArrowUpRight } from "lucide-react";
import { heroContent, socialLinks, aboutContent, siteConfig } from "@/lib/data";
import { Github, Linkedin } from "@/components/ui/icons";
import { GitHubHeatmap } from "@/components/ui/GitHubHeatmap";

const socialIconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Mail,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

const scrollToId = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: background drifts slower than the page, content eases out
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "60px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cursor glow is driven by CSS variables so mouse moves never re-render React
  useEffect(() => {
    const el = glowRef.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setRoleIndex((i) => (i + 1) % heroContent.roles.length),
      2500
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex items-start justify-center overflow-hidden pt-32 sm:pt-40 pb-16"
    >
      {/* Ambient background: one violet + one cyan glow, kept quiet */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30"
      >
        <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] max-w-[640px] max-h-[640px] rounded-full bg-gradient-to-br from-violet-600/25 via-purple-500/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tl from-cyan-500/20 via-blue-600/10 to-transparent blur-[110px] animate-float" />
      </motion.div>

      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx, -500px) var(--my, -500px), oklch(0.72 0.18 215 / 10%), transparent 70%)",
        }}
      />

      <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full"
      >
        {/* Status pill */}
        <motion.div {...fadeUp(0.05)} className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-muted-foreground font-mono">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Open to full-time &amp; freelance
            <span className="text-border">·</span>
            <MapPin className="size-3" />
            {heroContent.location}
          </span>
        </motion.div>

        {/* Headline: plain element so it paints before hydration (LCP) */}
        <h1
          className="text-[2.6rem] sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.08]"
        >
          Hi, I&apos;m <span className="gradient-text">{heroContent.name}</span>.
          <br />
          <span className="text-foreground/90">I build things that</span>{" "}
          <span className="gradient-text">think</span>.
        </h1>

        {/* Rotating role */}
        <motion.div
          className="mt-6 flex items-center gap-3 font-mono text-sm sm:text-base text-muted-foreground"
          {...fadeUp(0.18)}
        >
          <span className="text-primary">&gt;</span>
          <div className="relative h-6 w-60 overflow-hidden" aria-live="off">
            <span
              key={heroContent.roles[roleIndex]}
              className="role-in absolute left-0 top-0 whitespace-nowrap text-foreground"
            >
              {heroContent.roles[roleIndex]}
            </span>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground"
          {...fadeUp(0.24)}
        >
          {heroContent.intro}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          {...fadeUp(0.3)}
        >
          <a
            href="#projects"
            onClick={scrollToId("projects")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan-400 px-6 py-3 text-sm font-semibold text-white dark:text-black shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View my work
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            onClick={scrollToId("contact")}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Get in touch
            <ArrowUpRight className="size-4" />
          </a>

          <div className="flex items-center gap-1 sm:ml-3">
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
                  className="p-2.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* GitHub heatmap */}
        <motion.div className="mt-16" {...fadeUp(0.4)}>
          <GitHubHeatmap username={siteConfig.githubUsername} />
        </motion.div>

        {/* Interests */}
        <motion.div className="mt-8" {...fadeUp(0.46)}>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60 mb-3">
            Currently into
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
      </motion.div>
    </section>
  );
}
