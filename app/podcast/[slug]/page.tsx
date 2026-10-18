import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllPodcastPosts,
  getPodcastBySlug,
  getRelatedForPodcast,
} from "@/lib/podcast";
import BlogArticleHeader from "@/components/blog-article-header";
import "@/app/blog/[slug]/article.css";
import "@/app/sections.css";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleContent from "@/components/ArticleContent";
import SubscribeNewsletter from "@/components/SubscribeNewsletter";
import RelatedPosts from "@/components/RelatedPosts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPodcastPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPodcastBySlug(slug);
  if (!post) return {};

  const ogImage = post.videoId
    ? `https://img.youtube.com/vi/${post.videoId}/maxresdefault.jpg`
    : `/api/og?title=${encodeURIComponent(post.title)}`;

  const canonicalUrl = `https://carlosazaustre.es/podcast/${slug}`;
  const metaTitle = post.seoTitle ?? post.title;

  return {
    // Use absolute to bypass the site-wide " | Carlos Azaustre" template
    title: { absolute: metaTitle },
    description: post.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: metaTitle,
      description: post.excerpt,
      type: "article",
      url: canonicalUrl,
      publishedTime: new Date(post.date).toISOString(),
      authors: ["https://carlosazaustre.es/about"],
      images: [{ url: ogImage, width: 1280, height: 720, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function PodcastEpisodePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPodcastBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedForPodcast(post.slug, post.tags, post.related);

  const podcastEpisodeLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    url: `https://carlosazaustre.es/podcast/${post.slug}`,
    image: post.videoId
      ? `https://img.youtube.com/vi/${post.videoId}/maxresdefault.jpg`
      : undefined,
    inLanguage: "es",
    ...(post.episodeNumber ? { episodeNumber: post.episodeNumber } : {}),
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "¿Qué TECH Cuentas?",
      url: "https://carlosazaustre.es/podcast",
    },
    author: {
      "@type": "Person",
      name: "Carlos Azaustre",
      url: "https://carlosazaustre.es",
    },
    keywords: post.tags.join(", "),
  };

  const videoLd = post.videoId
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: post.title,
        description: post.excerpt,
        thumbnailUrl: `https://img.youtube.com/vi/${post.videoId}/maxresdefault.jpg`,
        uploadDate: new Date(post.date).toISOString(),
        embedUrl: `https://www.youtube.com/embed/${post.videoId}`,
        url: `https://www.youtube.com/watch?v=${post.videoId}`,
        inLanguage: "es",
        author: {
          "@type": "Person",
          name: "Carlos Azaustre",
          url: "https://carlosazaustre.es",
        },
      }
    : null;

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
      {
        "@type": "ListItem",
        position: 2,
        name: "Podcast",
        item: "https://carlosazaustre.es/podcast",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://carlosazaustre.es/podcast/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastEpisodeLd) }}
      />
      {videoLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <ReadingProgress />

      <div className="blog-post section-reader">
        <article>
          <Link className="catalog-back" href="/podcast">
            ¿Qué TECH Cuentas?
          </Link>
          <BlogArticleHeader post={post} isPodcast={false} />

          {/* Content */}
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
          <Link href="/podcast" className="neo-btn">
            ← Todos los episodios
          </Link>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://carlosazaustre.es/podcast/${post.slug}`)}&via=carlosazaustre`}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn"
              style={{
                background: "#000000",
                color: "#ffffff",
                borderColor: "#000000",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
              </svg>
              Compartir en X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://carlosazaustre.es/podcast/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn"
              style={{
                background: "#0A66C2",
                color: "#ffffff",
                borderColor: "#0A66C2",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Compartir en LinkedIn
            </a>
          </div>
        </div>

        {/* Related */}
        <RelatedPosts
          posts={relatedPosts}
          sectionTitle="Más episodios y artículos"
        />

        {/* Newsletter */}
        <div style={{ marginTop: "3rem" }}>
          <SubscribeNewsletter />
        </div>

        {/* Sin comentarios en episodios de podcast */}
      </div>
    </>
  );
}
