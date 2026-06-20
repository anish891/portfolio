"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { achievements } from "@/lib/data";
import { Code2, Award, GraduationCap, BadgeCheck } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Award,
  GraduationCap,
  BadgeCheck,
};

export function Achievements() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subheading mx-auto">
            Milestones and recognitions along the way
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map((achievement, i) => {
            const Icon = iconMap[achievement.icon] || Award;
            return (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <GlassCard
                  glowColor="purple"
                  className="text-center py-8"
                >
                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-xl bg-[oklch(0.72_0.17_280/10%)] mb-4">
                    <Icon className="size-6 text-[oklch(0.72_0.17_280)]" />
                  </div>

                  {/* Value */}
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {achievement.isNumeric && achievement.numericValue ? (
                      <AnimatedCounter
                        target={achievement.numericValue}
                        suffix={achievement.suffix || ""}
                        duration={2500}
                      />
                    ) : (
                      <span className="gradient-text">{achievement.value}</span>
                    )}
                  </div>

                  {/* Label */}
                  <p className="text-sm text-muted-foreground">
                    {achievement.label}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
