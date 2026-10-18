import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
  Music2,
  Calendar,
  PlayCircle,
  Eye,
  PenLine,
  Star,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { getStats } from "@/lib/stats";
import HomeBooks from "@/components/home-books";
import "./about.css";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Google Developer Expert en Web Technologies. Ingeniero de Software y creador de contenido educativo sobre JavaScript, React y Node.js. Profesor universitario.",
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
  alternates: {
    canonical: "https://carlosazaustre.es/about",
  },
};

const experience = [
  {
    period: "2023 - Presente",
    title: "Profesor Universitario",
    org: "Universidad Europea de Madrid",
    desc: "Grado de Ingeniería Informática: POO en Java, Programación con estructuras lineales en C++ y Desarrollo Web. Máster en Desarrollo de Apps Web: HTML & CSS, JavaScript & TypeScript, React y Backend con Node.js.",
  },
  {
    period: "2025 – Presente",
    title: "Profesor",
    org: "BIG School",
    desc: "Docencia en el Máster en Desarrollo con IA. Enseñando Arquitecturas de Software.",
  },
  {
    period: "2022 – Presente",
    title: "Autor técnico y Consultor académico",
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
  {
    period: "2011 – 2013",
    title: "Software Engineer",
    org: "Autónomo - Deimos Space - Spartanbits",
    desc: "En este periodo trabajé en un par de empresas tras salir de la Universidad, despues lo compaginé con trabajos freelance diversos. Desarrollo de proyectos de software de manera independiente, colaborando con diversos clientes y empresas en soluciones tecnológicas.",
  },
  {
    period: "2007 – 2011",
    title: "Autor y Autoeditor",
    org: "Azacomic",
    desc: "CAzacomic fue mi primer proyecto de emprendimiento, se basaba en una editorial de comics independiente para publicar mis propias obras como dibujante/autor de cómic. Durante unos 4 años, estuve participando en cada paso de la gestión editorial.",
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

const BASE_URL = "https://carlosazaustre.es";

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${BASE_URL}/about#profilepage`,
      url: `${BASE_URL}/about`,
      name: "Sobre mí — Carlos Azaustre",
      inLanguage: "es",
      mainEntity: { "@id": `${BASE_URL}/#person` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Sobre mí",
          item: `${BASE_URL}/about`,
        },
      ],
    },
    ...books.map((book) => ({
      "@type": "Book",
      name: book.title,
      isbn: book.isbn,
      url: book.url,
      image: `${BASE_URL}${book.cover}`,
      author: { "@id": `${BASE_URL}/#person` },
      inLanguage: "es",
    })),
  ],
};

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
    {
      label: "Años en esto",
      value: "20+",
      icon: Calendar,
      color: "var(--border)",
    },
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
    <div className="editorial-home about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <section
        className="editorial-wrap about-opening"
        aria-labelledby="about-heading"
      >
        <div className="masthead">
          <h1 id="about-heading">
            Sobre mí<span>.</span>
          </h1>
          <p>
            Ingeniero de software.{" "}
            <br />
            Profesor. Creador.
          </p>
        </div>
        <div className="about-hero">
          <div className="about-intro">
            <h2>
              Hola,
              <br />
              soy <span className="marker">Carlos.</span>
            </h2>
            <p className="about-lead">
              Llevo más de 20 años haciendo cosas en internet.
            </p>
            <p>
              Ingeniero en Telemática por la Universidad Carlos III de Madrid.
              He trabajado para <strong>Google</strong>,{" "}
              <strong>IBM Research</strong> y <strong>Eventbrite</strong>, entre
              otras empresas, además de haber cofundado mi propia startup y
              trabajar como freelance.
            </p>
            <Link className="quiet-link" href="#trayectoria">
              Mi trayectoria <ArrowRight />
            </Link>
          </div>
          <figure className="portrait about-portrait">
            <div className="photo">
              <Image
                src="/carlos-azaustre.jpg"
                alt="Carlos Azaustre en su setup de streaming"
                width={1280}
                height={960}
                sizes="(max-width: 700px) 85vw, 48vw"
                preload
              />
            </div>
            <figcaption>
              <span>Al otro lado de la pantalla.</span>
              <span className="portrait-cross" aria-hidden="true">
                +
              </span>
            </figcaption>
            <Link className="photo-tab" href="/uses">
              Mi setup <ArrowUpRight />
            </Link>
          </figure>
        </div>
        <nav className="about-index" aria-label="En esta página">
          <span>Un poco más de contexto</span>
          <a href="#ahora">A qué me dedico</a>
          <a href="#trayectoria">Trayectoria</a>
          <a href="#formacion">Formación</a>
          <a href="#libros">Libros</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </section>
      <section
        className="about-present editorial-wrap"
        id="ahora"
        aria-labelledby="present-heading"
      >
        <h2 id="present-heading">
          Hago software.
          <br />
          También <span className="marker">lo enseño.</span>
        </h2>
        <div className="about-prose">
          <p>
            Ahora trabajo como{" "}
            <strong>creador de contenido educativo y académico</strong> sobre
            programación y desarrollo web, y soy{" "}
            <strong>profesor asociado en la Universidad Europea</strong> en el
            Grado de Ingeniería Informática y en el Máster en Desarrollo de
            Aplicaciones Web.
          </p>
          <p>
            Estoy reconocido por Google como{" "}
            <strong>Developer Expert (GDE) en Web y Firebase</strong> desde 2019
            (ya unos cuantos añitos...) y desde 2022 premiado anualmente como{" "}
            <strong>Microsoft MVP</strong> (Most Valuable Professional).
          </p>
          <p>
            Durante los últimos años he publicado varios libros, cursos online e
            impartido charlas y talleres. También publico contenido en este blog
            y en mi{" "}
            <a href="https://youtube.com/@carlosazaustre">canal de YouTube</a>,
            al que te animo a que te suscribas.
          </p>
          <div className="about-actions">
            <Link href="/blog" className="solid-link">
              Leer el blog <ArrowRight />
            </Link>
            <a
              href="https://youtube.com/@carlosazaustre"
              className="quiet-link"
            >
              Mi canal de YouTube <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
      <section className="about-numbers" aria-labelledby="numbers-heading">
        <div className="editorial-wrap">
          <div className="section-heading">
            <h2 id="numbers-heading">
              En números<span>.</span>
            </h2>
            <a href="https://github.com/carlosazaustre">
              Mi GitHub <ArrowUpRight />
            </a>
          </div>
          <dl className="about-stats">
            {allStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label}>
                  <dt>
                    <Icon size={17} aria-hidden="true" />
                    {stat.label}
                  </dt>
                  <dd>
                    {stat.href ? (
                      <a href={stat.href}>
                        {stat.value}
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    ) : (
                      stat.value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>
      <section
        className="about-recognition editorial-wrap"
        aria-labelledby="recognition-heading"
      >
        <figure>
          <Image
            src="/carlos-awards.jpg"
            alt="Carlos Azaustre con el botón de plata de YouTube y el trofeo Microsoft MVP 2022"
            width={960}
            height={720}
            sizes="(max-width: 700px) 90vw, 55vw"
            loading="lazy"
          />
          <figcaption>
            El botón de plata de YouTube y el trofeo Microsoft MVP 2022.
          </figcaption>
        </figure>
        <div>
          <h2 id="recognition-heading">
            Fuera del IDE{" "}
            <br />
            y la terminal<span>.</span>
          </h2>
          <p>Google Developer Expert en Web y Firebase desde 2019.</p>
          <p>Microsoft MVP desde 2022.</p>
        </div>
      </section>
      <section
        className="about-career editorial-wrap"
        id="trayectoria"
        aria-labelledby="career-heading"
      >
        <div className="about-experience">
          <h2 id="career-heading">
            Por dónde
            <br />
            he pasado<span>.</span>
          </h2>
          <ol className="career-list">
            {experience.map((item) => (
              <li key={`${item.org}-${item.period}`}>
                <span className="career-period">{item.period}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="career-org">{item.org}</p>
                  <p className="career-description">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside
          id="formacion"
          className="about-education"
          aria-labelledby="education-heading"
        >
          <h2 id="education-heading">
            Sigo
            <br />
            aprendiendo<span>.</span>
          </h2>
          <ol>
            {education.map((item) => (
              <li key={item.title}>
                <span className="career-period">{item.period}</span>
                <h3>{item.title}</h3>
                <p className="career-org">{item.org}</p>
                <p className="career-description">{item.desc}</p>
              </li>
            ))}
          </ol>
        </aside>
      </section>
      <HomeBooks />
      <section
        className="about-contact editorial-wrap"
        id="contacto"
        aria-labelledby="contact-heading"
      >
        <div>
          <h2 id="contact-heading">
            ¿Hablamos<span>?</span>
          </h2>
          <p>Colaboraciones, charlas o simplemente saludar.</p>
        </div>
        <nav aria-label="Contactar con Carlos">
          {[
            { label: "Twitter/X", href: "https://twitter.com/carlosazaustre" },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/carlosazaustre",
            },
            { label: "YouTube", href: "https://youtube.com/@carlosazaustre" },
          ].map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
      </section>
    </div>
  );
}
