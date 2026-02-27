import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre JavaScript, TypeScript, arquitectura de software e inteligencia artificial.",
};

export default function BlogPage() {
  const posts = getAllPosts();

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
          /blog
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.1,
            color: "var(--text)",
            maxWidth: "800px",
          }}
        >
          Blog
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              margin: 0,
            }}
          >
            {posts.length} artículo{posts.length !== 1 ? "s" : ""} publicado
            {posts.length !== 1 ? "s" : ""}
          </p>
          <Link
            href="/rss.xml"
            title="Suscribirse al feed RSS"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--text)",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              background: "#ff6600",
              border: "2px solid var(--border)",
              borderRadius: "4px",
              padding: "6px 12px",
              boxShadow: "3px 3px 0 var(--border)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
            </svg>
            <span style={{ color: "white" }}>RSS Feed</span>
          </Link>
        </div>
      </div>

      {/* Empty state */}
      {posts.length === 0 && (
        <div
          className="neo-card"
          style={{
            padding: "3rem",
            textAlign: "center",
            color: "var(--text-muted)",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.9rem",
            }}
          >
            No hay artículos todavía. Vuelve pronto.
          </p>
        </div>
      )}

      {/* Posts grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
