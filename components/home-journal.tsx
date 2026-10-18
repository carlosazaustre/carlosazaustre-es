"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

const topics = [
  { id: "all", label: "Todo" },
  { id: "web", label: "Desarrollo web" },
  { id: "ia", label: "IA" },
  { id: "setup", label: "Mi setup" },
] as const;
function topicFor(post: PostMeta) {
  const text = `${post.tags.join(" ")} ${post.title}`.toLowerCase();
  if (/inteligencia artificial|\bia\b|agentes|vibe coding/.test(text))
    return "ia";
  if (/setup|elgato|benq|micrófono|hardware/.test(text)) return "setup";
  return "web";
}
export default function HomeJournal({ posts }: { posts: PostMeta[] }) {
  const [topic, setTopic] = useState("all");
  const selected = posts
    .filter((post) => topic === "all" || topicFor(post) === topic)
    .slice(0, 4);
  return (
    <section
      className="journal"
      id="cuaderno"
      aria-labelledby="journal-heading"
    >
      <div className="editorial-wrap">
        <div className="section-heading">
          <h2 id="journal-heading">
            En mi cuaderno<span>.</span>
          </h2>
          <Link href="/blog">
            Todo el archivo <ArrowUpRight />
          </Link>
        </div>
        <div className="journal-toolbar">
          <p>Pruebas, tutoriales y cosas que uso.</p>
          <div
            className="filters"
            role="group"
            aria-label="Filtrar artículos por tema"
          >
            {topics.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={topic === item.id}
                onClick={() => setTopic(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="notes">
          {selected.map((post) => (
            <article className="note" key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <div className="note-art">
                  {post.headerImage ? (
                    <Image
                      src={post.headerImage}
                      width={90}
                      height={90}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <span aria-hidden="true">&lt;/&gt;</span>
                  )}
                </div>
                <div className="note-copy">
                  <span>
                    {post.tags[0]} ·{" "}
                    {new Date(post.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <h3>{post.title}</h3>
                </div>
                <ArrowUpRight className="note-arrow" />
              </Link>
            </article>
          ))}
        </div>
        <p className="filter-status" role="status" aria-live="polite">
          {selected.length
            ? `${selected.length} artículos seleccionados`
            : "No hay artículos recientes de este tema. Puedes consultar el archivo completo."}
        </p>
      </div>
    </section>
  );
}
