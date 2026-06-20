"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { techStack } from "@/lib/data";
import {
  Code2,
  Layout,
  Server,
  Brain,
  Smartphone,
  Database,
  GitBranch,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Layout,
  Server,
  Brain,
  Smartphone,
  Database,
  GitBranch,
};

export function TechStack() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="tech" className="section-padding">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="section-subheading mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {techStack.map((category, catIndex) => {
            const CategoryIcon = iconMap[category.icon] || Code2;
            return (
              <motion.div
                key={category.name}
                className="glass rounded-2xl p-5 hover:border-primary/15 transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + catIndex * 0.08 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                    <CategoryIcon className="size-4" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">
                    {category.name}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 text-xs rounded-lg bg-primary/5 text-muted-foreground border border-primary/5 hover:text-foreground hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
