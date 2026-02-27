import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://carlosazaustre.es";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .slice(0, 50) // max 50 items
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const tags = post.tags
        .map((t) => `    <category>${escapeXml(t)}</category>`)
        .join("\n");

      return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description>${escapeXml(post.excerpt)}</description>
    <pubDate>${pubDate}</pubDate>
${tags}
  </item>`;
    })
    .join("\n");

  const lastBuildDate =
    posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Carlos Azaustre — Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Artículos sobre JavaScript, React, Node.js, arquitectura de software e inteligencia artificial.</description>
    <language>es</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/carlos-azaustre.jpg</url>
      <title>Carlos Azaustre — Blog</title>
      <link>${BASE_URL}/blog</link>
    </image>
    <copyright>© ${new Date().getFullYear()} Carlos Azaustre</copyright>
    <managingEditor>cazaustre@gmail.com (Carlos Azaustre)</managingEditor>
    <webMaster>cazaustre@gmail.com (Carlos Azaustre)</webMaster>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
