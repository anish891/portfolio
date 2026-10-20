"use client";

import { useState } from "react";

const SEED = [118, 124, 121, 130, 126, 119, 128, 123];
const MIN_SAMPLES = 5;
const Z_LIMIT = 3;

interface Row {
  value: number;
  mean: number;
  std: number;
  z: number | null;
  flagged: boolean;
}

/** One pass of Welford's algorithm. Each value is scored against the stats before it. */
function analyse(values: number[]): Row[] {
  let n = 0;
  let mean = 0;
  let m2 = 0;
  return values.map((value) => {
    const std = n > 1 ? Math.sqrt(m2 / (n - 1)) : 0;
    const z = n >= MIN_SAMPLES && std > 0 ? (value - mean) / std : null;
    n += 1;
    const delta = value - mean;
    mean += delta / n;
    m2 += delta * (value - mean);
    return { value, mean, std: n > 1 ? Math.sqrt(m2 / (n - 1)) : 0, z, flagged: z !== null && Math.abs(z) > Z_LIMIT };
  });
}

export function Welford() {
  const [values, setValues] = useState(SEED);
  const [draft, setDraft] = useState("");

  const rows = analyse(values);
  const last = rows[rows.length - 1];

  const add = (v: number) => {
    if (Number.isFinite(v)) setValues([...values, v]);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (draft.trim() === "") return;
          add(Number(draft));
          setDraft("");
        }}
        className="flex flex-wrap items-center gap-2"
      >
        <input
          aria-label="New value"
          type="number"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="e.g. 125"
          className="w-28 rounded-md border border-input bg-transparent px-2 py-1.5 font-mono text-sm outline-none focus-visible:border-ring"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => add(Math.round(last.mean + last.std * 6 + 5))}
          className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
        >
          Add a spike
        </button>
        <button
          type="button"
          onClick={() => setValues(SEED)}
          className="cursor-pointer text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground"
        >
          Reset
        </button>
      </form>

      <p className="mt-6 font-mono text-sm text-muted-foreground">
        n={values.length} · mean {last.mean.toFixed(2)} · std {last.std.toFixed(2)}
      </p>

      <ol className="mt-4 divide-y divide-border/60 text-sm">
        {rows.map((r, i) => (
          <li key={i} className="flex items-baseline justify-between gap-4 py-1.5 font-mono">
            <span className={r.flagged ? "font-semibold text-foreground" : "text-foreground/85"}>
              {r.value}
            </span>
            <span className="text-xs text-muted-foreground">
              {r.z === null ? `warming up (needs ${MIN_SAMPLES})` : `z = ${r.z.toFixed(2)}`}
              {r.flagged && " · unusual"}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
