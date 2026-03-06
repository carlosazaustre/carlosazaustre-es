import path from "path";
import { readPostsFromDir, readPostFromDir, getAllPosts } from "./blog";
import type { PostMeta, Post } from "./blog";

/**
 * Wraps the auto-generated transcript section (starting at the
 * <h3>Transcripción completa del Episodio</h3> heading) inside a
 * <details> / <summary> collapsible block so it doesn't dominate the page.
 */
function wrapTranscript(html: string): string {
  const MARKER = /<h3[^>]*>Transcripci[oó]n completa del Episodio<\/h3>/i;
  const match = MARKER.exec(html);
  if (!match) return html;

  const before = html.slice(0, match.index);
  const transcriptHtml = html.slice(match.index);

  // Count timestamp entries (list items) to show in summary
  const entryCount = (transcriptHtml.match(/<li>/g) ?? []).length;
  const label = entryCount > 0
    ? `Ver transcripción completa (${entryCount} fragmentos)`
    : "Ver transcripción completa";

  return (
    before +
    `<details class="transcript-details">` +
    `<summary>${label}</summary>` +
    transcriptHtml +
    `</details>`
  );
}

export const PODCAST_DIR = path.join(process.cwd(), "content", "podcast");

export function getAllPodcastPosts(): PostMeta[] {
  return readPostsFromDir(PODCAST_DIR, "podcast");
}

export async function getPodcastBySlug(slug: string): Promise<Post | null> {
  const post = await readPostFromDir(PODCAST_DIR, slug, "podcast");
  if (!post) return null;
  return { ...post, content: wrapTranscript(post.content) };
}

export function getAllPodcastSlugs(): string[] {
  return getAllPodcastPosts().map((p) => p.slug);
}

/**
 * Returns related posts for a podcast episode.
 * Looks up slugs in both the podcast and blog catalogs,
 * preserving contentType so links resolve to the right URL prefix.
 */
export function getRelatedForPodcast(
  currentSlug: string,
  currentTags: string[],
  relatedSlugs?: string[],
  limit = 3
): PostMeta[] {
  const podcastPosts = getAllPodcastPosts();
  const blogPosts = getAllPosts();

  // Combined lookup map: slug → PostMeta
  const bySlug = new Map<string, PostMeta>([
    ...blogPosts.map((p): [string, PostMeta] => [p.slug, p]),
    ...podcastPosts.map((p): [string, PostMeta] => [p.slug, p]),
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

  // 2. Tag-based fallback — prefer podcast episodes first
  if (results.length < limit) {
    const byTag = [...podcastPosts, ...blogPosts].filter(
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
