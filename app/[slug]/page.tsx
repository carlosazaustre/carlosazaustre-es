/**
 * Legacy URL redirect: /slug → /blog/slug (308 Permanent)
 *
 * Before: carlosazaustre.es/mi-articulo
 * After:  carlosazaustre.es/blog/mi-articulo
 *
 * Google treats 308 as a permanent redirect (same SEO value as 301).
 * Static routes (/about, /uses, /blog, /links) take priority over this
 * catch-all, so they are not affected.
 */

import { permanentRedirect, notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-generate known slugs at build time for fast static redirects
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function LegacySlugPage({ params }: Props) {
  const { slug } = await params;
  const posts = getAllPosts();
  const exists = posts.some((p) => p.slug === slug);

  if (exists) {
    permanentRedirect(`/blog/${slug}`);
  }

  notFound();
}
