import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

/**
 * /llms.txt — Site map optimized for LLM agents.
 * Following the llms.txt convention.
 */
export async function GET() {
  const posts = getAllPosts();
  const recent = posts.slice(0, 30);

  const lines = [
    "# carlosazaustre.es",
    "",
    "> Blog personal de Carlos Azaustre. Ingeniero de software, Google Developer Expert, profesor universitario y creador de contenido sobre JavaScript, TypeScript, React, arquitectura de software e IA.",
    "",
    "## Docs",
    "",
    ...recent.map(
      (p) => `- [${p.title}](https://carlosazaustre.es/blog/${p.slug}): ${p.excerpt?.slice(0, 120) ?? ""}`
    ),
    "",
    "## Content Negotiation",
    "",
    "Este sitio soporta content negotiation. Para obtener cualquier artículo en Markdown en lugar de HTML:",
    "",
    "```",
    "curl -H 'Accept: text/markdown' https://carlosazaustre.es/blog/SLUG",
    "```",
    "",
    "Para obtener un índice de todos los artículos en Markdown:",
    "",
    "```",
    "curl -H 'Accept: text/markdown' https://carlosazaustre.es/blog",
    "```",
    "",
    `Total de artículos: ${posts.length}`,
    "",
    "## Contacto",
    "",
    "- Web: https://carlosazaustre.es",
    "- Twitter: https://twitter.com/carlosazaustre",
    "- LinkedIn: https://linkedin.com/in/carlosazaustre",
    "- YouTube: https://youtube.com/@carlosazaustre",
    "- GitHub: https://github.com/carlosazaustre",
  ];

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
