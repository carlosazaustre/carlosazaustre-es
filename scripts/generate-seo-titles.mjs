/**
 * generate-seo-titles.mjs
 *
 * Para los posts cuyo título completo ("title | Carlos Azaustre") supera 60 chars,
 * genera un seoTitle corto (≤42 chars) usando Claude Haiku vía OpenClaw gateway.
 *
 * El H1 visible en la página NO cambia — solo el <title> tag y Open Graph.
 *
 * Uso: node scripts/generate-seo-titles.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "../content/blog");
const SUFFIX = " | Carlos Azaustre"; // 18 chars
const MAX_FULL = 60;
const MAX_TITLE = MAX_FULL - SUFFIX.length; // 42 chars
const DELAY_MS = 400;

const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN;
const GATEWAY_PORT = process.env.OPENCLAW_GATEWAY_PORT || "18789";

if (!GATEWAY_TOKEN) {
  console.log("⚠️  OPENCLAW_GATEWAY_TOKEN no encontrado — saltando generación de seoTitles.");
  process.exit(0);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generateSeoTitle(title) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  const res = await fetch(`http://localhost:${GATEWAY_PORT}/v1/chat/completions`, {
    method: "POST",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GATEWAY_TOKEN}`,
    },
    body: JSON.stringify({
      model: "anthropic/claude-haiku-4-5",
      max_tokens: 80,
      stream: false,
      messages: [
        {
          role: "user",
          content: `Título actual del post: "${title}"

Crea un título SEO corto para el <title> tag de Google.
Requisitos ESTRICTOS:
- MÁXIMO 42 caracteres (se añade " | Carlos Azaustre" al final)
- Mantén las keywords más importantes
- En español
- Sin comillas, sin puntos finales, sin explicaciones

Responde SOLO con el título (máximo 42 caracteres):`,
        },
      ],
    }),
  });

  clearTimeout(timeout);
  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  const result = json.choices[0].message.content.trim().replace(/^["']|["']$/g, "");
  return result.slice(0, MAX_TITLE);
}

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const toLong = files.filter((f) => {
    const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, f), "utf-8"));
    const titleLen = (data.title || "").length;
    return titleLen + SUFFIX.length > MAX_FULL && !data.seoTitle?.trim();
  });

  if (toLong.length === 0) {
    console.log("✅ Todos los títulos están dentro del límite o ya tienen seoTitle.");
    return;
  }

  console.log(`✏️  ${toLong.length} posts con título largo. Generando seoTitle con Claude Haiku...`);
  console.log("");

  let updated = 0;
  let errors = 0;

  for (const file of toLong) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    process.stdout.write(`  → ${file.replace(".mdx", "")} (${data.title?.length} chars) ... `);

    try {
      const seoTitle = await generateSeoTitle(data.title || "");
      const full = `${seoTitle}${SUFFIX}`;
      const updatedContent = matter.stringify(content, { ...data, seoTitle });
      fs.writeFileSync(filePath, updatedContent, "utf-8");
      console.log(`✓ "${seoTitle}" (${full.length} chars total)`);
      updated++;
    } catch (err) {
      console.log(`✗ ${String(err.message).slice(0, 50)}`);
      errors++;
    }

    await sleep(DELAY_MS);
  }

  console.log("");
  console.log(`✅ Completado: ${updated} actualizados, ${errors} errores`);
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
