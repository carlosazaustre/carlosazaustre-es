export type SubstackPost = {
  title: string;
  url: string;
  description: string;
  published: string;
  cover: string;
};

const FEED_URL = "https://carlosazaustre.substack.com/feed";

export async function getLatestNewsletters(limit = 3): Promise<SubstackPost[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const items = xml.split("<item>").slice(1);
    const posts: SubstackPost[] = [];

    for (const item of items) {
      const titleMatch = item.match(/<title><!\[CDATA\[([^\]]*)\]\]><\/title>/);
      const title = titleMatch?.[1] ?? item.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";

      const linkMatch = item.match(/<link>([^<]*)<\/link>/);
      const url = linkMatch?.[1]?.trim() ?? "";

      const descMatch = item.match(/<description><!\[CDATA\[([^\]]*)\]\]><\/description>/);
      const description = descMatch?.[1] ?? "";

      const pubMatch = item.match(/<pubDate>([^<]*)<\/pubDate>/);
      const published = pubMatch?.[1]?.trim() ?? "";

      // Try to grab first img from content or just use empty
      const imgMatch = item.match(/<enclosure[^>]*url="([^"]*)"/) ??
                       item.match(/<media:thumbnail[^>]*url="([^"]*)"/) ??
                       item.match(/https:\/\/substackcdn\.com\/image\/fetch[^\s"<]*/);
      const cover = imgMatch?.[1] ?? imgMatch?.[0] ?? "";

      if (title && url) {
        posts.push({ title, url, description, published, cover });
      }

      if (posts.length >= limit) break;
    }

    return posts;
  } catch {
    return [];
  }
}
