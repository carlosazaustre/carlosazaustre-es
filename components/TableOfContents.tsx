"use client";

import { useEffect, useRef, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number; // 2 = h2, 3 = h3
}

function buildToc(): TocItem[] {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>("article h2, article h3")
  );
  return headings
    .filter((el) => el.id)
    .map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
}

export default function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const toc = buildToc();
    setItems(toc);
    if (toc.length === 0) return;

    // Intersection observer to highlight active section
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Índice de contenidos"
      style={{
        background: "var(--card)",
        border: "3px solid var(--border)",
        borderRadius: "4px",
        padding: "1.25rem 1.5rem",
        marginBottom: "2.5rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
          paddingBottom: "0.75rem",
          borderBottom: "2px solid var(--border)",
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.78rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text)",
          }}
        >
          Índice
        </span>
      </div>

      {/* TOC links */}
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.15rem" }}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isH3 = item.level === 3;
          return (
            <li key={item.id} style={{ paddingLeft: isH3 ? "1.25rem" : "0" }}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={{
                  display: "block",
                  padding: "0.3rem 0.5rem",
                  borderRadius: "3px",
                  fontFamily: isH3 ? "'Space Mono', monospace" : "'Space Grotesk', sans-serif",
                  fontSize: isH3 ? "0.78rem" : "0.88rem",
                  fontWeight: isActive ? 700 : isH3 ? 400 : 600,
                  color: isActive ? "var(--text)" : "var(--text-secondary)",
                  textDecoration: "none",
                  background: isActive ? "var(--accent)" : "transparent",
                  borderLeft: isActive ? "3px solid var(--border)" : "3px solid transparent",
                  transition: "all 0.15s ease",
                  lineHeight: 1.4,
                }}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
