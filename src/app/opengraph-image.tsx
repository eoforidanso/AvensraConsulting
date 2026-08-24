import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, rendered as a real PNG at build time.
 * Facebook, LinkedIn and X do not render SVG share images, so this is
 * generated rather than shipped as a static asset.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0d1b33 0%, #16294a 55%, #0d1b33 100%)",
          padding: "72px 90px",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="58" height="52" viewBox="0 0 64 56">
            <path d="M32 4 58 52H46L32 25 18 52H6L32 4Z" fill="#c79a44" />
            <circle cx="20.5" cy="41" r="4.2" fill="#c79a44" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, letterSpacing: 12, color: "#ffffff" }}>
              AVENSRA
            </div>
            <div style={{ fontSize: 14, letterSpacing: 7, color: "#c79a44", marginTop: 8 }}>
              STRATEGY. PEOPLE. PERFORMANCE.
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, color: "#ffffff", lineHeight: 1.15 }}>
            Strategy is important.
          </div>
          <div style={{ fontSize: 60, color: "#c79a44", lineHeight: 1.15 }}>
            Alignment is everything.
          </div>
          <div
            style={{
              width: 78,
              height: 3,
              background: "#c79a44",
              marginTop: 34,
              marginBottom: 30,
            }}
          />
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.72)", maxWidth: 780 }}>
            Aligning strategy with the people expected to deliver it.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
