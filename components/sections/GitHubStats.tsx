"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";
import { githubUsername } from "@/lib/data";
import {
  getGitHubStatsUrl,
  getTopLanguagesUrl,
  getContributionGraphUrl,
} from "@/lib/github";
import { Github } from "@/components/ui/icons";

export function GitHubStats() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4">
            <span className="gradient-text">GitHub</span> Activity
          </h2>
          <p className="section-subheading mx-auto">
            Open source contributions and coding activity
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard glowColor="purple" className="p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getGitHubStatsUrl()}
                alt="GitHub Stats"
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </GlassCard>
          </motion.div>

          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard glowColor="cyan" className="p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getTopLanguagesUrl()}
                alt="Top Languages"
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </GlassCard>
          </motion.div>
        </div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard glowColor="purple" className="p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <Github className="size-4 text-[oklch(0.72_0.17_280)]" />
              <h3 className="font-semibold text-sm text-foreground">
                Contribution Graph
              </h3>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getContributionGraphUrl()}
              alt="GitHub Contribution Graph"
              className="w-full h-auto rounded-lg opacity-80"
              loading="lazy"
            />
            <div className="mt-3 text-center">
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-[oklch(0.72_0.17_280)] transition-colors"
              >
                View full profile on GitHub →
              </a>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
