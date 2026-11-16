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
    <main id="main" className="wrap flex-1 pt-12">
      <h1 className="page-title">Something went wrong</h1>
      <p className="muted mt-3">
        That page hit an unexpected problem. You can try again, or head back home.
      </p>
      <div className="ui mt-6 flex items-center gap-5">
        <button type="button" onClick={reset} className="button">
          Try again
        </button>
        <Link href="/">← Home</Link>
      </div>
    </main>
  );
}
