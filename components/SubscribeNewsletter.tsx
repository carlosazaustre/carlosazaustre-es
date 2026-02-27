"use client";

import { useState } from "react";

export default function SubscribeNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    const encoded = encodeURIComponent(email);
    window.open(
      `https://carlosazaustre.substack.com/subscribe?email=${encoded}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section style={{ marginBottom: "4rem" }}>
      <div
        className="neo-card"
        style={{
          padding: "2.5rem",
          background: "var(--accent)",
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Left: copy */}
        <div style={{ flex: "1 1 300px", minWidth: 0 }}>
          <div
            style={{
              display: "inline-block",
              background: "#1A1A1A",
              border: "2px solid #1A1A1A",
              borderRadius: "3px",
              padding: "2px 10px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--accent)",
              marginBottom: "1rem",
              boxShadow: "2px 2px 0 rgba(0,0,0,0.3)",
            }}
          >
            Newsletter · AprendiendoDEV
          </div>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "1.75rem",
              color: "#1A1A1A",
              marginBottom: "0.75rem",
              lineHeight: 1.1,
            }}
          >
            Aprende más cada semana.
          </h2>

          <p
            style={{
              color: "#3A3A3A",
              fontSize: "0.95rem",
              lineHeight: 1.75,
              marginBottom: 0,
            }}
          >
            Noticias de JavaScript, arquitectura de software e IA, directas a
            tu bandeja de entrada. Sin spam, puedes darte de baja cuando
            quieras.
          </p>
        </div>

        {/* Right: form */}
        <div style={{ flex: "1 1 280px", minWidth: 0 }}>
          {submitted ? (
            <div
              style={{
                border: "3px solid #1A1A1A",
                borderRadius: "6px",
                background: "#1A1A1A",
                padding: "1.5rem",
                boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: "var(--accent)",
                  margin: "0 0 0.5rem",
                }}
              >
                ¡Casi listo! 🎉
              </p>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.82rem",
                  color: "#aaa",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Confirma tu email en la pestaña de Substack que se acaba de
                abrir.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: "1rem",
                  background: "transparent",
                  border: "2px solid var(--accent)",
                  borderRadius: "4px",
                  padding: "6px 14px",
                  color: "var(--accent)",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Usar otro email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <label
                  htmlFor="nl-email"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#1A1A1A",
                  }}
                >
                  Tu email
                </label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  suppressHydrationWarning
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "3px solid #1A1A1A",
                    borderRadius: "4px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem",
                    background: "#fff",
                    color: "#1A1A1A",
                    outline: "none",
                    boxShadow: "4px 4px 0 #1A1A1A",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "#1A1A1A",
                    color: "var(--accent)",
                    border: "3px solid #1A1A1A",
                    borderRadius: "4px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
                    transition: "transform 0.1s, box-shadow 0.1s",
                    letterSpacing: "0.5px",
                  }}
                  onMouseDown={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px,2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 rgba(0,0,0,0.3)";
                  }}
                  onMouseUp={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 rgba(0,0,0,0.3)";
                  }}
                >
                  Suscribirse →
                </button>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.68rem",
                    color: "#3A3A3A",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Powered by Substack · Sin spam · Baja cuando quieras
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
