import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://carlosazaustre.es";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas a las preguntas más habituales sobre Carlos Azaustre: quién es, dónde aprender programación con él, sus libros, cursos, el podcast y cómo contactar.",
  openGraph: {
    title: "Preguntas frecuentes — Carlos Azaustre",
    description:
      "Todo lo que sueles preguntarte sobre Carlos Azaustre: formación, libros, cursos, podcast y contacto.",
    url: `${BASE_URL}/faq`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preguntas frecuentes — Carlos Azaustre",
    description:
      "Todo lo que sueles preguntarte sobre Carlos Azaustre: formación, libros, cursos, podcast y contacto.",
  },
  alternates: {
    canonical: `${BASE_URL}/faq`,
  },
};

type FaqItem = { q: string; a: string };
type FaqCategory = { icon: string; title: string; items: FaqItem[] };

const categories: FaqCategory[] = [
  {
    icon: "👋",
    title: "Sobre Carlos",
    items: [
      {
        q: "¿Quién es Carlos Azaustre?",
        a: "Carlos Azaustre es Ingeniero de Software con más de 20 años de experiencia en desarrollo web, Google Developer Expert en Web Technologies y creador de contenido educativo sobre JavaScript, React, Node.js, arquitectura de software e inteligencia artificial. Comparte lo que aprende en su blog, su canal de YouTube y redes sociales, donde suma más de 640.000 seguidores.",
      },
      {
        q: "¿Qué es un Google Developer Expert (GDE)?",
        a: "Un Google Developer Expert es un profesional reconocido por Google por su experiencia técnica demostrada y su labor divulgativa dentro de la comunidad de desarrolladores. Carlos Azaustre es GDE en Web Technologies y también en Firebase, una distinción que Google concede a personas que destacan compartiendo conocimiento sobre tecnologías web.",
      },
      {
        q: "¿En qué tecnologías está especializado?",
        a: "Su especialidad es el desarrollo web con JavaScript y TypeScript: React, Next.js y Node.js en el día a día, además de arquitectura de software (Clean Architecture, Domain-Driven Design), Firebase e inteligencia artificial aplicada al desarrollo.",
      },
    ],
  },
  {
    icon: "🎓",
    title: "Aprender y cursos",
    items: [
      {
        q: "¿Dónde puedo aprender programación con Carlos Azaustre?",
        a: "Puedes aprender gratis en su blog y en su canal de YouTube, donde publica tutoriales y cursos completos sobre desarrollo web. Además imparte clases en la Universidad Europea de Madrid, en BIG School (Máster en Desarrollo con IA) y colabora con la Universitat Oberta de Catalunya (UOC). En la sección de Educación de la web encontrarás sus cursos y formaciones disponibles.",
      },
      {
        q: "¿El contenido es gratuito?",
        a: "Sí. La gran mayoría del contenido (artículos del blog, vídeos de YouTube, el podcast y la newsletter) es totalmente gratuito. De forma puntual ofrece cursos y formaciones de pago más estructurados, que se anuncian en la sección de Educación.",
      },
      {
        q: "¿Qué libros ha escrito Carlos Azaustre?",
        a: "Es autor de tres libros: «Aprendiendo JavaScript» (de cero hasta ECMAScript 6+, uno de los más vendidos de JavaScript en Amazon España), «Aprendiendo React» (React.js desde cero con el ecosistema moderno) y «Dominando JavaScript» (técnicas avanzadas para desarrollo web moderno). Puedes verlos todos en la sección de Libros.",
      },
      {
        q: "¿Da clases en alguna universidad?",
        a: "Sí. Desde 2023 es profesor en la Universidad Europea de Madrid (Grado de Ingeniería Informática y Máster en Desarrollo de Apps Web), profesor en BIG School en el Máster en Desarrollo con IA, y autor técnico y consultor académico en la Universitat Oberta de Catalunya (UOC).",
      },
    ],
  },
  {
    icon: "🎙️",
    title: "Contenido y comunidad",
    items: [
      {
        q: "¿Qué es el podcast «¿Qué TECH Cuentas?»?",
        a: "Es el podcast de Carlos Azaustre, donde conversa sobre tecnología, desarrollo de software, carrera profesional en programación e industria tech. Puedes escuchar todos los episodios en la sección de Podcast de la web y en las principales plataformas.",
      },
      {
        q: "¿Cómo recibo sus publicaciones por email?",
        a: "Puedes suscribirte gratis a su newsletter desde el formulario de suscripción que aparece en la web y en cada artículo del blog. Recibirás los nuevos contenidos, recursos y novedades directamente en tu correo.",
      },
      {
        q: "¿Dónde sigue publicando y dónde puedo seguirle?",
        a: "Publica en su blog (carlosazaustre.es) y está presente en YouTube, X/Twitter, LinkedIn, Instagram, GitHub y Substack, todos bajo el usuario @carlosazaustre.",
      },
    ],
  },
  {
    icon: "✉️",
    title: "Contacto y colaboración",
    items: [
      {
        q: "¿Cómo puedo contactar con Carlos Azaustre?",
        a: "La vía más rápida es a través de sus redes sociales, especialmente X/Twitter y LinkedIn (@carlosazaustre). En la página «Sobre mí» encontrarás más información y enlaces para ponerte en contacto.",
      },
      {
        q: "¿Hace charlas, colaboraciones o mentorías?",
        a: "Sí, participa en charlas, eventos y colaboraciones relacionadas con desarrollo web, JavaScript e inteligencia artificial. Para propuestas, lo mejor es escribirle a través de sus redes sociales o por los canales de contacto que aparecen en la página «Sobre mí».",
      },
    ],
  },
];

const allItems = categories.flatMap((c) => c.items);

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Preguntas frecuentes", item: `${BASE_URL}/faq` },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "3rem",
            borderBottom: "3px solid var(--border)",
            paddingBottom: "2.5rem",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "var(--accent)",
              border: "3px solid var(--border)",
              borderRadius: "4px",
              padding: "4px 12px",
              marginBottom: "1.25rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: "2px 2px 0 var(--border)",
            }}
          >
            /faq
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Preguntas frecuentes
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
            }}
          >
            Respuestas a lo que más se suele preguntar sobre mí, mi contenido, los
            libros, los cursos y cómo ponerte en contacto.
          </p>
        </div>

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {categories.map((cat) => (
            <section key={cat.title}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.25rem",
                  borderBottom: "3px solid var(--border)",
                  paddingBottom: "0.75rem",
                }}
              >
                <span style={{ fontSize: "1.4rem" }}>{cat.icon}</span>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    margin: 0,
                  }}
                >
                  {cat.title}
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {cat.items.map((item) => (
                  <details key={item.q} className="neo-card" style={{ padding: 0 }}>
                    <summary
                      style={{
                        cursor: "pointer",
                        listStyle: "none",
                        padding: "1.1rem 1.25rem",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 800,
                        fontSize: "1rem",
                        color: "var(--text)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <span>{item.q}</span>
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          width: "26px",
                          height: "26px",
                          background: "var(--accent)",
                          border: "2px solid var(--border)",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Space Mono', monospace",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          lineHeight: 1,
                        }}
                      >
                        +
                      </span>
                    </summary>
                    <p
                      style={{
                        margin: 0,
                        padding: "0 1.25rem 1.25rem",
                        fontSize: "0.95rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: "4rem",
            padding: "1.25rem 1.5rem",
            background: "var(--surface)",
            border: "3px solid var(--border)",
            borderRadius: "6px",
            boxShadow: "4px 4px 0 var(--border)",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            💡 ¿No encuentras tu respuesta? Échale un vistazo a la página{" "}
            <Link
              href="/about"
              style={{ color: "var(--text)", borderBottom: "2px solid var(--accent)" }}
            >
              Sobre mí
            </Link>{" "}
            o escríbeme en{" "}
            <a
              href="https://twitter.com/carlosazaustre"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text)", borderBottom: "2px solid var(--accent)" }}
            >
              X/Twitter
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
