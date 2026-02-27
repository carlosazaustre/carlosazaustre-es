"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/uses", label: "Uses" },
  { href: "/about", label: "Sobre mí" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="navbar">
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--text)",
              textDecoration: "none",
              letterSpacing: "-0.5px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                background: "var(--text)",
                color: "var(--accent)",
                padding: "2px 8px",
                borderRadius: "2px",
              }}
            >
              carlosazaustre
            </span>
            <span style={{ color: "var(--text)", fontWeight: 800 }}>.es</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`neo-btn${pathname === link.href ? " neo-btn-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          className="nav-overlay"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Offcanvas panel */}
      <div className={`nav-offcanvas${open ? " nav-offcanvas-open" : ""}`} aria-hidden={!open}>
        {/* Panel header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "3px solid var(--border)",
            background: "var(--accent)",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            Menú
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "4px",
            }}
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ padding: "1.5rem" }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-offcanvas-link${pathname === link.href ? " nav-offcanvas-link-active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer inside offcanvas */}
        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "1.5rem",
            right: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
            }}
          >
            carlosazaustre.es
          </p>
        </div>
      </div>
    </>
  );
}
