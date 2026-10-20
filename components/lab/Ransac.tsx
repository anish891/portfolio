"use client";

import { useMemo, useState } from "react";

const W = 600;
const H = 320;
const PAD = 24;
const GOOD_POINTS = 28;
const THRESHOLD = 6; // inlier distance, in y units

interface Pt {
  x: number;
  y: number;
}

/** Small deterministic PRNG so the demo looks the same on server and client. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makePoints(seed: number, outliers: number): Pt[] {
  const rand = mulberry32(seed);
  const pts: Pt[] = [];
  for (let i = 0; i < GOOD_POINTS; i++) {
    const x = rand() * 100;
    pts.push({ x, y: 0.8 * x + 10 + (rand() - 0.5) * 8 });
  }
  for (let i = 0; i < outliers; i++) {
    pts.push({ x: rand() * 100, y: rand() > 0.5 ? 70 + rand() * 30 : rand() * 15 });
  }
  return pts;
}

function ols(pts: Pt[]) {
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p.x, 0) / n;
  const my = pts.reduce((s, p) => s + p.y, 0) / n;
  let num = 0;
  let den = 0;
  for (const p of pts) {
    num += (p.x - mx) * (p.y - my);
    den += (p.x - mx) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  return { slope, intercept: my - slope * mx };
}

function ransac(pts: Pt[], seed: number) {
  const rand = mulberry32(seed + 1);
  let best: Pt[] = [];
  for (let iter = 0; iter < 150; iter++) {
    const a = pts[Math.floor(rand() * pts.length)];
    const b = pts[Math.floor(rand() * pts.length)];
    if (a.x === b.x) continue;
    const slope = (b.y - a.y) / (b.x - a.x);
    const intercept = a.y - slope * a.x;
    const inliers = pts.filter((p) => Math.abs(p.y - (slope * p.x + intercept)) < THRESHOLD);
    if (inliers.length > best.length) best = inliers;
  }
  return { line: ols(best.length >= 2 ? best : pts), inliers: new Set(best) };
}

const sx = (x: number) => PAD + (x / 100) * (W - 2 * PAD);
const sy = (y: number) => H - PAD - (y / 100) * (H - 2 * PAD);

export function Ransac() {
  const [seed, setSeed] = useState(7);
  const [outliers, setOutliers] = useState(8);

  const { pts, plain, robust, inliers } = useMemo(() => {
    const pts = makePoints(seed, outliers);
    const fit = ransac(pts, seed);
    return { pts, plain: ols(pts), robust: fit.line, inliers: fit.inliers };
  }, [seed, outliers]);

  const line = (l: { slope: number; intercept: number }) => ({
    x1: sx(0),
    y1: sy(l.intercept),
    x2: sx(100),
    y2: sy(l.slope * 100 + l.intercept),
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <label className="flex items-center gap-3">
          <span className="text-muted-foreground">Wrong cells</span>
          <input
            type="range"
            min={0}
            max={14}
            value={outliers}
            onChange={(e) => setOutliers(Number(e.target.value))}
            className="accent-foreground"
          />
          <span className="w-4 font-mono">{outliers}</span>
        </label>
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="cursor-pointer rounded-md border border-border px-3 py-1.5 transition-colors hover:bg-accent"
        >
          New data
        </button>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Scatter plot comparing a least-squares line and a RANSAC line"
        className="mt-6 w-full rounded-lg border border-border"
      >
        <line {...line(plain)} stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.5} strokeDasharray="5 4" />
        <line {...line(robust)} stroke="currentColor" strokeWidth={2} />
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={sx(p.x)}
            cy={sy(p.y)}
            r={3.5}
            fill={inliers.has(p) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeOpacity={inliers.has(p) ? 1 : 0.6}
          />
        ))}
      </svg>

      <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
        <li>
          <span className="font-mono text-foreground">Solid</span> RANSAC fit: y = {robust.slope.toFixed(2)}x + {robust.intercept.toFixed(1)}
        </li>
        <li>
          <span className="font-mono text-foreground">Dashed</span> least squares: y = {plain.slope.toFixed(2)}x + {plain.intercept.toFixed(1)}
        </li>
        <li>True formula: y = 0.80x + 10.0. Hollow points are the rows RANSAC calls wrong.</li>
      </ul>
    </div>
  );
}
