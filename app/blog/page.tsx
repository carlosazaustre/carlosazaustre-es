import type { Metadata } from "next";
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
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
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
          Blog
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
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            marginTop: "1rem",
            maxWidth: "600px",
          }}
        >
          {posts.length} artículo{posts.length !== 1 ? "s" : ""} publicado
          {posts.length !== 1 ? "s" : ""}
        </p>
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
