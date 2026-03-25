"use client";

import { useEffect, useState } from "react";

const DEADLINE = new Date("2026-03-19T23:59:59+02:00"); // 19 marzo Madrid

function getTimeLeft() {
  const now = new Date();
  const diff = DEADLINE.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function FeaturedMasterIA() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <a
      href="https://thebigschool.com/master-desarrollo-con-ia/?ref=caza"
      target="_blank"
      rel="noopener noreferrer"
      className="links-btn"
      style={{ display: "block", textDecoration: "none", marginBottom: "1.75rem" }}
    >
      <div
        className="links-banner-shake"
        style={{
          background: "#FFCC00",
          border: "3px solid #1A1A1A",
          borderRadius: "4px",
          boxShadow: "5px 5px 0 #1A1A1A",
          padding: "1rem 1.125rem",
        }}
      >
        {/* Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
          <span
            style={{
              background: "#1A1A1A",
              color: "#FFCC00",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              padding: "2px 8px",
              borderRadius: "3px",
            }}
          >
            🎓 2ª Edición · Matrícula abierta
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "1.05rem",
            color: "#1A1A1A",
            lineHeight: 1.25,
            marginBottom: "0.4rem",
          }}
        >
          Máster en Desarrollo con IA
        </div>

        {/* Sub */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            color: "#444",
            lineHeight: 1.5,
            marginBottom: "0.5rem",
          }}
        >
          Con Big School · Online y con certificado
        </div>

        {/* Countdown */}
        {timeLeft && (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "0.75rem",
            }}
          >
            {[
              { value: timeLeft.days, label: "d" },
              { value: timeLeft.hours, label: "h" },
              { value: timeLeft.minutes, label: "m" },
              { value: timeLeft.seconds, label: "s" },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: "#1A1A1A",
                  color: "#FFCC00",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  padding: "0.3rem 0.5rem",
                  borderRadius: "3px",
                  minWidth: "2.2rem",
                  textAlign: "center",
                }}
              >
                {String(value).padStart(2, "0")}
                <span style={{ fontSize: "0.55rem", opacity: 0.7 }}>{label}</span>
              </div>
            ))}
          </div>
        )}

        {!timeLeft && (
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              color: "#c00",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            ⏰ Matrícula cerrada
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "#1A1A1A",
            color: "#FFCC00",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "0.85rem",
            padding: "0.45rem 1rem",
            borderRadius: "3px",
            border: "2px solid #1A1A1A",
          }}
        >
          Más información →
        </div>
      </div>
    </a>
  );
}
