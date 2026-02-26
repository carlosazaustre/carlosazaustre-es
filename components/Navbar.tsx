import Link from "next/link";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "Sobre mí" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div
        style={{
          maxWidth: "1200px",
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
            fontSize: "1.2rem",
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.5px",
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

        {/* Nav links */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="neo-btn">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
