"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techStack } from "@/lib/data";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFirebase,
  SiPostgresql,
  SiSupabase,
  SiVercel,
  SiGit,
  SiGithub,
  SiFlutter,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
  Brain,
  Cpu,
  Bot,
  Network,
  GitCompare,
  RotateCw,
  Kanban,
  Database,
  Code2
} from "lucide-react";

const skillConfig: Record<string, { icon: React.ElementType; colorClass: string; shadowClass: string }> = {
  // Languages
  "Java": { icon: FaJava, colorClass: "group-hover:text-[#ED8B00] group-hover:border-[#ED8B00]/25", shadowClass: "hover:shadow-[#ED8B00]/10" },
  "Python": { icon: SiPython, colorClass: "group-hover:text-[#3776AB] group-hover:border-[#3776AB]/25", shadowClass: "hover:shadow-[#3776AB]/10" },
  "TypeScript": { icon: SiTypescript, colorClass: "group-hover:text-[#3178C6] group-hover:border-[#3178C6]/25", shadowClass: "hover:shadow-[#3178C6]/10" },
  "JavaScript": { icon: SiJavascript, colorClass: "group-hover:text-[#F7DF1E] group-hover:border-[#F7DF1E]/25", shadowClass: "hover:shadow-[#F7DF1E]/10" },

  // Frontend
  "React": { icon: SiReact, colorClass: "group-hover:text-[#61DAFB] group-hover:border-[#61DAFB]/25", shadowClass: "hover:shadow-[#61DAFB]/10" },
  "Next.js": { icon: SiNextdotjs, colorClass: "group-hover:text-foreground dark:group-hover:text-white group-hover:border-foreground/20 dark:group-hover:border-white/20", shadowClass: "hover:shadow-foreground/10" },
  "Tailwind": { icon: SiTailwindcss, colorClass: "group-hover:text-[#06B6D4] group-hover:border-[#06B6D4]/25", shadowClass: "hover:shadow-[#06B6D4]/10" },

  // Backend
  "Node.js": { icon: SiNodedotjs, colorClass: "group-hover:text-[#339933] group-hover:border-[#339933]/25", shadowClass: "hover:shadow-[#339933]/10" },
  "Express": { icon: SiExpress, colorClass: "group-hover:text-foreground dark:group-hover:text-white group-hover:border-foreground/20 dark:group-hover:border-white/20", shadowClass: "hover:shadow-foreground/10" },
  "REST APIs": { icon: Network, colorClass: "group-hover:text-[#00BFFF] group-hover:border-[#00BFFF]/25", shadowClass: "hover:shadow-[#00BFFF]/10" },

  // Databases & Cloud
  "PostgreSQL": { icon: SiPostgresql, colorClass: "group-hover:text-[#4169E1] group-hover:border-[#4169E1]/25", shadowClass: "hover:shadow-[#4169E1]/10" },
  "Supabase": { icon: SiSupabase, colorClass: "group-hover:text-[#3ECF8E] group-hover:border-[#3ECF8E]/25", shadowClass: "hover:shadow-[#3ECF8E]/10" },
  "SQL": { icon: Database, colorClass: "group-hover:text-[#4479A1] group-hover:border-[#4479A1]/25", shadowClass: "hover:shadow-[#4479A1]/10" },
  "Firebase": { icon: SiFirebase, colorClass: "group-hover:text-[#FFCA28] group-hover:border-[#FFCA28]/25", shadowClass: "hover:shadow-[#FFCA28]/10" },

  // Deployment & Infra
  "Vercel": { icon: SiVercel, colorClass: "group-hover:text-foreground dark:group-hover:text-white group-hover:border-foreground/20 dark:group-hover:border-white/20", shadowClass: "hover:shadow-foreground/10" },

  // AI & ML
  "LangChain": { icon: Brain, colorClass: "group-hover:text-[#12B886] group-hover:border-[#12B886]/25", shadowClass: "hover:shadow-[#12B886]/10" },
  "AI Agents": { icon: Bot, colorClass: "group-hover:text-[#8A2BE2] group-hover:border-[#8A2BE2]/25", shadowClass: "hover:shadow-[#8A2BE2]/10" },
  "LLM Integrations": { icon: Cpu, colorClass: "group-hover:text-[#FF4500] group-hover:border-[#FF4500]/25", shadowClass: "hover:shadow-[#FF4500]/10" },

  // Mobile
  "Flutter": { icon: SiFlutter, colorClass: "group-hover:text-[#02569B] group-hover:border-[#02569B]/25", shadowClass: "hover:shadow-[#02569B]/10" },

  // Engineering
  "Git": { icon: SiGit, colorClass: "group-hover:text-[#F05032] group-hover:border-[#F05032]/25", shadowClass: "hover:shadow-[#F05032]/10" },
  "GitHub": { icon: SiGithub, colorClass: "group-hover:text-foreground dark:group-hover:text-white group-hover:border-foreground/20 dark:group-hover:border-white/20", shadowClass: "hover:shadow-foreground/10" },
  "CI/CD": { icon: GitCompare, colorClass: "group-hover:text-[#4169E1] group-hover:border-[#4169E1]/25", shadowClass: "hover:shadow-[#4169E1]/10" },
  "Agile": { icon: RotateCw, colorClass: "group-hover:text-[#FF8C00] group-hover:border-[#FF8C00]/25", shadowClass: "hover:shadow-[#FF8C00]/10" },
  "Scrum": { icon: Kanban, colorClass: "group-hover:text-[#9932CC] group-hover:border-[#9932CC]/25", shadowClass: "hover:shadow-[#9932CC]/10" },
};

export function TechStack() {
  return (
    <section id="tech" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="Toolbox"
          title={
            <>
              Tech <span className="gradient-text">stack</span>
            </>
          }
          description="The languages, frameworks and tools I reach for."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease: "easeOut" }}
              className="rounded-2xl border border-border/70 bg-card p-5 transition-colors duration-300 hover:border-primary/30"
            >
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {category.name}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const config = skillConfig[skill.name] ?? {
                    icon: Code2,
                    colorClass: "group-hover:text-primary group-hover:border-primary/20",
                    shadowClass: "hover:shadow-primary/5",
                  };
                  const SkillIcon = config.icon;
                  return (
                    <li
                      key={skill.name}
                      className={`group flex items-center gap-2 rounded-xl border border-border/70 bg-muted/40 px-3 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${config.shadowClass} ${config.colorClass}`}
                    >
                      <SkillIcon className="size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-inherit" />
                      <span className="text-foreground/90">{skill.name}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
