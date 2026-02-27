import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://carlosazaustre.es"),
  title: {
    default: "Carlos Azaustre — Desarrollo Web & JavaScript",
    template: "%s | Carlos Azaustre",
  },
  description:
    "Ingeniero de Software, Google Developer Expert y creador de contenido. Aprende JavaScript, React, Node.js y arquitectura de software.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://carlosazaustre.es",
    siteName: "Carlos Azaustre",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@carlosazaustre",
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "https://carlosazaustre.es/rss.xml", title: "Carlos Azaustre — Blog RSS" },
      ],
    },
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Carlos Azaustre",
  url: "https://carlosazaustre.es",
  description:
    "Ingeniero de Software, Google Developer Expert y creador de contenido educativo sobre JavaScript, React, Node.js y arquitectura de software.",
  author: {
    "@type": "Person",
    name: "Carlos Azaustre",
    url: "https://carlosazaustre.es",
    sameAs: [
      "https://twitter.com/carlosazaustre",
      "https://youtube.com/@carlosazaustre",
      "https://linkedin.com/in/carlosazaustre",
      "https://github.com/carlosazaustre",
      "https://instagram.com/carlosazaustre",
    ],
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://carlosazaustre.es/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Carlos Azaustre",
  url: "https://carlosazaustre.es",
  jobTitle: "Ingeniero de Software · Google Developer Expert",
  description:
    "Ingeniero de Software con 20+ años de experiencia en desarrollo web, especializado en JavaScript, React y arquitectura de software. Google Developer Expert en Web Technologies.",
  image: "https://carlosazaustre.es/carlos-azaustre.jpg",
  email: "cazaustre@gmail.com",
  sameAs: [
    "https://twitter.com/carlosazaustre",
    "https://youtube.com/@carlosazaustre",
    "https://linkedin.com/in/carlosazaustre",
    "https://github.com/carlosazaustre",
    "https://instagram.com/carlosazaustre",
    "https://carlosazaustre.substack.com",
  ],
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Clean Architecture",
    "Domain-Driven Design",
    "Inteligencia Artificial",
    "Firebase",
    "Desarrollo Web",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
