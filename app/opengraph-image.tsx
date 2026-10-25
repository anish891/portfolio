import { ImageResponse } from "next/og";
import { heroContent, projects } from "@/lib/data";

export const alt = "Anish Tejwani · AI Agents Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#e8edf3";
const MUTED = "#8b96a5";
const SIGNAL = "#f0883e";
const BG = "#0f141b";
const LINE = "rgba(232,237,243,0.06)";

// Order shown on the card: the AI project first, then the other two.
const ORDER = ["graph-sentinel", "chaindeck", "unbake"];

/**
 * Home-page share card: name, role and tagline on the left, a terminal-style list of
 * shipped projects on the right. The bottom-left corner is kept empty on purpose,
 * because X draws its caption bar over that corner of large-image cards.
 */
export default function OpengraphImage() {
  const list = ORDER.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is (typeof projects)[number] => Boolean(p)
  );

  return new ImageResponse(
    (
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
        <div style={{ position: "absolute", top: 36, left: 36, width: 28, height: 28, borderTop: `3px solid ${SIGNAL}`, borderLeft: `3px solid ${SIGNAL}`, display: "flex" }} />
        <div style={{ position: "absolute", bottom: 36, right: 36, width: 28, height: 28, borderBottom: `3px solid ${SIGNAL}`, borderRight: `3px solid ${SIGNAL}`, display: "flex" }} />

        <div style={{ display: "flex", width: "100%", height: "100%", padding: "20px 24px" }}>
          {/* left: identity */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: 600 }}>
            <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: MUTED, letterSpacing: 4, textTransform: "uppercase" }}>
              <div style={{ width: 14, height: 14, background: SIGNAL, marginRight: 16, display: "flex" }} />
              anishtejwani.dev
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginTop: 96 }}>
              <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -2, lineHeight: 1.02 }}>
                {heroContent.name}
              </div>
              <div style={{ display: "flex", fontSize: 32, color: SIGNAL, marginTop: 22, letterSpacing: 1 }}>
                AI Engineer · Agents &amp; Graphs
              </div>
              <div style={{ display: "flex", fontSize: 29, color: MUTED, marginTop: 20, lineHeight: 1.3 }}>
                Tools that find the signal in messy data.
              </div>
            </div>
          </div>

          {/* right: terminal */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "auto",
              alignSelf: "center",
              width: 430,
              border: "1px solid rgba(232,237,243,0.22)",
              background: "rgba(8,11,16,0.75)",
              padding: "26px 28px",
            }}
          >
            <div style={{ display: "flex", fontSize: 22, color: MUTED, letterSpacing: 2 }}>
              $ ls ./projects
            </div>
            {list.map((p) => (
              <div
                key={p.id}
                style={{ display: "flex", alignItems: "center", marginTop: 26, fontSize: 30 }}
              >
                <div style={{ width: 14, height: 14, borderRadius: 7, background: p.deployedUrl ? SIGNAL : MUTED, marginRight: 18, display: "flex" }} />
                <div style={{ display: "flex", flex: 1, color: INK }}>{p.title.replace(/ AI$/, "")}</div>
                <div style={{ display: "flex", fontSize: 20, color: p.deployedUrl ? SIGNAL : MUTED, letterSpacing: 2, textTransform: "uppercase" }}>
                  {p.deployedUrl ? "live" : "src"}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", fontSize: 22, color: SIGNAL, marginTop: 30 }}>
              $ _
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
