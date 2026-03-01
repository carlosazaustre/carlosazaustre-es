/**
 * add-headings.mjs
 * Añade H2/H3 a posts del blog que no tienen ningún heading.
 * Usa Claude Haiku para identificar secciones naturales.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "../content/blog");
const DELAY_MS = 600;

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

async function addHeadings(title, content) {
  const trimmed = content.slice(0, 3000);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 50000);

  const res = await fetch(`http://localhost:${GATEWAY_PORT}/v1/chat/completions`, {
    method: "POST",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GATEWAY_TOKEN}`,
    },
    body: JSON.stringify({
      model: "anthropic/claude-haiku-4-5",
      max_tokens: 4000,
      stream: false,
      messages: [{
        role: "user",
        content: `Eres un editor de contenido técnico. Tienes este artículo de blog en Markdown que NO tiene headings (H2/H3).

Título del artículo: "${title}"

Contenido:
${trimmed}

Tu tarea: añade headings H2 (##) y H3 (###) donde tenga sentido para estructurar el texto.

REGLAS ESTRICTAS:
- Solo añade headings ENTRE párrafos (en líneas vacías), NUNCA dentro de un párrafo
- NO modifiques ningún texto existente — solo inserta líneas de heading
- NO añadas headings dentro de bloques de código (\`\`\`)
- Si el artículo es muy corto (<200 palabras) o es personal/opinión sin secciones claras, añade solo 1-2 headings si aplica
- Los headings deben reflejar el contenido real del párrafo que sigue
- Usa ## para secciones principales, ### para subsecciones
- Mínimo 2 headings, máximo 6
- Responde SOLO con el contenido Markdown completo (sin frontmatter, sin explicaciones)`,
      }],
    }),
  });

  clearTimeout(timeout);
  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  return json.choices[0].message.content.trim();
}

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"));
  const noHeadings = files.filter(f => {
    const { content } = matter(fs.readFileSync(path.join(BLOG_DIR, f), "utf-8"));
    return !hasRealHeading(content);
  });

  console.log(`📝 ${noHeadings.length} posts sin H2/H3. Añadiendo estructura...`);

  let updated = 0, errors = 0;
  for (const file of noHeadings) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    process.stdout.write(`  → ${file.replace(".mdx", "")} ... `);
    try {
      const newContent = await addHeadings(data.title || file, content);
      // Sanity check: new content should be longer (headings added) and not lose text
      if (newContent.length < content.length * 0.8) throw new Error("Contenido demasiado corto — rechazado");
      fs.writeFileSync(filePath, matter.stringify(newContent, data));
      console.log("✓");
      updated++;
    } catch (err) {
      console.log(`✗ ${String(err.message).slice(0, 60)}`);
      errors++;
    }
    await sleep(DELAY_MS);
  }

  console.log(`\n✅ Completado: ${updated} actualizados, ${errors} errores`);
}

main().catch(err => { console.error(err); process.exit(1); });
