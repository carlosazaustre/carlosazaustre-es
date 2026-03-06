import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function SectionTitle({ children, action }: SectionTitleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)",
          fontWeight: 800,
          fontSize: "1.5rem",
          color: "var(--text)",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </h2>
      <div
        style={{
          flex: 1,
          height: "3px",
          background: "var(--border)",
          opacity: 0.25,
        }}
      />
      {action}
    </div>
  );
}
