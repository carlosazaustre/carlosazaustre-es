import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, Rss } from "lucide-react";
import EditorialSectionHeader from "@/components/editorial-section-header";
import "@/app/sections.css";

const SERIES_TITLE = "¿Qué TECH Cuentas?";
const SERIES_URL = "https://carlosazaustre.es/podcast";
const OG_IMAGE = "https://img.youtube.com/vi/PBLhdPPf5Mo/maxresdefault.jpg";

export const metadata: Metadata = {
  // absolute bypasses the global "%s | Carlos Azaustre" template
  title: { absolute: "¿Qué TECH Cuentas? — Podcast | Carlos Azaustre" },
  description:
    "Podcast de entrevistas sobre tecnología y programación con referentes del sector tech en España: Python, ciberseguridad, open source y developer advocacy.",
  openGraph: {
    title: "¿Qué TECH Cuentas? — Podcast tech con Carlos Azaustre",
    description:
      "Entrevistas con referentes del sector tech en España. Episodios sobre Python, ciberseguridad, open source, NodeJS, developer advocacy y educación digital.",
    url: SERIES_URL,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1280,
        height: 720,
        alt: "¿Qué TECH Cuentas? Podcast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "¿Qué TECH Cuentas? — Podcast tech con Carlos Azaustre",
    description:
      "Entrevistas con referentes del sector tech en España: Python, ciberseguridad, open source, developer advocacy y más.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SERIES_URL,
    types: {
      "application/rss+xml": "https://carlosazaustre.es/podcast.xml",
    },
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const episodes = [
  {
    num: 1,
    slug: "quetechcuentas-01",
    videoId: "PBLhdPPf5Mo",
    title: "Educación digital y emprendimiento con Pau Garcia-Milà",
    guest: "Pau Garcia-Milà",
    guestRole: "Emprendedor, comunicador tech y divulgador",
    topic: "Educación digital, emprendimiento y divulgación tecnológica",
    date: "2023-10-25",
  },
  {
    num: 2,
    slug: "quetechcuentas-02",
    videoId: "0mpfnIko7GQ",
    title: "Python y comunidad open source con Jimena Bermúdez",
    guest: "Jimena Bermúdez",
    guestRole: "Presidenta de Python España, organizadora de PyConES",
    topic: "Python, comunidad open source y trayectoria como desarrolladora",
    date: "2023-11-12",
  },
  {
    num: 3,
    slug: "quetechcuentas-03",
    videoId: "kmwbOCGbmBs",
    title: "Ciberseguridad e IA con Chema Alonso",
    guest: "Chema Alonso",
    guestRole: "Experto en ciberseguridad, ex-CDO de Telefónica",
    topic: "Retos en ciberseguridad, hacking e inteligencia artificial",
    date: "2023-11-29",
  },
  {
    num: 4,
    slug: "quetechcuentas-04",
    videoId: "hUMkv7kXYS8",
    title: "Cómo contribuir a NodeJS y Open Source con Ulises Gascón",
    guest: "Ulises Gascón",
    guestRole: "Principal Engineer & mantenedor de NodeJS y Express",
    topic: "Contribución a proyectos open source y cultura maker",
    date: "2023-12-28",
  },
  {
    num: 5,
    slug: "quetechcuentas-05",
    videoId: "4Inhd7rqhuQ",
    title: "Qué hace un Developer Advocate con Abdallah Abedraba",
    guest: "Abdallah Abedraba",
    guestRole: "Developer Advocate en Zuplo",
    topic:
      "Developer advocacy, networking, T-Shape skills y trabajo desde Dubái",
    date: "2024-01-30",
  },
];

// JSON-LD: PodcastSeries
const podcastSeriesLd = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: SERIES_TITLE,
  url: SERIES_URL,
  description:
    "Podcast de entrevistas sobre tecnología y programación con referentes del sector tech en España.",
  author: {
    "@type": "Person",
    name: "Carlos Azaustre",
    url: "https://carlosazaustre.es",
  },
  inLanguage: "es",
  numberOfEpisodes: episodes.length,
  webFeed: "https://carlosazaustre.es/rss.xml",
};

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
    { "@type": "ListItem", position: 2, name: "Podcast", item: SERIES_URL },
  ],
};

// JSON-LD: ItemList of episodes
const episodeListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Episodios de ${SERIES_TITLE}`,
  itemListElement: episodes.map((ep, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://carlosazaustre.es/podcast/${ep.slug}`,
    name: ep.title,
  })),
};

export default function PodcastPage() {
  const latest = episodes[episodes.length - 1];
  return (
    <div className="editorial-home catalog-page podcast-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeListLd) }}
      />
      <div className="editorial-wrap">
        <EditorialSectionHeader
          title="Podcast"
          action={
            <a href="/podcast.xml" className="quiet-link">
              <Rss aria-hidden="true" /> RSS Feed
            </a>
          }
        >
          <h2>
            ¿Qué TECH
            <br />
            Cuentas<span>?</span>
          </h2>
          <p>
            Conversaciones con referentes del sector tech en España. Tecnología,
            programación, emprendimiento e innovación — sin filtros.{" "}
            <span className="catalog-count">{episodes.length} episodios.</span>
          </p>
        </EditorialSectionHeader>
        <article className="podcast-feature">
          <Link
            href={`/podcast/${latest.slug}`}
            className="podcast-screen"
            aria-label={`Ver episodio ${latest.num}: ${latest.title}`}
          >
            <Image
              src={`https://img.youtube.com/vi/${latest.videoId}/hqdefault.jpg`}
              alt=""
              width={480}
              height={360}
              unoptimized
              preload
            />
            <span className="podcast-play" aria-hidden="true">
              <Play />
            </span>
            <span className="podcast-episode">
              Episodio {String(latest.num).padStart(2, "0")}
            </span>
          </Link>
          <div>
            <p className="catalog-post-meta">
              <time dateTime={latest.date}>{formatDate(latest.date)}</time>
            </p>
            <h2>
              <Link href={`/podcast/${latest.slug}`}>{latest.title}</Link>
            </h2>
            <p>{latest.guestRole}</p>
            <p className="podcast-topic">{latest.topic}</p>
            <Link href={`/podcast/${latest.slug}`} className="solid-link">
              Ver episodio <ArrowUpRight />
            </Link>
          </div>
        </article>
        <section className="podcast-archive" aria-labelledby="episodes-heading">
          <div className="section-heading">
            <h2 id="episodes-heading">
              Más conversaciones<span>.</span>
            </h2>
          </div>
          <ol aria-label="Más episodios del podcast">
            {episodes.slice(0, -1).map((ep) => (
              <li key={ep.slug}>
                <article>
                  <Link
                    href={`/podcast/${ep.slug}`}
                    className="podcast-archive-link"
                  >
                    <div className="podcast-thumbnail">
                      <Image
                        src={`https://img.youtube.com/vi/${ep.videoId}/hqdefault.jpg`}
                        alt=""
                        width={480}
                        height={360}
                        unoptimized
                        loading="lazy"
                      />
                      <span aria-hidden="true">
                        <Play />
                      </span>
                    </div>
                    <div>
                      <div className="catalog-post-meta">
                        <span>Episodio {String(ep.num).padStart(2, "0")}</span>
                        <time dateTime={ep.date}>{formatDate(ep.date)}</time>
                      </div>
                      <h3>{ep.title}</h3>
                      <p>{ep.guestRole}</p>
                      <p className="podcast-topic">{ep.topic}</p>
                    </div>
                    <ArrowUpRight
                      className="catalog-row-arrow"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
