import type { Metadata } from "next";
import Link from "next/link";
import { labEntries } from "@/lib/lab";
import { formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Lab",
  description: "Small interactive experiments and demos.",
  alternates: { canonical: "/lab" },
};

export default function LabIndex() {
  return (
    <main id="main" className="container-prose pt-16">
      <h1 className="text-2xl font-semibold tracking-tight">Lab</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Small interactive experiments, newest first.
      </p>
      <ul className="mt-10 divide-y divide-border/60">
        {labEntries.map((e) => (
          <li key={e.slug}>
            <Link href={`/lab/${e.slug}`} className="group block py-4 first:pt-0">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-medium tracking-tight group-hover:underline group-hover:decoration-border group-hover:underline-offset-4">
                  {e.title}
                </h2>
                <time dateTime={e.date} className="shrink-0 font-mono text-xs text-muted-foreground">
                  {formatDate(e.date, "short")}
                </time>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
