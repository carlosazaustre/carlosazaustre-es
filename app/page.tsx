import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import { getLatestVideos } from "@/lib/youtube";
import SubscribeNewsletter from "@/components/SubscribeNewsletter";

const books = [
  {
    title: "Aprendiendo JavaScript",
    desc: "Desde cero hasta ECMAScript 6+. Uno de los libros de JavaScript más vendidos en Amazon España.",
    url: "https://amzn.to/4tZb96k",
    cover: "/book-aprendiendo-javascript.jpg",
    isbn: "979-8700179263",
  },
  {
    title: "Aprendiendo React",
    desc: "Guía para aprender React.js desde cero con ejemplos reales y el ecosistema moderno.",
    url: "https://amzn.to/4aFSHZ4",
    cover: "/book-aprendiendo-react.jpg",
    isbn: "979-8852737427",
  },
  {
    title: "Dominando JavaScript",
    desc: "Técnicas avanzadas para el desarrollo web moderno. ES2015+ y buenas prácticas.",
    url: "https://amzn.to/4aOMxVe",
    cover: "/book-dominando-javascript.jpg",
    isbn: "979-8338283325",
  },
];

export default async function HomePage() {
  const recentPosts = getAllPosts().slice(0, 6);
  const videos = await getLatestVideos(4);

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Hero */}
      <section
        style={{
          borderBottom: "3px solid var(--border)",
          paddingBottom: "3rem",
          marginBottom: "4rem",
        }}
      >
        {/* Top row: h1 + photo */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "3rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          {/* Left: h1 */}
          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                lineHeight: 1.05,
                color: "var(--text)",
                margin: 0,
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
              y creador de contenido educativo.
            </h1>
          </div>

          {/* Right: photo */}
          <div style={{ flex: "0 0 auto" }}>
            <Image
              src="/carlos-azaustre.png"
              alt="Carlos Azaustre — Ingeniero de Software y creador de contenido educativo"
              width={380}
              height={380}
              style={{ display: "block", maxWidth: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>

        {/* Bottom: description + buttons (full width) */}
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
      </section>

      {/* Newsletter */}
      <SubscribeNewsletter />

      {/* Books */}
      <section style={{ marginBottom: "4rem" }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          Libros publicados
        </h2>

        <div
          className="books-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {books.map((book) => (
            <a
              key={book.title}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-card"
              style={{
                padding: "1.25rem",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {/* Cover */}
              <div
                style={{
                  border: "2px solid var(--border)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  lineHeight: 0,
                }}
              >
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={400}
                  height={533}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {book.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin: 0,
                  flex: 1,
                }}
              >
                {book.desc}
              </p>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                Amazon KDP · ISBN {book.isbn}
              </div>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  borderBottom: "2px solid var(--accent)",
                  alignSelf: "flex-start",
                }}
              >
                Ver libro →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* YouTube */}
      {videos.length > 0 && (
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.5rem" }}>
              Últimos vídeos
            </h2>
            <a
              href="https://youtube.com/@carlosazaustre?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn"
              style={{ fontSize: "0.85rem", background: "#FF0000", color: "#fff", borderColor: "#1A1A1A" }}
            >
              Suscribirse ▶
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {videos.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-card"
                style={{ padding: 0, textDecoration: "none", overflow: "hidden", display: "flex", flexDirection: "column" }}
              >
                {/* Thumbnail */}
                <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000", overflow: "hidden" }}>
                  <Image
                    src={v.thumbnail}
                    alt={v.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                  <div style={{
                    position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0,
                    background: "rgba(0,0,0,0.4)", transition: "opacity 0.2s"
                  }} className="yt-play-overlay">
                    <div style={{ width: 48, height: 48, background: "#FF0000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#fff", fontSize: "1.2rem", marginLeft: 3 }}>▶</span>
                    </div>
                  </div>
                </div>
                {/* Title */}
                <div style={{ padding: "0.85rem 1rem", flex: 1 }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.4, margin: 0 }}>
                    {v.title}
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
                    {new Date(v.published).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* aprendiendo.dev */}
      <section style={{ marginBottom: "4rem" }}>
        <div
          className="neo-card"
          style={{
            padding: "2rem",
            background: "var(--text)",
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
            <div style={{
              display: "inline-block",
              background: "var(--accent)",
              border: "2px solid var(--border)",
              borderRadius: "3px",
              padding: "2px 10px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "1rem",
              boxShadow: "2px 2px 0 var(--border)",
            }}>
              Proyecto principal
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "var(--accent)", marginBottom: "0.75rem", lineHeight: 1.1 }}>
              aprendiendo.dev
            </h2>
            <p style={{ color: "#aaa", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
              Plataforma de cursos de programación con acceso de por vida. Aprende JavaScript, arquitectura de software y desarrollo web moderno a tu ritmo.
            </p>
            <a
              href="https://aprendiendo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn neo-btn-primary"
              style={{ display: "inline-block" }}
            >
              Explorar cursos →
            </a>
          </div>
          <div style={{ flex: "0 0 auto", textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "3rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>
              &lt;/&gt;
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#666", marginTop: "0.5rem" }}>
              learn by doing
            </div>
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
