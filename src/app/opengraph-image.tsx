import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI BREAKING NEWS — 毎朝7:00更新のAIニュース速報";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OGP・Twitter Card用の放送局風シェア画像 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, #12264E, #050A18)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "#E11D2E",
            padding: "10px 28px",
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 8,
          }}
        >
          ● LIVE
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: 12,
            display: "flex",
            gap: 24,
          }}
        >
          <span>AI</span>
          <span style={{ color: "#FF2D3F" }}>BREAKING</span>
          <span>NEWS</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 4,
          }}
        >
          Updated Every Morning at 07:00 JST — 5 Stories a Day
        </div>
      </div>
    ),
    size,
  );
}
