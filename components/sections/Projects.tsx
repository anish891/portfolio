"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/data";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (project: Project) => {
    setSelected(project);
    setOpen(true);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve <span className="gradient-text">built</span>
            </>
          }
          description="A few projects that show how I think about systems, data and product."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              featured={i === 0}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
}
