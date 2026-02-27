import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Youtube, Instagram, Twitter, Linkedin, Music2, Calendar, PlayCircle, Eye, PenLine, Star, Github } from "lucide-react";
import { getStats } from "@/lib/stats";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Ingeniero en Telemática por la UC3M. Google Developer Expert en Web y Firebase, Microsoft MVP. Creador de contenido educativo sobre programación y desarrollo web. Profesor asociado en la Universidad Europea.",
};

const timeline = [
  {
    year: "1984",
    title: "Madrid, España",
    desc: "Nací un 8 de diciembre. Mi primera videoconsola fue una NES (1992). Mi primer ordenador fue un PC de 1997 con Pentium a 133 MHz y 16 MB de RAM.",
  },
  {
    year: "1996",
    title: "Mis primeras clases de informática",
    desc: "Informática en el colegio. MS-DOS y Windows 3.11 son mis nuevos amigos.",
  },
  {
    year: "2000",
    title: "Internet llega a casa",
    desc: "Termino la ESO e Internet llega a mi casa. Nada volvió a ser igual.",
  },
  {
    year: "2004",
    title: "FP y la Universidad",
    desc: "Tras finalizar Bachillerato, me gradúo de FP como Técnico Superior en Desarrollo de Productos Electrónicos y entro en la Universidad Carlos III de Madrid.",
  },
  {
    year: "2005",
    title: "Paola",
    desc: "Empiezo mi relación con Paola, compañera de carrera y de vida.",
  },
  {
    year: "2007",
    title: "Pardillos — el webcomic",
    desc: "Creé Pardillos, una parodia de la serie Lost que publicaba online. Firmaba como Aza. En 2009 ganaría el Premio al Mejor Webcomic en el Salón del Cómic de Madrid. Lo autopubliqué en formato físico: más de 30.000 copias vendidas en toda España, TOP 1 en Cómics en Fnac y TOP 4 en Libros Generales. Mi primer emprendimiento.",
  },
  {
    year: "2012",
    title: "Ingeniero en Telemática",
    desc: "Me gradúo como Ingeniero en Telemática por la Universidad Carlos III de Madrid.",
  },
  {
    year: "2013",
    title: "Contenido en internet",
    desc: "Empiezo a crear contenido en internet sobre programación y desarrollo web. Primero en este blog, luego en YouTube y posteriormente en el resto de redes, hasta el día de hoy.",
  },
  {
    year: "2014",
    title: "Chefly — mi Startup",
    desc: "Paola y yo cofundamos Chefly y participamos en Tetuan Valley Startup School (Google Campus) y en la Online Startup School de Y Combinator. En paralelo imparto charlas y talleres sobre Web y JavaScript.",
  },
  {
    year: "2016",
    title: "Mi primera hija y mi primer libro",
    desc: "Nace mi primera hija y publico el libro \"Aprendiendo JavaScript\".",
  },
  {
    year: "2017",
    title: "Google I/O y Developer Relations",
    desc: "Viajo al Google I/O de San Francisco y unos meses más tarde entro a trabajar como Developer Relations Engineer en Google, coordinando los programas de comunidad tech.",
  },
  {
    year: "2019",
    title: "IBM Research, GDE y Eventbrite",
    desc: "Entro a trabajar en remoto con IBM Research como Senior Frontend Engineer y Google me reconoce como GDE en Tecnologías Web. Unos meses más tarde entro a trabajar en Eventbrite y nace mi segundo hijo. Un añito muy completo.",
  },
  {
    year: "2020",
    title: "El Covid y la casa de campo",
    desc: "El Covid llega y al finalizar el confinamiento nos mudamos a una casa de campo.",
  },
  {
    year: "2021",
    title: "Creador a tiempo completo",
    desc: "Dejo mi trabajo de programador y me dedico a la creación de contenido tecnológico y educativo. Al finalizar el año, la ansiedad me colapsa y entro en depresión.",
  },
  {
    year: "2022",
    title: "Un año de altibajos",
    desc: "Tras un inicio de año fatídico, consigo recuperar la energía y volver a compartir contenido. Llego a 100K en Instagram, a 100K en YouTube y Microsoft me premia como MVP. Pero nuestra perrita Kara nos deja...",
  },
  {
    year: "2023",
    title: "Universidad Europea y San Francisco",
    desc: "Empiezo a trabajar como profesor en la Universidad Europea: primero en el Máster en Desarrollo de Aplicaciones Web y más adelante en el Grado de Ingeniería Informática. Publico \"Aprendiendo React\" y viajo de nuevo a San Francisco para el Bootcamp de GDEs.",
  },
  {
    year: "Hoy",
    title: "Profesor, creador y freelance",
    desc: "Sigo como Profesor Asociado en la Universidad Europea de Madrid. Colaboro con la UOC y Big School creando contenido académico. Ya son más de 640k seguidores entre todas las redes. Sigo escribiendo código, grabando vídeos y compartiendo todo lo que aprendo.",
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
              Llevo más de 20 años<br />
              haciendo cosas en internet.
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
          <strong style={{ color: "var(--text)" }}>Eventbrite</strong>, entre otras empresas,
          además de haber cofundado mi propia Startup y trabajar como Freelance.
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
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
            borderBottom: "3px solid var(--border)",
            paddingBottom: "0.5rem",
          }}
        >
          En números
        </h2>
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

      {/* Timeline */}
      <section style={{ marginBottom: "4rem" }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "1.5rem",
            marginBottom: "2.5rem",
            borderBottom: "3px solid var(--border)",
            paddingBottom: "0.5rem",
          }}
        >
          Trayectoria
        </h2>

        <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "10px",
              top: "10px",
              bottom: "10px",
              width: "3px",
              background: "var(--border)",
            }}
          />

          {timeline.map((item, i) => {
            const isLast = i === timeline.length - 1;
            const isHoy = item.year === "Hoy";
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  marginBottom: isLast ? 0 : "1.75rem",
                }}
              >
                {/* Dot on the line */}
                <div
                  style={{
                    position: "absolute",
                    left: "-2.5rem",
                    top: "14px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: isHoy ? "var(--text)" : "var(--accent)",
                    border: "3px solid var(--border)",
                    boxShadow: "2px 2px 0 var(--border)",
                    zIndex: 1,
                    transform: isHoy ? "scale(1.2)" : "scale(1)",
                  }}
                />

                {/* Card */}
                <div
                  className="neo-card"
                  style={{
                    padding: "1.1rem 1.25rem",
                    background: isHoy ? "var(--text)" : "var(--card)",
                  }}
                >
                  {/* Year badge */}
                  <div style={{ marginBottom: "0.4rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: isHoy ? "var(--accent)" : "var(--accent)",
                        color: "var(--text)",
                        border: "2px solid var(--border)",
                        borderRadius: "3px",
                        padding: "1px 8px",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        boxShadow: "2px 2px 0 var(--border)",
                        filter: isHoy ? "invert(0)" : "none",
                      }}
                    >
                      {item.year}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: isHoy ? "var(--accent)" : "var(--text)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: isHoy ? "#aaa" : "var(--text-secondary)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Books */}
      <section style={{ marginBottom: "4rem" }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
            borderBottom: "3px solid var(--border)",
            paddingBottom: "0.5rem",
          }}
        >
          Libros publicados
        </h2>
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
