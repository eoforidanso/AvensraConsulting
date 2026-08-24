import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon. iOS does not accept SVG, so this is rendered as PNG. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1b33",
        }}
      >
        <svg width="118" height="104" viewBox="0 0 64 56">
          <path d="M32 4 58 52H46L32 25 18 52H6L32 4Z" fill="#c79a44" />
          <circle cx="20.5" cy="41" r="4.2" fill="#c79a44" />
          <circle cx="20.5" cy="41" r="1.7" fill="#0d1b33" />
        </svg>
      </div>
    ),
    size,
  );
}
