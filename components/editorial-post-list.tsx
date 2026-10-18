import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
export default function EditorialPostList({
  posts,
  basePath = "/blog",
}: {
  posts: PostMeta[];
  basePath?: string;
}) {
  if (!posts.length)
    return (
      <p className="catalog-empty">No hay artículos todavía. Vuelve pronto.</p>
    );
  return (
    <ol className="catalog-post-list" aria-label="Artículos publicados">
      {posts.map((post) => (
        <li key={post.slug}>
          <article>
            <Link href={`${basePath}/${post.slug}`}>
              <div className="catalog-note-art">
                {post.headerImage ? (
                  <Image
                    src={post.headerImage}
                    width={110}
                    height={110}
                    alt=""
                    sizes="110px"
                    loading="lazy"
                  />
                ) : (
                  <span aria-hidden="true">&lt;/&gt;</span>
                )}
              </div>
              <div>
                <div className="catalog-post-meta">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <span>{post.readingTime} lectura</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="catalog-post-topic">
                  {post.tags.slice(0, 2).join(" / ")}
                </span>
              </div>
              <ArrowUpRight className="catalog-row-arrow" aria-hidden="true" />
            </Link>
          </article>
        </li>
      ))}
    </ol>
  );
}
