import type { Metadata } from "next";
import Link from "next/link";
import { getAllEducacionPosts } from "@/lib/educacion";

const SECTION_TITLE = "Educación & eLearning";
const SECTION_URL = "https://carlosazaustre.es/educacion";

export const metadata: Metadata = {
  title: { absolute: "Educación & eLearning | Carlos Azaustre" },
  description:
    "Ensayos y reflexiones sobre educación, tecnología educativa, eLearning y pedagogía digital aplicada a la enseñanza de programación.",
  openGraph: {
    title: "Educación & eLearning — Carlos Azaustre",
    description:
      "Ensayos sobre educación, tecnología educativa, eLearning y pedagogía digital aplicada a la enseñanza de programación.",
    url: SECTION_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Educación & eLearning — Carlos Azaustre",
    description:
      "Ensayos sobre educación, tecnología educativa, eLearning y pedagogía digital.",
  },
  alternates: {
    canonical: SECTION_URL,
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// JSON-LD: BreadcrumbList
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://carlosazaustre.es" },
    { "@type": "ListItem", position: 2, name: "Educación", item: SECTION_URL },
  ],
};

export default function EducacionPage() {
  const posts = getAllEducacionPosts();

  // JSON-LD: ItemList
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: SECTION_TITLE,
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://carlosazaustre.es/educacion/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

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
            /educacion
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              color: "var(--text)",
              marginBottom: "1rem",
            }}
          >
            Educación & eLearning
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              maxWidth: "620px",
              margin: 0,
            }}
          >
            Ensayos y reflexiones sobre educación, tecnología educativa y pedagogía digital.
            Desde mi experiencia como profesor universitario y creador de contenido educativo,
            con base en mi investigación en el Máster en Educación y TIC (eLearning) de la UOC.{" "}
            <strong style={{ color: "var(--text)" }}>
              {posts.length} {posts.length === 1 ? "ensayo" : "ensayos"}.
            </strong>
          </p>
        </div>

        {/* Essays list */}
        {posts.length === 0 ? (
          <p
            style={{
              color: "var(--text-muted)",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.9rem",
              textAlign: "center",
              padding: "3rem 0",
            }}
          >
            Próximamente — ensayos en preparación.
          </p>
        ) : (
          <ol
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: 0, listStyle: "none" }}
            aria-label="Ensayos sobre educación"
          >
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/educacion/${post.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <article
                    className="neo-card"
                    style={{
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    {/* Tags row */}
                    {post.tags.length > 0 && (
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="neo-badge"
                          >
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
                        fontSize: "1.3rem",
                        lineHeight: 1.3,
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "2px solid var(--border)",
                        paddingTop: "0.75rem",
                        marginTop: "0.25rem",
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
                        {formatDate(post.date)} · {post.readingTime} lectura
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
                        Leer ensayo →
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
