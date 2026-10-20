import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { labEntries } from "@/lib/lab";
import { labDemos } from "@/components/lab";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const missing = labEntries.filter((e) => !labDemos[e.slug]);
  if (missing.length) {
    throw new Error(
      `lib/lab.ts entries without a demo in components/lab/index.tsx: ${missing
        .map((e) => e.slug)
        .join(", ")}`
    );
  }
  return labEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = labEntries.find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: `/lab/${entry.slug}` },
  };
}

export default async function LabPage({ params }: Props) {
  const { slug } = await params;
  const entry = labEntries.find((e) => e.slug === slug);
  const Demo = labDemos[slug];
  if (!entry || !Demo) notFound();

  return (
    <main id="main" className="container-prose pt-16">
      <Link
        href="/lab"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Lab
      </Link>
      <h1 className="mt-8 text-2xl font-semibold tracking-tight">{entry.title}</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">{entry.description}</p>
      <div className="mt-10">
        <Demo />
      </div>
      {entry.post && (
        <p className="mt-12 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          How it works:{" "}
          <Link
            href={`/blog/${entry.post}`}
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            read the write-up
          </Link>
        </p>
      )}
    </main>
  );
}
