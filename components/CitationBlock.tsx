"use client";

interface CitationBlockProps {
  title: string;
  date: string;
  // Blog post
  slug?: string;
  // Book
  isbn?: string;
  publisher?: string;
  url?: string;
}

function copyText(text: string, btn: HTMLButtonElement) {
  const doFallback = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand("copy"); } catch {}
    document.body.removeChild(ta);
  };

  const finish = () => {
    btn.textContent = "✓ Copiado";
    setTimeout(() => { btn.textContent = "Copiar"; }, 2000);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(finish).catch(() => { doFallback(); finish(); });
  } else {
    doFallback();
    finish();
  }
}

export default function CitationBlock({ title, date, slug, isbn, publisher, url }: CitationBlockProps) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();

  const isBook = Boolean(isbn);
  const resolvedUrl = url ?? (slug ? `https://carlosazaustre.es/blog/${slug}` : "");
  const resolvedPublisher = publisher ?? "Amazon KDP";

  // BibTeX key
  const keyBase = isBook
    ? `azaustre${year}${title.toLowerCase().replace(/[^a-z]/g, "").slice(0, 12)}`
    : `azaustre${year}${(slug ?? "").replace(/-/g, "").slice(0, 12)}`;

  // APA
  const apa = isBook
    ? `Azaustre, C. (${year}). ${title}. ${resolvedPublisher}.${isbn ? ` ISBN ${isbn}.` : ""}`
    : `Azaustre, C. (${year}, ${month} ${day}). ${title}. carlosazaustre.es. ${resolvedUrl}`;

  // BibTeX
  const bibtex = isBook
    ? `@book{${keyBase},
  author    = {Azaustre, Carlos},
  title     = {{${title}}},
  year      = {${year}},
  publisher = {${resolvedPublisher}},${isbn ? `\n  isbn      = {${isbn}},` : ""}${resolvedUrl ? `\n  url       = {${resolvedUrl}},` : ""}
}`
    : `@misc{${keyBase},
  author       = {Azaustre, Carlos},
  title        = {{${title}}},
  year         = {${year}},
  month        = {${month}},
  howpublished = {\\url{${resolvedUrl}}}
}`;

  const codeStyle: React.CSSProperties = {
    display: "block",
    background: "#1a1a1a",
    color: "#e2e2e2",
    padding: "1rem",
    borderRadius: "4px",
    fontSize: "0.8rem",
    overflow: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    margin: 0,
    fontFamily: "'Space Mono', 'Fira Mono', monospace",
    lineHeight: 1.6,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "0.4rem",
  };

  const copyBtnStyle: React.CSSProperties = {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    background: "#333",
    color: "#e2e2e2",
    border: "none",
    borderRadius: "3px",
    padding: "0.2rem 0.55rem",
    fontSize: "0.7rem",
    cursor: "pointer",
    fontFamily: "'Space Mono', monospace",
    lineHeight: 1.5,
  };

  return (
    <details
      style={{
        marginTop: "3rem",
        border: "3px solid var(--border)",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <summary
        style={{
          padding: "0.9rem 1.25rem",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "0.93rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--card)",
          userSelect: "none",
          listStyle: "none",
          color: "var(--text)",
        }}
      >
        📎 Cómo citar {isBook ? "este libro" : "este artículo"}
      </summary>

      <div
        style={{
          padding: "1.25rem",
          background: "var(--card-elevated, #f9f9f9)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          borderTop: "2px solid var(--border)",
        }}
      >
        {/* APA */}
        <div>
          <div style={labelStyle}>APA</div>
          <div style={{ position: "relative" }}>
            <pre style={codeStyle}>
              <code>{apa}</code>
            </pre>
            <button
              style={copyBtnStyle}
              onClick={(e) => copyText(apa, e.currentTarget)}
            >
              Copiar
            </button>
          </div>
        </div>

        {/* BibTeX */}
        <div>
          <div style={labelStyle}>BibTeX</div>
          <div style={{ position: "relative" }}>
            <pre style={{ ...codeStyle, whiteSpace: "pre" }}>
              <code>{bibtex}</code>
            </pre>
            <button
              style={copyBtnStyle}
              onClick={(e) => copyText(bibtex, e.currentTarget)}
            >
              Copiar
            </button>
          </div>
        </div>
      </div>
    </details>
  );
}
