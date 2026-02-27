/**
 * lib/stats.ts
 *
 * Obtiene las estadísticas del sitio para la sección "En números" del /about.
 *
 * Fuentes:
 *   - YouTube: YouTube Data API v3 (requiere YOUTUBE_API_KEY en .env.local)
 *              → fallback a data/stats.json si no hay clave
 *   - GitHub:  GitHub public API (sin autenticación, 60 req/h)
 *   - Blog:    conteo de archivos MDX en content/blog/
 *   - Cache:   data/stats.json (generado por scripts/update-stats.mjs)
 */

import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/blog";

const CHANNEL_ID = "UCJgGc8pQO1lv04VXrBxA_Hg";
const GITHUB_USER = "carlosazaustre";
const CACHE_PATH = path.join(process.cwd(), "data", "stats.json");

export interface SiteStats {
  youtubeVideos: number | null;
  youtubeViews: number | null;
  blogPosts: number;
  githubStars: number | null;
}

// ─── Lee el cache local ────────────────────────────────────────────────────
function readCache(): Partial<SiteStats> {
  try {
    if (fs.existsSync(CACHE_PATH)) {
      const raw = fs.readFileSync(CACHE_PATH, "utf8");
      return JSON.parse(raw);
    }
  } catch {}
  return {};
}

// ─── YouTube Data API v3 ───────────────────────────────────────────────────
async function fetchYouTubeStats(): Promise<{ videos: number | null; views: number | null }> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return { videos: null, views: null };

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${apiKey}`,
      { next: { revalidate: 86400 } } // cache 24h
    );
    if (!res.ok) return { videos: null, views: null };

    const data = await res.json();
    const stats = data?.items?.[0]?.statistics;
    if (!stats) return { videos: null, views: null };

    return {
      videos: parseInt(stats.videoCount ?? "0") || null,
      views: parseInt(stats.viewCount ?? "0") || null,
    };
  } catch {
    return { videos: null, views: null };
  }
}

// ─── GitHub public API (paginado) ─────────────────────────────────────────
async function fetchGitHubStars(): Promise<number | null> {
  try {
    let total = 0;
    let page = 1;

    while (true) {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&type=owner`,
        { next: { revalidate: 86400 } }
      );
      if (!res.ok) break;

      const repos: Array<{ stargazers_count: number; fork: boolean }> = await res.json();
      if (repos.length === 0) break;

      total += repos
        .filter((r) => !r.fork)
        .reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

      if (repos.length < 100) break;
      page++;
    }

    return total || null;
  } catch {
    return null;
  }
}

// ─── getStats — función principal ──────────────────────────────────────────
export async function getStats(): Promise<SiteStats> {
  const cache = readCache();

  // Blog posts: siempre en tiempo real (es local, rápido)
  const blogPosts = getAllPosts().length;

  // GitHub: live si es posible, fallback a cache
  const githubStars = (await fetchGitHubStars()) ?? cache.githubStars ?? null;

  // YouTube: live con API key, fallback a cache
  const ytLive = await fetchYouTubeStats();
  const youtubeVideos = ytLive.videos ?? cache.youtubeVideos ?? null;
  const youtubeViews = ytLive.views ?? cache.youtubeViews ?? null;

  return { youtubeVideos, youtubeViews, blogPosts, githubStars };
}
