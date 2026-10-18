"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
const links = [
  { href: "/blog", label: "Blog" },
  { href: "/educacion", label: "Educación" },
  { href: "/podcast", label: "Podcast" },
  { href: "/libros", label: "Libros" },
  { href: "/about", label: "Sobre mí" },
];
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      aria-current={
        pathname === link.href || pathname.startsWith(`${link.href}/`)
          ? "page"
          : undefined
      }
      onClick={() => setOpen(false)}
    >
      {link.label}
    </Link>
  ));
  return (
    <header
      className="site-nav"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="nav-inner">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <span>carlosazaustre</span>.es
        </Link>
        <nav aria-label="Principal">{navigation}</nav>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          Menú{" "}
          {open ? (
            <Minus size={19} aria-hidden="true" />
          ) : (
            <Plus size={19} aria-hidden="true" />
          )}
        </button>
      </div>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Principal móvil"
        hidden={!open}
      >
        {navigation}
      </nav>
    </header>
  );
}
