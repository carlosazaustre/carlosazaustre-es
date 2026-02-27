"use client";

import { useState } from "react";

export default function LinksSubscribeForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    window.open(
      `https://carlosazaustre.substack.com/subscribe?email=${encodeURIComponent(email)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setDone(true);
    setEmail("");
  }

  return (
    <div style={{
      background: "#fff",
      border: "3px solid #1A1A1A",
      borderRadius: "4px",
      boxShadow: "4px 4px 0 #FFCC00",
      padding: "1rem",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <div style={{
          width: 40, height: 40, background: "#FF6719", border: "2px solid #1A1A1A",
          borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, fontFamily: "'Space Mono', monospace", fontSize: "0.9rem", color: "#fff",
        }}>
          ✉
        </div>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1A1A1A", lineHeight: 1.2 }}>
            Newsletter AprendiendoDEV
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "#888", marginTop: "2px" }}>
            JavaScript, IA y arquitectura · sin spam
          </div>
        </div>
      </div>

      {done ? (
        <div style={{
          background: "#FFCC00", border: "2px solid #1A1A1A", borderRadius: "3px",
          padding: "0.6rem 0.875rem", fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.82rem", fontWeight: 700, color: "#1A1A1A", display: "flex",
          alignItems: "center", justifyContent: "space-between",
        }}>
          <span>¡Confirma tu email en Substack! 🎉</span>
          <button onClick={() => setDone(false)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#1A1A1A",
            textDecoration: "underline", padding: 0,
          }}>volver</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            suppressHydrationWarning
            style={{
              flex: 1, padding: "0.55rem 0.75rem",
              border: "2px solid #1A1A1A", borderRadius: "4px",
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem",
              background: "#F7F7F7", color: "#1A1A1A", outline: "none",
              boxShadow: "2px 2px 0 #1A1A1A",
            }}
          />
          <button type="submit" style={{
            padding: "0.55rem 0.875rem",
            background: "#1A1A1A", color: "#FFCC00",
            border: "2px solid #1A1A1A", borderRadius: "4px",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem",
            fontWeight: 800, cursor: "pointer", flexShrink: 0,
            boxShadow: "2px 2px 0 #FFCC00",
          }}>
            →
          </button>
        </form>
      )}
    </div>
  );
}
