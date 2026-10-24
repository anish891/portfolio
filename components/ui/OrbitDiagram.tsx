"use client";

import { useEffect, useRef } from "react";

/**
 * A small technical drawing of an orbit: degree ring, three orbital paths and three
 * satellites, one per project ("mission"). Satellites move slowly with SVG animateMotion.
 * For reduced-motion users the animation is paused and the satellites rest on their paths.
 */
export function OrbitDiagram({
  className,
  missions = [],
}: {
  className?: string;
  /** Project names, in orbit order (inner circle, wide ellipse, tight ellipse). */
  missions?: string[];
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const svg = ref.current;
      if (!svg) return;
      if (query.matches) svg.pauseAnimations();
      else svg.unpauseAnimations();
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const ticks = Array.from({ length: 36 }, (_, i) => i * 10);

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      role="img"
      aria-label={
        missions.length
          ? `Diagram of ${missions.length} satellites orbiting a planet, one for each project: ${missions.join(", ")}`
          : "Diagram of satellites orbiting a planet"
      }
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
    >
      {/* degree ring */}
      <circle cx="100" cy="100" r="92" opacity="0.5" />
      {ticks.map((deg) => {
        const major = deg % 90 === 0;
        const len = major ? 8 : deg % 30 === 0 ? 5 : 3;
        const rad = (deg * Math.PI) / 180;
        // Rounded so the server and the browser print identical numbers (no hydration mismatch)
        const pt = (r: number, axis: "x" | "y") =>
          (axis === "x" ? 100 + Math.sin(rad) * r : 100 - Math.cos(rad) * r).toFixed(2);
        const x1 = pt(92, "x");
        const y1 = pt(92, "y");
        const x2 = pt(92 - len, "x");
        const y2 = pt(92 - len, "y");
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} opacity={major ? 0.9 : 0.5} />;
      })}
      {[
        { t: "000", x: 100, y: 6 },
        { t: "090", x: 196, y: 102 },
        { t: "180", x: 100, y: 199 },
        { t: "270", x: 4, y: 102 },
      ].map(({ t, x, y }) => (
        <text
          key={t}
          x={x}
          y={y}
          fill="currentColor"
          stroke="none"
          fontSize="6"
          textAnchor={x > 150 ? "end" : x < 50 ? "start" : "middle"}
          fontFamily="var(--font-mono)"
          opacity="0.6"
        >
          {t}
        </text>
      ))}

      {/* orbital paths */}
      <circle cx="100" cy="100" r="66" strokeDasharray="2 3" opacity="0.7" />
      <g transform="rotate(-25 100 100)">
        <ellipse cx="100" cy="100" rx="80" ry="34" strokeDasharray="2 3" opacity="0.7" />
      </g>
      <g transform="rotate(40 100 100)">
        <ellipse cx="100" cy="100" rx="52" ry="30" strokeDasharray="2 3" opacity="0.7" />
      </g>

      {/* planet with graticule */}
      <circle cx="100" cy="100" r="22" strokeWidth="1" />
      <ellipse cx="100" cy="100" rx="22" ry="7" opacity="0.6" />
      <ellipse cx="100" cy="100" rx="8" ry="22" opacity="0.6" />
      <line x1="78" y1="100" x2="122" y2="100" opacity="0.4" />

      {/* crosshair */}
      <path d="M100 4v-3M100 196v3M4 100H1M196 100h3" opacity="0" />

      {/* satellites: circle = mission 1, square = mission 2, diamond = mission 3 */}
      <circle r="3.2" fill="var(--signal)" stroke="none">
        <animateMotion
          dur="30s"
          repeatCount="indefinite"
          path="M 166 100 A 66 66 0 1 1 34 100 A 66 66 0 1 1 166 100"
        />
      </circle>
      <g transform="rotate(-25 100 100)">
        <rect x="-2.6" y="-2.6" width="5.2" height="5.2" fill="currentColor" stroke="none">
          <animateMotion
            dur="22s"
            repeatCount="indefinite"
            path="M 180 100 A 80 34 0 1 0 20 100 A 80 34 0 1 0 180 100"
          />
        </rect>
      </g>
      <g transform="rotate(40 100 100)">
        <rect
          x="-2.6"
          y="-2.6"
          width="5.2"
          height="5.2"
          transform="rotate(45)"
          fill="currentColor"
          stroke="none"
        >
          <animateMotion
            dur="14s"
            repeatCount="indefinite"
            path="M 152 100 A 52 30 0 1 1 48 100 A 52 30 0 1 1 152 100"
          />
        </rect>
      </g>
    </svg>
  );
}
