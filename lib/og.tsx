import type { ReactElement } from "react";

const INK = "#e8edf3";
const MUTED = "#8b96a5";
const SIGNAL = "#f0883e";
const BG = "#0f141b";
const LINE = "rgba(232,237,243,0.06)";

/**
 * Shared frame for all social share images: dark "console" with a blueprint grid,
 * corner brackets, an orange marker and mono labels.
 */
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
        backgroundImage: `linear-gradient(to right, ${LINE} 1px, transparent 1px), linear-gradient(to bottom, ${LINE} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        color: INK,
        padding: 56,
      }}
    >
      {/* corner brackets */}
      <div style={{ position: "absolute", top: 36, left: 36, width: 28, height: 28, borderTop: `3px solid ${SIGNAL}`, borderLeft: `3px solid ${SIGNAL}`, display: "flex" }} />
      <div style={{ position: "absolute", bottom: 36, right: 36, width: 28, height: 28, borderBottom: `3px solid ${SIGNAL}`, borderRight: `3px solid ${SIGNAL}`, display: "flex" }} />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: MUTED, letterSpacing: 4, textTransform: "uppercase" }}>
          <div style={{ width: 14, height: 14, background: SIGNAL, marginRight: 16, display: "flex" }} />
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
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: MUTED, letterSpacing: 3, textTransform: "uppercase", borderTop: `1px dashed rgba(232,237,243,0.25)`, paddingTop: 20 }}>
          <span>{byline}</span>
          <span>{footer}</span>
        </div>
      </div>
    </div>
  );
}
