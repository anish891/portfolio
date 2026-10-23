"use client";

import { useEffect, useState } from "react";
import { heroContent } from "@/lib/data";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Mission-control style status strip: local clock, position and availability. */
export function Telemetry() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: "Local time · IST", value: time ?? "--:--:--" },
    { label: "Position", value: heroContent.coordinates },
    { label: "Status", value: heroContent.status, live: true },
  ];

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border text-sm sm:grid-cols-3">
      {cells.map(({ label, value, live }) => (
        <div key={label} className="bg-card px-3 py-2 first:col-span-2 sm:first:col-span-1">
          <dt className="label-mono">{label}</dt>
          <dd className="mt-0.5 flex items-center gap-1.5 font-mono text-[13px] tabular-nums text-foreground">
            {live && <span className="blink size-1.5 shrink-0 rounded-full bg-signal" aria-hidden />}
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
