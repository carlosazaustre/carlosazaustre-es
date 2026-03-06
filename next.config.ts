import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Elimina el header X-Powered-By: Next.js (fingerprinting)
  poweredByHeader: false,

  // Compresión gzip/brotli para todos los assets
  compress: true,

  // Optimización de imágenes
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24h
  },

  // Redirects permanentes: podcast episodes desde /blog → /podcast
  async redirects() {
    const podcastSlugs = [
      "quetechcuentas-01",
      "quetechcuentas-02",
      "quetechcuentas-03",
      "quetechcuentas-04",
      "quetechcuentas-05",
    ];
    return podcastSlugs.map((slug) => ({
      source: `/blog/${slug}`,
      destination: `/podcast/${slug}`,
      permanent: true, // 308
    }));
  },

  // Headers de seguridad y caché
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Assets estáticos — caché agresiva
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Imágenes — caché moderada
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        // OG images generadas — caché 24h para scrapers y redes sociales
        source: "/api/og",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
