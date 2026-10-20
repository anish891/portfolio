import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { ProjectLinks } from "@/components/ui/ProjectLinks";

export function Projects() {
  return (
    <Section
      id="projects"
      title="Selected work"
      action={
        <Link
          href="/projects"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          All projects
        </Link>
      }
    >
      <ul className="space-y-10">
        {projects.map((project) => (
          <li key={project.id}>
            {project.image && (
              <Link
                href={`/projects/${project.id}`}
                aria-label={`${project.title} case study`}
                className="relative mb-4 block aspect-[16/9] overflow-hidden rounded-lg border border-border"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(min-width: 672px) 624px, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </Link>
            )}
            <h3 className="font-medium tracking-tight">
              <Link
                href={`/projects/${project.id}`}
                className="hover:underline hover:decoration-border hover:underline-offset-4"
              >
                {project.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {project.techStack.join(" · ")}
            </p>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <Link
                href={`/projects/${project.id}`}
                className="font-medium underline decoration-border underline-offset-4 hover:decoration-foreground"
              >
                Case study
              </Link>
              <ProjectLinks project={project} />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
