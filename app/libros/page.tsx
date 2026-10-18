import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HomeBooks from "@/components/home-books";
import EditorialSectionHeader from "@/components/editorial-section-header";
import BookRating from "@/components/book-rating";
import "@/app/sections.css";
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
    <div className="editorial-home catalog-page books-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <div className="editorial-wrap">
        <EditorialSectionHeader
          title="Libros"
          action={
            <span className="catalog-count">
              {books.length} libros publicados
            </span>
          }
        >
          <h2>
            JavaScript.
            <br />
            React. <span className="marker">En papel.</span>
          </h2>
          <p>
            He escrito {books.length} libros sobre JavaScript y React. Guías
            prácticas pensadas para aprender de verdad — desde cero hasta nivel
            avanzado.
          </p>
        </EditorialSectionHeader>
      </div>
      <HomeBooks showIntro={false} />
      <section
        className="book-catalog editorial-wrap"
        aria-label="Catálogo de libros"
      >
        {books.map((book) => (
          <article className="book-catalog-entry" key={book.slug}>
            <div>
              <h2>
                <Link href={`/libros/${book.slug}`}>{book.title}</Link>
              </h2>
              <p className="book-subtitle">{book.subtitle}</p>
              {book.series && (
                <p className="book-series">
                  {book.series} · Vol. {book.seriesNumber}
                </p>
              )}
              <BookRating value={book.ratingValue} count={book.ratingCount} />
            </div>
            <div>
              <p>{book.description}</p>
              <p className="book-isbn">ISBN {book.isbn}</p>
              <div className="catalog-actions">
                <Link href={`/libros/${book.slug}`} className="solid-link">
                  Ver libro <ArrowUpRight />
                </Link>
                <a
                  href={book.amazonUS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiet-link"
                >
                  Comprar en Amazon <ArrowUpRight />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
