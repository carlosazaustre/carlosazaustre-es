import type { Metadata } from "next";
import Link from "next/link";
import { getPostsByTag, getAllTags } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  if (posts.length === 0) return {};

  return {
    title: `${decoded} — Blog`,
    description: `${posts.length} artículo${posts.length !== 1 ? "s" : ""} sobre ${decoded}. JavaScript, React, TypeScript, arquitectura de software y más por Carlos Azaustre.`,
    openGraph: {
      title: `${decoded} — Carlos Azaustre`,
      description: `${posts.length} artículo${posts.length !== 1 ? "s" : ""} sobre ${decoded} en el blog de Carlos Azaustre.`,
      url: `https://carlosazaustre.es/blog/tag/${tag}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${decoded} — Carlos Azaustre`,
      description: `${posts.length} artículo${posts.length !== 1 ? "s" : ""} sobre ${decoded}.`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  if (posts.length === 0) notFound();

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
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.8rem",
          }}
        >
          <Link
            href="/blog"
            style={{ color: "var(--text-secondary)", textDecoration: "none" }}
          >
            /blog
          </Link>
          <span style={{ color: "var(--text-secondary)" }}>/</span>
          <span
            style={{
              background: "var(--accent)",
              border: "2px solid var(--border)",
              borderRadius: "4px",
              padding: "2px 10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {decoded}
          </span>
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
          {decoded}
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            marginTop: "1rem",
          }}
        >
          {posts.length} artículo{posts.length !== 1 ? "s" : ""} publicado
          {posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Posts grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Back link */}
      <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "2px solid var(--border)" }}>
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "var(--text)",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            background: "var(--card)",
            border: "2px solid var(--border)",
            borderRadius: "4px",
            padding: "8px 16px",
            boxShadow: "3px 3px 0 var(--border)",
          }}
        >
          ← Ver todos los artículos
        </Link>
      </div>
    </div>
  );
}
