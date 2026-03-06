import path from "path";
import { readPostsFromDir, readPostFromDir, getAllPosts } from "./blog";
import type { PostMeta, Post } from "./blog";

export const EDUCACION_DIR = path.join(process.cwd(), "content", "educacion");

export function getAllEducacionPosts(): PostMeta[] {
  return readPostsFromDir(EDUCACION_DIR, "educacion");
}

export async function getEducacionBySlug(slug: string): Promise<Post | null> {
  return readPostFromDir(EDUCACION_DIR, slug, "educacion");
}

export function getAllEducacionSlugs(): string[] {
  return getAllEducacionPosts().map((p) => p.slug);
}

/**
 * Returns related posts for an educacion essay.
 * Looks up slugs in educacion, podcast and blog catalogs.
 */
export function getRelatedForEducacion(
  currentSlug: string,
  currentTags: string[],
  relatedSlugs?: string[],
  limit = 3
): PostMeta[] {
  const educacionPosts = getAllEducacionPosts();
  const blogPosts = getAllPosts();

  const bySlug = new Map<string, PostMeta>([
    ...blogPosts.map((p): [string, PostMeta] => [p.slug, p]),
    ...educacionPosts.map((p): [string, PostMeta] => [p.slug, p]),
  ]);

  const results: PostMeta[] = [];

  // 1. Explicit related slugs (in order)
  if (relatedSlugs) {
    for (const slug of relatedSlugs) {
      if (slug === currentSlug) continue;
      const post = bySlug.get(slug);
      if (post) results.push(post);
      if (results.length >= limit) return results;
    }
  }

  // 2. Tag-based fallback — prefer educacion posts first
  if (results.length < limit) {
    const byTag = [...educacionPosts, ...blogPosts].filter(
      (p) =>
        p.slug !== currentSlug &&
        !results.some((r) => r.slug === p.slug) &&
        p.tags.some((t) => currentTags.includes(t))
    );
    for (const p of byTag) {
      results.push(p);
      if (results.length >= limit) break;
    }
  }

  return results.slice(0, limit);
}
