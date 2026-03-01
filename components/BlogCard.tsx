import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <article className="neo-card" style={{ padding: "1.5rem" }}>
        {/* Tags */}
        {post.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
              marginBottom: "0.75rem",
            }}
          >
            {post.tags.map((tag) => (
              <span key={tag} className="neo-badge">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "1.35rem",
            lineHeight: 1.2,
            marginBottom: "0.6rem",
            color: "var(--text)",
          }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              marginBottom: "1rem",
            }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid var(--border)",
            paddingTop: "0.75rem",
            marginTop: "auto",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              fontWeight: 700,
            }}
          >
            {formatDate(post.date)}
          </span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.78rem",
              color: "var(--text)",
              fontWeight: 700,
              background: "var(--accent)",
              border: "2px solid var(--border)",
              borderRadius: "2px",
              padding: "2px 8px",
            }}
          >
            {post.readingTime} lectura
          </span>
        </div>
      </article>
    </Link>
  );
}
