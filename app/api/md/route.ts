import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

/**
 * Markdown index of all blog posts.
 * Served when /blog is requested with Accept: text/markdown
 */
export async function GET() {
  const posts = getAllPosts();

  const lines = [
    "# Carlos Azaustre — Blog",
    "",
    `> ${posts.length} artículos sobre JavaScript, TypeScript, React, arquitectura de software e IA.`,
    "",
    "| Fecha | Título | URL |",
    "|-------|--------|-----|",
    ...posts.map(
      (p) =>
        `| ${p.date.slice(0, 10)} | ${p.title} | https://carlosazaustre.es/blog/${p.slug} |`
    ),
    "",
    "---",
    "Para obtener el contenido completo de un artículo en Markdown, haz un request con `Accept: text/markdown` a la URL del artículo.",
    "",
    "Más info: https://carlosazaustre.es/llms.txt",
  ];

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Content-Source": "cazaustre-web",
    },
  });
}
