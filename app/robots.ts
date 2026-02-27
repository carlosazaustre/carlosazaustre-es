import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Regla general: todo permitido excepto /api/
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // AI crawlers — acceso explícito al contenido LLM-optimizado
      {
        userAgent: "GPTBot",
        allow: ["/", "/blog/", "/llms.txt", "/llms-full.txt"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/blog/", "/llms.txt", "/llms-full.txt"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/blog/", "/llms.txt", "/llms-full.txt"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/blog/", "/llms.txt", "/llms-full.txt"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/blog/", "/llms.txt", "/llms-full.txt"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Gemini",
        allow: ["/", "/blog/", "/llms.txt", "/llms-full.txt"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/blog/", "/llms.txt", "/llms-full.txt"],
      },
      {
        userAgent: "cohere-ai",
        allow: ["/", "/blog/", "/llms.txt", "/llms-full.txt"],
      },
    ],
    sitemap: "https://carlosazaustre.es/sitemap.xml",
    // Referencia al llms.txt para AI crawlers que lo soporten
    host: "https://carlosazaustre.es",
  };
}
