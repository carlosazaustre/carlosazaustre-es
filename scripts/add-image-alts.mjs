/**
 * add-image-alts.mjs
 * Añade alt text a imágenes Markdown con alt vacío: ![]()
 * Usa Claude Haiku para generar alts descriptivos basados en la URL y contexto.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "../content/blog");
const DELAY_MS = 400;

const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN;
const GATEWAY_PORT = process.env.OPENCLAW_GATEWAY_PORT || "18789";

if (!GATEWAY_TOKEN) { console.log("⚠️ Sin token"); process.exit(0); }

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function generateAlt(imageUrl, postTitle, surrounding) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

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
      messages: [{
        role: "user",
        content: `Genera un alt text para esta imagen en un blog técnico.

Post: "${postTitle}"
URL imagen: ${imageUrl}
Contexto cercano: "${surrounding.slice(0, 200)}"

Requisitos:
- Descriptivo, en español
- Máximo 100 caracteres
- Sin comillas, sin punto final
- Responde SOLO con el alt text`,
      }],
    }),
  });

  clearTimeout(timeout);
  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  return json.choices[0].message.content.trim().replace(/^["']|["']$/g, "").slice(0, 100);
}

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"));
  const withEmptyAlts = files.filter(f => {
    const { content } = matter(fs.readFileSync(path.join(BLOG_DIR, f), "utf-8"));
    return /!\[\]\([^)]+\)/.test(content);
  });

  console.log(`🖼️  ${withEmptyAlts.length} posts con imágenes sin alt. Generando...`);

  let totalFixed = 0, errors = 0;

  for (const file of withEmptyAlts) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const title = data.title || file;

    const emptyAltRegex = /!\[\]\(([^)]+)\)/g;
    const matches = [...content.matchAll(emptyAltRegex)];
    console.log(`  ${file.replace(".mdx", "")} — ${matches.length} imgs`);

    let newContent = content;

    for (const match of matches) {
      const [fullMatch, imgUrl] = match;
      const matchIndex = match.index;
      const surrounding = content.slice(Math.max(0, matchIndex - 150), matchIndex + 150);

      process.stdout.write(`    → ${imgUrl.split("/").pop()?.slice(0, 40)} ... `);
      try {
        const alt = await generateAlt(imgUrl, title, surrounding);
        newContent = newContent.replace(fullMatch, `![${alt}](${imgUrl})`);
        console.log(`✓ "${alt}"`);
        totalFixed++;
      } catch (err) {
        console.log(`✗ ${err.message.slice(0, 40)}`);
        errors++;
      }
      await sleep(DELAY_MS);
    }

    fs.writeFileSync(filePath, matter.stringify(newContent, data));
  }

  console.log(`\n✅ Completado: ${totalFixed} alts añadidos, ${errors} errores`);
}

main().catch(err => { console.error(err); process.exit(1); });
