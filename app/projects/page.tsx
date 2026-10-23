import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { getPostsForProject } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built: AI agents, analytics dashboards and browser-based tools.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsIndex() {
  return (
    <main id="main" className="container-prose pt-16">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Each one has a case study, and most have write-ups on the blog.
      </p>

      <ul className="mt-10 space-y-12">
        {projects.map((p, index) => {
          const posts = getPostsForProject(p.id);
          return (
            <li key={p.id}>
              {p.image && (
                <Link
                  href={`/projects/${p.id}`}
                  aria-label={`${p.title} case study`}
                  className="relative mb-4 block aspect-[16/9] overflow-hidden rounded-lg border border-border"
                >
                  <Image
                    src={p.image}
                    alt={`${p.title} preview`}
                    fill
                    {...(index === 0 ? { preload: true, fetchPriority: "high" as const } : {})}
                    sizes="(min-width: 672px) 624px, 100vw"
                    className="object-cover"
                  />
                </Link>
              )}
              <h2 className="font-medium tracking-tight">
                <Link
                  href={`/projects/${p.id}`}
                  className="hover:underline hover:decoration-border hover:underline-offset-4"
                >
                  {p.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {p.techStack.join(" · ")}
                {posts.length > 0 && ` · ${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
              </p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
