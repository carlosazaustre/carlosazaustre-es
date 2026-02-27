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
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
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
          {/* RSS Feed */}
          <Link
            href="/rss.xml"
            title="Feed RSS del blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
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
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
            </svg>
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
}
