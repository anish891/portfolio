import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/data";
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

  return (
    <main id="main" className="container-prose pt-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Projects
      </Link>

      <header className="mt-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-4">
          <ProjectLinks project={project} />
        </div>
      </header>

      {project.image && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-border">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            priority
            sizes="(min-width: 672px) 624px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <section className="prose-minimal mt-10">
        <h2 className="!mt-0">Overview</h2>
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      <section className="prose-minimal mt-10">
        <h2 className="!mt-0">Highlights</h2>
        <ul>
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="label-mono mb-3">Built with</h2>
        <p className="text-sm text-foreground/85">{project.techStack.join(", ")}</p>
      </section>

      {posts.length > 0 && (
        <section className="mt-12 border-t border-border/60 pt-8">
          <h2 className="label-mono mb-4">Write-ups</h2>
          <PostList posts={posts} />
        </section>
      )}
    </main>
  );
}
