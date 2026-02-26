import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

const stats = [
  { label: "YouTube", value: "157k", icon: "📺" },
  { label: "TikTok", value: "115k", icon: "🎵" },
  { label: "Instagram", value: "127k", icon: "📸" },
  { label: "X / Twitter", value: "80k", icon: "🐦" },
  { label: "LinkedIn", value: "60k+", icon: "💼" },
  { label: "Años en esto", value: "20+", icon: "🗓️" },
];

const books = [
  {
    title: "Aprendiendo JavaScript",
    desc: "Fundamentos del lenguaje desde cero. Uno de los libros de JavaScript más vendidos en Amazon España.",
    url: "https://amzn.to/aprendiendo-js",
  },
  {
    title: "Dominando JavaScript",
    desc: "Patrones avanzados, ES2015+ y buenas prácticas para llevar tu JavaScript al siguiente nivel.",
    url: "https://amzn.to/dominando-js",
  },
  {
    title: "Aprendiendo React",
    desc: "Introducción práctica a React con ejemplos reales y el ecosistema moderno.",
    url: "https://leanpub.com/aprendiendo-react",
  },
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>

      {/* Hero */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
          borderBottom: "3px solid var(--border)",
          paddingBottom: "3rem",
          marginBottom: "4rem",
        }}
      >
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
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
            Sobre mí
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.1,
              color: "var(--text)",
              marginBottom: "1.25rem",
            }}
          >
            Hola, soy Carlos.<br />
            Llevo más de 20 años<br />
            haciendo cosas en internet.
          </h1>

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
        </div>

        <div style={{ flex: "0 0 auto" }}>
          <Image
            src="/carlos-azaustre.png"
            alt="Carlos Azaustre"
            width={360}
            height={360}
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
            priority
          />
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
          {stats.map((s) => (
            <div
              key={s.label}
              className="neo-card"
              style={{ padding: "1.25rem", textAlign: "center" }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{s.icon}</div>
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
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ marginBottom: "4rem" }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "1.5rem",
            marginBottom: "2rem",
            borderBottom: "3px solid var(--border)",
            paddingBottom: "0.5rem",
          }}
        >
          Trayectoria
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {timeline.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1.5rem",
                alignItems: "flex-start",
              }}
            >
              {/* Year + line */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 0,
                  width: "72px",
                }}
              >
                <div
                  style={{
                    background: item.year === "Hoy" ? "var(--text)" : "var(--accent)",
                    border: "3px solid var(--border)",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: item.year === "Hoy" ? "var(--accent)" : "var(--text)",
                    whiteSpace: "nowrap",
                    boxShadow: "2px 2px 0 var(--border)",
                    textAlign: "center",
                  }}
                >
                  {item.year}
                </div>
                {i < timeline.length - 1 && (
                  <div
                    style={{
                      width: "3px",
                      flex: 1,
                      background: "var(--border)",
                      minHeight: "32px",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: i < timeline.length - 1 ? "1.75rem" : 0, paddingTop: "2px" }}>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "var(--text)",
                    marginBottom: "0.3rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
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
              style={{ padding: "1.5rem", textDecoration: "none", display: "block" }}
            >
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  color: "var(--text)",
                  marginBottom: "0.6rem",
                }}
              >
                {book.title}
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {book.desc}
              </p>
              <span
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  borderBottom: "2px solid var(--accent)",
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
