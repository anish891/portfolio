"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/data";
import {
  TrendingUp,
  ScanEye,
  FileText,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Github } from "@/components/ui/icons";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  ScanEye,
  FileText,
  Sparkles,
};

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

  const Icon = iconMap[project.icon] || Sparkles;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 glass border-border/80 bg-background/95 backdrop-blur-2xl shadow-xl rounded-2xl">
        
        {/* Header */}
        <DialogHeader className="p-0 space-y-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${project.gradient} text-white shadow-md shrink-0`}>
              <Icon className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                {project.title}
              </DialogTitle>
              <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider mt-1">
                {project.category}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        {/* Minimal Description */}
        <div className="py-2 space-y-4 text-xs sm:text-sm">
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Key Features Bullet List */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider text-[10px]">
                Key Highlights
              </span>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {project.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-primary/5 border-primary/10 text-muted-foreground text-[11px] font-medium"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Footer: Prominent GitHub Link & Live Demo */}
        <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-2.5">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background font-semibold text-xs hover:opacity-90 transition-opacity shadow-sm"
            >
              <Github className="size-4" />
              <span>GitHub Code</span>
            </a>
          ) : (
            <a
              href="https://github.com/anish891"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background font-semibold text-xs hover:opacity-90 transition-opacity shadow-sm"
            >
              <Github className="size-4" />
              <span>View GitHub</span>
            </a>
          )}

          {project.deployedUrl && (
            <a
              href={project.deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-md hover:opacity-90 transition-opacity"
            >
              <span>Live Demo</span>
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
}
