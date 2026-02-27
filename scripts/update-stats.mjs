#!/usr/bin/env node
/**
 * update-stats.mjs
 *
 * Actualiza data/stats.json con los valores más recientes:
 *   - GitHub stars (GitHub public API, sin autenticación)
 *   - Blog posts (cuenta archivos MDX en content/blog/)
 *   - YouTube videos + views (requiere YOUTUBE_API_KEY en env o .env.local)
 *
 * Uso:
 *   node scripts/update-stats.mjs
 *   YOUTUBE_API_KEY=AIza... node scripts/update-stats.mjs
 *   npm run update:stats
 *
 * Para activar YouTube stats, añade a .env.local:
 *   YOUTUBE_API_KEY=tu_clave_aqui
 *
 * Cómo obtener una API key gratuita de YouTube:
 *   1. Ve a https://console.cloud.google.com/
 *   2. Crea un proyecto nuevo (o usa uno existente)
 *   3. Habilita "YouTube Data API v3"
 *   4. Crea una API key (Credentials → Create Credentials → API Key)
 *   5. Restringe la key a YouTube Data API v3
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const OUTPUT = path.join(ROOT, "data", "stats.json");
const CHANNEL_ID = "UCJgGc8pQO1lv04VXrBxA_Hg";
const GITHUB_USER = "carlosazaustre";

// ─── HTTP helper ─────────────────────────────────────────────────────────
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const opts = {
      headers: {
        "User-Agent": "cazaustre-web-stats-bot/1.0",
        "Accept": "application/json",
      },
    };
    https.get(url, opts, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchJSON(res.headers.location).then(resolve).catch(reject);
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${e.message}`)); }
      });
    }).on("error", reject);
  });
}

// ─── Cargar .env.local si existe ─────────────────────────────────────────
function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const match = line.match(/^([A-Z_]+)\s*=\s*(.+)$/);
    if (match) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

// ─── GitHub stars ─────────────────────────────────────────────────────────
async function fetchGitHubStars() {
  console.log("  ⬇  Obteniendo GitHub stars...");
  let total = 0;
  let page = 1;

  while (true) {
    const repos = await fetchJSON(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&type=owner`
    );
    if (!Array.isArray(repos) || repos.length === 0) break;
    total += repos.filter((r) => !r.fork).reduce((s, r) => s + (r.stargazers_count || 0), 0);
    if (repos.length < 100) break;
    page++;
  }

  console.log(`     → ${total.toLocaleString()} stars (${page} páginas)`);
  return total;
}

// ─── Blog posts ──────────────────────────────────────────────────────────
function countBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return 0;
  const count = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx")).length;
  console.log(`  ✓  Blog posts: ${count}`);
  return count;
}

// ─── YouTube Data API v3 ─────────────────────────────────────────────────
async function fetchYouTubeStats() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.log("  ⚠  YOUTUBE_API_KEY no configurada → usando valores del cache existente");
    console.log("     Para activar: añade YOUTUBE_API_KEY=tu_clave en .env.local");
    console.log("     Guía: https://console.cloud.google.com/ → YouTube Data API v3");
    return null;
  }

  console.log("  ⬇  Obteniendo YouTube stats vía Data API v3...");
  try {
    const data = await fetchJSON(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${apiKey}`
    );

    if (data.error) {
      console.log("  ❌  YouTube API error:", data.error.message);
      return null;
    }

    const stats = data?.items?.[0]?.statistics;
    if (!stats) {
      console.log("  ❌  No se encontraron estadísticas del canal");
      return null;
    }

    const videos = parseInt(stats.videoCount ?? "0");
    const views = parseInt(stats.viewCount ?? "0");
    console.log(`     → ${videos.toLocaleString()} videos, ${views.toLocaleString()} views`);
    return { videos, views };
  } catch (e) {
    console.log("  ❌  Error fetching YouTube:", e.message);
    return null;
  }
}

// ─── Main ────────────────────────────────────────────────────────────────
async function run() {
  console.log("📊  Actualizando stats del sitio...\n");

  loadEnvLocal();

  // Leer cache existente
  let existing = {};
  if (fs.existsSync(OUTPUT)) {
    try { existing = JSON.parse(fs.readFileSync(OUTPUT, "utf8")); } catch {}
  }

  // Fetch stats
  const githubStars = await fetchGitHubStars();
  const blogPosts = countBlogPosts();
  const yt = await fetchYouTubeStats();

  // Merge: solo actualizar YouTube si tenemos datos nuevos
  const result = {
    _comment: "Generado por scripts/update-stats.mjs. Para YouTube stats, configura YOUTUBE_API_KEY en .env.local",
    _updatedAt: new Date().toISOString().split("T")[0],
    youtubeVideos: yt ? yt.videos : (existing.youtubeVideos ?? null),
    youtubeViews: yt ? yt.views : (existing.youtubeViews ?? null),
    blogPosts,
    githubStars,
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2) + "\n", "utf8");

  console.log("\n✅  data/stats.json actualizado:");
  console.log(`   📺 YouTube videos: ${result.youtubeVideos ?? "—"}`);
  console.log(`   👁  YouTube views:  ${result.youtubeViews ? result.youtubeViews.toLocaleString() : "— (necesita YOUTUBE_API_KEY)"}`);
  console.log(`   ✍️  Blog posts:     ${result.blogPosts}`);
  console.log(`   ⭐ GitHub stars:   ${result.githubStars?.toLocaleString() ?? "—"}\n`);
}

run().catch((e) => {
  console.error("❌  Fatal:", e.message);
  process.exit(1);
});
