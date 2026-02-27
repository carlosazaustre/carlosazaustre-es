import Image from "next/image";
import type { BookInfo } from "@/lib/book-recommendation";

interface Props {
  book: BookInfo;
}

export default function BookBanner({ book }: Props) {
  return (
    <aside
      aria-label={`Libro recomendado: ${book.title}`}
      style={{
        display: "flex",
        gap: "1.5rem",
        alignItems: "center",
        background: "var(--accent)",
        border: "3px solid var(--border)",
        borderRadius: "8px",
        boxShadow: "6px 6px 0 var(--border)",
        padding: "1.5rem",
        marginTop: "3rem",
        flexWrap: "wrap",
      }}
    >
      {/* Portada */}
      <a
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ flex: "0 0 auto", lineHeight: 0 }}
      >
        <div
          style={{
            border: "3px solid var(--border)",
            borderRadius: "4px",
            boxShadow: "4px 4px 0 var(--border)",
            overflow: "hidden",
            lineHeight: 0,
          }}
        >
          <Image
            src={book.cover}
            alt={`Portada del libro ${book.title}`}
            width={90}
            height={120}
            style={{ display: "block", width: 90, height: "auto" }}
          />
        </div>
      </a>

      {/* Texto */}
      <div style={{ flex: "1 1 200px", minWidth: 0 }}>
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "var(--text)",
            opacity: 0.6,
            marginBottom: "0.3rem",
          }}
        >
          📚 Libro recomendado
        </div>

        {/* Título */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "1.15rem",
            color: "var(--text)",
            lineHeight: 1.2,
            marginBottom: "0.2rem",
          }}
        >
          {book.title}
        </div>

        {/* Subtítulo */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--text)",
            opacity: 0.65,
            marginBottom: "0.6rem",
          }}
        >
          {book.subtitle}
        </div>

        {/* Descripción */}
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text)",
            lineHeight: 1.6,
            margin: "0 0 1rem",
          }}
        >
          {book.description}
        </p>

        {/* CTA */}
        <a
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.82rem",
            fontWeight: 700,
            textDecoration: "none",
            color: "var(--accent)",
            background: "var(--text)",
            border: "2px solid var(--border)",
            borderRadius: "4px",
            padding: "8px 16px",
            boxShadow: "3px 3px 0 var(--border)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {book.cta}
        </a>
      </div>
    </aside>
  );
}
