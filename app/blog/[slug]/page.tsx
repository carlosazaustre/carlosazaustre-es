import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleContent from "@/components/ArticleContent";
import DisqusComments from "@/components/DisqusComments";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const ogImage = `/api/og?title=${encodeURIComponent(post.title)}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
    <ReadingProgress />
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <article>
        {/* Header */}
        <header
          style={{
            borderBottom: "3px solid var(--border)",
            paddingBottom: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              lineHeight: 1.15,
              color: "var(--text)",
              marginBottom: "1.25rem",
              maxWidth: "900px",
            }}
          >
            {post.title}
          </h1>

          {/* Meta row: date · reading time · tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* Date */}
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {formatDate(post.date)}
            </span>

            {/* Reading time */}
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {post.readingTime} lectura
            </span>

            {/* Tags */}
            {post.tags.length > 0 && (
              <>
                <span style={{ color: "var(--text-muted)", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem" }}>·</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="neo-badge">
                    {tag}
                  </span>
                ))}
              </>
            )}
          </div>
        </header>

        {/* Excerpt highlight */}
        {post.excerpt && (
          <div
            style={{
              background: "var(--accent)",
              border: "3px solid var(--border)",
              borderRadius: "4px",
              padding: "1.25rem 1.5rem",
              marginBottom: "2.5rem",
              boxShadow: "var(--shadow)",
              fontSize: "1.15rem",
              fontWeight: 600,
              lineHeight: 1.6,
              maxWidth: "72ch",
            }}
          >
            {post.excerpt}
          </div>
        )}

        {/* Main content */}
        <ArticleContent html={post.content} />
      </article>

      {/* Bottom nav */}
      <div
        style={{
          borderTop: "3px solid var(--border)",
          marginTop: "3rem",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Link href="/blog" className="neo-btn">
          ← Todos los artículos
        </Link>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* Compartir en X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://carlosazaustre.es/blog/${post.slug}`)}&via=carlosazaustre`}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn"
            style={{ background: "#000000", color: "#ffffff", borderColor: "#000000" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
            </svg>
            Compartir en X
          </a>

          {/* Compartir en LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://carlosazaustre.es/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn"
            style={{ background: "#0A66C2", color: "#ffffff", borderColor: "#0A66C2" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Compartir en LinkedIn
          </a>
        </div>
      </div>

      {/* Comentarios Disqus */}
      <DisqusComments slug={post.slug} title={post.title} />

    </div>
    </>
  );
}
