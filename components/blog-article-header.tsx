import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/blog";

export default function BlogArticleHeader({
  post,
  isPodcast,
}: {
  post: PostMeta;
  isPodcast: boolean;
}) {
  const date = new Date(post.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="blog-article-header">
      <div className={post.headerImage ? "blog-header-composition" : undefined}>
        <div>
          <h1>{post.title}</h1>
          {post.excerpt && <p className="blog-article-intro">{post.excerpt}</p>}
        </div>
        {post.headerImage && (
          <Image
            className="blog-header-illustration"
            src={post.headerImage}
            alt={post.headerImageAlt ?? ""}
            width={440}
            height={460}
            preload
          />
        )}
      </div>
      <div className="blog-article-meta">
        <Link href="/about" className="blog-article-author">Carlos Azaustre</Link>
        <time dateTime={new Date(post.date).toISOString()}>{date}</time>
        <span>{post.readingTime} {isPodcast ? "escucha" : "lectura"}</span>
      </div>
      {post.tags.length > 0 && (
        <ul className="blog-article-tags" aria-label="Temas del artículo">
          {post.tags.map((tag) => (
            <li key={tag}><span className="neo-badge">{tag}</span></li>
          ))}
        </ul>
      )}
    </header>
  );
}
