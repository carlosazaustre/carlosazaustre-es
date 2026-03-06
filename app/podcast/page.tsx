import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
    images: [{ url: OG_IMAGE, width: 1280, height: 720, alt: "¿Qué TECH Cuentas? Podcast" }],
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
    topic: "Developer advocacy, networking, T-Shape skills y trabajo desde Dubái",
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
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://carlosazaustre.es" },
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeListLd) }} />

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
            /podcast
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
            ¿Qué TECH Cuentas? — Podcast
          </h1>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                lineHeight: 1.6,
                maxWidth: "560px",
                margin: 0,
              }}
            >
              Conversaciones con referentes del sector tech en España. Tecnología,
              programación, emprendimiento e innovación — sin filtros.{" "}
              <strong style={{ color: "var(--text)" }}>{episodes.length} episodios.</strong>
            </p>

            {/* RSS feed link */}
            <a
              href="/podcast.xml"
              title="Feed RSS del podcast"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                background: "#ff6600",
                border: "2px solid var(--border)",
                borderRadius: "4px",
                padding: "6px 12px",
                boxShadow: "3px 3px 0 var(--border)",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
              </svg>
              RSS Feed
            </a>
          </div>
        </div>

        {/* Episodes list */}
        <ol
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: 0, listStyle: "none" }}
          aria-label="Episodios del podcast"
        >
          {episodes.map((ep) => (
            <li key={ep.slug}>
              <Link
                href={`/podcast/${ep.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <article
                  className="neo-card podcast-card-grid"
                  style={{
                    padding: 0,
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: "280px 1fr",
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ position: "relative", aspectRatio: "16/9" }}>
                    <Image
                      src={`https://img.youtube.com/vi/${ep.videoId}/mqdefault.jpg`}
                      alt={`Episodio ${ep.num} — ${ep.topic}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="280px"
                      unoptimized
                    />
                    {/* Episode badge */}
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
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        boxShadow: "2px 2px 0 var(--border)",
                      }}
                    >
                      Ep. {String(ep.num).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: "var(--text-muted)",
                          marginBottom: "0.4rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        con {ep.guest}
                      </p>

                      <h2
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 800,
                          fontSize: "1.2rem",
                          lineHeight: 1.3,
                          color: "var(--text)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {ep.title}
                      </h2>

                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.9rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {ep.guestRole}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "2px solid var(--border)",
                        paddingTop: "0.75rem",
                        marginTop: "1rem",
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
                        {formatDate(ep.date)}
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
                        Ver episodio →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
