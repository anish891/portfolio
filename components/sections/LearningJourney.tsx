"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { timelineSteps } from "@/lib/data";
import {
  Code2,
  Layers,
  Smartphone,
  Cloud,
  Brain,
  Network,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Layers,
  Smartphone,
  Cloud,
  Brain,
  Network,
};

export function LearningJourney() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="journey" className="section-padding">
      <div className="max-w-3xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4">
            Learning <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subheading mx-auto">
            My evolution as an engineer, one milestone at a time
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[oklch(0.72_0.17_280/40%)] via-[oklch(0.75_0.15_200/30%)] to-transparent"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-8">
            {timelineSteps.map((step, i) => {
              const Icon = iconMap[step.icon] || Code2;
              return (
                <motion.div
                  key={step.title}
                  className="relative flex items-start gap-5 pl-1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 shrink-0">
                    <div className="size-12 rounded-xl glass flex items-center justify-center border-white/10 hover:border-[oklch(0.72_0.17_280/30%)] transition-colors">
                      <Icon className="size-5 text-[oklch(0.72_0.17_280)]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1.5">
                    <h3 className="font-semibold text-foreground text-base mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
