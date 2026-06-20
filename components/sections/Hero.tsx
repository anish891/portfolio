"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useMousePosition } from "@/hooks/useMousePosition";
import { heroContent } from "@/lib/data";

export function Hero() {
  const { elementRef } = useTypingEffect({
    strings: heroContent.typingStrings,
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1500,
    loop: true,
  });

  const mouse = useMousePosition();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[oklch(0.70_0.14_55/5%)] blur-[100px] animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[oklch(0.82_0.09_70/5%)] blur-[100px] animate-float"
        style={{ animationDelay: "3s" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Location */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MapPin className="size-3.5 text-[oklch(0.70_0.14_55)]" />
          {heroContent.location}
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="gradient-text">{heroContent.name}</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground mb-6 h-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span ref={elementRef} />
        </motion.div>

        {/* Intro */}
        <motion.p
          className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {heroContent.intro}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[oklch(0.70_0.14_55)] to-[oklch(0.82_0.09_70)] text-white border-0 px-6 h-11 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm shadow-primary/20"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/15 bg-primary/5 hover:bg-primary/10 text-primary px-6 h-11 text-sm font-semibold cursor-pointer transition-colors"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact Me
          </Button>
          {/* <Button
            variant="outline"
            size="lg"
            className="border-primary/15 bg-primary/5 hover:bg-primary/10 text-primary px-6 h-11 text-sm font-semibold cursor-pointer transition-colors"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download className="size-4 mr-1.5" />
              Resume
            </a>
          </Button> */}
        </motion.div>

        {/* Scroll indicator */}
        {/* <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-5 text-muted-foreground/50" />
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
}
