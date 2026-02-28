/**
 * generate-tags.mjs
 *
 * Asigna tags SEO a los posts del blog usando Claude Haiku.
 * Solo procesa posts con tags vacíos o ausentes.
 *
 * Uso:
 *   node scripts/generate-tags.mjs
 *
 * Tags canónicos disponibles (usa SOLO estos):
 * javascript, typescript, react, nextjs, nodejs, css, html,
 * angular, vuejs, firebase, arquitectura, ia, carrera,
 * tutorial, herramientas, git, testing, performance, python,
 * web, programacion
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "../public/blog");
const DELAY_MS = 400;

const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN;
const GATEWAY_PORT = process.env.OPENCLAW_GATEWAY_PORT || "18789";

const CANONICAL_TAGS = [
  "javascript", "typescript", "react", "nextjs", "nodejs",
  "css", "html", "angular", "vuejs", "firebase",
  "arquitectura", "ia", "carrera", "tutorial", "herramientas",
  "git", "testing", "performance", "python", "web", "programacion",
];

if (!GATEWAY_TOKEN) {
  console.log("⚠️  OPENCLAW_GATEWAY_TOKEN no encontrado — saltando asignación de tags.");
  process.exit(0);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateTags(title, content) {
  const trimmed = content.replace(/^#+.*/gm, "").trim().slice(0, 1000);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  const res = await fetch(`http://localhost:${GATEWAY_PORT}/v1/chat/completions`, {
    method: "POST",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GATEWAY_TOKEN}`,
    },
    body: JSON.stringify({
      model: "anthropic/claude-haiku-4-5",
      max_tokens: 60,
      stream: false,
      messages: [
        {
          role: "user",
          content: `Elige entre 1 y 4 tags para este artículo técnico de programación web.
SOLO puedes usar tags de esta lista exacta: ${CANONICAL_TAGS.join(", ")}
Responde únicamente con los tags separados por comas, sin espacios extra, sin explicaciones.

Título: ${title}
Contenido: ${trimmed}

Tags:`,
        },
      ],
    }),
  });

  clearTimeout(timeout);

  if (!res.ok) throw new Error(`API error ${res.status}`);

  const json = await res.json();
  const raw = json.choices[0].message.content.trim().toLowerCase();

  // Parsear y validar contra la lista canónica
  const tags = raw
    .split(",")
    .map((t) => t.trim())
    .filter((t) => CANONICAL_TAGS.includes(t));

  return tags;
}

async function main() {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const missing = files.filter((file) => {
    const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
    return !Array.isArray(data.tags) || data.tags.length === 0;
  });

  if (missing.length === 0) {
    console.log("✅ Todos los posts tienen tags. Nada que hacer.");
    return;
  }

  console.log(`🏷️  ${missing.length} posts sin tags. Asignando con Claude Haiku...`);
  console.log("");

  let updated = 0;
  let errors = 0;

  for (const file of missing) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    process.stdout.write(`  → ${file.replace(/\.mdx?$/, "")} ... `);

    try {
      const tags = await generateTags(data.title || file, content);
      if (tags.length === 0) {
        console.log("⚠️  no tags detectados, saltando");
      } else {
        const updatedContent = matter.stringify(content, { ...data, tags });
        fs.writeFileSync(filePath, updatedContent, "utf-8");
        console.log(`✓ [${tags.join(", ")}]`);
        updated++;
      }
    } catch (err) {
      console.log(`✗ ${err.message}`);
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
