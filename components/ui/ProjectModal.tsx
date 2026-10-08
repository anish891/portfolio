"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { siteConfig, type Project } from "@/lib/data";
import { ExternalLink, X } from "lucide-react";
import { Github } from "@/components/ui/icons";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: ProjectModalProps) {
  if (!project) return null;

  const paragraphs = project.longDescription.split("\n\n").filter(Boolean);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[88vh] flex-col gap-0 overflow-hidden rounded-3xl border border-border/70 bg-background p-0 shadow-2xl sm:max-w-2xl"
      >
        <DialogClose
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-primary"
        >
          <X className="size-4" />
        </DialogClose>

        {/* Scrolls as one piece so the cover never gets squashed */}
        <div className="overflow-y-auto overscroll-contain">
          <div className="relative h-40 w-full border-b sm:h-52 border-border/60">
            <ProjectCover project={project} sizes="672px" />
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </DialogDescription>
            </div>

            {/* Actions first, so the primary next step is always visible */}
            <div className="flex flex-wrap gap-2.5">
              {project.deployedUrl && (
                <a
                  href={project.deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 dark:text-black"
                >
                  Live demo
                  <ExternalLink className="size-3.5" />
                </a>
              )}
              <a
                href={project.githubUrl ?? siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <Github className="size-4" />
                {project.githubUrl ? "Source code" : "View GitHub"}
              </a>
            </div>

            {paragraphs.length > 0 && (
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {project.features.length > 0 && (
              <div>
                <h4 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
                  Highlights
                </h4>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-muted/40 px-3 py-2.5 text-xs text-foreground/90"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
                Built with
              </h4>
              <ul className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border/70 bg-muted/60 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
