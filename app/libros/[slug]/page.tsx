import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllBooks, getBookBySlug } from "@/lib/books";
import CitationBlock from "@/components/CitationBlock";

const BASE_URL = "https://carlosazaustre.es";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBooks().map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};

  return {
    title: { absolute: book.seoTitle },
    description: book.seoDescription,
    alternates: {
      canonical: `${BASE_URL}/libros/${book.slug}`,
    },
    openGraph: {
      title: book.seoTitle,
      description: book.seoDescription,
      url: `${BASE_URL}/libros/${book.slug}`,
      type: "book",
      images: [
        {
          url: `${BASE_URL}${book.cover}`,
          width: 400,
          height: 600,
          alt: book.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: book.seoTitle,
      description: book.seoDescription,
      images: [`${BASE_URL}${book.cover}`],
    },
  };
}

function Stars({ value }: { value: number }) {
  return (
    <span aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= Math.round(value) ? "#FFCC00" : "#ccc", fontSize: "1.2rem" }}>
          ★
        </span>
      ))}
    </span>
  );
}

const btnBase: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  border: "3px solid var(--border)",
  borderRadius: "6px",
  padding: "12px 16px",
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.85rem",
  fontWeight: 700,
  textDecoration: "none",
  boxShadow: "3px 3px 0 var(--border)",
};

function BuyButtons({ amazonUS }: { amazonUS: string }) {
  return (
    <a href={amazonUS} target="_blank" rel="noopener noreferrer"
      style={{ ...btnBase, background: "var(--accent)", color: "var(--border)" }}>
      🛒 Comprar en Amazon
    </a>
  );
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const otherBooks = getAllBooks().filter((b) => b.slug !== book.slug);

  const bookLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: "Carlos Azaustre",
      url: BASE_URL,
    },
    isbn: book.isbn,
    image: `${BASE_URL}${book.cover}`,
    description: book.description,
    inLanguage: "es",
    bookFormat: ["https://schema.org/EBook", "https://schema.org/Paperback"],
    publisher: {
      "@type": "Organization",
      name: "Independently Published",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(book.ratingValue),
      reviewCount: String(book.ratingCount),
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: book.amazonUS,
      seller: { "@type": "Organization", name: "Amazon" },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Libros", item: `${BASE_URL}/libros` },
      { "@type": "ListItem", position: 3, name: book.title, item: `${BASE_URL}/libros/${book.slug}` },
    ],
  };

  // Split longDescription into paragraphs
  const paragraphs = book.longDescription.split("\n\n").filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Breadcrumb */}
        <nav
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            marginBottom: "2rem",
          }}
          aria-label="Breadcrumb"
        >
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            Inicio
          </Link>
          {" / "}
          <Link href="/libros" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            Libros
          </Link>
          {" / "}
          <span style={{ color: "var(--text)" }}>{book.title}</span>
        </nav>

        {/* Two-column layout */}
        <div
          className="book-detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* LEFT: Cover + buy buttons */}
          <div style={{ position: "sticky", top: "80px" }}>
            <div
              style={{
                border: "3px solid var(--border)",
                borderRadius: "6px",
                overflow: "hidden",
                boxShadow: "3px 3px 0 var(--border)",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "2/3", width: "100%" }}>
                <Image
                  src={book.cover}
                  alt={`Portada de ${book.title}`}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            </div>

            <BuyButtons amazonUS={book.amazonUS} />

            {book.isbn && (
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.68rem",
                  color: "var(--text-muted)",
                  marginTop: "1rem",
                  textAlign: "center",
                }}
              >
                ISBN: {book.isbn}
              </p>
            )}
          </div>

          {/* RIGHT: Book details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Series badge */}
            {book.series && (
              <div>
                <span
                  style={{
                    display: "inline-block",
                    background: "var(--accent)",
                    border: "2px solid var(--border)",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    boxShadow: "2px 2px 0 var(--border)",
                  }}
                >
                  {book.series} · Vol. {book.seriesNumber}
                </span>
              </div>
            )}

            {/* Title */}
            <div>
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  lineHeight: 1.1,
                  color: "var(--text)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                {book.title}
              </h1>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.15rem",
                  color: "var(--text-secondary)",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {book.subtitle}
              </p>
            </div>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Stars value={book.ratingValue} />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                }}
              >
                {book.ratingValue} ({book.ratingCount} valoraciones)
              </span>
            </div>

            {/* Description paragraphs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* For who */}
            <div
              style={{
                background: "var(--card)",
                border: "3px solid var(--border)",
                borderRadius: "6px",
                padding: "1.25rem",
                boxShadow: "3px 3px 0 var(--border)",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--text)",
                  marginBottom: "0.6rem",
                }}
              >
                ¿Para quién es este libro?
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {book.forWho}
              </p>
            </div>

            {/* Topics checklist */}
            <div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--text)",
                  marginBottom: "0.75rem",
                }}
              >
                Qué aprenderás
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {book.topics.map((topic, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--accent)",
                        fontWeight: 700,
                        fontSize: "1rem",
                        flexShrink: 0,
                        filter: "drop-shadow(0 0 0 var(--border))",
                        WebkitTextStroke: "1px var(--border)",
                      }}
                    >
                      ✓
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    background: "var(--card)",
                    border: "2px solid var(--border)",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    color: "var(--text-secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Repeat buy buttons */}
            <div style={{ borderTop: "3px solid var(--border)", paddingTop: "1.5rem" }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  marginBottom: "0.75rem",
                }}
              >
                Disponible en Amazon en formato digital y papel:
              </p>

              <BuyButtons amazonUS={book.amazonUS} />
            </div>
          </div>
        </div>

        {/* Cómo citar este libro */}
        <CitationBlock
          title={book.title}
          date={book.publishedDate}
          isbn={book.isbn}
          publisher="Amazon KDP"
          url={`${BASE_URL}/libros/${book.slug}`}
        />

        {/* Otros libros */}
        {otherBooks.length > 0 && (
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "3rem",
              borderTop: "3px solid var(--border)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "var(--text)",
                marginBottom: "1.5rem",
              }}
            >
              Otros libros
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {otherBooks.map((other) => (
                <Link
                  key={other.slug}
                  href={`/libros/${other.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1.25rem",
                      alignItems: "center",
                      background: "var(--card)",
                      border: "3px solid var(--border)",
                      boxShadow: "3px 3px 0 var(--border)",
                      borderRadius: "6px",
                      padding: "1rem",
                      transition: "box-shadow 0.1s ease",
                    }}
                  >
                    {/* Cover */}
                    <div
                      style={{
                        position: "relative",
                        width: "64px",
                        height: "96px",
                        flexShrink: 0,
                        border: "2px solid var(--border)",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={other.cover}
                        alt={`Portada de ${other.title}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="64px"
                      />
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1rem", color: "var(--text)", margin: "0 0 0.25rem", lineHeight: 1.2 }}>
                        {other.title}
                      </p>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.82rem", color: "var(--text-secondary)", margin: "0 0 0.5rem", lineHeight: 1.4 }}>
                        {other.subtitle}
                      </p>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", fontWeight: 700, color: "var(--text)" }}>
                        Ver libro →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
