"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { techStack } from "@/lib/data";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiFlutter,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
  Brain,
  Cpu,
  Bot,
  Terminal,
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
  "HTML": { icon: SiHtml5, colorClass: "group-hover:text-[#E34F26] group-hover:border-[#E34F26]/25", shadowClass: "hover:shadow-[#E34F26]/10" },
  "CSS": { icon: SiCss, colorClass: "group-hover:text-[#1572B6] group-hover:border-[#1572B6]/25", shadowClass: "hover:shadow-[#1572B6]/10" },
  "Tailwind": { icon: SiTailwindcss, colorClass: "group-hover:text-[#06B6D4] group-hover:border-[#06B6D4]/25", shadowClass: "hover:shadow-[#06B6D4]/10" },
  
  // Backend
  "Node.js": { icon: SiNodedotjs, colorClass: "group-hover:text-[#339933] group-hover:border-[#339933]/25", shadowClass: "hover:shadow-[#339933]/10" },
  "Express": { icon: SiExpress, colorClass: "group-hover:text-foreground dark:group-hover:text-white group-hover:border-foreground/20 dark:group-hover:border-white/20", shadowClass: "hover:shadow-foreground/10" },
  "REST APIs": { icon: Network, colorClass: "group-hover:text-[#00BFFF] group-hover:border-[#00BFFF]/25", shadowClass: "hover:shadow-[#00BFFF]/10" },
  
  // AI & ML
  "LangChain": { icon: Brain, colorClass: "group-hover:text-[#12B886] group-hover:border-[#12B886]/25", shadowClass: "hover:shadow-[#12B886]/10" },
  "AI Agents": { icon: Bot, colorClass: "group-hover:text-[#8A2BE2] group-hover:border-[#8A2BE2]/25", shadowClass: "hover:shadow-[#8A2BE2]/10" },
  "Prompt Engineering": { icon: Terminal, colorClass: "group-hover:text-[#32CD32] group-hover:border-[#32CD32]/25", shadowClass: "hover:shadow-[#32CD32]/10" },
  "LLM Integrations": { icon: Cpu, colorClass: "group-hover:text-[#FF4500] group-hover:border-[#FF4500]/25", shadowClass: "hover:shadow-[#FF4500]/10" },
  
  // Mobile
  "Flutter": { icon: SiFlutter, colorClass: "group-hover:text-[#02569B] group-hover:border-[#02569B]/25", shadowClass: "hover:shadow-[#02569B]/10" },
  
  // Databases
  "SQL": { icon: Database, colorClass: "group-hover:text-[#4479A1] group-hover:border-[#4479A1]/25", shadowClass: "hover:shadow-[#4479A1]/10" },
  "Firebase": { icon: SiFirebase, colorClass: "group-hover:text-[#FFCA28] group-hover:border-[#FFCA28]/25", shadowClass: "hover:shadow-[#FFCA28]/10" },
  
  // Engineering
  "Git": { icon: SiGit, colorClass: "group-hover:text-[#F05032] group-hover:border-[#F05032]/25", shadowClass: "hover:shadow-[#F05032]/10" },
  "GitHub": { icon: SiGithub, colorClass: "group-hover:text-foreground dark:group-hover:text-white group-hover:border-foreground/20 dark:group-hover:border-white/20", shadowClass: "hover:shadow-foreground/10" },
  "CI/CD": { icon: GitCompare, colorClass: "group-hover:text-[#4169E1] group-hover:border-[#4169E1]/25", shadowClass: "hover:shadow-[#4169E1]/10" },
  "Agile": { icon: RotateCw, colorClass: "group-hover:text-[#FF8C00] group-hover:border-[#FF8C00]/25", shadowClass: "hover:shadow-[#FF8C00]/10" },
  "Scrum": { icon: Kanban, colorClass: "group-hover:text-[#9932CC] group-hover:border-[#9932CC]/25", shadowClass: "hover:shadow-[#9932CC]/10" },
};

export function TechStack() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  // Flatten all skills
  const allSkills = techStack.flatMap((category) =>
    category.skills.map((skill) => ({
      ...skill,
      category: category.name,
    }))
  );

  return (
    <section id="tech" className="section-padding">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="section-subheading mx-auto">
            Technologies, frameworks, and tools I work with
          </p>
        </motion.div>

        {/* Unified Skills Grid */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3.5 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {allSkills.map((skill) => {
            const config = skillConfig[skill.name] || { icon: Code2, colorClass: "group-hover:text-primary group-hover:border-primary/20", shadowClass: "hover:shadow-primary/5" };
            const SkillIcon = config.icon;

            return (
              <div
                key={skill.name}
                className="relative group"
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-card text-foreground text-[10px] font-semibold uppercase tracking-wider rounded-lg shadow-md border border-primary/10 opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-30">
                  {skill.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-card" />
                </div>

                {/* Icon Button */}
                <div
                  className={`size-14 rounded-xl glass flex items-center justify-center border border-primary/5 hover:scale-110 transition-all duration-300 cursor-default ${config.shadowClass} ${config.colorClass}`}
                >
                  <SkillIcon className="size-6 transition-transform duration-300 group-hover:scale-105" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
