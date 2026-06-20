"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/useInView";
import { aboutContent } from "@/lib/data";
import {
  Brain,
  Network,
  Server,
  Zap,
  Blocks,
  Globe,
} from "lucide-react";

const interestIcons: Record<string, React.ElementType> = {
  "Artificial Intelligence": Brain,
  "Distributed Systems": Network,
  "Backend Engineering": Server,
  "Developer Productivity": Zap,
  "System Design": Blocks,
  "Open Source": Globe,
};

export function About() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="about" className="section-padding">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subheading mx-auto">
            A bit about my journey and what drives me
          </p>
        </motion.div>

        {/* Bio Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard glowColor="purple" className="mb-8">
            <p className="text-foreground/90 leading-relaxed text-base sm:text-lg">
              {aboutContent.bio}
            </p>
          </GlassCard>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 text-center">
            Strong Interest In
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {aboutContent.interests.map((interest, i) => {
              const Icon = interestIcons[interest] || Brain;
              return (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-primary/5 border border-primary/10 text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default gap-2"
                  >
                    <Icon className="size-3.5" />
                    {interest}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
