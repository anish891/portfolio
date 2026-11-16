import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, SCREENSHOT_SIZE } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbs, softwareApplication, softwareSourceCode } from "@/lib/schema";
import { getPostsForProject } from "@/lib/blog";
import { PostList } from "@/components/ui/PostList";
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
  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.id}`,
    ownImage: true,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const posts = getPostsForProject(project.id);
  const paragraphs = project.longDescription.split("\n\n");

  return (
    <main id="main" data-wide className="wrap flex-1 pt-10">
      <JsonLd
        data={[
          softwareSourceCode(project),
          ...[softwareApplication(project)].filter((s) => s !== null),
          breadcrumbs([
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.id}` },
          ]),
        ]}
      />
      <article>
        <header>
          <Link href="/projects" className="ui">
            ← All projects
          </Link>
          <h1 className="page-title mt-6">{project.title}</h1>
          <p className="muted mt-3">{project.description}</p>
          <div className="mt-5 space-y-1">
            {project.proof.length > 0 && <p className="ui">{project.proof.join(" · ")}</p>}
            <p className="ui muted">{project.techStack.join(" · ")}</p>
            <ProjectLinks project={project} />
          </div>
        </header>

        <div className="prose mt-10">
          {project.image && (
            <figure>
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                width={SCREENSHOT_SIZE.width}
                height={SCREENSHOT_SIZE.height}
                preload
                fetchPriority="high"
                sizes="(min-width: 768px) 720px, 100vw"
              />
              {project.annotations?.length ? (
                <figcaption>
                  <ol>
                    {project.annotations.map((a) => (
                      <li key={a.title}>
                        <strong>{a.title}.</strong> {a.text}
                      </li>
                    ))}
                  </ol>
                </figcaption>
              ) : null}
            </figure>
          )}

          <h2 id="overview">Overview</h2>
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <h2 id="highlights">Highlights</h2>
          <ul>
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </article>

      {posts.length > 0 && (
        <section id="writing" aria-labelledby="writing-label" className="mt-12 scroll-mt-6">
          <h2 id="writing-label" className="label mb-5">
            Writing
          </h2>
          <PostList posts={posts} />
        </section>
      )}
    </main>
  );
}
