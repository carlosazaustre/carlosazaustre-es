import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import Image from "next/image";
import { ArrowUpRight, Rss } from "lucide-react";
import EditorialSectionHeader from "@/components/editorial-section-header";
import EditorialPostList from "@/components/editorial-post-list";
import "@/app/sections.css";

export const metadata: Metadata = {
  title: "Blog — JavaScript, React y Arquitectura",
  description:
    "Artículos y tutoriales sobre JavaScript, TypeScript, React, Node.js, arquitectura de software e inteligencia artificial.",
  openGraph: {
    title: "Blog — Carlos Azaustre",
    description:
      "Artículos y tutoriales sobre JavaScript, TypeScript, React, Node.js, arquitectura de software e inteligencia artificial.",
    url: "https://carlosazaustre.es/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Carlos Azaustre",
    description:
      "Artículos y tutoriales sobre JavaScript, TypeScript, React y arquitectura de software.",
  },
  alternates: {
    canonical: "https://carlosazaustre.es/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const [featured, ...archive] = posts;
  return (
    <div className="editorial-home catalog-page">
      <div className="editorial-wrap">
        <EditorialSectionHeader
          title="Blog"
          action={
            <a href="/rss.xml" className="quiet-link">
              <Rss aria-hidden="true" /> RSS Feed
            </a>
          }
        >
          <h2>
            En mi cuaderno<span>.</span>
          </h2>
          <p>
            Artículos y tutoriales sobre JavaScript, TypeScript, React,
            arquitectura de software e inteligencia artificial.{" "}
            <span className="catalog-count">
              {posts.length} artículos publicados.
            </span>
          </p>
        </EditorialSectionHeader>
        {featured && (
          <article className="catalog-feature">
            <div className="catalog-feature-copy">
              <div className="catalog-post-meta">
                <time dateTime={featured.date}>
                  {new Date(featured.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span>{featured.readingTime} lectura</span>
              </div>
              <h2>
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p>{featured.excerpt}</p>
              <Link className="solid-link" href={`/blog/${featured.slug}`}>
                Leer artículo <ArrowUpRight />
              </Link>
            </div>
            {featured.headerImage && (
              <Link
                className="catalog-feature-art"
                href={`/blog/${featured.slug}`}
                aria-label={`Leer: ${featured.title}`}
              >
                <Image
                  src={featured.headerImage}
                  alt={featured.headerImageAlt ?? ""}
                  width={440}
                  height={460}
                  preload
                />
              </Link>
            )}
          </article>
        )}
        <nav className="catalog-topics" aria-label="Artículos por tema">
          <span>De lo que suelo hablar</span>
          {getAllTags()
            .slice(0, 7)
            .map(({ tag }) => (
              <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
                {tag}
              </Link>
            ))}
        </nav>
        <section className="catalog-archive" aria-labelledby="archive-heading">
          <div className="section-heading">
            <h2 id="archive-heading">
              Todo el archivo<span>.</span>
            </h2>
            <span className="catalog-count">
              {archive.length} artículos más
            </span>
          </div>
          <EditorialPostList posts={archive} />
        </section>
      </div>
    </div>
  );
}
