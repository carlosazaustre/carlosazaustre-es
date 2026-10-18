import type { Metadata } from "next";
import Link from "next/link";
import { getPostsByTag, getAllTags } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import EditorialSectionHeader from "@/components/editorial-section-header";
import EditorialPostList from "@/components/editorial-post-list";
import "@/app/sections.css";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  if (posts.length === 0) return {};

  return {
    title: `${decoded} — Blog`,
    description: `${posts.length} artículo${posts.length !== 1 ? "s" : ""} sobre ${decoded}. JavaScript, React, TypeScript, arquitectura de software y más por Carlos Azaustre.`,
    alternates: {
      canonical: `https://carlosazaustre.es/blog/tag/${tag}`,
    },
    openGraph: {
      title: `${decoded} — Carlos Azaustre`,
      description: `${posts.length} artículo${posts.length !== 1 ? "s" : ""} sobre ${decoded} en el blog de Carlos Azaustre.`,
      url: `https://carlosazaustre.es/blog/tag/${tag}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${decoded} — Carlos Azaustre`,
      description: `${posts.length} artículo${posts.length !== 1 ? "s" : ""} sobre ${decoded}.`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  if (posts.length === 0) notFound();

  return (
    <div className="editorial-home catalog-page">
      <div className="editorial-wrap">
        <EditorialSectionHeader
          title={decoded}
          action={
            <Link href="/blog" className="quiet-link">
              <ArrowLeft /> Todo el blog
            </Link>
          }
        >
          <h2>
            En el archivo<span>.</span>
          </h2>
          <p>
            {posts.length} artículos sobre {decoded}.
          </p>
        </EditorialSectionHeader>
        <EditorialPostList posts={posts} />
        <Link className="catalog-back quiet-link" href="/blog">
          <ArrowLeft /> Ver todos los artículos
        </Link>
      </div>
    </div>
  );
}
