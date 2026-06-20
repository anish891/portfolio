"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";
import { experienceCards } from "@/lib/data";
import { Brain, Layers, Code2 } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Layers,
  Code2,
};

export function Experience() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subheading mx-auto">
            Impact-focused engineering across AI, full-stack, and backend
            development
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {experienceCards.map((card, i) => {
            const Icon = iconMap[card.icon] || Code2;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
              >
                <GlassCard
                  glowColor={i === 0 ? "purple" : i === 1 ? "cyan" : "blue"}
                  className="h-full"
                >
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${card.gradient} text-white shrink-0`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-bold text-foreground text-base">
                      {card.title}
                    </h3>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2.5">
                    {card.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span
                          className={`mt-2 size-1.5 rounded-full bg-gradient-to-r ${card.gradient} shrink-0`}
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
