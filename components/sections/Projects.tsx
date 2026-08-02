"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { projects } from "@/lib/data";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Globe } from "lucide-react";
import { Github } from "@/components/ui/icons";
import type { Project } from "@/lib/data";

const techBadges: Record<string, { label: string; icon: string; bg: string; text: string }> = {
  "Next.js": { label: "N", icon: "N", bg: "bg-black text-white dark:bg-white dark:text-black", text: "font-black" },
  "React": { label: "⚛", icon: "⚛", bg: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20", text: "font-bold" },
  "Tailwind": { label: "≈", icon: "≈", bg: "bg-teal-500/10 text-teal-400 border border-teal-500/20", text: "font-bold" },
  "Node.js": { label: "JS", icon: "JS", bg: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20", text: "font-bold text-[10px]" },
  "JavaScript": { label: "JS", icon: "JS", bg: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20", text: "font-bold text-[10px]" },
  "TypeScript": { label: "TS", icon: "TS", bg: "bg-blue-500/10 text-blue-500 border border-blue-500/20", text: "font-bold text-[10px]" },
  "HTML5": { label: "H5", icon: "H5", bg: "bg-orange-500/10 text-orange-500 border border-orange-500/20", text: "font-bold text-[10px]" },
  "CSS3": { label: "C3", icon: "C3", bg: "bg-blue-400/10 text-blue-400 border border-blue-400/20", text: "font-bold text-[10px]" },
  "Express.js": { label: "ex", icon: "ex", bg: "bg-neutral-500/10 text-neutral-400 border border-neutral-500/20", text: "font-medium lowercase text-xs" },
  "Supabase": { label: "⚡", icon: "⚡", bg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", text: "font-bold" },
  "PostgreSQL": { label: "PG", icon: "PG", bg: "bg-sky-500/10 text-sky-400 border border-sky-500/20", text: "font-bold text-[10px]" },
  "Vercel": { label: "▲", icon: "▲", bg: "bg-black text-white dark:bg-white dark:text-black", text: "font-bold text-[9px]" },
  "Python": { label: "Py", icon: "Py", bg: "bg-amber-500/10 text-amber-400 border border-amber-500/20", text: "font-bold text-[10px]" },
  "OpenCV": { label: "CV", icon: "CV", bg: "bg-blue-600/10 text-blue-500 border border-blue-600/20", text: "font-bold text-[10px]" },
  "Flutter": { label: "F", icon: "F", bg: "bg-sky-400/10 text-sky-400 border border-sky-400/20", text: "font-bold text-xs" },
  "Firebase": { label: "🔥", icon: "🔥", bg: "bg-amber-500/10 text-amber-500 border border-amber-500/20", text: "font-bold" },
};

export function Projects() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            FEATURED PROJECTS
          </h2>
        </motion.div>

        {/* Project Cards Grid - 3 Columns on lg screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {projects.map((project, i) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="group cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="bg-card border border-border/60 hover:border-border rounded-2xl p-4 flex flex-col h-full transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                    {/* Live iFrame / Image Webpage Preview Container with Hover Zoom */}
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-background border border-border/40 mb-3.5 group/frame transition-all duration-500">
                      {project.image ? (
                        <div className="w-full h-full overflow-hidden relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : project.deployedUrl ? (
                        <div className="w-full h-full relative overflow-hidden pointer-events-none select-none">
                          <iframe
                            src={project.deployedUrl}
                            title={project.title}
                            className="w-[1280px] h-[800px] origin-top-left scale-[0.25] sm:scale-[0.28] lg:scale-[0.25] border-0 pointer-events-none transition-transform duration-500 group-hover:scale-[0.26] sm:group-hover:scale-[0.29]"
                            loading="lazy"
                            tabIndex={-1}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20 transition-transform duration-500 group-hover:scale-105">
                          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <Globe className="size-5" />
                          </div>
                          <h4 className="text-sm font-bold text-foreground">{project.title}</h4>
                          <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
                            {project.description}
                          </p>
                        </div>
                      )}

                      {/* Quick View Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <span className="px-3.5 py-1.5 rounded-full bg-background/90 text-foreground text-xs font-semibold shadow-lg border border-border transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5">
                          Quick View
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col flex-1">
                      {/* Title & External Link Icons */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="font-semibold text-base text-foreground tracking-tight">
                          {project.title.toLowerCase()}
                        </h3>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-foreground transition-colors p-1"
                              title="GitHub Repository"
                            >
                              <Github className="size-3.5" />
                            </a>
                          )}
                          {project.deployedUrl && (
                            <a
                              href={project.deployedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-foreground transition-colors p-1"
                              title="Live Website"
                            >
                              <Globe className="size-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Circular Tech Stack Icons */}
                      <div className="flex items-center flex-wrap gap-1.5 pt-1">
                        {project.techStack.slice(0, 5).map((tech) => {
                          const badge = techBadges[tech] || {
                            label: tech.slice(0, 2),
                            icon: tech.slice(0, 2),
                            bg: "bg-muted text-muted-foreground",
                            text: "font-semibold text-[9px]",
                          };
                          return (
                            <div
                              key={tech}
                              className={`size-6 rounded-full ${badge.bg} flex items-center justify-center ${badge.text} shrink-0`}
                              title={tech}
                            >
                              {badge.icon}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
