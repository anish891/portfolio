import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function Projects() {
  return (
    <Section id="projects" title="Selected work">
      <ul className="space-y-10">
        {projects.map((project) => (
          <li key={project.id}>
            {project.image && (
              <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg border border-border">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(min-width: 672px) 624px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="font-medium tracking-tight">{project.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {project.techStack.join(" · ")}
            </p>
            <div className="mt-3 flex items-center gap-4 text-sm">
              {project.deployedUrl && (
                <a
                  href={project.deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  Live <ArrowUpRight className="size-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  Source <ArrowUpRight className="size-3.5" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
