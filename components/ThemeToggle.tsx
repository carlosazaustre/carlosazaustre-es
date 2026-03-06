"use client";

import { useTheme, type Theme } from "./ThemeProvider";

const LABELS: Record<Theme, string> = {
  light: "☀️",
  dark: "🌙",
  terminal: ">_",
};

const TITLES: Record<Theme, string> = {
  light: "Modo claro — click para oscuro",
  dark: "Modo oscuro — click para terminal",
  terminal: "Modo terminal — click para claro",
};

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();

  return (
    <button
      onClick={cycleTheme}
      title={TITLES[theme]}
      aria-label={TITLES[theme]}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "38px",
        height: "38px",
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        fontSize: theme === "terminal" ? "0.7rem" : "1rem",
        letterSpacing: theme === "terminal" ? "0" : undefined,
        border: "3px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow-sm)",
        cursor: "pointer",
        background: "var(--card)",
        color: "var(--text)",
        transition: "box-shadow 0.1s ease, transform 0.1s ease, background 0.2s ease",
        flexShrink: 0,
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow)";
        (e.currentTarget as HTMLButtonElement).style.transform = "translate(-1px, -1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-sm)";
        (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px, 2px)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-sm)";
        (e.currentTarget as HTMLButtonElement).style.transform = "translate(-1px, -1px)";
      }}
    >
      {LABELS[theme]}
    </button>
  );
}
