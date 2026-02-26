"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const pct = Math.min(100, Math.round(progress));

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: "6px",
        background: "#e5e5de",
        borderBottom: "2px solid var(--border)",
      }}
    >
      {/* Barra de progreso */}
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: "var(--border)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
