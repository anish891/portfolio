"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { projects } from "@/lib/data";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  ScanEye,
  FileText,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import type { Project } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  ScanEye,
  FileText,
  Sparkles,
};

const filters = [
  { label: "All", value: "all" },
  { label: "AI / ML", value: "ai" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
] as const;

export function Projects() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subheading mx-auto">
            A selection of projects showcasing engineering impact and technical
            depth
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-1.5 text-sm rounded-lg transition-all duration-200 cursor-pointer font-medium ${
                activeFilter === filter.value
                  ? "bg-primary/10 text-primary border border-primary/15"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5 border border-transparent"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const Icon = iconMap[project.icon] || Sparkles;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative glass rounded-2xl p-5 h-full flex flex-col hover:border-primary/15 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                    {/* Gradient border glow on hover */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon & Title */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`p-2.5 rounded-xl bg-gradient-to-br ${project.gradient} text-white`}
                        >
                          <Icon className="size-5" />
                        </div>
                        <h3 className="font-bold text-foreground text-base">
                          {project.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="secondary"
                            className="bg-primary/5 border-primary/5 text-muted-foreground text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* View Details */}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                        <span>View Details</span>
                        <ExternalLink className="size-3 group-hover:translate-x-0.5 transition-transform" />
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
