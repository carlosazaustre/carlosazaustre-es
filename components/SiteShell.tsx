"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="site-skip" href="#contenido">
        Ir al contenido
      </a>
      <Navbar />
      <main id="contenido">{children}</main>
      <Footer />
    </>
  );
}
