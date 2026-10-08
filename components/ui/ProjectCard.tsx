"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { ProjectCover } from "@/components/ui/ProjectCover";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryLabel: Record<Project["category"], string> = {
  ai: "AI / ML",
  web: "Web App",
  mobile: "Mobile",
};

interface Props {
  project: Project;
  index: number;
  featured?: boolean;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, index, featured, onOpen }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Cursor spotlight + subtle tilt, written straight to CSS variables so
  // moving the mouse never triggers a React render.
  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--px", `${x}px`);
    el.style.setProperty("--py", `${y}px`);
    el.style.setProperty("--ry", `${(x / r.width - 0.5) * 5}deg`);
    el.style.setProperty("--rx", `${(0.5 - y / r.height) * 5}deg`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className={cn("[perspective:1200px]", featured && "md:col-span-2")}
    >
      <div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{
          transform:
            "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)",
        }}
        className={cn(
          "group relative flex h-full overflow-hidden rounded-3xl border border-border/70 bg-card",
          "transition-[transform,border-color,box-shadow] duration-300 ease-out will-change-transform",
          "hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10",
          "focus-within:border-primary/50",
          featured ? "flex-col lg:flex-row" : "flex-col"
        )}
      >
        {/* Cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(360px circle at var(--px, 50%) var(--py, 50%), oklch(0.72 0.18 215 / 10%), transparent 65%)",
          }}
        />

        {/* Cover */}
        <div
          className={cn(
            "relative overflow-hidden border-border/60 aspect-[16/10]",
            featured
              ? "lg:aspect-auto lg:w-[58%] lg:min-h-[340px] border-b lg:border-b-0 lg:border-r"
              : "border-b"
          )}
        >
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <ProjectCover
              project={project}
              priority={index === 0}
              sizes={
                featured
                  ? "(min-width: 1024px) 40vw, 100vw"
                  : "(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
              }
            />
          </div>
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
            {categoryLabel[project.category]}
          </span>
        </div>

        {/* Body */}
        <div className={cn("flex flex-1 flex-col p-6", featured && "lg:p-8 lg:justify-center")}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3
              className={cn(
                "font-semibold tracking-tight text-foreground",
                featured ? "text-2xl lg:text-3xl" : "text-xl"
              )}
            >
              {/* Stretched button: makes the whole card the click target
                  without nesting interactive elements. */}
              <button
                type="button"
                onClick={() => onOpen(project)}
                className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:z-20 after:content-[''] focus-visible:after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-primary"
              >
                {project.title}
              </button>
            </h3>
            <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>

          <p
            className={cn(
              "mb-5 text-sm leading-relaxed text-muted-foreground",
              featured ? "lg:text-[15px]" : "line-clamp-3"
            )}
          >
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
            <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
              {project.techStack.slice(0, featured ? 6 : 4).map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border/70 bg-muted/60 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
              {project.techStack.length > (featured ? 6 : 4) && (
                <li className="rounded-md px-1.5 py-1 font-mono text-[11px] text-muted-foreground/70">
                  +{project.techStack.length - (featured ? 6 : 4)}
                </li>
              )}
            </ul>

            {/* Quick links sit above the stretched button (z-30) */}
            <div className="relative z-30 flex items-center gap-1">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code`}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <Github className="size-4" />
                </a>
              )}
              {project.deployedUrl && (
                <a
                  href={project.deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live site`}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <Globe className="size-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
