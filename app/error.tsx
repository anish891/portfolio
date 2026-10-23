"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container-prose pt-24">
      <p className="label-mono">Error</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        That page hit an unexpected problem. You can try again, or head back home.
      </p>
      <div className="mt-6 flex items-center gap-5 text-sm">
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer rounded-md border border-border px-3 py-1.5 transition-colors hover:border-foreground/40"
        >
          Try again
        </button>
        <Link
          href="/"
          className="underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
