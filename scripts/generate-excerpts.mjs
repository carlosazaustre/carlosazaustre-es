/**
 * generate-excerpts.mjs
 *
 * Recorre todos los posts de /public/blog/*.md y genera un excerpt SEO
 * usando Claude Haiku (vía OpenClaw gateway) para aquellos que no lo tienen.
 *
 * Uso manual:  node scripts/generate-excerpts.mjs
 * Prebuild:    se ejecuta automáticamente (solo procesa posts sin excerpt)
 */

import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "../public/blog");
const DELAY_MS = 2000;
const MAX_RETRIES = 4;
const TMP_PAYLOAD = path.join(os.tmpdir(), "excerpt-payload.json");

const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN;
const GATEWAY_PORT = process.env.OPENCLAW_GATEWAY_PORT || "18789";

if (!GATEWAY_TOKEN) {
  console.log("⚠️  OPENCLAW_GATEWAY_TOKEN no encontrado — saltando generación de excerpts.");
  process.exit(0);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateExcerpt(title, content, attempt = 1) {
  const trimmedContent = content.replace(/^#+.*/gm, "").trim().slice(0, 1200);

  const payload = {
    model: "anthropic/claude-haiku-4-5",
    max_tokens: 180,
    messages: [
      {
        role: "user",
        content: `Genera un excerpt SEO en español para este artículo de blog técnico.
Requisitos:
- Entre 140 y 160 caracteres exactos
- Descriptivo, con las keywords principales del artículo
- Atractivo para aparecer en resultados de Google
- Sin comillas, sin puntos suspensivos al final, sin explicaciones extra

Título: ${title}

Contenido:
${trimmedContent}

Responde SOLO con el texto del excerpt:`,
      },
    ],
  };

  fs.writeFileSync(TMP_PAYLOAD, JSON.stringify(payload), "utf-8");

  try {
    const result = execFileSync(
      "curl",
      [
        "-s",
        "--max-time", "25",
        "-X", "POST",
        `http://localhost:${GATEWAY_PORT}/v1/chat/completions`,
        "-H", "Content-Type: application/json",
        "-H", `Authorization: Bearer ${GATEWAY_TOKEN}`,
        "-d", `@${TMP_PAYLOAD}`,
      ],
      { encoding: "utf-8", timeout: 30000 }
    );

    const json = JSON.parse(result);
    if (json.error) throw new Error(json.error.message || JSON.stringify(json.error));
    return json.choices[0].message.content.trim();
  } catch (err) {
    if (attempt < MAX_RETRIES) {
      await sleep(2000 * attempt);
      return generateExcerpt(title, content, attempt + 1);
    }
    throw err;
  }
}

async function main() {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const missing = files.filter((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);
    return !data.excerpt || data.excerpt.trim() === "";
  });

  if (missing.length === 0) {
    console.log("✅ Todos los posts tienen excerpt. Nada que hacer.");
    return;
  }

  console.log(`📝 ${missing.length} posts sin excerpt. Generando con Claude Haiku...`);
  console.log("");

  let updated = 0;
  let errors = 0;

  for (const file of missing) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    process.stdout.write(`  → ${file.replace(/\.mdx?$/, "")} ... `);

    try {
      const excerpt = await generateExcerpt(data.title || file, content);
      const updatedContent = matter.stringify(content, { ...data, excerpt });
      fs.writeFileSync(filePath, updatedContent, "utf-8");
      console.log(`✓ (${excerpt.length} chars)`);
      updated++;
    } catch (err) {
      console.log(`✗ ${String(err.message).slice(0, 60)}`);
      errors++;
    }

    await sleep(DELAY_MS);
  }

  console.log("");
  console.log(`✅ Completado: ${updated} actualizados, ${errors} errores`);
  if (updated > 0) console.log("💡 Recuerda hacer commit de los cambios en public/blog/");
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
