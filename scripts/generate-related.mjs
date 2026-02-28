/**
 * generate-related.mjs
 *
 * Genera los 3 posts más relacionados para cada artículo del blog
 * usando Claude Haiku y los guarda en el frontmatter como `related: [slug1, slug2, slug3]`.
 *
 * Solo procesa posts sin campo `related` en el frontmatter.
 * Costo estimado: ~$0.10 para 100 posts (se ejecuta una sola vez).
 *
 * Uso:
 *   node scripts/generate-related.mjs
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

if (!GATEWAY_TOKEN) {
  console.log("⚠️  OPENCLAW_GATEWAY_TOKEN no encontrado — saltando generación de posts relacionados.");
  process.exit(0);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Carga el índice completo del blog: slug + title + tags
function loadBlogIndex() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  return files.map((f) => {
    const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, f), "utf-8"));
    return {
      slug: f.replace(/\.mdx?$/, ""),
      title: data.title || f,
      tags: Array.isArray(data.tags) ? data.tags : [],
    };
  });
}

async function generateRelated(currentSlug, currentTitle, currentTags, allPosts) {
  // Excluir el post actual del índice
  const others = allPosts.filter((p) => p.slug !== currentSlug);

  // Construir el índice compacto para el prompt
  const index = others
    .map((p) => `- ${p.slug} | ${p.title}${p.tags.length ? ` [${p.tags.join(", ")}]` : ""}`)
    .join("\n");

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
      max_tokens: 80,
      stream: false,
      messages: [
        {
          role: "user",
          content: `Eres un experto en contenido técnico de programación web.

Dado este artículo:
- Slug: ${currentSlug}
- Título: ${currentTitle}
- Tags: ${currentTags.join(", ") || "ninguno"}

Elige los 3 artículos MÁS RELACIONADOS de esta lista (por tema, audiencia y utilidad):
${index}

Responde SOLO con los 3 slugs separados por comas, sin espacios extra, sin explicaciones.
Ejemplo: slug-uno,slug-dos,slug-tres`,
        },
      ],
    }),
  });

  clearTimeout(timeout);
  if (!res.ok) throw new Error(`API error ${res.status}`);

  const json = await res.json();
  const raw = json.choices[0].message.content.trim();

  // Parsear y validar slugs contra el índice real
  const validSlugs = new Set(others.map((p) => p.slug));
  const slugs = raw
    .split(",")
    .map((s) => s.trim().replace(/^["']|["']$/g, ""))
    .filter((s) => validSlugs.has(s))
    .slice(0, 3);

  return slugs;
}

async function main() {
  const allPosts = loadBlogIndex();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const missing = files.filter((file) => {
    const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
    return !Array.isArray(data.related) || data.related.length === 0;
  });

  if (missing.length === 0) {
    console.log("✅ Todos los posts tienen posts relacionados. Nada que hacer.");
    return;
  }

  console.log(`🔗 ${missing.length} posts sin related. Generando con Claude Haiku...`);
  console.log("");

  let updated = 0;
  let errors = 0;

  for (const file of missing) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx?$/, "");

    process.stdout.write(`  → ${slug} ... `);

    try {
      const related = await generateRelated(
        slug,
        data.title || slug,
        Array.isArray(data.tags) ? data.tags : [],
        allPosts
      );

      if (related.length === 0) {
        console.log("⚠️  no relacionados válidos encontrados");
      } else {
        const updatedContent = matter.stringify(content, { ...data, related });
        fs.writeFileSync(filePath, updatedContent, "utf-8");
        console.log(`✓ [${related.join(", ")}]`);
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
