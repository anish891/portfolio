import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { getPostsForProject } from "@/lib/blog";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectLinks } from "@/components/ui/ProjectLinks";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built: AI agents, analytics dashboards and browser-based tools.",
  alternates: { canonical: "/projects" },
};

const categoryLabel = { ai: "AI / agents", web: "Web application", mobile: "Mobile application" } as const;

export default function ProjectsIndex() {
  return (
    <main id="main" className="container-prose pt-14">
      <PageHeader
        kicker="Mission index"
        title="Projects"
        description="Each mission has a case study, and most have write-ups in the flight log."
      />

      <ul className="mt-12 space-y-12">
        {projects.map((p, index) => {
          const posts = getPostsForProject(p.id);
          const deployed = !!p.deployedUrl;
          return (
            <li
              key={p.id}
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
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                <Link href={`/projects/${p.id}`} className="inline-flex items-center gap-1.5 hover:text-signal-ink">
                  {p.title}
                  <ArrowUpRight
                    className="size-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden
                  />
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Key facts">
                {p.proof.map((fact) => (
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
                  <dd className="font-mono text-xs">{categoryLabel[p.category]}</dd>
                </div>
                <div className="spec-row">
                  <dt className="label-mono">Stack</dt>
                  <dd className="font-mono text-xs">{p.techStack.join(" · ")}</dd>
                </div>
                <div className="spec-row">
                  <dt className="label-mono">Links</dt>
                  <dd className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <Link
                      href={`/projects/${p.id}`}
                      className="font-medium underline decoration-border underline-offset-4 hover:decoration-signal"
                    >
                      Case study
                    </Link>
                    <ProjectLinks project={p} />
                    {posts.length > 0 && (
                      <Link
                        href={`/projects/${p.id}#flight-log`}
                        className="label-mono inline-block py-1.5 transition-colors hover:text-foreground"
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
    </main>
  );
}
