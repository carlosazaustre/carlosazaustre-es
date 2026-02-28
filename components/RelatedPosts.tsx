"use client";

import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

interface Props {
  posts: PostMeta[];
}

export default function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section
      style={{
        marginTop: "4rem",
        paddingTop: "2rem",
        borderTop: "3px solid var(--border)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "inline-block",
            background: "var(--accent)",
            border: "2px solid var(--border)",
            borderRadius: "4px",
            padding: "3px 10px",
            marginBottom: "0.75rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          También te puede interesar
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "1.4rem",
            color: "var(--text)",
            margin: 0,
          }}
        >
          Artículos relacionados
        </h2>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none" }}
          >
            <article
              style={{
                background: "var(--card)",
                border: "2px solid var(--border)",
                borderRadius: "6px",
                padding: "1.25rem",
                boxShadow: "4px 4px 0 var(--border)",
                transition: "transform 0.1s ease, box-shadow 0.1s ease",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 var(--border)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 var(--border)";
              }}
            >
              {/* Tags */}
              {post.tags.length > 0 && (
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "var(--text-secondary)",
                        background: "var(--card-elevated)",
                        border: "1px solid var(--border)",
                        borderRadius: "3px",
                        padding: "2px 6px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  lineHeight: 1.3,
                  color: "var(--text)",
                  margin: 0,
                  flex: 1,
                }}
              >
                {post.title}
              </h3>

              {/* Meta */}
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.72rem",
                  color: "var(--text-secondary)",
                  display: "flex",
                  gap: "0.75rem",
                }}
              >
                <span>
                  {new Date(post.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
                <span>{post.readingTime}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
