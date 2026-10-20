import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";

const linkClass =
  "inline-flex items-center gap-1 underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground";

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-4 text-sm">
      {project.deployedUrl && (
        <a href={project.deployedUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Live <ArrowUpRight className="size-3.5" />
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Source <ArrowUpRight className="size-3.5" />
        </a>
      )}
    </div>
  );
}
