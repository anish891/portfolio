import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/data";
import { getPostsForProject } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { ProjectLinks, ProjectWriteUps } from "@/components/ui/ProjectLinks";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Anish Tejwani: an AI security-graph agent, an option-chain analytics dashboard and a browser-based spreadsheet formula recovery tool.",
  path: "/projects",
});

const categoryLabel = { ai: "AI / agents", web: "Web application", mobile: "Mobile application" } as const;

export default function ProjectsIndex() {
  return (
    <main id="main" className="wrap flex-1 pt-12">
      <JsonLd data={breadcrumbs([{ name: "Projects", path: "/projects" }])} />
      <header>
        <h1 className="page-title">Projects</h1>
        <p className="muted mt-3">
          Each project has a case study, and most have write-ups in the blog.
        </p>
      </header>

      <ul className="mt-12 space-y-12">
        {projects.map((p) => (
          <li key={p.id}>
            <h2 className="text-[22px]">
              <Link href={`/projects/${p.id}`}>{p.title}</Link>
            </h2>
            <p className="mt-2">{p.description}</p>
            {p.proof.length > 0 && <p className="ui mt-3">{p.proof.join(" · ")}</p>}
            <p className="ui muted mt-1">
              {categoryLabel[p.category]} · {p.techStack.join(" · ")}
            </p>
            <div className="mt-2">
              <ProjectLinks project={p} caseStudy />
            </div>
            <div className="mt-1">
              <ProjectWriteUps posts={getPostsForProject(p.id)} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
