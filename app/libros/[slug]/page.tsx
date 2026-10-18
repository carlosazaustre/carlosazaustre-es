import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllBooks, getBookBySlug } from "@/lib/books";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import BookRating from "@/components/book-rating";
import "@/app/sections.css";
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Libros",
        item: `${BASE_URL}/libros`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: book.title,
        item: `${BASE_URL}/libros/${book.slug}`,
      },
    ],
  };

  // Split longDescription into paragraphs
  const paragraphs = book.longDescription.split("\n\n").filter(Boolean);

  return (
    <div className="editorial-home catalog-page book-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="editorial-wrap">
        <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href="/libros">Libros</Link>
          <span>/</span>
          <span aria-current="page">{book.title}</span>
        </nav>
        <header className="book-detail-hero">
          <figure className="book-detail-cover">
            <Image
              src={book.cover}
              alt={`Portada de ${book.title}`}
              width={533}
              height={800}
              sizes="(max-width: 700px) 60vw, 300px"
              preload
            />
          </figure>
          <div>
            <h1>
              {book.title}
              <span>.</span>
            </h1>
            <p className="book-detail-subtitle">{book.subtitle}</p>
            {book.series && (
              <p className="book-series">
                {book.series} · Vol. {book.seriesNumber}
              </p>
            )}
            <BookRating value={book.ratingValue} count={book.ratingCount} />
            <p className="book-detail-summary">{book.description}</p>
            <a
              href={book.amazonUS}
              className="solid-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar en Amazon <ArrowUpRight />
            </a>
            <p className="book-isbn">ISBN {book.isbn}</p>
          </div>
        </header>
        <div className="book-reading-grid">
          <div className="book-long-description">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <section
              className="book-audience"
              aria-labelledby="audience-heading"
            >
              <h2 id="audience-heading">¿Para quién es este libro?</h2>
              <p>{book.forWho}</p>
            </section>
            <ul className="catalog-tags" aria-label="Temas del libro">
              {book.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="book-availability">
              <p>Disponible en Amazon en formato digital y papel:</p>
              <a
                href={book.amazonUS}
                className="quiet-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprar en Amazon <ArrowUpRight />
              </a>
            </div>
          </div>
          <section className="book-topics" aria-labelledby="topics-heading">
            <h2 id="topics-heading">
              Qué aprenderás<span>.</span>
            </h2>
            <ul>
              {book.topics.map((topic) => (
                <li key={topic}>
                  <Check aria-hidden="true" />
                  {topic}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <CitationBlock
          title={book.title}
          date={book.publishedDate}
          isbn={book.isbn}
          publisher="Amazon KDP"
          url={`${BASE_URL}/libros/${book.slug}`}
        />
        {!!otherBooks.length && (
          <section
            className="book-related"
            aria-labelledby="other-books-heading"
          >
            <h2 id="other-books-heading">
              Otros libros<span>.</span>
            </h2>
            <div>
              {otherBooks.map((other) => (
                <Link key={other.slug} href={`/libros/${other.slug}`}>
                  <Image src={other.cover} alt="" width={64} height={96} />
                  <span>
                    <strong>{other.title}</strong>
                    <span>{other.subtitle}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        )}
        <Link href="/libros" className="catalog-back quiet-link">
          <ArrowLeft /> Todos los libros
        </Link>
      </div>
    </div>
  );
}
