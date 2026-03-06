import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getNowPage } from "@/lib/now";
import ArticleContent from "@/components/ArticleContent";

export const metadata: Metadata = {
  title: { absolute: "Ahora — Carlos Azaustre" },
  description:
    "En qué estoy trabajando, aprendiendo y creando en este momento. Una instantánea de lo que ocupa mi cabeza ahora mismo.",
  openGraph: {
    title: "Ahora — Carlos Azaustre",
    description:
      "En qué estoy trabajando, aprendiendo y creando ahora mismo.",
    url: "https://carlosazaustre.es/now",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Ahora — Carlos Azaustre",
    description:
      "En qué estoy trabajando, aprendiendo y creando ahora mismo.",
  },
  alternates: {
    canonical: "https://carlosazaustre.es/now",
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NowPage() {
  const page = await getNowPage();
  if (!page) notFound();

  // Days since last update
  const updatedMs = new Date(page.updatedAt).getTime();
  const diffDays = Math.floor((Date.now() - updatedMs) / (1000 * 60 * 60 * 24));
  const freshLabel =
    diffDays === 0
      ? "hoy"
      : diffDays === 1
      ? "ayer"
      : diffDays < 7
      ? `hace ${diffDays} días`
      : diffDays < 30
      ? `hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? "s" : ""}`
      : `hace ${Math.floor(diffDays / 30)} mes${Math.floor(diffDays / 30) > 1 ? "es" : ""}`;

  const isStale = diffDays > 45;

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Header */}
      <div
        style={{
          borderBottom: "3px solid var(--border)",
          paddingBottom: "2rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "var(--accent)",
            border: "3px solid var(--border)",
            borderRadius: "4px",
            padding: "4px 12px",
            marginBottom: "1rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.8rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          /now
        </div>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: "1.25rem",
          }}
        >
          Ahora
        </h1>

        {/* Last updated badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: isStale ? "#FFF3CD" : "var(--card)",
              border: `2px solid ${isStale ? "#FFC107" : "var(--border)"}`,
              borderRadius: "4px",
              padding: "6px 12px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.78rem",
              fontWeight: 700,
              boxShadow: "2px 2px 0 var(--border)",
            }}
          >
            <span style={{ fontSize: "0.9rem" }}>{isStale ? "⏰" : "🟢"}</span>
            <span>
              Actualizado {freshLabel} — {formatDate(page.updatedAt)}
            </span>
          </div>

          <Link
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              borderBottom: "1px dashed var(--text-muted)",
            }}
          >
            ¿Qué es una página /now?
          </Link>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "72ch" }}>
        <ArticleContent html={page.content} />
      </div>

      {/* Footer note */}
      <div
        style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "2px dashed var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          ¿Quieres saber más sobre mí?{" "}
          <Link
            href="/about"
            style={{
              color: "var(--text)",
              fontWeight: 700,
              textDecoration: "none",
              borderBottom: "2px solid var(--accent)",
            }}
          >
            → Sobre mí
          </Link>
        </p>

        <Link href="/blog" className="neo-btn">
          ← Volver al blog
        </Link>
      </div>
    </div>
  );
}
