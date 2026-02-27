import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "3px solid var(--border)",
        background: "var(--text)",
        color: "var(--accent)",
        padding: "2rem 1.5rem",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          © {year} Carlos Azaustre · Hecho con &lt;/&gt; y 🦞 en Madrid, España
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[
            { href: "https://twitter.com/carlosazaustre", label: "Twitter/X" },
            { href: "https://youtube.com/@carlosazaustre", label: "YouTube" },
            { href: "https://linkedin.com/in/carlosazaustre", label: "LinkedIn" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--accent)",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "2px solid var(--accent)",
                paddingBottom: "1px",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
