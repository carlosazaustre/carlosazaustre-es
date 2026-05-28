import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { ThemeProvider } from "@/components/ThemeProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
    title: "Carlos Azaustre — Desarrollo Web & JavaScript",
    description:
      "Ingeniero de Software, Google Developer Expert y creador de contenido. Aprende JavaScript, React, Node.js y arquitectura de software.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@carlosazaustre",
    title: "Carlos Azaustre — Desarrollo Web & JavaScript",
    description:
      "Ingeniero de Software, Google Developer Expert y creador de contenido. Aprende JavaScript, React, Node.js y arquitectura de software.",
  },
  alternates: {
    canonical: "https://carlosazaustre.es",
    types: {
      "application/rss+xml": [
        { url: "https://carlosazaustre.es/rss.xml", title: "Carlos Azaustre — Blog RSS" },
      ],
    },
  },
  icons: {
    apple: "/carlos-azaustre.png",
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Carlos Azaustre",
  url: "https://carlosazaustre.es",
  description:
    "Ingeniero de Software, Google Developer Expert y creador de contenido educativo sobre JavaScript, React, Node.js y arquitectura de software.",
  author: { "@id": "https://carlosazaustre.es/#person" },
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
  "@id": "https://carlosazaustre.es/#person",
  name: "Carlos Azaustre",
  url: "https://carlosazaustre.es",
  jobTitle: "Ingeniero de Software · Google Developer Expert",
  description:
    "Ingeniero de Software con 20+ años de experiencia en desarrollo web, especializado en JavaScript, React y arquitectura de software. Google Developer Expert en Web Technologies.",
  image: "https://carlosazaustre.es/carlos-azaustre.jpg",
  email: "cazaustre@gmail.com",
  nationality: { "@type": "Country", name: "España" },
  award: "Google Developer Expert in Web Technologies",
  hasOccupation: {
    "@type": "Occupation",
    name: "Ingeniero de Software y creador de contenido educativo",
    occupationalCategory: "15-1252.00",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Carlos III de Madrid",
    sameAs: "https://www.uc3m.es",
  },
  worksFor: [
    {
      "@type": "CollegeOrUniversity",
      name: "Universidad Europea de Madrid",
      sameAs: "https://universidadeuropea.com",
    },
    {
      "@type": "EducationalOrganization",
      name: "BIG School",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Universitat Oberta de Catalunya",
      sameAs: "https://www.uoc.edu",
    },
  ],
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
        {/* Preconnect para Google Fonts — mejora LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Theme toggle disabled — only light mode active for now */}
        {/* Anti-flicker script commented out until themes are polished */}
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
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
        <Script
          defer
          src="https://analytics.cazaustre.dev/script.js"
          data-website-id="ac38a716-3ba9-4d80-ae3f-b9cff6612237"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
