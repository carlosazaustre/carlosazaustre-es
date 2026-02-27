import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLatestVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Carlos Azaustre — Links",
  description: "Todos mis links en un solo lugar.",
};

const socialLinks = [
  {
    label: "YouTube",
    handle: "@carlosazaustre",
    url: "https://youtube.com/@carlosazaustre?sub_confirmation=1",
    bg: "#FF0000",
    color: "#fff",
    emoji: "▶",
  },
  {
    label: "Instagram",
    handle: "@carlosazaustre",
    url: "https://instagram.com/carlosazaustre",
    bg: "#E1306C",
    color: "#fff",
    emoji: "📸",
  },
  {
    label: "X / Twitter",
    handle: "@carlosazaustre",
    url: "https://twitter.com/carlosazaustre",
    bg: "#000",
    color: "#fff",
    emoji: "𝕏",
  },
  {
    label: "TikTok",
    handle: "@carlosazaustre",
    url: "https://tiktok.com/@carlosazaustre",
    bg: "#010101",
    color: "#fff",
    emoji: "♪",
  },
  {
    label: "LinkedIn",
    handle: "in/carlosazaustre",
    url: "https://linkedin.com/in/carlosazaustre",
    bg: "#0A66C2",
    color: "#fff",
    emoji: "in",
  },
];

const lastBook = {
  title: "Aprendiendo JavaScript",
  desc: "El libro de JavaScript más vendido en Amazon España. Desde cero hasta ES6+.",
  url: "https://amzn.to/3tDLkMp",
  cover: "/book-aprendiendo-javascript.jpg",
};

export default async function LinksPage() {
  const videos = await getLatestVideos(1);
  const latestVideo = videos[0] ?? null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F0F0F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2.5rem 1.25rem 4rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* Profile */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-block",
              border: "4px solid #FFCC00",
              borderRadius: "50%",
              boxShadow: "0 0 0 3px #0F0F0F, 0 0 0 6px #FFCC00",
              overflow: "hidden",
              lineHeight: 0,
              marginBottom: "1.25rem",
            }}
          >
            <Image
              src="/carlos-links.jpg"
              alt="Carlos Azaustre"
              width={110}
              height={110}
              style={{ display: "block", objectFit: "cover", borderRadius: "50%" }}
              priority
            />
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "1.4rem",
              color: "#fff",
              margin: "0 0 0.4rem",
            }}
          >
            Carlos Azaustre
          </h1>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.72rem",
              color: "#FFCC00",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              margin: "0 0 0.75rem",
            }}
          >
            Google Developer Expert · Web
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.9rem",
              color: "#999",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Ingeniero de Software · Creador de contenido educativo · 640k seguidores
          </p>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "2px solid #222", marginBottom: "1.75rem" }} />

        {/* Social links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="links-social-btn"
            style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.85rem 1.25rem",
                background: s.bg,
                border: "3px solid #1A1A1A",
                borderRadius: "6px",
                boxShadow: "4px 4px 0 #FFCC00",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: s.color,
                  flexShrink: 0,
                }}
              >
                {s.emoji}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: s.color }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: `${s.color}99`, marginTop: "1px" }}>
                  {s.handle}
                </div>
              </div>
              <span style={{ color: `${s.color}99`, fontSize: "1rem" }}>→</span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "2px solid #222", marginBottom: "1.75rem" }} />

        {/* Latest video */}
        {latestVideo && (
          <div style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem" }}>
              Último vídeo
            </p>
            <a
              href={latestVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                gap: "0.875rem",
                alignItems: "flex-start",
                padding: "0.875rem",
                background: "#1A1A1A",
                border: "3px solid #2A2A2A",
                borderRadius: "6px",
                boxShadow: "4px 4px 0 #FFCC00",
                textDecoration: "none",
              }}
            >
              <div style={{ position: "relative", width: 90, height: 51, flexShrink: 0, borderRadius: "3px", overflow: "hidden", border: "2px solid #333" }}>
                <Image
                  src={latestVideo.thumbnail}
                  alt={latestVideo.title}
                  fill
                  sizes="90px"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)" }}>
                  <div style={{ width: 22, height: 22, background: "#FF0000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: "0.55rem", marginLeft: "2px" }}>▶</span>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#fff", margin: "0 0 0.3rem", lineHeight: 1.35,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {latestVideo.title}
                </p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "#555", margin: 0 }}>
                  {new Date(latestVideo.published).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </a>
          </div>
        )}

        {/* Latest book */}
        <div style={{ marginBottom: "1.75rem" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem" }}>
            Último libro
          </p>
          <a
            href={lastBook.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              gap: "0.875rem",
              alignItems: "flex-start",
              padding: "0.875rem",
              background: "#1A1A1A",
              border: "3px solid #2A2A2A",
              borderRadius: "6px",
              boxShadow: "4px 4px 0 #FFCC00",
              textDecoration: "none",
            }}
          >
            <div style={{ width: 52, flexShrink: 0, border: "2px solid #333", borderRadius: "3px", overflow: "hidden", lineHeight: 0 }}>
              <Image
                src={lastBook.cover}
                alt={lastBook.title}
                width={52}
                height={70}
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff", margin: "0 0 0.3rem", lineHeight: 1.3 }}>
                {lastBook.title}
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#666", margin: "0 0 0.5rem", lineHeight: 1.5 }}>
                {lastBook.desc}
              </p>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", fontWeight: 700, color: "#FFCC00", textTransform: "uppercase", borderBottom: "1px solid #FFCC00" }}>
                Ver en Amazon →
              </span>
            </div>
          </a>
        </div>

        {/* /uses link */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem" }}>
            Mi setup
          </p>
          <Link
            href="/uses"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.875rem 1.25rem",
              background: "#1A1A1A",
              border: "3px solid #FFCC00",
              borderRadius: "6px",
              boxShadow: "4px 4px 0 #FFCC00",
              textDecoration: "none",
            }}
          >
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>
                /uses — Mi setup
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#666", marginTop: "2px" }}>
                Hardware, software y herramientas que uso
              </div>
            </div>
            <span style={{ color: "#FFCC00", fontSize: "1.1rem", marginLeft: "0.5rem" }}>→</span>
          </Link>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              color: "#444",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            carlosazaustre.es →
          </Link>
        </div>

      </div>
    </div>
  );
}
