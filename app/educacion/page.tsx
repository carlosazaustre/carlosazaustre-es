import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import EditorialSectionHeader from "@/components/editorial-section-header";
import "@/app/sections.css";
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://carlosazaustre.es",
    },
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
    <div className="editorial-home catalog-page education-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <div className="editorial-wrap">
        <EditorialSectionHeader
          title="Educación"
          action={
            <span className="catalog-count">
              {posts.length} {posts.length === 1 ? "ensayo" : "ensayos"}
            </span>
          }
        >
          <h2>
            Educación
            <br />& eLearning<span>.</span>
          </h2>
          <p>
            Ensayos y reflexiones sobre educación, tecnología educativa y
            pedagogía digital. Desde mi experiencia como profesor universitario
            y creador de contenido educativo, con base en mi investigación en el
            Máster en Educación y TIC (eLearning) de la UOC.
          </p>
        </EditorialSectionHeader>
      </div>
      <section
        className="essay-collection"
        aria-label="Ensayos sobre educación"
      >
        <div className="editorial-wrap">
          {!posts.length ? (
            <p className="catalog-empty">
              Próximamente — ensayos en preparación.
            </p>
          ) : (
            <ol>
              {posts.map((post) => (
                <li key={post.slug}>
                  <article className="essay-entry">
                    <div className="essay-heading">
                      <h2>
                        <Link href={`/educacion/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      <div className="catalog-post-meta">
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                        <span>{post.readingTime} lectura</span>
                      </div>
                    </div>
                    <div className="essay-copy">
                      <p>{post.excerpt}</p>
                      <ul
                        className="catalog-tags"
                        aria-label="Temas del ensayo"
                      >
                        {post.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <Link
                        href={`/educacion/${post.slug}`}
                        className="solid-link"
                      >
                        Leer ensayo <ArrowUpRight />
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </div>
  );
}
