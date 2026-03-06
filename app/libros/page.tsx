import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllBooks } from "@/lib/books";

export const metadata: Metadata = {
  title: { absolute: "Libros sobre JavaScript y React | Carlos Azaustre" },
  description:
    "Libros de programación escritos por Carlos Azaustre: Aprendiendo JavaScript, Dominando JavaScript y Aprendiendo React. Disponibles en Amazon.",
  alternates: {
    canonical: "https://carlosazaustre.es/libros",
  },
  openGraph: {
    title: "Libros sobre JavaScript y React | Carlos Azaustre",
    description:
      "Libros de programación escritos por Carlos Azaustre: Aprendiendo JavaScript, Dominando JavaScript y Aprendiendo React. Disponibles en Amazon.",
    url: "https://carlosazaustre.es/libros",
    type: "website",
  },
};

function Stars({ value }: { value: number }) {
  return (
    <span aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= Math.round(value) ? "#FFCC00" : "#ccc" }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function LibrosPage() {
  const books = getAllBooks();

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Libros de Carlos Azaustre",
    url: "https://carlosazaustre.es/libros",
    itemListElement: books.map((book, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://carlosazaustre.es/libros/${book.slug}`,
      name: book.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

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
              textTransform: "uppercase" as const,
              letterSpacing: "1px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            /libros
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
            Libros
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              maxWidth: "560px",
              margin: 0,
            }}
          >
            He escrito {books.length} libros sobre JavaScript y React. Guías prácticas pensadas
            para aprender de verdad — desde cero hasta nivel avanzado.
          </p>
        </div>

        {/* Books grid */}
        <div
          className="books-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {books.map((book) => (
            <article
              key={book.slug}
              className="neo-card"
              style={{
                padding: 0,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                background: "var(--card)",
                border: "3px solid var(--border)",
                boxShadow: "3px 3px 0 var(--border)",
                borderRadius: "6px",
              }}
            >
              {/* Cover — links to book page */}
              <Link
                href={`/libros/${book.slug}`}
                style={{
                  display: "block",
                  position: "relative",
                  aspectRatio: "2/3",
                  width: "100%",
                  borderBottom: "3px solid var(--border)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={book.cover}
                  alt={`Portada de ${book.title}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, 320px"
                />
                {book.series && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      background: "var(--accent)",
                      border: "2px solid var(--border)",
                      borderRadius: "3px",
                      padding: "2px 8px",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      boxShadow: "2px 2px 0 var(--border)",
                      lineHeight: 1.4,
                    }}
                  >
                    #{book.seriesNumber}
                  </div>
                )}
              </Link>

              {/* Content */}
              <div
                style={{
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  gap: "0.6rem",
                }}
              >
                {book.series && (
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.5px",
                      margin: 0,
                    }}
                  >
                    {book.series}
                  </p>
                )}

                <Link
                  href={`/libros/${book.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <h2
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.15rem",
                      lineHeight: 1.2,
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    {book.title}
                  </h2>
                </Link>

                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  {book.subtitle}
                </p>

                {/* Stars + count */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.9rem",
                  }}
                >
                  <Stars value={book.ratingValue} />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    ({book.ratingCount})
                  </span>
                </div>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {book.description}
                </p>

                {/* Buy buttons */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginTop: "0.75rem",
                  }}
                >
                  <a href={book.amazonUS} target="_blank" rel="noopener noreferrer"
                    style={{ display: "block", textAlign: "center", background: "var(--accent)", border: "2px solid var(--border)", borderRadius: "4px", padding: "8px 12px", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", fontWeight: 700, color: "var(--border)", textDecoration: "none", boxShadow: "2px 2px 0 var(--border)" }}>
                    🛒 Comprar en Amazon
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
