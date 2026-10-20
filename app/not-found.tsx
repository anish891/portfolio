import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-prose pt-24">
      <p className="label-mono">404</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        That page doesn&apos;t exist, or it moved. Try the{" "}
        <Link
          href="/blog"
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          blog
        </Link>
        ,{" "}
        <Link
          href="/projects"
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          projects
        </Link>{" "}
        or press <kbd className="rounded border border-border px-1 font-mono text-xs">⌘K</kbd> to
        search.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm underline decoration-border underline-offset-4 hover:decoration-foreground"
      >
        Back home
      </Link>
    </main>
  );
}
