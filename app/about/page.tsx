import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Youtube, Instagram, Twitter, Linkedin, Music2, Calendar, PlayCircle, Eye, PenLine, Star, Github } from "lucide-react";
import { getStats } from "@/lib/stats";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Ingeniero en Telemática por la UC3M. Google Developer Expert en Web Technologies, Microsoft MVP. Creador de contenido educativo sobre programación. Profesor en la Universidad Europea y BIG School.",
  openGraph: {
    title: "Sobre mí — Carlos Azaustre",
    description:
      "Ingeniero de Software, Google Developer Expert y creador de contenido educativo. 20+ años haciendo cosas en la web.",
    url: "https://carlosazaustre.es/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre mí — Carlos Azaustre",
    description:
      "Ingeniero de Software, Google Developer Expert y creador de contenido educativo. 20+ años haciendo cosas en la web.",
  },
};

const experience = [
  {
    period: "Presente",
    title: "Profesor Asociado",
    org: "Universidad Europea de Madrid",
    desc: "Grado de Ingeniería Informática: POO en Java, Programación con estructuras lineales en C++ y Desarrollo Web. Máster en Desarrollo de Apps Web: HTML & CSS, JavaScript & TypeScript, React y Backend con Node.js.",
  },
  {
    period: "2025 – Presente",
    title: "Profesor",
    org: "BIG School",
    desc: "Docencia en el Máster en Desarrollo con IA.",
  },
  {
    period: "2022 – Presente",
    title: "Autor técnico y consultor académico",
    org: "Universitat Oberta de Catalunya (UOC)",
    desc: "Revisión y creación de materiales para asignaturas de Programación en JavaScript, Programación Avanzada y la Escuela de Programación (JavaScript Path).",
  },
  {
    period: "2013 – Presente",
    title: "Creador de contenido educativo",
    org: "carlosazaustre.es · YouTube · Redes",
    desc: "Blog, canal de YouTube y redes sociales sobre JavaScript, TypeScript, React, arquitectura de software e IA. Más de 640k seguidores. Google Developer Expert en Web Technologies.",
  },
  {
    period: "2022",
    title: "Senior Frontend Engineer",
    org: "CoCircular",
    desc: "Desarrollo frontend en equipo distribuido con React y TypeScript.",
  },
  {
    period: "2019 – 2020",
    title: "Senior Frontend Engineer",
    org: "Eventbrite",
    desc: "Ingeniero Frontend en el equipo de producto. Desarrollo con React, TypeScript y arquitectura de componentes a escala.",
  },
  {
    period: "2018 – 2019",
    title: "Senior Frontend Engineer",
    org: "IBM Research",
    desc: "Trabajo en remoto con el equipo de investigación de IBM, desarrollando interfaces para proyectos internos de IA y datos.",
  },
  {
    period: "2017 – 2018",
    title: "Developer Relations Engineer",
    org: "Google",
    desc: "Contratado a través de Michael Page para el equipo de Developer Relations de Google en Europa. Coordinación de programas de comunidad tech, charlas, talleres y relaciones con desarrolladores.",
  },
  {
    period: "2013 – 2017",
    title: "Cofundador & CTO",
    org: "Chefly",
    desc: "Cofundé Chefly junto a Paola. Participamos en Tetuan Valley Startup School (Google Campus) y en la Online Startup School de Y Combinator.",
  },
];

const education = [
  {
    period: "2025 – Presente",
    title: "Máster en Educación y TIC (eLearning)",
    org: "Universitat Oberta de Catalunya (UOC)",
    desc: "Cursando a tiempo parcial. Especialización en tecnología educativa, diseño instruccional y aprendizaje en entornos digitales.",
  },
  {
    period: "2012",
    title: "Ingeniería en Telemática",
    org: "Universidad Carlos III de Madrid",
    desc: "Titulación superior en Telemática.",
  },
  {
    period: "2012",
    title: "Ingeniería Técnica de Telecomunicaciones, esp. Telemática",
    org: "Universidad Carlos III de Madrid",
    desc: "Titulación técnica con especialización en Telemática.",
  },
  {
    period: "2002 – 2004",
    title: "Técnico Superior en Desarrollo de Productos Electrónicos",
    org: "Formación Profesional",
    desc: "Ciclo Formativo de Grado Superior que me introdujo en la electrónica y los sistemas digitales.",
  },
];

const books = [
  {
    title: "Aprendiendo JavaScript",
    desc: "Desde cero hasta ECMAScript 6+. Uno de los libros de JavaScript más vendidos en Amazon España.",
    url: "https://amzn.to/4tZb96k",
    cover: "/book-aprendiendo-javascript.jpg",
    isbn: "979-8700179263",
  },
  {
    title: "Aprendiendo React",
    desc: "Guía para aprender React.js desde cero con ejemplos reales y el ecosistema moderno.",
    url: "https://amzn.to/4aFSHZ4",
    cover: "/book-aprendiendo-react.jpg",
    isbn: "979-8852737427",
  },
  {
    title: "Dominando JavaScript",
    desc: "Técnicas avanzadas para el desarrollo web moderno. ES2015+ y buenas prácticas.",
    url: "https://amzn.to/4aOMxVe",
    cover: "/book-dominando-javascript.jpg",
    isbn: "979-8338283325",
  },
];

function formatStat(n: number | null): string {
  if (n === null || n === 0) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.round(n / 1_000)}k`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toLocaleString("es-ES");
}

export default async function AboutPage() {
  const siteStats = await getStats();

  const allStats: {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
    href?: string;
  }[] = [
    { label: "YouTube", value: "157k", icon: Youtube, color: "#FF0000" },
    { label: "TikTok", value: "115k", icon: Music2, color: "#000000" },
    { label: "Instagram", value: "127k", icon: Instagram, color: "#E1306C" },
    { label: "X / Twitter", value: "80k", icon: Twitter, color: "#1DA1F2" },
    { label: "LinkedIn", value: "60k+", icon: Linkedin, color: "#0A66C2" },
    { label: "Años en esto", value: "20+", icon: Calendar, color: "var(--border)" },
    {
      label: "Vídeos en YouTube",
      value: formatStat(siteStats.youtubeVideos),
      icon: PlayCircle,
      color: "#FF0000",
      href: "https://youtube.com/@carlosazaustre",
    },
    {
      label: "Visualizaciones",
      value: formatStat(siteStats.youtubeViews),
      icon: Eye,
      color: "#FF4444",
      href: "https://youtube.com/@carlosazaustre",
    },
    {
      label: "Artículos escritos",
      value: formatStat(siteStats.blogPosts),
      icon: PenLine,
      color: "var(--border)",
      href: "/blog",
    },
    {
      label: "Estrellas en GitHub",
      value: formatStat(siteStats.githubStars),
      icon: Star,
      color: "#F0A500",
      href: "https://github.com/carlosazaustre",
    },
  ];

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 1.5rem" }}>

      {/* Hero */}
      <section
        style={{
          borderBottom: "3px solid var(--border)",
          paddingBottom: "3rem",
          marginBottom: "4rem",
        }}
      >
        {/* Top row: h1 + photo */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "3rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          {/* Left: badge + h1 */}
          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
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
              /about
            </div>

            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                lineHeight: 1.1,
                color: "var(--text)",
                margin: 0,
              }}
            >
              Hola, soy Carlos.<br />
              Llevo más de 20 años haciendo cosas en internet.
            </h1>
          </div>

          {/* Right: photo */}
          <div style={{ flex: "0 0 auto" }}>
            <div
              style={{
                border: "3px solid var(--border)",
                borderRadius: "8px",
                boxShadow: "8px 8px 0 var(--border)",
                overflow: "hidden",
                lineHeight: 0,
              }}
            >
              <Image
                src="/carlos-azaustre.jpg"
                alt="Carlos Azaustre en su setup de streaming"
                width={380}
                height={285}
                style={{ display: "block", maxWidth: "100%", height: "auto" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom: description + buttons (full width) */}
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            lineHeight: 1.75,
            marginBottom: "1rem",
          }}
        >
          Ingeniero en Telemática por la Universidad Carlos III de Madrid. He trabajado para{" "}
          <strong style={{ color: "var(--text)" }}>Google</strong>,{" "}
          <strong style={{ color: "var(--text)" }}>IBM Research</strong>,{" "}
          <strong style={{ color: "var(--text)" }}>Eventbrite</strong> y{" "}
          <strong style={{ color: "var(--text)" }}>CoCircular</strong>, entre otras empresas,
          además de haber cofundado mi propia startup y trabajar como freelance.
        </p>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            lineHeight: 1.75,
            marginBottom: "1rem",
          }}
        >
          Ahora trabajo como <strong style={{ color: "var(--text)" }}>creador de contenido educativo y académico</strong>{" "}
          sobre programación y desarrollo web, y soy{" "}
          <strong style={{ color: "var(--text)" }}>profesor asociado en la Universidad Europea</strong>{" "}
          en el Grado de Ingeniería Informática y en el Máster en Desarrollo de Aplicaciones Web.
          Estoy reconocido por Google como{" "}
          <strong style={{ color: "var(--text)" }}>Developer Expert (GDE) en Web y Firebase</strong>{" "}
          desde 2019 (ya unos cuantos añitos...) y desde 2022 premiado anualmente como{" "}
          <strong style={{ color: "var(--text)" }}>Microsoft MVP</strong> (Most Valuable Professional).
        </p>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            lineHeight: 1.75,
            marginBottom: "2rem",
          }}
        >
          Durante los últimos años he publicado varios libros, cursos online e impartido charlas
          y talleres. También publico contenido en este blog y en mi{" "}
          <a
            href="https://youtube.com/@carlosazaustre"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text)", fontWeight: 700, textDecoration: "underline" }}
          >
            canal de YouTube
          </a>
          , al que te animo a que te suscribas.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/blog" className="neo-btn neo-btn-primary">
            Leer el blog →
          </Link>
          <a
            href="https://youtube.com/@carlosazaustre"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn"
          >
            YouTube
          </a>
        </div>
      </section>

      {/* Stats */}
      <section style={{ marginBottom: "4rem" }}>
        <SectionTitle>En números</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "1rem",
          }}
        >
          {allStats.map((s) => {
            const Icon = s.icon;
            const card = (
              <div
                className="neo-card"
                style={{ padding: "1.25rem", textAlign: "center" }}
              >
                <div style={{ marginBottom: "0.6rem", display: "flex", justifyContent: "center" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: s.color,
                    border: "2px solid var(--border)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "2px 2px 0 var(--border)",
                  }}>
                    <Icon size={20} strokeWidth={2} color="#ffffff" />
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 800,
                    fontSize: "1.6rem",
                    color: "var(--text)",
                    lineHeight: 1,
                    marginBottom: "0.3rem",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            );

            return s.href ? (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ textDecoration: "none" }}
              >
                {card}
              </a>
            ) : (
              <div key={s.label}>{card}</div>
            );
          })}
        </div>
      </section>

      {/* Awards photo */}
      <div
        style={{
          marginBottom: "4rem",
          border: "3px solid var(--border)",
          borderRadius: "8px",
          boxShadow: "6px 6px 0 var(--border)",
          overflow: "hidden",
          lineHeight: 0,
        }}
      >
        <Image
          src="/carlos-awards.jpg"
          alt="Carlos Azaustre con el botón de plata de YouTube (100k suscriptores) y el trofeo Microsoft MVP 2022"
          width={960}
          height={720}
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>

      {/* Experience + Education */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(440px, 100%), 1fr))", gap: "3rem" }}>

          {/* Experiencia */}
          <div>
            <SectionTitle>💼 Experiencia</SectionTitle>
            <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
              <div style={{ position: "absolute", left: "10px", top: "10px", bottom: "10px", width: "3px", background: "var(--border)" }} />
              {experience.map((item, i) => {
                const isFirst = i === 0;
                const isLast = i === experience.length - 1;
                return (
                  <div key={i} style={{ position: "relative", marginBottom: isLast ? 0 : "1.5rem" }}>
                    <div style={{
                      position: "absolute", left: "-2.5rem", top: "14px",
                      width: "20px", height: "20px", borderRadius: "50%",
                      background: isFirst ? "var(--text)" : "var(--accent)",
                      border: "3px solid var(--border)", boxShadow: "2px 2px 0 var(--border)", zIndex: 1,
                    }} />
                    <div className="neo-card" style={{ padding: "1rem 1.25rem", background: isFirst ? "var(--text)" : "var(--card)" }}>
                      <span style={{
                        display: "inline-block", background: "var(--accent)", color: "var(--text)",
                        border: "2px solid var(--border)", borderRadius: "3px", padding: "1px 8px",
                        fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", fontWeight: 800,
                        boxShadow: "2px 2px 0 var(--border)", marginBottom: "0.4rem",
                      }}>
                        {item.period}
                      </span>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: isFirst ? "var(--accent)" : "var(--text)", marginBottom: "0.15rem" }}>
                        {item.title}
                      </h3>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", fontWeight: 700, color: isFirst ? "#888" : "var(--text-muted)", marginBottom: "0.4rem" }}>
                        {item.org}
                      </p>
                      <p style={{ fontSize: "0.85rem", color: isFirst ? "#aaa" : "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Educación */}
          <div>
            <SectionTitle>🎓 Educación</SectionTitle>
            <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
              <div style={{ position: "absolute", left: "10px", top: "10px", bottom: "10px", width: "3px", background: "var(--border)" }} />
              {education.map((item, i) => {
                const isLast = i === education.length - 1;
                return (
                  <div key={i} style={{ position: "relative", marginBottom: isLast ? 0 : "1.5rem" }}>
                    <div style={{
                      position: "absolute", left: "-2.5rem", top: "14px",
                      width: "20px", height: "20px", borderRadius: "50%",
                      background: "var(--accent)", border: "3px solid var(--border)",
                      boxShadow: "2px 2px 0 var(--border)", zIndex: 1,
                    }} />
                    <div className="neo-card" style={{ padding: "1rem 1.25rem" }}>
                      <span style={{
                        display: "inline-block", background: "var(--accent)", color: "var(--text)",
                        border: "2px solid var(--border)", borderRadius: "3px", padding: "1px 8px",
                        fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", fontWeight: 800,
                        boxShadow: "2px 2px 0 var(--border)", marginBottom: "0.4rem",
                      }}>
                        {item.period}
                      </span>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "var(--text)", marginBottom: "0.15rem" }}>
                        {item.title}
                      </h3>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                        {item.org}
                      </p>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Books */}
      <section style={{ marginBottom: "4rem" }}>
        <SectionTitle>Libros publicados</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {books.map((book) => (
            <a
              key={book.title}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-card"
              style={{
                padding: "1.25rem",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {/* Cover */}
              <div
                style={{
                  border: "2px solid var(--border)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  lineHeight: 0,
                }}
              >
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={400}
                  height={533}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {book.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin: 0,
                  flex: 1,
                }}
              >
                {book.desc}
              </p>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                Amazon KDP · ISBN {book.isbn}
              </div>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  borderBottom: "2px solid var(--accent)",
                  alignSelf: "flex-start",
                }}
              >
                Ver libro →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        style={{
          background: "var(--text)",
          border: "3px solid var(--border)",
          borderRadius: "8px",
          padding: "2rem",
          boxShadow: "8px 8px 0 var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "1.4rem",
              color: "var(--accent)",
              marginBottom: "0.4rem",
            }}
          >
            ¿Hablamos?
          </h2>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.85rem",
              color: "#aaa",
              margin: 0,
            }}
          >
            Colaboraciones, charlas o simplemente saludar.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {[
            { label: "Twitter/X", href: "https://twitter.com/carlosazaustre" },
            { label: "LinkedIn", href: "https://linkedin.com/in/carlosazaustre" },
            { label: "YouTube", href: "https://youtube.com/@carlosazaustre" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn neo-btn-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
