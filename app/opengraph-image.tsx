import { ImageResponse } from "next/og";
import { heroContent, projects } from "@/lib/data";

export const alt = "Anish Tejwani · Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#e7e5e4";
const MUTED = "#a8a29e";
const ACCENT = "#fdba74";
const BG = "#161412";
const LINE = "#44403c";

// Order shown on the card: the AI project first, then the other two.
const ORDER = ["graph-sentinel", "chaindeck", "unbake"];

/**
 * Home-page share card: name, role and tagline on the left, a plain list of
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
          color: INK,
          padding: 56,
        }}
      >
        <div style={{ display: "flex", width: "100%", height: "100%", padding: "20px 24px" }}>
          {/* left: identity */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: 600 }}>
            <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: MUTED, letterSpacing: 1 }}>
              anishtejwani.dev
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginTop: 96 }}>
              <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -2, lineHeight: 1.02 }}>
                {heroContent.name}
              </div>
              <div style={{ display: "flex", fontSize: 32, color: ACCENT, marginTop: 22, letterSpacing: 1 }}>
                Software Engineer
              </div>
              <div style={{ display: "flex", fontSize: 29, color: MUTED, marginTop: 20, lineHeight: 1.3 }}>
                Tools that find the signal in messy data.
              </div>
            </div>
          </div>

          {/* right: project list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "auto",
              alignSelf: "center",
              width: 430,
              borderLeft: `2px solid ${LINE}`,
              padding: "8px 0 8px 36px",
            }}
          >
            <div style={{ display: "flex", fontSize: 22, color: MUTED, letterSpacing: 3, textTransform: "uppercase" }}>
              Projects
            </div>
            {list.map((p) => (
              <div key={p.id} style={{ display: "flex", marginTop: 24, fontSize: 32, color: INK }}>
                {p.title.replace(/ AI$/, "")}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
