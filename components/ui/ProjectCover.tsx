import Image from "next/image";
import { TrendingUp, ScanEye, FileText, Sparkles } from "lucide-react";
import type { Project } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  ScanEye,
  FileText,
  Sparkles,
};

/**
 * Cover art for a project: the real screenshot in a browser frame when one
 * exists, otherwise a generated gradient cover so cards never look empty.
 */
export function ProjectCover({
  project,
  sizes,
  priority = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
}) {
  const Icon = iconMap[project.icon] || Sparkles;

  if (project.image) {
    return (
      <div className="relative h-full w-full bg-muted">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}
    >
      <div className="absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(circle,black_20%,transparent_75%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
      <div className="relative flex size-16 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-white shadow-xl backdrop-blur-md">
        <Icon className="size-8" strokeWidth={1.6} />
      </div>
    </div>
  );
}
