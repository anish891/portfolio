"use client";

import { useMemo, useState } from "react";

const STRIKES = [24400, 24450, 24500, 24550, 24600, 24650, 24700];

const SAMPLE = {
  calls: [42, 55, 120, 90, 160, 70, 35],
  puts: [30, 65, 110, 140, 85, 50, 20],
};

/** Pain at every strike in O(n) using prefix/suffix sums (OI in any unit). */
function painBySrike(calls: number[], puts: number[]): number[] {
  const n = STRIKES.length;
  const cOI = new Array(n + 1).fill(0);
  const cOIx = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    cOI[i + 1] = cOI[i] + calls[i];
    cOIx[i + 1] = cOIx[i] + calls[i] * STRIKES[i];
  }
  const pOI = new Array(n + 1).fill(0);
  const pOIx = new Array(n + 1).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    pOI[i] = pOI[i + 1] + puts[i];
    pOIx[i] = pOIx[i + 1] + puts[i] * STRIKES[i];
  }
  return STRIKES.map((K, k) => K * cOI[k] - cOIx[k] + (pOIx[k + 1] - K * pOI[k + 1]));
}

function OiInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <input
      aria-label={label}
      type="number"
      min={0}
      value={value}
      onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
      className="w-full rounded-md border border-input bg-transparent px-2 py-1 text-right font-mono text-sm outline-none focus-visible:border-ring"
    />
  );
}

export function MaxPain() {
  const [calls, setCalls] = useState(SAMPLE.calls);
  const [puts, setPuts] = useState(SAMPLE.puts);

  const pain = useMemo(() => painBySrike(calls, puts), [calls, puts]);
  const max = Math.max(...pain, 1);
  const best = pain.indexOf(Math.min(...pain));

  const set = (arr: number[], i: number, v: number) => arr.map((x, j) => (j === i ? v : x));

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Max Pain strike:{" "}
        <span className="font-mono text-base font-medium text-foreground">{STRIKES[best]}</span>
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[30rem] text-sm">
          <thead>
            <tr className="label-mono text-left">
              <th className="pb-2 pr-3 font-normal">Strike</th>
              <th className="pb-2 pr-3 font-normal">Call OI</th>
              <th className="pb-2 pr-3 font-normal">Put OI</th>
              <th className="pb-2 font-normal">Pain at expiry</th>
            </tr>
          </thead>
          <tbody>
            {STRIKES.map((strike, i) => (
              <tr key={strike} className="border-t border-border/60">
                <td className={`py-2 pr-3 font-mono ${i === best ? "font-semibold" : ""}`}>
                  {strike}
                </td>
                <td className="py-2 pr-3">
                  <OiInput
                    label={`Call open interest at ${strike}`}
                    value={calls[i]}
                    onChange={(v) => setCalls(set(calls, i, v))}
                  />
                </td>
                <td className="py-2 pr-3">
                  <OiInput
                    label={`Put open interest at ${strike}`}
                    value={puts[i]}
                    onChange={(v) => setPuts(set(puts, i, v))}
                  />
                </td>
                <td className="w-1/3 py-2">
                  <div
                    className={`h-2 rounded-full ${i === best ? "bg-foreground" : "bg-border"}`}
                    style={{ width: `${Math.max((pain[i] / max) * 100, 2)}%` }}
                    role="img"
                    aria-label={`Pain at ${strike}: ${pain[i]}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => {
          setCalls(SAMPLE.calls);
          setPuts(SAMPLE.puts);
        }}
        className="mt-4 cursor-pointer text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground"
      >
        Reset to sample data
      </button>
    </div>
  );
}
