/**
 * add-headings-long.mjs — versión para posts largos
 * En lugar de reescribir el contenido, pide a Haiku solo los headings
 * y en qué párrafo insertarlos (por índice de párrafo).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "../content/blog");
const DELAY_MS = 700;

const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN;
const GATEWAY_PORT = process.env.OPENCLAW_GATEWAY_PORT || "18789";

if (!GATEWAY_TOKEN) { console.log("⚠️ Sin token"); process.exit(0); }

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function hasRealHeading(content) {
  const lines = content.split("\n");
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) inCode = !inCode;
    if (!inCode && /^#{2,4} /.test(line)) return true;
  }
  return false;
}

// Devuelve los bloques del artículo (párrafos, separados por línea vacía)
function getBlocks(content) {
  return content.split(/\n{2,}/).map(b => b.trim()).filter(Boolean);
}

async function getHeadingPlan(title, blocks) {
  // Envía solo el inicio de cada bloque para que Haiku entienda la estructura
  const outline = blocks
    .slice(0, 30)
    .map((b, i) => `[${i}] ${b.slice(0, 80).replace(/\n/g, " ")}`)
    .join("\n");

  const controller = new AbortController();
  setTimeout(() => controller.abort(), 40000);

  const res = await fetch(`http://localhost:${GATEWAY_PORT}/v1/chat/completions`, {
    method: "POST",
    signal: controller.signal,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GATEWAY_TOKEN}` },
    body: JSON.stringify({
      model: "anthropic/claude-haiku-4-5",
      max_tokens: 400,
      stream: false,
      messages: [{
        role: "user",
        content: `Artículo: "${title}"

Bloques de contenido (índice — inicio del bloque):
${outline}

Decide dónde insertar H2 (##) headings entre los bloques para estructurar el artículo.
Responde SOLO en este formato JSON (sin explicaciones):
[{"before": 2, "heading": "## Título de sección"}, {"before": 5, "heading": "## Otro título"}, ...]

Reglas:
- "before" es el índice del bloque ANTES del cual va el heading
- Mínimo 2, máximo 5 headings
- Los headings deben describir el contenido real
- No insertes heading en índice 0 (inicio del artículo)`,
      }],
    }),
  });

  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  const raw = json.choices[0].message.content.trim();
  // Extrae el JSON aunque venga con texto extra
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("Respuesta no es JSON válido");
  return JSON.parse(jsonMatch[0]);
}

function applyHeadings(content, plan) {
  const blocks = getBlocks(content);
  // Ordena por índice descendente para no desplazar índices al insertar
  const sorted = [...plan].sort((a, b) => b.before - a.before);
  for (const { before, heading } of sorted) {
    if (before > 0 && before < blocks.length) {
      blocks.splice(before, 0, heading);
    }
  }
  return blocks.join("\n\n");
}

async function main() {
  const targets = process.argv.slice(2); // slugs opcionales
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"));

  const toProcess = files.filter(f => {
    const slug = f.replace(".mdx", "");
    if (targets.length && !targets.includes(slug)) return false;
    const { content } = matter(fs.readFileSync(path.join(BLOG_DIR, f), "utf-8"));
    return !hasRealHeading(content);
  });

  console.log(`📝 ${toProcess.length} posts a procesar...`);
  let updated = 0, errors = 0;

  for (const file of toProcess) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    process.stdout.write(`  → ${file.replace(".mdx", "")} ... `);
    try {
      const blocks = getBlocks(content);
      if (blocks.length < 3) { console.log("⏭ muy corto, skip"); continue; }

      const plan = await getHeadingPlan(data.title || file, blocks);
      if (!plan.length) throw new Error("Plan vacío");

      const newContent = applyHeadings(content, plan);
      fs.writeFileSync(filePath, matter.stringify(newContent, data));
      console.log(`✓ (${plan.length} headings)`);
      updated++;
    } catch (err) {
      console.log(`✗ ${String(err.message).slice(0, 60)}`);
      errors++;
    }
    await sleep(DELAY_MS);
  }

  console.log(`\n✅ ${updated} actualizados, ${errors} errores`);
}

main().catch(err => { console.error(err); process.exit(1); });
