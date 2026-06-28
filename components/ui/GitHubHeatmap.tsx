"use client";

import { useEffect, useState } from "react";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Props {
  username: string;
}

// oklch-aware level styles using CSS custom property opacity
const levelStyles = [
  "opacity-[0.07]",  // 0 – empty
  "opacity-25",      // 1 – low
  "opacity-50",      // 2 – medium
  "opacity-75",      // 3 – high
  "opacity-100",     // 4 – max
];

export function GitHubHeatmap({ username }: Props) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [total, setTotal] = useState(0);
  const [yearLabel, setYearLabel] = useState("");
  const [loading, setLoading] = useState(true);

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

  // Compute which columns get a month label (min 3 cols apart to avoid overlap)
  const monthLabels: Map<number, string> = new Map();
  let lastLabelCol = -4;
  weeks.forEach((week, wi) => {
    if (!week[0]) return;
    const d = new Date(week[0].date);
    const prev = wi > 0 && weeks[wi - 1][0] ? new Date(weeks[wi - 1][0].date) : null;
    if ((!prev || prev.getMonth() !== d.getMonth()) && wi - lastLabelCol >= 3) {
      monthLabels.set(
        wi,
        d.toLocaleString("default", { month: "short" }).toUpperCase()
      );
      lastLabelCol = wi;
    }
  });

  if (loading) {
    return (
      <div className="glass rounded-2xl p-4 h-28 animate-pulse" />
    );
  }

  if (contributions.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-4 overflow-hidden">
      {/* Month labels row */}
      <div
        className="flex mb-[3px]"
        style={{ gap: "3px" }}
      >
        {weeks.map((_, wi) => (
          <div
            key={wi}
            className="flex-shrink-0 text-[9px] font-semibold text-muted-foreground/50 leading-none"
            style={{ width: 11 }}
          >
            {monthLabels.get(wi) ?? ""}
          </div>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="flex overflow-x-auto" style={{ gap: "3px" }}>
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col flex-shrink-0" style={{ gap: "3px" }}>
            {Array.from({ length: 7 }).map((_, di) => {
              const day = week[di];
              if (!day) {
                return (
                  <div
                    key={di}
                    style={{ width: 11, height: 11, borderRadius: 2 }}
                    className="bg-primary/5 border border-primary/5"
                  />
                );
              }
              return (
                <div
                  key={di}
                  title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                  style={{ width: 11, height: 11, borderRadius: 2 }}
                  className={`bg-primary border border-primary/30 cursor-default transition-opacity hover:opacity-80 ${levelStyles[day.level]}`}
                />
              );
            })}
          </div>
        ))}
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
              style={{ width: 11, height: 11, borderRadius: 2 }}
              className={`bg-primary border border-primary/30 ${levelStyles[l]}`}
            />
          ))}
          <span className="text-[9px] text-muted-foreground/50 ml-1">MORE</span>
        </div>
      </div>
    </div>
  );
}
