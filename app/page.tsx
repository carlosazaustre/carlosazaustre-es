import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 6);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Hero */}
      <section
        style={{
          borderBottom: "3px solid var(--border)",
          paddingBottom: "3rem",
          marginBottom: "4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          {/* Left: text */}
          <div style={{ flex: "1 1 380px", minWidth: 0 }}>
            <div
              style={{
                display: "inline-block",
                background: "var(--accent)",
                border: "3px solid var(--border)",
                borderRadius: "4px",
                padding: "4px 12px",
                marginBottom: "1.5rem",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              Google Developer Expert · Web
            </div>

            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                lineHeight: 1.05,
                color: "var(--text)",
                marginBottom: "1.5rem",
              }}
            >
              Hola, soy{" "}
              <span
                style={{
                  background: "var(--accent)",
                  padding: "0 8px",
                  border: "3px solid var(--border)",
                  borderRadius: "4px",
                  boxShadow: "var(--shadow-sm)",
                  whiteSpace: "nowrap",
                }}
              >
                Carlos
              </span>
              .
              <br />
              Ingeniero de Software
              <br />
              y creador de contenido.
            </h1>

            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              20+ años haciendo webs. Escribo sobre JavaScript, TypeScript,
              arquitectura de software e inteligencia artificial.{" "}
              <strong style={{ color: "var(--text)" }}>640k seguidores</strong>{" "}
              en redes, profesor asociado en la Universidad Europea.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/blog" className="neo-btn neo-btn-primary">
                Leer el blog →
              </Link>
              <Link href="/about" className="neo-btn">
                Sobre mí
              </Link>
            </div>
          </div>

          {/* Right: photo */}
          <div style={{ flex: "0 0 auto" }}>
            <Image
              src="/carlos-azaustre.png"
              alt="Carlos Azaustre — Ingeniero de Software y Google Developer Expert"
              width={420}
              height={420}
              style={{ display: "block", maxWidth: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "1.5rem",
              }}
            >
              Últimos artículos
            </h2>
            <Link
              href="/blog"
              className="neo-btn"
              style={{ fontSize: "0.85rem" }}
            >
              Ver todos →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
