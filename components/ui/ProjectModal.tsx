"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
      <DialogContent className="sm:max-w-xl glass border-border bg-popover/95 shadow-lg shadow-foreground/5 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl bg-gradient-to-br ${project.gradient} text-white`}
              >
                <Icon className="size-5" />
              </div>
              <DialogTitle className="text-xl font-bold">
                {project.title}
              </DialogTitle>
            </div>
            {project.deployedUrl && (
              <a
                href={project.deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium text-xs shadow hover:opacity-90 transition-opacity"
              >
                <span>Live Demo</span>
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
          <DialogDescription className="text-muted-foreground leading-relaxed whitespace-pre-line text-left pt-2">
            {project.longDescription}
          </DialogDescription>
        </DialogHeader>
 
        <div className="space-y-4 mt-2">
          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Key Features & Architectural Highlights
            </h4>
            <ul className="space-y-1.5">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span
                    className={`size-1.5 rounded-full bg-gradient-to-r ${project.gradient}`}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
 
          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Tech Stack & Techniques
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-primary/5 border-primary/5 text-muted-foreground text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
