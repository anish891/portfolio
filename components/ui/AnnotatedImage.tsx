"use client";

import { useState } from "react";
import Image from "next/image";
import { SCREENSHOT_SIZE, type Annotation } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  annotations: Annotation[];
}

/**
 * A screenshot with numbered pins and a matching legend. Hovering, focusing or tapping a pin
 * or a legend row highlights both. The legend always shows the text, so nothing depends on hover.
 */
export function AnnotatedImage({ src, alt, annotations }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const { width, height } = SCREENSHOT_SIZE;

  return (
    <div>
      <div className="brackets">
        <div
          className="relative overflow-hidden border border-border bg-card"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 672px) 624px, 100vw"
            className="object-cover"
          />
          {annotations.map((a, i) => (
            <button
              key={a.title}
              type="button"
              aria-label={`Annotation ${i + 1}: ${a.title}`}
              aria-pressed={active === i}
              data-active={active === i}
              className={cn("pin", active === null && "pin-idle")}
              style={{ left: `${(a.x / width) * 100}%`, top: `${(a.y / height) * 100}%` }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(active === i ? null : i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <ol className="mt-4 divide-y divide-dashed divide-border border-y border-dashed border-border">
        {annotations.map((a, i) => (
          <li
            key={a.title}
            data-active={active === i}
            className="grid grid-cols-[1.75rem_1fr] gap-x-2 px-1 py-2.5 text-sm transition-colors data-[active=true]:bg-accent"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <span className="pt-0.5 font-mono text-xs text-signal-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">{a.title}.</span> {a.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
