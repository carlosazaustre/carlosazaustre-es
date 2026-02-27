#!/usr/bin/env node
/**
 * generate-llms.mjs
 *
 * Genera los archivos de sindicación para LLMs (LLM SEO / GEO):
 *
 *   public/llms.txt          → índice estándar llms.txt (spec: llmstxt.org)
 *   public/llms-full.txt     → contenido completo en Markdown (para NotebookLM, Claude Projects...)
 *   public/blog/<slug>.md    → cada post en Markdown limpio (URL: /blog/my-post.md)
 *
 * Uso:
 *   node scripts/generate-llms.mjs
 *   npm run generate:llms
 *
 * Se ejecuta automáticamente via "prebuild" antes de cada build de producción.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const PUBLIC_DIR = path.join(ROOT, "public");
const PUBLIC_BLOG_DIR = path.join(PUBLIC_DIR, "blog");
const BASE_URL = "https://carlosazaustre.es";

// ─── Frontmatter parser (sin dependencias) ──────────────────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, content: raw };

  const yamlBlock = match[1];
  const content = raw.slice(match[0].length).trim();
  const data = {};

  for (const line of yamlBlock.split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value.slice(1, -1).split(",")
        .map((v) => v.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
    } else {
      data[key] = value;
    }
  }
  return { data, content };
}

// ─── Limpiar MDX → Markdown estándar ────────────────────────────────────────
function cleanMdx(content) {
  return content
    // YouTube component → enlace
    .replace(/<[Yy]ou[Tt]ube\s+[Vv]ideo[Ii]d="([^"]+)"[^/]*/g,
      (_, id) => `\n> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=${id})\n`)
    .replace(/<\/[Yy]ou[Tt]ube>/g, "")
    // Spotify component → enlace
    .replace(/<[Ss]potify[Pp]odcast\s+episode="([^"]+)"[^/]*/g,
      (_, id) => `\n> 🎧 [Escuchar episodio en Spotify](https://open.spotify.com/episode/${id})\n`)
    .replace(/<\/[Ss]potify[Pp]odcast>/g, "")
    // Summary component → blockquote
    .replace(/<[Ss]ummary>/g, "\n> **Resumen:** ")
    .replace(/<\/[Ss]ummary>/g, "\n")
    // Eliminar cualquier otra etiqueta JSX/HTML desconocida
    .replace(/<[A-Z][a-zA-Z]*(\s[^>]*)?\s*\/>/g, "")
    .replace(/<\/[A-Z][a-zA-Z]*>/g, "")
    // Limpiar líneas vacías múltiples
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractExcerpt(content, maxLength = 200) {
  const clean = content
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/`{1,3}[\s\S]*?`{1,3}/g, "")
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\n+/g, " ")
    .trim();
  if (clean.length <= maxLength) return clean;
  const cut = clean.lastIndexOf(" ", maxLength);
  return clean.slice(0, cut > 0 ? cut : maxLength) + "…";
}

// ─── Cargar todos los posts ──────────────────────────────────────────────────
function loadPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.(md|mdx)$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data, content } = parseFrontmatter(raw);
      return {
        slug,
        title: data.title ?? "Sin título",
        date: data.date ? String(data.date) : "1970-01-01",
        excerpt: data.excerpt ?? extractExcerpt(content),
        tags: Array.isArray(data.tags) ? data.tags : [],
        content: cleanMdx(content),
        raw,
      };
    })
    .filter((p) => !isNaN(new Date(p.date).getTime()))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ─── 1. Generar public/llms.txt ─────────────────────────────────────────────
function generateLlmsTxt(posts) {
  const recentPosts = posts.slice(0, 50);

  const blogItems = recentPosts
    .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const txt = `# Carlos Azaustre

> Ingeniero de Software con más de 20 años de experiencia en desarrollo web. Google Developer Expert (GDE) en Web Technologies. Creador de contenido educativo sobre JavaScript, React, Node.js, arquitectura de software e inteligencia artificial. Autor de los libros "Aprendiendo JavaScript" y "Dominando JavaScript". Profesor asociado en la Universidad Europea de Madrid.

## Páginas principales

- [Inicio](${BASE_URL}/): Página principal con presentación y últimos contenidos
- [Blog](${BASE_URL}/blog): ${posts.length} artículos sobre desarrollo web, JavaScript, arquitectura de software e IA
- [About](${BASE_URL}/about): Biografía, experiencia profesional, libros y contacto
- [Uses](${BASE_URL}/uses): Stack tecnológico y herramientas que usa Carlos en su día a día
- [Links](${BASE_URL}/links): Links de interés, recursos y redes sociales

## Recursos de contenido

- [RSS Feed](${BASE_URL}/rss.xml): Feed RSS del blog en formato XML
- [Markdown completo del blog](${BASE_URL}/llms-full.txt): Todo el contenido del blog en Markdown para LLMs
- [Libros en Amazon](https://amzn.to/4tZb96k): Aprendiendo JavaScript
- [Canal de YouTube](https://youtube.com/@carlosazaustre): Vídeos sobre programación web e IA

## Blog — Artículos recientes

${blogItems}

## Opcional

- [Sitemap](${BASE_URL}/sitemap.xml): Mapa completo del sitio en XML
- Cada artículo del blog está disponible en Markdown limpio añadiendo .md a la URL: \`${BASE_URL}/blog/<slug>.md\`
`;

  fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), txt, "utf8");
  console.log(`✅  llms.txt generado (${posts.length} posts indexados)`);
}

// ─── 2. Generar public/llms-full.txt ────────────────────────────────────────
function generateLlmsFullTxt(posts) {
  const header = `# Carlos Azaustre — Blog completo en Markdown
> Generado automáticamente: ${new Date().toISOString()}
> Fuente: ${BASE_URL}/blog
> Este archivo contiene todos los artículos del blog en formato Markdown limpio,
> organizado para ser ingestado por modelos de lenguaje (LLMs).

---

`;

  const articles = posts.map((p) => {
    const tagsLine = p.tags.length > 0 ? `**Tags:** ${p.tags.join(", ")}\n\n` : "";
    return `<article slug="${p.slug}" date="${p.date}" url="${BASE_URL}/blog/${p.slug}">

# ${p.title}

**Fecha:** ${p.date}
${tagsLine}${p.content}

</article>`;
  }).join("\n\n---\n\n");

  fs.writeFileSync(path.join(PUBLIC_DIR, "llms-full.txt"), header + articles, "utf8");
  const sizeKb = Math.round(
    (fs.statSync(path.join(PUBLIC_DIR, "llms-full.txt")).size) / 1024
  );
  console.log(`✅  llms-full.txt generado (${posts.length} artículos, ${sizeKb} KB)`);
}

// ─── 3. Generar public/blog/<slug>.md ───────────────────────────────────────
function generatePerPostMarkdown(posts) {
  fs.mkdirSync(PUBLIC_BLOG_DIR, { recursive: true });

  let count = 0;
  for (const p of posts) {
    const md = `---
title: "${p.title.replace(/"/g, '\\"')}"
date: "${p.date}"
url: "${BASE_URL}/blog/${p.slug}"
tags: [${p.tags.map((t) => `"${t}"`).join(", ")}]
---

# ${p.title}

> Publicado el ${p.date} — ${BASE_URL}/blog/${p.slug}

${p.content}
`;
    fs.writeFileSync(path.join(PUBLIC_BLOG_DIR, `${p.slug}.md`), md, "utf8");
    count++;
  }
  console.log(`✅  ${count} archivos Markdown generados en public/blog/`);
}

// ─── Main ────────────────────────────────────────────────────────────────────
function run() {
  console.log("🤖  Generando archivos LLM SEO...");
  const posts = loadPosts();

  if (posts.length === 0) {
    console.error("❌  No se encontraron posts en", BLOG_DIR);
    process.exit(1);
  }

  generateLlmsTxt(posts);
  generateLlmsFullTxt(posts);
  generatePerPostMarkdown(posts);

  console.log(`\n📡  LLM SEO listo:`);
  console.log(`   ${BASE_URL}/llms.txt`);
  console.log(`   ${BASE_URL}/llms-full.txt`);
  console.log(`   ${BASE_URL}/blog/<slug>.md  (${posts.length} archivos)\n`);
}

run();
