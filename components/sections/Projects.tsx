import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { getPostsForProject } from "@/lib/blog";
import { Section } from "@/components/ui/Section";
import { ProjectLinks } from "@/components/ui/ProjectLinks";

const categoryLabel = { ai: "AI / agents", web: "Web application", mobile: "Mobile application" } as const;

export function Projects() {
  return (
    <Section
      id="projects"
      title="Missions"
      kicker="selected projects"
      action={
        <Link href="/projects" className="label-mono transition-colors hover:text-foreground">
          All →
        </Link>
      }
    >
      <ul className="space-y-10">
        {projects.map((project, index) => {
          const deployed = !!project.deployedUrl;
          const posts = getPostsForProject(project.id);
          return (
            <li
              key={project.id}
              className="group relative border-l border-border pl-5 transition-colors duration-200 hover:border-signal"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="label-mono text-signal-ink">
                  Mission {String(index + 1).padStart(2, "0")}
                </span>
                <span className="label-mono inline-flex shrink-0 items-center gap-1.5">
                  <span
                    className={`size-1.5 rounded-full ${deployed ? "bg-signal" : "border border-muted-foreground"}`}
                    aria-hidden
                  />
                  {deployed ? "Deployed" : "Source only"}
                </span>
              </div>

              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 hover:text-signal-ink"
                >
                  {project.title}
                  <ArrowUpRight
                    className="size-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden
                  />
                </Link>
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Key facts">
                {project.proof.map((fact) => (
                  <li
                    key={fact}
                    className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-foreground/80"
                  >
                    {fact}
                  </li>
                ))}
              </ul>

              <dl className="mt-4">
                <div className="spec-row">
                  <dt className="label-mono">Type</dt>
                  <dd className="font-mono text-xs">{categoryLabel[project.category]}</dd>
                </div>
                <div className="spec-row">
                  <dt className="label-mono">Stack</dt>
                  <dd className="font-mono text-xs">{project.techStack.join(" · ")}</dd>
                </div>
                <div className="spec-row">
                  <dt className="label-mono">Links</dt>
                  <dd className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <Link
                      href={`/projects/${project.id}`}
                      className="font-medium underline decoration-border underline-offset-4 hover:decoration-signal"
                    >
                      Case study
                    </Link>
                    <ProjectLinks project={project} />
                    {posts.length > 0 && (
                      <Link
                        href={`/projects/${project.id}#flight-log`}
                        className="label-mono transition-colors hover:text-foreground"
                      >
                        {posts.length} {posts.length === 1 ? "write-up" : "write-ups"} →
                      </Link>
                    )}
                  </dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
