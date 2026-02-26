export type YouTubeVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
};

const CHANNEL_ID = "UCJgGc8pQO1lv04VXrBxA_Hg";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)<\/${tag}>`));
  return match?.[1]?.trim() ?? "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*${attr}="([^"]*)"[^>]*>`));
  return match?.[1] ?? "";
}

export async function getLatestVideos(limit = 4): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();

    // Split into entries
    const entries = xml.split("<entry>").slice(1);
    const videos: YouTubeVideo[] = [];

    for (const entry of entries) {
      // Skip Shorts
      const linkHref = extractAttr(entry, "link", "href");
      if (linkHref.includes("/shorts/")) continue;

      const videoId = extractTag(entry, "yt:videoId");
      if (!videoId) continue;

      const title = extractTag(entry, "title");
      const thumbnail = extractAttr(entry, "media:thumbnail", "url");
      const published = extractTag(entry, "published");

      videos.push({
        id: videoId,
        title,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        published,
      });

      if (videos.length >= limit) break;
    }

    return videos;
  } catch {
    return [];
  }
}
