import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLatestVideos } from "@/lib/youtube";
import LinksSubscribeForm from "@/components/LinksSubscribeForm";

export const metadata: Metadata = {
  title: "Carlos Azaustre — Links",
  description: "Todos mis links en un solo lugar.",
};

export default async function LinksPage() {
  const videos = await getLatestVideos(1);
  const latestVideo = videos[0] ?? null;

  return (
    <div style={{ minHeight: "100vh", background: "#F7F7F7", padding: "2rem 1.25rem 4rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>

        {/* ── Profile ── */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1.25rem", marginBottom: "1.25rem" }}>
          {/* Avatar */}
          <div style={{ flexShrink: 0, border: "3px solid #1A1A1A", borderRadius: "4px", boxShadow: "4px 4px 0 #1A1A1A", overflow: "hidden", lineHeight: 0, background: "#FFCC00" }}>
            <Image
              src="/carlos-links.jpg"
              alt="Carlos Azaustre"
              width={96}
              height={96}
              style={{ display: "block", objectFit: "cover", width: 96, height: 96 }}
              priority
            />
          </div>

          {/* Name + handle + icons */}
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.35rem", color: "#1A1A1A", margin: "0 0 2px" }}>
              Carlos Azaustre
            </h1>
            <p style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.75rem", color: "#FFCC00", margin: "0 0 0.6rem",
              background: "#1A1A1A", display: "inline-block", padding: "1px 8px", borderRadius: "3px" }}>
              @carlosazaustre
            </p>
            {/* Social icon row */}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {[
                { href: "https://youtube.com/@carlosazaustre", label: "YouTube", bg: "#FF0000", char: "▶" },
                { href: "https://instagram.com/carlosazaustre", label: "Instagram", bg: "#E1306C", char: "◉" },
                { href: "https://twitter.com/carlosazaustre", label: "X", bg: "#000", char: "𝕏" },
                { href: "https://tiktok.com/@carlosazaustre", label: "TikTok", bg: "#010101", char: "♪" },
                { href: "https://linkedin.com/in/carlosazaustre", label: "LinkedIn", bg: "#0A66C2", char: "in" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  style={{ width: 28, height: 28, background: s.bg, border: "2px solid #1A1A1A", borderRadius: "4px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", fontWeight: 700, color: "#fff",
                    textDecoration: "none", boxShadow: "2px 2px 0 #1A1A1A", flexShrink: 0 }}>
                  {s.char}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "0", marginBottom: "1rem", border: "3px solid #1A1A1A", borderRadius: "4px",
          boxShadow: "4px 4px 0 #1A1A1A", overflow: "hidden", background: "#fff" }}>
          {[
            { value: "640k", label: "seguidores" },
            { value: "15+", label: "años de experiencia" },
            { value: "GDE", label: "Google" },
            { value: "MVP", label: "Microsoft" },
          ].map((s, i) => (
            <div key={s.label} style={{ flex: 1, textAlign: "center", padding: "0.6rem 0.5rem",
              borderLeft: i > 0 ? "3px solid #1A1A1A" : "none" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#1A1A1A" }}>{s.value}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "#666", marginTop: "1px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bio */}
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem", color: "#444", lineHeight: 1.65,
          marginBottom: "1.75rem", padding: "0.875rem 1rem", background: "#fff",
          border: "3px solid #1A1A1A", borderRadius: "4px", boxShadow: "4px 4px 0 #1A1A1A" }}>
          Ingeniero de software, profesor asociado en la Universidad Europea y creador de contenido educativo sobre JavaScript, arquitectura de software e IA.
        </p>

        {/* ── FEATURED: Curso IA ── */}
        <a
          href="https://thebigschool.com/sp/curso-de-desarrollo-ia-a-ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="links-btn"
          style={{ display: "block", textDecoration: "none", marginBottom: "1.75rem" }}
        >
          <div style={{
            background: "#FFCC00",
            border: "3px solid #1A1A1A",
            borderRadius: "4px",
            boxShadow: "5px 5px 0 #1A1A1A",
            padding: "1rem 1.125rem",
          }}>
            {/* Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
              <span style={{
                background: "#1A1A1A", color: "#FFCC00",
                fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "1px",
                padding: "2px 8px", borderRadius: "3px",
              }}>
                🔥 Gratis · 10-12 marzo
              </span>
            </div>
            {/* Title */}
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
              fontSize: "1.05rem", color: "#1A1A1A", lineHeight: 1.25, marginBottom: "0.4rem",
            }}>
              Curso de Desarrollo con IA
            </div>
            {/* Sub */}
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
              color: "#444", lineHeight: 1.5, marginBottom: "0.75rem",
            }}>
              Con Big School y MoureDev · Online y con certificado
            </div>
            {/* CTA */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: "#1A1A1A", color: "#FFCC00",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "0.85rem",
              padding: "0.45rem 1rem", borderRadius: "3px",
              border: "2px solid #1A1A1A",
            }}>
              Apuntarse gratis →
            </div>
          </div>
        </a>

        {/* ── Section: Comunidad ── */}
        <SectionHeader>Comunidad</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1rem" }}>
          <LinkButton href="https://t.me/+rJz-Xkb2xlg2M2Nk" bg="#2AABEE" emoji="✈" title="Canal de Telegram" sub="Noticias y recursos sobre JavaScript e IA" />
        </div>

        {/* ── Section: Newsletter ── */}
        <SectionHeader>Newsletter</SectionHeader>
        <div style={{ marginBottom: "1.75rem" }}>
          <LinksSubscribeForm />
        </div>

        {/* ── Section: Aprende ── */}
        <SectionHeader>Aprende</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem" }}>
          <LinkButton href="https://aprendiendo.dev" bg="#FFCC00" textColor="#1A1A1A" emoji="&lt;/&gt;" title="aprendiendo.dev" sub="Cursos de programación · acceso de por vida" accent />
          {latestVideo && (
            <LinkButton href={latestVideo.url} bg="#FF0000" emoji="▶" title={latestVideo.title} sub={`Último vídeo · ${new Date(latestVideo.published).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}`} thumbnail={latestVideo.thumbnail} />
          )}
          <LinkButton href="https://amzn.to/3tDLkMp" bg="#FF9900" textColor="#1A1A1A" emoji="📖" title="Aprendiendo JavaScript" sub="Libro · Amazon España" cover="/book-aprendiendo-javascript.jpg" />
          <LinkButton href="https://amzn.to/3NQJXj8" bg="#FF9900" textColor="#1A1A1A" emoji="📖" title="Dominando JavaScript" sub="Libro · Amazon España" cover="/book-dominando-javascript.jpg" />
          <LinkButton href="https://leanpub.com/aprendiendo-react" bg="#61DAFB" textColor="#1A1A1A" emoji="⚛" title="Aprendiendo React" sub="Libro · LeanPub" cover="/book-aprendiendo-react.jpg" />
        </div>

        {/* ── Section: Más ── */}
        <SectionHeader>Más</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2rem" }}>
          <LinkButton href="/uses" bg="#1A1A1A" emoji="⚙" title="/uses — Mi setup" sub="Hardware, software y herramientas que uso" isInternal />
          <LinkButton href="/blog" bg="#1A1A1A" emoji="✍" title="/blog — Artículos" sub="Tutoriales y reflexiones sobre desarrollo web" isInternal />
        </div>

        {/* ── Section: Partners ── */}
        <SectionHeader>Mis partners</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>

          {/* Elgato */}
          <div style={{
            background: "#fff", border: "3px solid #1A1A1A", borderRadius: "4px",
            boxShadow: "4px 4px 0 #1A1A1A", padding: "1rem 1.125rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
              <div style={{
                width: 40, height: 40, background: "#fff", border: "2px solid #1A1A1A",
                borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, padding: "6px",
              }}>
                <Image src="/logo-elgato.webp" alt="Elgato" width={28} height={28} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "#1A1A1A" }}>
                  Elgato
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "#888" }}>
                  🚀 Sube de nivel tu setup de creador
                </div>
              </div>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.55, margin: "0 0 0.75rem" }}>
              5% de descuento en todo el catálogo Elgato con mi código:
            </p>
            <div style={{
              background: "#FFCC00", border: "3px solid #1A1A1A", borderRadius: "4px",
              padding: "0.5rem 0.875rem", display: "flex", alignItems: "center", justifyContent: "space-between",
              boxShadow: "3px 3px 0 #1A1A1A",
            }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", letterSpacing: "1px" }}>
                ZZ-CARLOS-AZAUSTRE
              </span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#1A1A1A" }}>
                5% off
              </span>
            </div>
          </div>

          {/* LEAP */}
          <a
            href="https://lp.leap.school/a/carlos?via=youtube"
            target="_blank"
            rel="noopener noreferrer"
            className="links-btn"
            style={{ display: "block", textDecoration: "none" }}
          >
            <div style={{
              background: "#fff", border: "3px solid #1A1A1A", borderRadius: "4px",
              boxShadow: "4px 4px 0 #1A1A1A", padding: "1rem 1.125rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
                <div style={{
                  width: 40, height: 40, background: "#5B4FE8", border: "2px solid #1A1A1A",
                  borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: "1.1rem",
                }}>
                  🇬🇧
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "#1A1A1A" }}>
                    LEAP School
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "#888" }}>
                    Inglés para programadores
                  </div>
                </div>
                <span style={{ color: "#ccc", fontSize: "0.85rem", marginLeft: "auto" }}>→</span>
              </div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.55, margin: 0 }}>
                Aprende inglés técnico diseñado para developers. El inglés que realmente necesitas para crecer en tu carrera.
              </p>
            </div>
          </a>

        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", borderTop: "2px solid #ddd", paddingTop: "1.25rem" }}>
          <Link href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#999",
            textDecoration: "none", textTransform: "uppercase", letterSpacing: "1px" }}>
            carlosazaustre.es ↗
          </Link>
        </div>

      </div>
    </div>
  );
}

/* ── Helpers ── */

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "0.75rem",
      color: "#888", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "0.75rem" }}>
      {children}
    </h2>
  );
}

function LinkButton({
  href, bg, textColor = "#fff", emoji, title, sub, thumbnail, cover, accent, isInternal,
}: {
  href: string; bg: string; textColor?: string; emoji: string;
  title: string; sub: string; thumbnail?: string; cover?: string; accent?: boolean; isInternal?: boolean;
}) {
  const hasMedia = thumbnail || cover;
  const inner = (
    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem",
      padding: hasMedia ? "0.6rem 0.875rem 0.6rem 0.6rem" : "0.75rem 0.875rem",
      background: "#fff", border: "3px solid #1A1A1A", borderRadius: "4px",
      boxShadow: `4px 4px 0 ${accent ? "#FFCC00" : "#1A1A1A"}`,
      textDecoration: "none", width: "100%", boxSizing: "border-box" as const }}>

      {/* Icon / Thumbnail / Cover */}
      {thumbnail ? (
        <div style={{ position: "relative", width: 56, height: 36, flexShrink: 0,
          borderRadius: "3px", overflow: "hidden", border: "2px solid #1A1A1A" }}>
          <Image src={thumbnail} alt={title} fill sizes="56px" style={{ objectFit: "cover" }} unoptimized />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
            <div style={{ width: 16, height: 16, background: "#FF0000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: "0.4rem", marginLeft: "1px" }}>▶</span>
            </div>
          </div>
        </div>
      ) : cover ? (
        <div style={{ width: 32, height: 44, flexShrink: 0, border: "2px solid #1A1A1A",
          borderRadius: "2px", overflow: "hidden", lineHeight: 0, boxShadow: "2px 2px 0 #1A1A1A" }}>
          <Image src={cover} alt={title} width={32} height={44}
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ) : (
        <div style={{ width: 40, height: 40, background: bg, border: "2px solid #1A1A1A",
          borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, fontFamily: "'Space Mono', monospace", fontWeight: 700,
          fontSize: "0.8rem", color: textColor }}>
          {emoji}
        </div>
      )}

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: "0.9rem", color: "#1A1A1A", lineHeight: 1.3,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {title}
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem",
          color: "#888", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {sub}
        </div>
      </div>

      <span style={{ color: "#ccc", fontSize: "0.85rem", flexShrink: 0 }}>→</span>
    </div>
  );

  if (isInternal) {
    return <Link href={href} className="links-btn" style={{ display: "block", textDecoration: "none" }}>{inner}</Link>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="links-btn"
      style={{ display: "block", textDecoration: "none" }}>
      {inner}
    </a>
  );
}
