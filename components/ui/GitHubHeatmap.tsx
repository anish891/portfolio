"use client";

import { useEffect, useRef, useState } from "react";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Props {
  username: string;
}

// Distinct color stops (not opacity steps on one color) so each level
// is actually distinguishable against the glass background, light or dark.
const levelStyles = [
  "bg-primary/[0.06] border-primary/10",   // 0 – empty
  "bg-primary/30 border-primary/30",       // 1 – low
  "bg-primary/55 border-primary/55",       // 2 – medium
  "bg-primary/80 border-primary/80",       // 3 – high
  "bg-primary border-primary",             // 4 – max
];

function formatTooltipDate(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  const month = d.toLocaleString("default", { month: "long" });
  return `${month} ${day}${suffix}`;
}

export function GitHubHeatmap({ username }: Props) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [total, setTotal] = useState(0);
  const [yearLabel, setYearLabel] = useState("");
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<{
    day: Contribution;
    x: number;
    y: number;
  } | null>(null);

  // Measure available width and size cells so all 53 weeks fit with
  // no horizontal scroll, instead of a fixed 11px that overflows.
  const gridWrapRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(11);
  const [gap, setGap] = useState(3);
  const MAX_CELL = 13;
  const MAX_GAP = 3;

  useEffect(() => {
    const el = gridWrapRef.current;
    if (!el) return;

    const compute = (width: number, weekCount: number) => {
      if (weekCount <= 0 || width <= 0) return;
      // Solve for the largest cell+gap pair where gap is always cell/4
      // (proportional spacing) so the grid exactly fills `width` and
      // never overflows, down to arbitrarily narrow containers:
      //   width = weeks*cell + (weeks-1)*(cell/4)
      const raw = width / (weekCount + (weekCount - 1) / 4);
      const cell = Math.max(0.5, Math.min(MAX_CELL, raw));
      const g = Math.min(MAX_GAP, cell / 4);
      setCellSize(Math.floor(cell * 10) / 10);
      setGap(Math.floor(g * 10) / 10);
    };

    const weekCount = Math.ceil(contributions.length / 7) || 53;
    compute(el.clientWidth, weekCount);

    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) compute(w, weekCount);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [contributions.length]);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((r) => r.json())
      .then((data) => {
        const all: Contribution[] = data.contributions ?? [];
        // Take last 371 days (53 full weeks)
        const last = all.slice(-371);
        const sum = last.reduce((acc, c) => acc + c.count, 0);
        const first = last[0]?.date ? new Date(last[0].date) : null;
        const end = last[last.length - 1]?.date
          ? new Date(last[last.length - 1].date)
          : null;
        if (first && end) {
          setYearLabel(
            `${first.getFullYear()}–${String(end.getFullYear()).slice(2)}`
          );
        }
        setContributions(last);
        setTotal(sum);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [username]);

  // Group flat list into weeks (columns of 7 days)
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  // Place a label at the pixel x-position where each month begins.
  // Labels are NOT confined to a single cellSize-wide column (that's
  // what made them illegible at small cell sizes) — they're floated
  // at a fixed readable size and only skipped if they'd visually
  // collide with the previous label, measured in actual pixels.
  const colX = (wi: number) => wi * (cellSize + gap);
  const LABEL_MIN_PX_GAP = 24; // ~width of a 3-letter label at readable size
  const monthLabels: { x: number; text: string }[] = [];
  {
    let lastX = -Infinity;
    weeks.forEach((week, wi) => {
      if (!week[0]) return;
      const d = new Date(week[0].date);
      const prev =
        wi > 0 && weeks[wi - 1][0] ? new Date(weeks[wi - 1][0].date) : null;
      const isMonthChange = !prev || prev.getMonth() !== d.getMonth();
      if (!isMonthChange) return;

      const x = colX(wi);
      if (x - lastX < LABEL_MIN_PX_GAP && monthLabels.length > 0) {
        // Too close to the previous label — replace it rather than
        // drop this month entirely.
        monthLabels.pop();
      }
      monthLabels.push({
        x,
        text: d.toLocaleString("default", { month: "short" }).toUpperCase(),
      });
      lastX = x;
    });
  }

  if (loading) {
    return (
      <div className="glass rounded-2xl p-4 h-28 animate-pulse" />
    );
  }

  if (contributions.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-4 relative">
      {/* Floating tooltip — shows exact count for the hovered day */}
      {hovered && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg bg-popover border border-border px-2.5 py-1.5 text-[11px] font-medium shadow-lg whitespace-nowrap"
          style={{ left: hovered.x, top: hovered.y - 8 }}
        >
          <span className="text-foreground font-bold">
            {hovered.day.count}
          </span>{" "}
          <span className="text-muted-foreground">
            contribution{hovered.day.count !== 1 ? "s" : ""} on{" "}
            {formatTooltipDate(hovered.day.date)}
          </span>
          {/* little pointer triangle */}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-popover" />
        </div>
      )}

      <div ref={gridWrapRef}>
        {/* Month labels row — fixed height, labels float at their
            actual pixel position rather than being squeezed into a
            cellSize-wide column, so they stay legible at any cell size. */}
        <div className="relative h-3 mb-1">
          {monthLabels.map(({ x, text }, i) => (
            <span
              key={i}
              className="absolute top-0 text-[9px] font-semibold text-muted-foreground/60 leading-none whitespace-nowrap"
              style={{ left: x }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Heatmap grid — sized to exactly fill the container, no scroll */}
        <div className="flex" style={{ gap }}>
          {weeks.map((week, wi) => (
            <div
              key={wi}
              className="flex flex-col flex-shrink-0"
              style={{ gap }}
            >
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week[di];
                if (!day) {
                  return (
                    <div
                      key={di}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        borderRadius: 2,
                      }}
                      className="bg-primary/5 border border-primary/5"
                    />
                  );
                }
                return (
                  <div
                    key={di}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parentRect = e.currentTarget
                        .closest(".relative")
                        ?.getBoundingClientRect();
                      if (!parentRect) return;
                      setHovered({
                        day,
                        x: rect.left - parentRect.left + rect.width / 2,
                        y: rect.top - parentRect.top,
                      });
                    }}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: 2,
                    }}
                    className={`border cursor-pointer transition-transform hover:scale-110 ${levelStyles[day.level]}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer — count + legend */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] text-muted-foreground/60 font-medium">
          <span className="text-foreground font-bold">{total.toLocaleString()}</span>{" "}
          CONTRIBUTIONS · {yearLabel}
        </span>
        <div className="flex items-center gap-[3px]">
          <span className="text-[9px] text-muted-foreground/50 mr-1">LESS</span>
          {([0, 1, 2, 3, 4] as const).map((l) => (
            <div
              key={l}
              style={{ width: cellSize, height: cellSize, borderRadius: 2 }}
              className={`border ${levelStyles[l]}`}
            />
          ))}
          <span className="text-[9px] text-muted-foreground/50 ml-1">MORE</span>
        </div>
      </div>
    </div>
  );
}