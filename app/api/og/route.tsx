import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Carlos Azaustre";

  // Background as base64
  const bgPath = path.join(process.cwd(), "public/og-background.jpg");
  const bgBase64 = `data:image/jpeg;base64,${fs.readFileSync(bgPath).toString("base64")}`;

  // Font (woff — woff2 not supported by Satori)
  const fontPath = path.join(
    process.cwd(),
    "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff"
  );
  const fontData = fs.readFileSync(fontPath).buffer as ArrayBuffer;

  const fontSize = title.length > 60 ? 52 : title.length > 40 ? 62 : 72;

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
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
        />

        {/* Title area — upper-center-left, with top padding push */}
        <div
          style={{
            position: "absolute",
            top: "140px",
            left: "72px",
            maxWidth: "740px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Yellow accent bar */}
          <div
            style={{
              width: "64px",
              height: "10px",
              background: "#FFCC00",
              border: "3px solid #1a1a1a",
              marginBottom: "24px",
              display: "flex",
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
          </div>
        </div>

        {/* URL — neobrutalist button, bottom right */}
        {/* Shadow layer */}
        <div
          style={{
            position: "absolute",
            bottom: "42px",
            right: "52px",
            background: "#1a1a1a",
            width: "234px",
            height: "48px",
            display: "flex",
            borderRadius: "4px",
          }}
        />
        {/* Button layer */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "56px",
            background: "#FFCC00",
            border: "3px solid #1a1a1a",
            borderRadius: "4px",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "230px",
            height: "48px",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "17px",
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "0.5px",
              display: "flex",
            }}
          >
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
