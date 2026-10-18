import Link from "next/link";
export default function Footer() {
  return (
    <footer className="editorial-footer editorial-wrap">
      <Link className="brand" href="/">
        <span>carlosazaustre</span>.es
      </Link>
      <p>© {new Date().getFullYear()} Carlos Azaustre</p>
      <nav aria-label="Redes y enlaces">
        <a href="https://github.com/carlosazaustre">GitHub</a>
        <a href="https://linkedin.com/in/carlosazaustre">LinkedIn</a>
        <Link href="/now">Ahora</Link>
        <a href="/rss.xml">RSS</a>
      </nav>
    </footer>
  );
}
