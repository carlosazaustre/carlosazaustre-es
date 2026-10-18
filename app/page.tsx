import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { getLatestVideos } from "@/lib/youtube";
import HomeBooks from "@/components/home-books";
import HomeJournal from "@/components/home-journal";
import HomeVideos from "@/components/home-videos";

export default async function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const journalPosts = posts.slice(1, 13);
  const videos = await getLatestVideos(3, { includeShorts: true });
  return (
    <div className="editorial-home">
      <svg
        className="symbols"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <symbol id="arrow" viewBox="0 0 24 24">
          <path d="M5 19 19 5M5 5h14v14" />
        </symbol>
        <symbol id="right" viewBox="0 0 24 24">
          <path d="M4 12h16m-7-7 7 7-7 7" />
        </symbol>
        <symbol id="play" viewBox="0 0 24 24">
          <path d="m8 5 11 7-11 7Z" />
        </symbol>
      </svg>
      <section className="opening editorial-wrap" aria-labelledby="name">
        <div className="masthead">
          <h1 id="name">
            Carlos Azaustre<span>.</span>
          </h1>
          <p>
            Ingeniero de software. <br />
            Profesor. Creador.
          </p>
        </div>
        <div className="front-page">
          <div className="intro">
            <h2>
              Hago software.
              <br />Y te cuento
              <br />
              <span className="marker">cómo.</span>
            </h2>
            <p>
              Llevo más de 20 años escribiendo código. Aquí comparto lo que
              aprendo sobre desarrollo web, IA y los proyectos que voy montando.
            </p>
            <a href="#cuaderno" className="solid-link">
              Leer el blog{" "}
              <svg aria-hidden="true">
                <use href="#right" />
              </svg>
            </a>
            <Link href="/about" className="quiet-link">
              Un poco más sobre mí{" "}
              <svg aria-hidden="true">
                <use href="#arrow" />
              </svg>
            </Link>
          </div>
          <figure className="portrait">
            <div className="photo">
              <Image
                src="/carlos-azaustre.jpg"
                alt="Carlos en su estudio, junto al micrófono"
                width={1280}
                height={960}
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>Al otro lado de la pantalla.</span>
              <span className="portrait-cross" aria-hidden="true">
                +
              </span>
            </figcaption>
            <Link className="photo-tab" href="/uses">
              Mi setup{" "}
              <svg aria-hidden="true">
                <use href="#arrow" />
              </svg>
            </Link>
          </figure>
          {featured && (
            <article className="cover-story">
              <div className="story-meta">
                <span>Lo último que he publicado</span>
                <time dateTime={featured.date}>
                  {new Date(featured.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </time>
              </div>
              <Link href={`/blog/${featured.slug}`} className="cover-link">
                <div className="cover-art">
                  {featured.headerImage && (
                    <Image
                      src={featured.headerImage}
                      alt={featured.headerImageAlt ?? ""}
                      width={440}
                      height={460}
                    />
                  )}
                  <span className="round-arrow">
                    <ArrowUpRight />
                  </span>
                </div>
                <h2>{featured.title}</h2>
              </Link>
              <p>{featured.excerpt}</p>
              <div className="story-tags">
                {featured.tags.slice(0, 3).join(" / ")}
              </div>
            </article>
          )}
        </div>
        <div className="contents-strip">
          <span>De lo que suelo hablar</span>
          <Link href="/blog/tag/javascript">JavaScript</Link>
          <Link href="/blog/tag/typescript">TypeScript</Link>
          <Link href="/blog/tag/ai">Inteligencia artificial</Link>
          <Link href="/blog">Arquitectura web</Link>
        </div>
      </section>
      <HomeJournal posts={journalPosts} />
      <HomeBooks />
      <HomeVideos videos={videos} />
      <section
        className="project-section editorial-wrap"
        id="aprendiendo"
        aria-labelledby="project-heading"
      >
        <div className="project-art" aria-hidden="true">
          <Image
            src="/logo_aprendiendodev.png"
            alt=""
            width={320}
            height={320}
          />
          <span>aprender · construir · compartir</span>
        </div>
        <div className="project-copy">
          <div className="project-title">
            <h2 id="project-heading">
              aprendiendo<span>.dev</span>
            </h2>
            <span className="project-status">En desarrollo</span>
          </div>
          <p>
            Estoy preparando un espacio de formación para desarrolladores, con
            guías técnicas, cursos y herramientas para llevar lo aprendido a tus
            proyectos.
          </p>
          <div className="project-footer">
            <a href="https://aprendiendo.dev" className="solid-link">
              Conocer el proyecto{" "}
              <svg aria-hidden="true">
                <use href="#arrow" />
              </svg>
            </a>
            <p>
              El lanzamiento completo está en preparación.
              <br />
              Puedes seguir las novedades en la web del proyecto.
            </p>
          </div>
        </div>
      </section>
      <section
        className="letter editorial-wrap"
        aria-labelledby="letter-heading"
      >
        <div className="letter-top">
          <span>DE CARLOS A TU BANDEJA DE ENTRADA</span>
          <span className="postmark" aria-hidden="true">
            @
          </span>
        </div>
        <div className="letter-body">
          <div>
            <h2 id="letter-heading">
              ¿Seguimos
              <br />
              por email<span>?</span>
            </h2>
            <p>
              Lo que voy aprendiendo sobre JavaScript, arquitectura e IA,
              también en mi newsletter.
            </p>
          </div>
          <div className="letter-action">
            <a
              className="solid-link"
              href="https://carlosazaustre.substack.com/subscribe"
            >
              Apuntarme a la newsletter{" "}
              <svg aria-hidden="true">
                <use href="#right" />
              </svg>
            </a>
            <small>En Substack. Puedes darte de baja cuando quieras.</small>
            <a
              className="quiet-link"
              href="https://carlosazaustre.substack.com"
            >
              Leer antes una edición{" "}
              <svg aria-hidden="true">
                <use href="#arrow" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
