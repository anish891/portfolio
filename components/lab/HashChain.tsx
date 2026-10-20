"use client";

import { useEffect, useState } from "react";

const INITIAL = [
  "alert raised: impossible-travel login for j.doe",
  "agent queried identity -> device -> service graph",
  "risk score 87 computed by policy engine",
  "response proposed: disable session (awaiting approval)",
];

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function buildChain(entries: string[]): Promise<string[]> {
  const hashes: string[] = [];
  let prev = "genesis";
  for (const entry of entries) {
    prev = await sha256(`${prev}|${entry}`);
    hashes.push(prev);
  }
  return hashes;
}

export function HashChain() {
  const [entries, setEntries] = useState(INITIAL);
  const [sealed, setSealed] = useState<string[] | null>(null);
  const [current, setCurrent] = useState<string[] | null>(null);

  // The "recorded" chain: what the audit log stored when each entry was written
  useEffect(() => {
    buildChain(INITIAL).then(setSealed);
  }, []);

  useEffect(() => {
    let cancelled = false;
    buildChain(entries).then((h) => {
      if (!cancelled) setCurrent(h);
    });
    return () => {
      cancelled = true;
    };
  }, [entries]);

  const firstBroken =
    sealed && current ? current.findIndex((h, i) => h !== sealed[i]) : -1;
  const edited = entries.some((e, i) => e !== INITIAL[i]);

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Each entry&apos;s hash covers its text <em>and</em> the previous hash. Edit any line
        and every hash after it stops matching what was recorded.
      </p>

      <ol className="mt-6 space-y-3">
        {entries.map((entry, i) => {
          const broken = firstBroken !== -1 && i >= firstBroken;
          return (
            <li
              key={i}
              className={`rounded-lg border p-3 transition-colors ${
                broken ? "border-destructive/60" : "border-border"
              }`}
            >
              <input
                aria-label={`Audit entry ${i + 1}`}
                value={entry}
                onChange={(e) => setEntries(entries.map((x, j) => (j === i ? e.target.value : x)))}
                className="w-full bg-transparent text-sm outline-none"
              />
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {i + 1}. {current ? current[i].slice(0, 16) : "…"}
                {" · "}
                <span className={broken ? "text-destructive" : ""}>
                  {broken ? (i === firstBroken ? "tampered" : "chain broken") : "verified"}
                </span>
              </p>
            </li>
          );
        })}
      </ol>

      <button
        onClick={() => setEntries(INITIAL)}
        disabled={!edited}
        className="mt-4 cursor-pointer text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground disabled:cursor-default disabled:no-underline disabled:opacity-50"
      >
        Restore original
      </button>
    </div>
  );
}
