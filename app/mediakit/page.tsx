import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Media Kit — Carlos Azaustre",
  description:
    "Media Kit de Carlos Azaustre — Creador de contenido técnico, Google Developer Expert y profesor. Información para colaboraciones con marcas y productos.",
  robots: { index: false, follow: false },
};

/* ── Data ─────────────────────────────────────── */

const PLATFORMS = [
  {
    name: "YouTube",
    handle: "@carlosazaustre",
    url: "https://youtube.com/@carlosazaustre?sub_confirmation=1",
    followers: "157K",
    label: "suscriptores",
    bg: "#FF0000",
    char: "▶",
    detail: "Vídeos tutoriales semanales sobre JavaScript, TypeScript, React, arquitectura de software e IA.",
  },
  {
    name: "TikTok",
    handle: "@carlosazaustre",
    url: "https://tiktok.com/@carlosazaustre",
    followers: "115K",
    label: "seguidores",
    bg: "#010101",
    char: "♪",
    detail: "Píldoras rápidas de programación. Alto engagement orgánico, audiencia joven y técnica.",
  },
  {
    name: "Instagram",
    handle: "@carlosazaustre",
    url: "https://instagram.com/carlosazaustre",
    followers: "127K",
    label: "seguidores",
    bg: "#E1306C",
    char: "◉",
    detail: "Contenido visual: setups, reflexiones dev, behind the scenes de grabaciones y recursos.",
  },
  {
    name: "LinkedIn",
    handle: "carlosazaustre",
    url: "https://linkedin.com/in/carlosazaustre",
    followers: "60K+",
    label: "seguidores",
    bg: "#0A66C2",
    char: "in",
    detail: "Posts semanales sobre arquitectura de software, IA y carrera profesional. Audiencia senior.",
  },
  {
    name: "X / Twitter",
    handle: "@carlosazaustre",
    url: "https://twitter.com/carlosazaustre",
    followers: "80K",
    label: "seguidores",
    bg: "#000",
    char: "𝕏",
    detail: "Noticias tech, hilos de programación y opiniones sobre el ecosistema web.",
  },
  {
    name: "Newsletter",
    handle: "AprendiendoDEV",
    url: "https://carlosazaustre.substack.com",
    followers: "—",
    label: "suscriptores",
    bg: "#FF6719",
    char: "S",
    detail: "Newsletter semanal en Substack. Recursos, reflexiones y noticias del mundo dev.",
  },
];

const BRANDS_WORKED_WITH = [
  "Elgato", "NordVPN", "Corsair", "Logitech", "Hostinger",
  "Linear.app", "Apidog", "Ruul", "CyberTalent",
  "LEAP School", "IfGeekThen", "CaixaBank Tech", "Kemtai", "BenQ",
  "Campus42 by Telefonica", "Samsung Dev Day", "DonDominio", "MWC Capital",
  "Elevadesk", "Flexispot", "CCGrid", "Xreart", "Harber London",
];

const AUDIENCE_DEMOGRAPHICS = [
  { label: "España + LATAM", value: "85%", icon: "🌍" },
  { label: "Desarrolladores web", value: "70%+", icon: "💻" },
  { label: "Rango de edad (25–44)", value: "65%", icon: "👤" },
  { label: "Idioma principal", value: "Español", icon: "🗣️" },
];

const RATE_CARD = [
  {
    emoji: "📦",
    title: "Pack Instagram + TikTok + LinkedIn",
    price: "1.400€",
    note: "+ IVA si aplica",
    badge: "3 plataformas",
    badgeBg: "#E1306C",
    highlight: false,
    includes: [
      "Grabación y edición de vídeo vertical presentando tu producto/marca",
      "Publicación en Instagram Reels",
      "Publicación en TikTok",
      "1× Story en Instagram compartiendo el Reel (texto + mención + enlace)",
      "1 publicación en LinkedIn con menciones y enlace",
    ],
  },
  {
    emoji: "⚡",
    title: "YouTube Short",
    price: "650€",
    note: "+ IVA si aplica",
    badge: "YouTube Shorts",
    badgeBg: "#FF0000",
    highlight: false,
    includes: [
      "Vídeo de hasta 1 minuto presentando tu marca/producto",
      "Publicado en el canal principal (@carlosazaustre)",
      "Enlace en descripción",
    ],
  },
  {
    emoji: "🎙️",
    title: "Mención / Ad-roll en YouTube",
    price: "400€",
    note: "+ IVA si aplica",
    badge: "YouTube",
    badgeBg: "#FF0000",
    highlight: false,
    includes: [
      "Presentación de tu producto/marca en 60–90 segundos",
      "Integrada al inicio o a la mitad de un vídeo habitual",
      "Mención en la descripción con enlace",
      "Comentario fijado con enlace durante 3 meses",
    ],
  },
  {
    emoji: "🎬",
    title: "Vídeo Completo en YouTube",
    price: "1.200€",
    note: "+ IVA si aplica",
    badge: "YouTube · Exclusivo",
    badgeBg: "#1A1A1A",
    highlight: true,
    warning: "Solo para productos alineados con mi audiencia tech.",
    includes: [
      "Grabación y edición de vídeo de hasta 10 minutos",
      "Dedicado íntegramente a tu producto/marca/servicio",
      "Mención y texto en descripción con enlaces",
      "Comentario fijado con enlace",
    ],
  },
  {
    emoji: "✉️",
    title: "Mención en Newsletter",
    price: "250€",
    note: "+ IVA si aplica",
    badge: "Newsletter",
    badgeBg: "#FF6719",
    highlight: false,
    includes: [
      "Bloque destacado en la newsletter semanal AprendiendoDEV (Substack)",
      "Copy personalizado sobre tu producto/servicio",
      "Enlace directo a tu web o landing page",
      "Audiencia suscrita activamente, alta tasa de apertura",
    ],
  },
  {
    emoji: "🏷️",
    title: "Código descuento",
    price: "Consultar",
    note: "asociación long-term",
    badge: "Todas las plataformas",
    badgeBg: "#1A1A1A",
    highlight: false,
    includes: [
      "Código descuento exclusivo para la comunidad",
      "Mención recurrente en vídeos, posts y bio",
      "Ideal para SaaS, hardware o plataformas educativas",
      "Condiciones y duración a medida",
    ],
  },
  {
    emoji: "🎙️",
    title: "LiveStream / Podcast",
    price: "500€",
    note: "+ IVA si aplica",
    badge: "Directo · hasta 1h",
    badgeBg: "#7C3AED",
    highlight: false,
    includes: [
      "Participación en directo de hasta 1 hora",
      "Entrevista, debate o demo en vivo con tu marca/producto",
      "Difusión cruzada en mis redes antes y después del evento",
      "Clip de corte para redes tras la emisión (si aplica)",
    ],
  },
  {
    emoji: "🎤",
    title: "Ponencia / Taller / Mesa Redonda",
    price: "1.500€",
    note: "+ gastos de desplazamiento",
    badge: "Evento presencial",
    badgeBg: "#059669",
    highlight: false,
    includes: [
      "Charla, taller técnico o mesa redonda en tu evento",
      "Preparación de contenido y materiales incluida",
      "Difusión del evento en mis redes (pre y post)",
      "Gastos de desplazamiento y alojamiento aparte",
    ],
  },
];

/* ── Page ─────────────────────────────────────── */

export default function MediaKitPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingBottom: "5rem" }}>

      {/* ── HERO ────────────────────────────────── */}
      <section style={{
        borderBottom: "3px solid #1A1A1A",
        background: "#FFCC00",
        padding: "3rem 1.5rem 2.5rem",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "2.5rem", flexWrap: "wrap" }}>

            {/* Photo */}
            <div style={{
              flexShrink: 0,
              border: "4px solid #1A1A1A",
              borderRadius: "6px",
              boxShadow: "8px 8px 0 #1A1A1A",
              overflow: "hidden",
              lineHeight: 0,
              background: "#fff",
            }}>
              <Image
                src="/carlos-links.jpg"
                alt="Carlos Azaustre"
                width={160}
                height={160}
                style={{ display: "block", objectFit: "cover", width: 160, height: 160 }}
                priority
              />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 260 }}>
              {/* Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "#1A1A1A", color: "#FFCC00",
                fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "2px",
                padding: "4px 12px", borderRadius: "4px",
                marginBottom: "1rem",
              }}>
                📋 Media Kit · 2025 / 2026
              </div>

              <h1 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "#1A1A1A",
                lineHeight: 1.1,
                marginBottom: "0.75rem",
              }}>
                Carlos Azaustre
              </h1>

              {/* Topic tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                {["education", "technology & science", "programming", "web development", "computers"].map((tag) => (
                  <span key={tag} style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#1A1A1A",
                    background: "rgba(0,0,0,0.12)",
                    border: "1.5px solid #1A1A1A",
                    borderRadius: "3px",
                    padding: "3px 9px",
                    textTransform: "lowercase",
                    letterSpacing: "0.3px",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1rem",
                color: "#1A1A1A",
                lineHeight: 1.7,
                maxWidth: 580,
                marginBottom: "1.5rem",
              }}>
                Más de 20 años en la industria del desarrollo web, especializado en JavaScript, TypeScript, React y arquitectura de software. Con <strong>+640.000 seguidores</strong> en todas las plataformas y una comunidad hispanohablante fiel y técnica. Ingeniero en Telemática por la UC3M y Profesor Universitario de Programación y Desarrollo Web.
              </p>

              {/* GDE + MVP badges */}
              <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
                {[
                  { label: "🟢 Google Developer Expert", sub: "Firebase · Web Technologies (2019-2026)" },
                  { label: "🔵 Microsoft MVP", sub: "Developer Technologies (2022-2026)" },
                  { label: "🎓 Profesor Asociado", sub: "Universidad Europea" },
                ].map((b) => (
                  <div key={b.label} style={{
                    background: "#fff",
                    border: "2px solid #1A1A1A",
                    borderRadius: "4px",
                    boxShadow: "3px 3px 0 #1A1A1A",
                    padding: "0.4rem 0.75rem",
                  }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#1A1A1A" }}>{b.label}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "#666", marginTop: "1px" }}>{b.sub}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TOTAL REACH ─────────────────────────── */}
      <section style={{ borderBottom: "3px solid #1A1A1A", background: "#1A1A1A", padding: "1.5rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "2.5rem", color: "#FFCC00" }}>
              +640K
            </span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>
              seguidores totales
            </span>
          </div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { v: "20+", l: "años de exp." },
              { v: "15+", l: "brands" },
              { v: "106", l: "artículos" },
              { v: "ES + LATAM", l: "audiencia" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#FFCC00" }}>{s.v}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── PLATFORMS ───────────────────────── */}
        <section style={{ marginTop: "3rem" }}>
          <SectionTitle>Plataformas</SectionTitle>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}>
            {PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div className="neo-card" style={{ padding: "1.25rem", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
                    {/* Platform icon */}
                    <div style={{
                      width: 44, height: 44,
                      background: p.bg,
                      border: "2px solid #1A1A1A",
                      borderRadius: "4px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      fontFamily: "'Space Mono', monospace",
                      fontWeight: 700, fontSize: "0.9rem",
                      color: "#fff",
                    }}>
                      {p.char}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#1A1A1A" }}>
                        {p.name}
                      </div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "#888" }}>
                        {p.handle}
                      </div>
                    </div>
                    {/* Followers */}
                    <div style={{ marginLeft: "auto", textAlign: "right" }}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.35rem", color: "#1A1A1A" }}>
                        {p.followers}
                      </div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", color: "#888" }}>
                        {p.label}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.6, margin: 0 }}>
                    {p.detail}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── AUDIENCE ────────────────────────── */}
        <section style={{ marginTop: "3.5rem" }}>
          <SectionTitle>Audiencia</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {AUDIENCE_DEMOGRAPHICS.map((d) => (
              <div key={d.label} style={{
                background: "#fff",
                border: "3px solid #1A1A1A",
                borderRadius: "4px",
                boxShadow: "4px 4px 0 #1A1A1A",
                padding: "1.25rem 1rem",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{d.icon}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1A1A1A", marginBottom: "0.25rem" }}>
                  {d.value}
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#666", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {d.label}
                </div>
              </div>
            ))}
          </div>

          {/* Audience description */}
          <div style={{
            background: "#fff",
            border: "3px solid #1A1A1A",
            borderRadius: "4px",
            boxShadow: "4px 4px 0 #1A1A1A",
            padding: "1.5rem",
          }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", color: "#444", lineHeight: 1.75, margin: 0 }}>
              La audiencia de Carlos está formada principalmente por <strong>desarrolladores web hispanohablantes</strong> — la mayoría de España y Latinoamérica — con un perfil técnico medio-alto: programadores junior y mid que buscan avanzar, seniors que quieren mantenerse actualizados, y estudiantes de grado o bootcamp. Son usuarios que <strong>compran herramientas, hardware de creador, cursos y suscripciones SaaS</strong>. La confianza generada durante años de contenido honesto hace que las recomendaciones tengan alto impacto en decisiones de compra.
            </p>
          </div>
        </section>

        {/* ── RATE CARD ───────────────────────── */}
        <section style={{ marginTop: "3.5rem" }}>
          <SectionTitle>Tarifas</SectionTitle>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
            marginBottom: "1rem",
          }}>
            {RATE_CARD.map((r) => (
              <div key={r.title} style={{
                background: r.highlight ? "#1A1A1A" : "#fff",
                border: `3px solid #1A1A1A`,
                borderRadius: "4px",
                boxShadow: r.highlight ? "6px 6px 0 #FFCC00" : "4px 4px 0 #1A1A1A",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
              }}>
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                  <div style={{ fontSize: "1.35rem" }}>{r.emoji}</div>
                  <span style={{
                    background: r.badgeBg,
                    color: "#fff",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.58rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.5px",
                    padding: "2px 7px", borderRadius: "3px",
                    border: "1.5px solid #1A1A1A",
                    whiteSpace: "nowrap",
                  }}>
                    {r.badge}
                  </span>
                </div>

                {/* Title */}
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800, fontSize: "1rem",
                  color: r.highlight ? "#FFCC00" : "#1A1A1A",
                  lineHeight: 1.3,
                }}>
                  {r.title}
                </div>

                {/* Includes */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {r.includes.map((item) => (
                    <li key={item} style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.82rem",
                      color: r.highlight ? "#ccc" : "#555",
                      lineHeight: 1.5,
                      paddingLeft: "1rem",
                      position: "relative",
                    }}>
                      <span style={{
                        position: "absolute", left: 0, top: "0.35em",
                        width: 6, height: 6,
                        background: r.highlight ? "#FFCC00" : "#FFCC00",
                        border: "1.5px solid #1A1A1A",
                        display: "inline-block", flexShrink: 0,
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Warning */}
                {"warning" in r && r.warning && (
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#FFCC00",
                    background: "rgba(255,204,0,0.1)",
                    border: "1.5px solid #FFCC00",
                    borderRadius: "3px",
                    padding: "0.4rem 0.6rem",
                    lineHeight: 1.5,
                  }}>
                    ⚠️ {r.warning}
                  </div>
                )}

                {/* Price */}
                <div style={{
                  marginTop: "auto",
                  paddingTop: "0.75rem",
                  borderTop: `2px solid ${r.highlight ? "#333" : "#E8E8E8"}`,
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.5rem",
                }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800, fontSize: "1.75rem",
                    color: r.highlight ? "#FFCC00" : "#1A1A1A",
                  }}>
                    {r.price}
                  </span>
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.65rem",
                    color: r.highlight ? "#888" : "#999",
                  }}>
                    {r.note}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div style={{
            padding: "0.875rem 1.25rem",
            background: "#FFFEF0",
            border: "2px solid #E8E8E8",
            borderRadius: "4px",
            fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#888",
            lineHeight: 1.6,
          }}>
            ℹ️ Precios sin IVA. Para empresas con CIF/NIF español se aplica 21% IVA. Packs combinados disponibles. Contacta para propuesta personalizada.
          </div>
        </section>

        {/* ── PREVIOUS BRANDS ─────────────────── */}
        <section style={{ marginTop: "3.5rem" }}>
          <SectionTitle>Marcas con las que he trabajado</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {BRANDS_WORKED_WITH.map((brand) => (
              <div key={brand} style={{
                background: "#fff",
                border: "2.5px solid #1A1A1A",
                borderRadius: "4px",
                boxShadow: "3px 3px 0 #1A1A1A",
                padding: "0.5rem 1rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "#1A1A1A",
              }}>
                {brand}
              </div>
            ))}
          </div>
        </section>

        {/* ── WHAT YOU GET ────────────────────── */}
        <section style={{ marginTop: "3.5rem" }}>
          <SectionTitle>¿Qué incluye una colaboración?</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
            {[
              { emoji: "✅", title: "Contenido nativo", desc: "La integración respeta el tono y estilo del canal. Sin guiones forzados." },
              { emoji: "📊", title: "Informe de resultados", desc: "Métricas de visualizaciones, clics e interacciones tras publicar." },
              { emoji: "🔗", title: "Links rastreables", desc: "UTMs y links personalizados para medir conversiones reales." },
              { emoji: "📝", title: "Revisión previa", desc: "La marca puede revisar el guión o copy antes de grabar/publicar." },
              { emoji: "🔄", title: "Cross-posting", desc: "El contenido se amplifica en varias plataformas cuando aplica." },
              { emoji: "💬", title: "Gestión directa", desc: "Comunicación directa conmigo, sin intermediarios ni agencias." },
            ].map((item) => (
              <div key={item.title} style={{
                background: "#fff",
                border: "3px solid #1A1A1A",
                borderRadius: "4px",
                boxShadow: "4px 4px 0 #1A1A1A",
                padding: "1.125rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>
                <div style={{ fontSize: "1.25rem" }}>{item.emoji}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "#1A1A1A" }}>
                  {item.title}
                </div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "#555", lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────── */}
        <section style={{ marginTop: "4rem" }}>
          <div style={{
            background: "#FFCC00",
            border: "3px solid #1A1A1A",
            borderRadius: "6px",
            boxShadow: "8px 8px 0 #1A1A1A",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1.25rem",
          }}>
            <div style={{ fontSize: "2.5rem" }}>🤝</div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "#1A1A1A",
              lineHeight: 1.2,
            }}>
              ¿Hablamos de una colaboración?
            </h2>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              color: "#1A1A1A",
              lineHeight: 1.7,
              maxWidth: 520,
              opacity: 0.8,
            }}>
              Si tu marca o producto encaja con una audiencia técnica hispanohablante, me encantaría conocer tu propuesta. Respondo en menos de 48h.
            </p>
            <a
              href="mailto:cazaustre+collabs@gmail.com?subject=Colaboración%20—%20[nombre%20de%20marca]"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#1A1A1A",
                color: "#FFCC00",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                padding: "0.875rem 2rem",
                borderRadius: "4px",
                border: "2.5px solid #1A1A1A",
                boxShadow: "4px 4px 0 rgba(0,0,0,0.25)",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              ✉️ cazaustre+collabs@gmail.com
            </a>

            {/* Social row */}
            <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
              {[
                { href: "https://youtube.com/@carlosazaustre", label: "YouTube", bg: "#FF0000", char: "▶" },
                { href: "https://instagram.com/carlosazaustre", label: "IG", bg: "#E1306C", char: "◉" },
                { href: "https://tiktok.com/@carlosazaustre", label: "TikTok", bg: "#010101", char: "♪" },
                { href: "https://linkedin.com/in/carlosazaustre", label: "LinkedIn", bg: "#0A66C2", char: "in" },
                { href: "https://twitter.com/carlosazaustre", label: "X", bg: "#000", char: "𝕏" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  style={{
                    width: 36, height: 36, background: s.bg,
                    border: "2.5px solid #1A1A1A", borderRadius: "4px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", fontWeight: 700, color: "#fff",
                    textDecoration: "none", boxShadow: "3px 3px 0 #1A1A1A",
                  }}>
                  {s.char}
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ── FOOTER NOTE ─────────────────────────── */}
      <div style={{
        maxWidth: 960, margin: "3rem auto 0", padding: "0 1.5rem",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: "0.62rem",
          color: "#AAA", letterSpacing: "0.5px",
        }}>
          carlosazaustre.es · Media Kit 2025/2026 · Datos actualizados a enero 2026
        </p>
      </div>

    </div>
  );
}

/* ── Helpers ──────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 800,
        fontSize: "1.25rem",
        color: "#1A1A1A",
        margin: 0,
      }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: "3px", background: "#1A1A1A", opacity: 0.12 }} />
    </div>
  );
}
