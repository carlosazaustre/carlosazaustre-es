import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Youtube, Instagram, Twitter, Linkedin, Music2, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Ingeniero de Software, Google Developer Expert, creador de contenido y ex-historietista. Más de 20 años haciendo cosas en internet.",
};

const timeline = [
  {
    year: "1984",
    title: "Madrid, España",
    desc: "Nací el 8 de diciembre. Mi primer ordenador fue un PC de 1997 con Pentium a 133 MHz y 16 MB de RAM.",
  },
  {
    year: "2007",
    title: "Pardillos — el webcomic",
    desc: "Creé Pardillos, una parodia de la serie Lost. Firmaba como Aza. El fanzine Ojodepez ganó el premio al mejor fanzine en los salones de Cómic de Madrid y Barcelona.",
  },
  {
    year: "2009",
    title: "Premio Mejor Cómic Online",
    desc: "Pardillos ganó el premio al Mejor Cómic On-Line en Expocómic. En 2010 ya habíamos vendido más de 10.000 copias. En total, más de 30.000 ejemplares en toda España.",
  },
  {
    year: "2012",
    title: "Ingeniería en Telemática",
    desc: "Terminé la carrera de Ingeniería Técnica en Telecomunicaciones (Telemática) en la Universidad Carlos III de Madrid. Más tarde de lo esperado, pero lo conseguí.",
  },
  {
    year: "2013",
    title: "Ingeniero de Software",
    desc: "Empecé a trabajar profesionalmente como desarrollador web. JavaScript, Node.js, Angular, React... y a crear contenido divulgativo en redes sociales.",
  },
  {
    year: "2016",
    title: "Eventbrite",
    desc: "Entré como Ingeniero Frontend en Eventbrite. Cuatro años aprendiendo a escala real.",
  },
  {
    year: "2017",
    title: "Google Developer Expert",
    desc: "Google me reconoció como GDE en Web Technologies. Una de las cosas de las que más orgulloso me siento.",
  },
  {
    year: "2018",
    title: "Microsoft MVP",
    desc: "También fui reconocido como Microsoft Most Valuable Professional en JavaScript (2018–2021).",
  },
  {
    year: "2021",
    title: "100k en YouTube",
    desc: "El canal Carlos Azaustre - Aprende JavaScript superó los 100.000 suscriptores. Un hito que tardé años en conseguir.",
  },
  {
    year: "Hoy",
    title: "Profesor, creador y freelance",
    desc: "Profesor Asociado en la Universidad Europea de Madrid. Más de 640k seguidores entre todas las redes. Sigo escribiendo código, grabando vídeos y compartiendo todo lo que aprendo.",
  },
];

const stats: { label: string; value: string; icon: LucideIcon; color: string }[] = [
  { label: "YouTube", value: "157k", icon: Youtube, color: "#FF0000" },
  { label: "TikTok", value: "115k", icon: Music2, color: "#000000" },
  { label: "Instagram", value: "127k", icon: Instagram, color: "#E1306C" },
  { label: "X / Twitter", value: "80k", icon: Twitter, color: "#1DA1F2" },
  { label: "LinkedIn", value: "60k+", icon: Linkedin, color: "#0A66C2" },
  { label: "Años en esto", value: "20+", icon: Calendar, color: "var(--border)" },
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

export default function AboutPage() {
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
          Ingeniero en Telemática por la Universidad Carlos III de Madrid.
          Trabajo como desarrollador web, creador de contenido y profesor asociado
          en la Universidad Europea.
        </p>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            lineHeight: 1.75,
            marginBottom: "2rem",
          }}
        >
          Antes de todo eso, dibujé cómics. Mi serie{" "}
          <strong style={{ color: "var(--text)" }}>Pardillos</strong> vendió más de
          30.000 ejemplares en España y ganó el premio al Mejor Cómic Online en
          Expocómic 2009. Firmaba como Aza.
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
          {stats.map((s) => {
            const Icon = s.icon;
            return (
            <div
              key={s.label}
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
          })}
        </div>
      </section>

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
