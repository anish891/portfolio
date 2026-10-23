import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <main id="main" className="container-prose pt-14">
      <PageHeader
        kicker="Error 404"
        title="Signal lost"
        description="That page doesn't exist, or it moved."
      />
      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Try the{" "}
        <Link
          href="/blog"
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-signal"
        >
          blog
        </Link>
        ,{" "}
        <Link
          href="/projects"
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-signal"
        >
          projects
        </Link>{" "}
        or press <kbd className="rounded-sm border border-border px-1 font-mono text-xs">⌘K</kbd> to
        search.
      </p>
      <Link
        href="/"
        className="label-mono mt-6 inline-block underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-signal"
      >
        ← Back to base
      </Link>
    </main>
  );
}
