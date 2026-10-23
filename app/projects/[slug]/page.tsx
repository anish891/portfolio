import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { getPostsForProject } from "@/lib/blog";
import { PostList } from "@/components/ui/PostList";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHead } from "@/components/ui/Section";
import { ProjectLinks } from "@/components/ui/ProjectLinks";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const posts = getPostsForProject(project.id);
  const paragraphs = project.longDescription.split("\n\n");

  const deployed = !!project.deployedUrl;
  const index = projects.findIndex((p) => p.id === project.id) + 1;

  return (
    <main id="main" className="container-prose pt-14 pb-4">
      <PageHeader
        back={{ href: "/projects", label: "Projects" }}
        kicker={`Mission ${String(index).padStart(2, "0")}`}
        title={project.title}
        description={project.description}
        uppercase={false}
      >
        <dl className="mt-6">
          <div className="spec-row">
            <dt className="label-mono">Status</dt>
            <dd className="flex items-center gap-1.5 font-mono text-xs">
              <span
                className={`size-1.5 rounded-full ${deployed ? "bg-signal" : "border border-muted-foreground"}`}
                aria-hidden
              />
              {deployed ? "Deployed" : "Source only"}
            </dd>
          </div>
          <div className="spec-row">
            <dt className="label-mono">Stack</dt>
            <dd className="font-mono text-xs">{project.techStack.join(" · ")}</dd>
          </div>
          <div className="spec-row">
            <dt className="label-mono">Links</dt>
            <dd>
              <ProjectLinks project={project} />
            </dd>
          </div>
        </dl>
      </PageHeader>

      {project.image && (
        <figure className="mt-10">
          <div className="brackets">
            <div className="relative aspect-[16/9] overflow-hidden border border-border bg-card">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                preload
                fetchPriority="high"
                sizes="(min-width: 672px) 624px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="fig-caption">Fig. 01 · {project.title}</figcaption>
        </figure>
      )}

      <section className="mt-14">
        <SectionHead title="Overview" />
        <div className="prose-minimal">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHead title="Highlights" kicker="key facts" />
        <ul className="space-y-2 text-sm leading-relaxed text-foreground/90">
          {project.features.map((f) => (
            <li key={f} className="flex gap-3">
              <span className="mt-0.5 font-mono text-xs text-signal-ink" aria-hidden>
                [x]
              </span>
              {f}
            </li>
          ))}
        </ul>
      </section>

      {posts.length > 0 && (
        <section id="flight-log" className="mt-14">
          <SectionHead title="Flight log" kicker="write-ups" />
          <PostList posts={posts} />
        </section>
      )}
    </main>
  );
}
