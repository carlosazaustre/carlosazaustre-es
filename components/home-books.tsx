"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef, type PointerEvent, type ReactNode } from "react";

function BookLink({
  children,
  ...props
}: {
  children: ReactNode;
  href: string;
  className?: string;
  "aria-label"?: string;
}) {
  const frame = useRef(0);
  function tilt(event: PointerEvent<HTMLAnchorElement>) {
    if (
      event.pointerType === "touch" ||
      !window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const book = event.currentTarget;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const bounds = book.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(1, (clientX - bounds.left) / bounds.width),
      );
      const y = Math.max(
        0,
        Math.min(1, (clientY - bounds.top) / bounds.height),
      );
      book.style.setProperty("--tilt-x", `${(0.5 - y) * 10}deg`);
      book.style.setProperty("--tilt-y", `${(x - 0.5) * 22}deg`);
      book.style.setProperty("--sheen-x", `${(1 - x) * 100}%`);
    });
  }
  return (
    <a
      {...props}
      onPointerMove={tilt}
      onPointerLeave={(event) => {
        cancelAnimationFrame(frame.current);
        ["--tilt-x", "--tilt-y", "--sheen-x"].forEach((key) =>
          event.currentTarget.style.removeProperty(key),
        );
      }}
    >
      {children}
    </a>
  );
}
export default function HomeBooks({
  showIntro = true,
}: { showIntro?: boolean } = {}) {
  return (
    <section
      className={`books-section editorial-wrap${showIntro ? "" : " books-shelf-only"}`}
      id="libros"
      aria-labelledby={showIntro ? "books-heading" : undefined}
      aria-label={showIntro ? undefined : "Libros publicados"}
    >
      {showIntro && (
        <div className="books-intro">
          <h2 id="books-heading">
            También <br />
            en papel<span>.</span>
          </h2>
          <p>Para dejar unas cuantas pestañas abiertas menos.</p>

          <BookLink href="/libros" className="quiet-link">
            Mis libros <ArrowUpRight aria-hidden="true" />
          </BookLink>
          <p className="shelf-hint">Desliza para ver los tres libros.</p>
        </div>
      )}
      {!showIntro && (
        <p className="shelf-hint">Desliza para ver los tres libros.</p>
      )}
      <ul className="books-shelf" aria-label="Libros publicados">
        <li className="book-slot">
          <BookLink
            href="/libros/aprendiendo-javascript"
            className="book-link book-paper"
            aria-label="Empezar con JavaScript. Ver libro: Aprendiendo JavaScript"
          >
            <span className="book-scene" aria-hidden="true">
              <span className="book-shadow"></span>
              <span className="book-volume">
                <span className="book-back"></span>
                <span className="book-spine">
                  <span>Aprendiendo JavaScript</span>
                </span>
                <span className="book-pages book-pages-side"></span>
                <span className="book-pages book-pages-top"></span>
                <span className="book-pages book-pages-bottom"></span>
                <span className="book-front">
                  <Image
                    src="/book-aprendiendo-javascript.jpg"
                    width={533}
                    height={800}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                  <span className="book-sheen"></span>
                </span>
              </span>
            </span>
            <span className="book-caption">Empezar con JavaScript</span>
            <span className="book-discover">
              Ver libro <ArrowUpRight aria-hidden="true" />
            </span>
          </BookLink>
        </li>
        <li className="book-slot">
          <BookLink
            href="/libros/aprendiendo-react"
            className="book-link book-paper"
            aria-label="Dar el salto a React. Ver libro: Aprendiendo React"
          >
            <span className="book-scene" aria-hidden="true">
              <span className="book-shadow"></span>
              <span className="book-volume">
                <span className="book-back"></span>
                <span className="book-spine">
                  <span>Aprendiendo React</span>
                </span>
                <span className="book-pages book-pages-side"></span>
                <span className="book-pages book-pages-top"></span>
                <span className="book-pages book-pages-bottom"></span>
                <span className="book-front">
                  <Image
                    src="/book-aprendiendo-react.jpg"
                    width={533}
                    height={800}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                  <span className="book-sheen"></span>
                </span>
              </span>
            </span>
            <span className="book-caption">Dar el salto a React</span>
            <span className="book-discover">
              Ver libro <ArrowUpRight aria-hidden="true" />
            </span>
          </BookLink>
        </li>
        <li className="book-slot">
          <BookLink
            href="/libros/dominando-javascript"
            className="book-link book-yellow"
            aria-label="Ir un poco más allá. Ver libro: Dominando JavaScript"
          >
            <span className="book-scene" aria-hidden="true">
              <span className="book-shadow"></span>
              <span className="book-volume">
                <span className="book-back"></span>
                <span className="book-spine">
                  <span>Dominando JavaScript</span>
                </span>
                <span className="book-pages book-pages-side"></span>
                <span className="book-pages book-pages-top"></span>
                <span className="book-pages book-pages-bottom"></span>
                <span className="book-front">
                  <Image
                    src="/book-dominando-javascript.jpg"
                    width={533}
                    height={800}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                  <span className="book-sheen"></span>
                </span>
              </span>
            </span>
            <span className="book-caption">Ir un poco más allá</span>
            <span className="book-discover">
              Ver libro <ArrowUpRight aria-hidden="true" />
            </span>
          </BookLink>
        </li>
      </ul>
    </section>
  );
}
