export type YouTubeVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
};

const CHANNEL_ID = "UCJgGc8pQO1lv04VXrBxA_Hg";
const API_KEY = process.env.YOUTUBE_API_KEY ?? "";

// Uploads playlist = UC... → UU...
const UPLOADS_PLAYLIST = CHANNEL_ID.replace(/^UC/, "UU");

// YouTube Shorts: ≤ 3 min (180s). Regular videos are longer.
const SHORTS_MAX_SECONDS = 180;

function parseDuration(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (
    parseInt(m[1] ?? "0") * 3600 +
    parseInt(m[2] ?? "0") * 60 +
    parseInt(m[3] ?? "0")
  );
}

async function getLatestUploads(limit: number): Promise<YouTubeVideo[]> {
  const response = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
    { next: { revalidate: 3600 } },
  );
  if (!response.ok) return [];
  const xml = await response.text();
  const decode = (text: string) =>
    text.replace(
      /&(amp|lt|gt|quot|apos);/g,
      (_, entity: string) =>
        ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" })[entity] ?? "",
    );
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .slice(0, limit)
    .flatMap((match) => {
      const entry = match[1];
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      return id && title && published
        ? [
            {
              id,
              title: decode(title),
              published,
              url: `https://www.youtube.com/watch?v=${id}`,
              thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            },
          ]
        : [];
    });
}

export async function getLatestVideos(
  limit = 3,
  { includeShorts = false }: { includeShorts?: boolean } = {},
): Promise<YouTubeVideo[]> {
  try {
    if (includeShorts) return await getLatestUploads(limit);
    // 1. Get video IDs from uploads playlist (up to 50 most recent)
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems` +
        `?part=snippet&playlistId=${UPLOADS_PLAYLIST}&maxResults=50&key=${API_KEY}`,
      { next: { revalidate: 3600 } },
    );
    if (!playlistRes.ok) return [];
    const playlistData = await playlistRes.json();

    const items: {
      id: string;
      title: string;
      thumbnail: string;
      published: string;
    }[] = (playlistData.items ?? []).map(
      (item: {
        snippet: {
          resourceId: { videoId: string };
          title: string;
          thumbnails: { high?: { url: string }; medium?: { url: string } };
          publishedAt: string;
        };
      }) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail:
          item.snippet.thumbnails?.high?.url ??
          item.snippet.thumbnails?.medium?.url ??
          "",
        published: item.snippet.publishedAt,
      }),
    );

    if (items.length === 0) return [];

    // 2. Batch-fetch durations for all video IDs
    const ids = items.map((v) => v.id).join(",");
    const detailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos` +
        `?part=contentDetails&id=${ids}&key=${API_KEY}`,
      { next: { revalidate: 3600 } },
    );
    if (!detailsRes.ok) return [];
    const detailsData = await detailsRes.json();

    const durationMap: Record<string, number> = {};
    for (const item of detailsData.items ?? []) {
      durationMap[item.id] = parseDuration(item.contentDetails.duration);
    }

    // 3. Filter Shorts and return first `limit` regular videos
    const videos: YouTubeVideo[] = [];
    for (const item of items) {
      const duration = durationMap[item.id] ?? 0;
      if (!includeShorts && duration <= SHORTS_MAX_SECONDS) continue; // skip Shorts

      videos.push({
        id: item.id,
        title: item.title,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        thumbnail:
          item.thumbnail || `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
        published: item.published,
      });

      if (videos.length >= limit) break;
    }

    return videos;
  } catch {
    return [];
  }
}
