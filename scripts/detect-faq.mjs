#!/usr/bin/env node
/**
 * detect-faq.mjs
 *
 * Detecta posts con estructura Q&A (H2/H3 que son preguntas),
 * extrae pares pregunta/respuesta, limpia con Haiku si hace falta
 * y escribe el campo `faq:` en el frontmatter de cada post.
 *
 * Usage:
 *   node scripts/detect-faq.mjs            # procesa todos los posts
 *   node scripts/detect-faq.mjs --dry-run  # solo muestra, no escribe
 *   node scripts/detect-faq.mjs --slug conventional-commits  # un post concreto
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");

const DRY_RUN = process.argv.includes("--dry-run");
const SLUG_FILTER = (() => {
  const i = process.argv.indexOf("--slug");
  return i !== -1 ? process.argv[i + 1] : null;
})();

const GATEWAY_URL = "http://localhost:18789/v1/chat/completions";
const GATEWAY_TOKEN = "86db80ecf9209077c8a2acdb0fdfacf211994613a2da95ef";
const MODEL = "anthropic/claude-haiku-4-5";

// ── Question word patterns ─────────────────────────────────────────────────
const QW_ES = /^(qué|que |cómo|como |por qué|por que |cuándo|cuando |dónde|donde |cuál|cual |es |son |tiene |hay |puede |puedo |debería |debo )/i;
const QW_EN = /^(what |how |why |when |where |which |is |are |can |should |do |does )/i;
const ENDS_Q = /\?$/;

function isQuestion(text) {
  return ENDS_Q.test(text.trim()) || QW_ES.test(text.trim()) || QW_EN.test(text.trim());
}

// ── Markdown cleaner ───────────────────────────────────────────────────────
function cleanMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")          // fenced code blocks
    .replace(/`[^`\n]+`/g, (m) => m.slice(1, -1)) // inline code → plain
    .replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, "") // JSX self-closing <YouTube ... />
    .replace(/<[^>]+>/g, "")                 // any remaining HTML tags
    .replace(/!\[.*?\]\(.*?\)/g, "")         // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → text
    .replace(/^#{1,6}\s+/gm, "")            // headings
    .replace(/\*{1,2}([^*\n]+)\*{1,2}/g, "$1") // bold/italic
    .replace(/_{1,2}([^_\n]+)_{1,2}/g, "$1")
    .replace(/^[-*+]\s+/gm, "")             // list bullets
    .replace(/^\d+\.\s+/gm, "")             // numbered lists
    .replace(/^>\s*/gm, "")                 // blockquotes
    .replace(/\n{2,}/g, " ")               // collapse newlines
    .replace(/\s{2,}/g, " ")               // collapse spaces
    .trim();
}

// ── Extract Q&A pairs from MDX content ────────────────────────────────────
function extractQAPairs(content) {
  const lines = content.split("\n");
  const sections = [];
  let currentHeading = null;
  let buffer = [];

  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (m) {
      if (currentHeading !== null) {
        sections.push({ heading: currentHeading, raw: buffer.join("\n") });
      }
      currentHeading = m[2].trim();
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  if (currentHeading !== null) {
    sections.push({ heading: currentHeading, raw: buffer.join("\n") });
  }

  const pairs = [];
  for (const s of sections) {
    if (!isQuestion(s.heading)) continue;
    const cleaned = cleanMarkdown(s.raw);
    if (cleaned.length < 40) continue; // respuesta demasiado corta
    pairs.push({ q: s.heading, rawAnswer: cleaned });
  }

  return pairs;
}

// ── Haiku: refine answer to clean prose ───────────────────────────────────
async function refineAnswer(q, rawAnswer) {
  // Si la respuesta ya es corta y limpia, usarla directamente
  if (rawAnswer.length <= 350 && !/[<>{}]/.test(rawAnswer)) {
    return rawAnswer.slice(0, 500);
  }

  const prompt = `Dado este fragmento de un artículo técnico en español, extrae la respuesta a la pregunta en máximo 200 caracteres de texto plano, sin markdown, sin código, en prosa natural. Solo devuelve el texto de la respuesta, nada más.

Pregunta: ${q}
Fragmento: ${rawAnswer.slice(0, 800)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GATEWAY_TOKEN}`,
      },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        max_tokens: 120,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const json = await res.json();
    const answer = json.choices?.[0]?.message?.content?.trim() ?? "";
    return answer.slice(0, 500) || rawAnswer.slice(0, 500);
  } catch {
    clearTimeout(timeout);
    return rawAnswer.slice(0, 500);
  }
}

// ── Write faq field to frontmatter ────────────────────────────────────────
function writeFaqToFrontmatter(filePath, faqItems) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);

  // Remove existing faq if any
  delete parsed.data.faq;
  parsed.data.faq = faqItems;

  // Reconstruct file preserving content
  const newFrontmatter = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(filePath, newFrontmatter, "utf-8");
}

// ── YAML-safe: ensure strings don't break YAML ────────────────────────────
function yamlSafe(str) {
  return str
    .replace(/\n/g, " ")
    .replace(/:/g, "&#58;")  // colon breaks YAML values
    .replace(/"/g, "'")
    .trim()
    .slice(0, 490);
}

// ── Main ───────────────────────────────────────────────────────────────────
async function run() {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .filter((f) => !SLUG_FILTER || f === `${SLUG_FILTER}.mdx`);

  console.log(`\n📋 Analizando ${files.length} posts...\n`);

  const results = { ok: [], skip: [], error: [] };

  for (const filename of files) {
    const slug = filename.replace(".mdx", "");
    const filePath = path.join(BLOG_DIR, filename);
    const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));

    const rawPairs = extractQAPairs(content);

    if (rawPairs.length < 2) {
      process.stdout.write(`  ⏭  ${slug} (${rawPairs.length} pares — insuficiente)\n`);
      results.skip.push(slug);
      continue;
    }

    process.stdout.write(`  🔍 ${slug} (${rawPairs.length} pares) → refinando...`);

    const faqItems = [];
    for (const pair of rawPairs) {
      const answer = await refineAnswer(pair.q, pair.rawAnswer);
      faqItems.push({ q: yamlSafe(pair.q), a: yamlSafe(answer) });
    }

    if (DRY_RUN) {
      console.log(" [DRY RUN]");
      faqItems.forEach((f) => {
        console.log(`    Q: ${f.q}`);
        console.log(`    A: ${f.a.slice(0, 100)}...`);
      });
    } else {
      try {
        writeFaqToFrontmatter(filePath, faqItems);
        console.log(` ✅ (${faqItems.length} pares escritos)`);
        results.ok.push(slug);
      } catch (err) {
        console.log(` ❌ ${err.message}`);
        results.error.push(slug);
      }
    }
  }

  console.log(`\n✨ Completado:`);
  console.log(`   ✅ Procesados: ${results.ok.length}`);
  console.log(`   ⏭  Sin pares suficientes: ${results.skip.length}`);
  console.log(`   ❌ Errores: ${results.error.length}`);
  if (results.ok.length > 0) {
    console.log(`\nPosts con FAQ:`);
    results.ok.forEach((s) => console.log(`  - ${s}`));
  }
}

run().catch(console.error);
