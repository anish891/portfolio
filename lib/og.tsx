import type { ReactElement } from "react";

const INK = "#e7e5e4";
const MUTED = "#a8a29e";
const ACCENT = "#fdba74";
const BG = "#161412";
const LINE = "#44403c";

/** Shared frame for all social share images: plain dark card, small label, large title. */
export function ogFrame({
  label,
  title,
  subtitle,
  titleSize = 72,
  byline = "Anish Tejwani",
  footer,
}: {
  label: string;
  title: string;
  subtitle?: string;
  titleSize?: number;
  byline?: string;
  footer: string;
}): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: BG,
        color: INK,
        padding: 56,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: ACCENT, letterSpacing: 3, textTransform: "uppercase" }}>
          {label}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.08 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 30, color: MUTED, marginTop: 20, lineHeight: 1.3 }}>
              {subtitle}
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: MUTED, letterSpacing: 1, borderTop: `1px solid ${LINE}`, paddingTop: 20 }}>
          <span>{byline}</span>
          <span>{footer}</span>
        </div>
      </div>
    </div>
  );
}
