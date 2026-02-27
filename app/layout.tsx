import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
