import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap flex-1 pt-12">
      <p className="label">Error 404</p>
      <h1 className="page-title mt-2">Page not found</h1>
      <p className="muted mt-3">That page doesn&apos;t exist, or it moved.</p>
      <p className="mt-6">
        Try the <Link href="/blog">blog</Link> or <Link href="/projects">projects</Link>.
      </p>
      <p className="ui mt-6">
        <Link href="/">← Home</Link>
      </p>
    </main>
  );
}
