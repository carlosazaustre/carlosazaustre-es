import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Mi setup — Carlos Azaustre";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const bgPath = path.join(process.cwd(), "public/og-background.jpg");
  const bgBase64 = `data:image/jpeg;base64,${fs.readFileSync(bgPath).toString("base64")}`;

  const fontPath = path.join(
    process.cwd(),
    "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff"
  );
  const fontData = fs.readFileSync(fontPath).buffer as ArrayBuffer;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* Background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgBase64}
          alt=""
          style={{ position: "absolute", top: 0, left: 0, width: "1200px", height: "630px", objectFit: "cover" }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            top: "120px",
            left: "72px",
            maxWidth: "760px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ width: "64px", height: "10px", background: "#FFCC00", border: "3px solid #1a1a1a", marginBottom: "24px", display: "flex" }} />
          <div style={{ fontSize: 72, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.1, letterSpacing: "-1.5px", display: "flex", flexWrap: "wrap" }}>
            Mi setup
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.35, marginTop: "20px", display: "flex", flexWrap: "wrap", opacity: 0.75 }}>
            Hardware, software y herramientas que uso a diario para programar y crear contenido.
          </div>
        </div>

        {/* Button shadow */}
        <div style={{ position: "absolute", bottom: "42px", right: "52px", background: "#1a1a1a", width: "234px", height: "48px", display: "flex", borderRadius: "4px" }} />
        {/* Button */}
        <div style={{ position: "absolute", bottom: "48px", right: "56px", background: "#FFCC00", border: "3px solid #1a1a1a", borderRadius: "4px", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "center", width: "230px", height: "48px" }}>
          <span style={{ fontFamily: "monospace", fontSize: "17px", fontWeight: 700, color: "#1a1a1a", letterSpacing: "0.5px", display: "flex" }}>
            carlosazaustre.es
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Space Grotesk", data: fontData, weight: 700, style: "normal" }],
    }
  );
}
