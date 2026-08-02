import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/content/profile";

export const alt = `${profile.name} — ${profile.role} at ${profile.company}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#2B3A3A";
const SAGE = "#7FC8A9";
const PAPER = "#FAFAFA";

/** Satori reads ttf/otf/woff — not woff2, hence the woff copies. */
function loadFont(file: string) {
  return fs.readFileSync(path.join(process.cwd(), "app", "fonts", file));
}

export default async function OpengraphImage() {
  const [regular, bold] = [loadFont("Satoshi-Regular.woff"), loadFont("Satoshi-Bold.woff")];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: INK,
        padding: "72px 80px",
        fontFamily: "Satoshi",
        color: PAPER,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: SAGE,
            color: INK,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          T
        </div>
        {/* Single text node: satori requires display:flex on any element with
            more than one child, and interpolation splits this into three. */}
        <div
          style={{
            fontSize: 22,
            letterSpacing: 2,
            color: SAGE,
            textTransform: "uppercase",
          }}
        >
          {`${profile.role} · ${profile.company}`}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -1.5,
          }}
        >
          {profile.headline}
        </div>
        <div style={{ fontSize: 30, color: "rgba(250,250,250,0.7)" }}>{profile.subline}</div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          color: "rgba(250,250,250,0.6)",
          borderTop: `2px solid ${SAGE}`,
          paddingTop: 24,
        }}
      >
        <span>{profile.name}</span>
        <span>tannmaysgupta.com</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Satoshi", data: regular, weight: 400, style: "normal" },
        { name: "Satoshi", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
