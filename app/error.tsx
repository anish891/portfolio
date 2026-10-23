"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

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
    <main id="main" className="container-prose pt-14">
      <PageHeader
        kicker="Anomaly detected"
        title="Something went wrong"
        description="That page hit an unexpected problem. You can try again, or head back home."
      />
      <div className="mt-8 flex items-center gap-5 text-sm">
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer rounded-sm border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors hover:border-signal"
        >
          Try again
        </button>
        <Link
          href="/"
          className="label-mono underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-signal"
        >
          ← Back to base
        </Link>
      </div>
    </main>
  );
}
