import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Laptop, PcCase, Cpu, CircuitBoard, Microchip, Radio,
  Monitor, Lamp, MoveVertical, Armchair, Footprints,
  Camera, Mic, SlidersHorizontal, Sun, ScrollText, Video, Headphones,
  Smartphone, Tablet, Watch,
  Keyboard, Mouse, MousePointer, Printer,
  Terminal, Figma, PenTool,
  Code2, Server, Database, Wind, TestTube2, Zap,
  Cast, LayoutGrid, Film,
  Rocket, GitBranch,
  Car,
  Bot, Sparkles, Code, Image as LucideImage, HardDrive, CheckSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Uses — Mi setup",
  description:
    "Todo lo que uso a diario: hardware, software, herramientas de desarrollo y gadgets de mi setup.",
  openGraph: {
    title: "Mi setup — Carlos Azaustre",
    description:
      "Hardware, software y herramientas que uso a diario para programar y crear contenido.",
    url: "https://carlosazaustre.es/uses",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi setup — Carlos Azaustre",
    description:
      "Hardware, software y herramientas que uso a diario para programar y crear contenido.",
  },
  alternates: {
    canonical: "https://carlosazaustre.es/uses",
  },
};

type Item = {
  name: string;
  desc: string;
  url?: string;
  icon: LucideIcon;
};

type Category = {
  icon: string;
  title: string;
  items: Item[];
};

const categories: Category[] = [
  {
    icon: "🖥️",
    title: "Ordenadores",
    items: [
      {
        name: "MacBook Pro M1 Max 64 GB (2021)",
        desc: "Mi máquina principal para el día a día: desarrollo, grabaciones y edición. Todavía no le he encontrado el techo.",
        icon: Laptop,
      },
      {
        name: "PC Sobremesa — Ryzen 7 7700X",
        desc: "32 GB RAM, RTX 4070, Windows 11. Ensamblado por componentes. Para gaming, renders y trabajo pesado.",
        url: "/blog/pc-2023",
        icon: PcCase,
      },
    ],
  },
  {
    icon: "🔌",
    title: "Electrónica",
    items: [
      {
        name: "Raspberry Pi 400",
        desc: "Para proyectos educativos y experimentos de trasteo. Todo el ordenador integrado en el teclado.",
        url: "https://www.raspberrypi.com/products/raspberry-pi-400/",
        icon: CircuitBoard,
      },
      {
        name: "Raspberry Pi Model B (2013)",
        desc: "La clásica. De las primeras que llegaron a España. Todavía viva para algún proyecto de servidor o retro.",
        url: "https://www.raspberrypi.com/products/raspberry-pi-1-model-b/",
        icon: CircuitBoard,
      },
      {
        name: "Arduino UNO Rev3",
        desc: "El microcontrolador de referencia para prototipado de electrónica. Ideal para enseñar fundamentos de hardware.",
        url: "https://store.arduino.cc/products/arduino-uno-rev3",
        icon: Microchip,
      },
      {
        name: "Tessel v1",
        desc: "Placa de desarrollo IoT programable en JavaScript. Un experimento de los primeros tiempos del hardware con Node.js.",
        url: "https://tessel.io",
        icon: Radio,
      },
    ],
  },
  {
    icon: "🖥",
    title: "Monitor & escritorio",
    items: [
      {
        name: "BenQ RD280U",
        desc: "28.2\" 4K+ pensado para programadores. Leer código durante horas sin que los ojos se quejen.",
        url: "https://www.youtube.com/watch?v=39RTONYt2Ps&t=310s",
        icon: Monitor,
      },
      {
        name: "BenQ RD320U",
        desc: "32\" 4K+ también de la línea de programación de BenQ. Para cuando necesito más espacio en pantalla.",
        url: "https://www.youtube.com/watch?v=-_Sc6hi5UQU",
        icon: Monitor,
      },
      {
        name: "BenQ ScreenBar Halo",
        desc: "Lámpara de monitor con luz trasera de ambiente. Sin reflejos en pantalla y temperatura de color ajustable.",
        url: "https://www.benq.com/es-es/lighting/monitor-light/screenbar-halo.html",
        icon: Lamp,
      },
      {
        name: "Escritorio elevable ElevaDEsk",
        desc: "Tablero en roble, patas blancas. Trabajo de pie y sentado según el momento.",
        url: "https://elevadesk.com",
        icon: MoveVertical,
      },
      {
        name: "Silla Elgato Embrace",
        desc: "Silla gaming/estudio con soporte lumbar ajustable. Para largas sesiones de trabajo y streaming.",
        url: "https://www.elgato.com/es/embrace",
        icon: Armchair,
      },
      {
        name: "Cinta de andar CitySports",
        desc: "Debajo del escritorio elevable. Caminar despacio mientras trabajo o leo. Mejor que estar sentado todo el día.",
        url: "https://www.citysports.com",
        icon: Footprints,
      },
    ],
  },
  {
    icon: "📷",
    title: "Cámara & audio",
    items: [
      {
        name: "Elgato Facecam Pro 4K",
        desc: "Webcam 4K para streaming y grabaciones. Imagen limpia y profesional, plug & play.",
        url: "https://www.elgato.com/es/facecam-pro",
        icon: Camera,
      },
      {
        name: "Elgato Wave DX",
        desc: "Micrófono dinámico XLR. Silencioso, recoge solo la voz y se porta bien en entornos ruidosos.",
        url: "https://www.elgato.com/es/wave-dx",
        icon: Mic,
      },
      {
        name: "Elgato Wave XLR",
        desc: "La consola que conecta el Wave DX al Mac por USB. Control de ganancia, mute y mezcla de audio en un solo aparato.",
        url: "https://www.elgato.com/es/wave-xlr",
        icon: SlidersHorizontal,
      },
      {
        name: "Elgato Key Light Air",
        desc: "Dos focos LED de luz suave y difusa. Control desde app o Stream Deck. Sin ellos el vídeo no sería el mismo.",
        url: "https://www.elgato.com/es/key-light-air",
        icon: Sun,
      },
      {
        name: "Elgato Prompter",
        desc: "Teleprónter que se monta delante de la cámara. Para mantener contacto visual mientras leo el guión.",
        url: "https://www.elgato.com/es/prompter",
        icon: ScrollText,
      },
      {
        name: "Elgato Game Capture 4K X",
        desc: "Capturadora USB-C para consolas y otras fuentes de vídeo.",
        url: "https://www.elgato.com/es/game-capture-4k-x",
        icon: Video,
      },
      {
        name: "Auriculares Bose 700",
        desc: "Cancelación de ruido activa de las mejores del mercado. Para concentrarme cuando hay ruido alrededor.",
        url: "https://www.bose.es/es_es/products/headphones/noise_cancelling_headphones/noise-cancelling-headphones-700.html",
        icon: Headphones,
      },
    ],
  },
  {
    icon: "📱",
    title: "Móvil & tablets",
    items: [
      {
        name: "iPhone 17 Pro Max",
        desc: "Con batería externa MagSafe siempre encima. Y AirTags para no perder las cosas.",
        icon: Smartphone,
      },
      {
        name: "iPad Air M2 11\"",
        desc: "Con Apple Pencil y funda con teclado Logitech. Para tomar notas, leer y consumir contenido.",
        icon: Tablet,
      },
      {
        name: "Apple Watch Series 10",
        desc: "Para notificaciones, métricas de salud y no mirar el iPhone cada 5 minutos.",
        icon: Watch,
      },
      {
        name: "AirPods Pro 3",
        desc: "Para el día a día fuera de casa. Cancelación de ruido activa y transparencia cuando necesito escuchar el entorno.",
        icon: Headphones,
      },
    ],
  },
  {
    icon: "🖱️",
    title: "Periféricos",
    items: [
      {
        name: "Corsair Galleon 100SD",
        desc: "Teclado compacto inalámbrico. Silencioso y cómodo para largas sesiones de escritura y código.",
        url: "https://www.youtube.com/watch?v=IfuGwSVrt5Y",
        icon: Keyboard,
      },
      {
        name: "Logitech MX Master 4",
        desc: "El mejor ratón para productividad. Scroll electromagnético, botones laterales y conexión multipantalla.",
        url: "https://www.logitech.com/es-es/products/mice/mx-master-4.html",
        icon: Mouse,
      },
      {
        name: "Alfombrilla Harber London",
        desc: "Alfombrilla grande de cuero que cubre teclado y ratón. Le da un aspecto cuidado al escritorio.",
        url: "https://harberlondon.com",
        icon: MousePointer,
      },
      {
        name: "Bambú Lab A1",
        desc: "Impresora 3D multicolor. Para prototipos, accesorios del setup y cualquier idea que merezca ser impresa.",
        url: "https://bambulab.com/es/a1",
        icon: Printer,
      },
    ],
  },
  {
    icon: "⌨️",
    title: "Editor & terminal",
    items: [
      {
        name: "Warp",
        desc: "Terminal moderno con autocompletado inteligente y bloques de output. Difícil volver a iTerm.",
        url: "https://warp.dev",
        icon: Terminal,
      },
      {
        name: "Figma",
        desc: "Para diseñar interfaces, wireframes y assets antes de ponerse a picar código.",
        url: "https://figma.com",
        icon: Figma,
      },
      {
        name: "Pencil.dev",
        desc: "Para crear y gestionar prompts de IA de forma estructurada. Muy útil en proyectos con múltiples agentes.",
        url: "https://pencil.dev",
        icon: PenTool,
      },
    ],
  },
  {
    icon: "🛠️",
    title: "Stack de desarrollo",
    items: [
      {
        name: "TypeScript + React + Next.js",
        desc: "Mi combo principal para cualquier proyecto web. Llevo años con este stack y sigo disfrutándolo.",
        icon: Code2,
      },
      {
        name: "Node.js",
        desc: "Para backends, scripts, APIs y herramientas CLI.",
        icon: Server,
      },
      {
        name: "Firebase / Cloud Firestore",
        desc: "Mi base de datos preferida para proyectos que necesitan escalar rápido sin complicaciones.",
        icon: Database,
      },
      {
        name: "Tailwind CSS",
        desc: "Para maquetar sin salir del HTML. Con v4 aún más limpio.",
        url: "https://tailwindcss.com",
        icon: Wind,
      },
      {
        name: "Vitest",
        desc: "Testing en proyectos JavaScript/TypeScript. Rápido y con buena integración con Vite.",
        url: "https://vitest.dev",
        icon: TestTube2,
      },
      {
        name: "Biome",
        desc: "Linter y formatter en uno. Ha reemplazado a ESLint + Prettier en mis proyectos nuevos.",
        url: "https://biomejs.dev",
        icon: Zap,
      },
    ],
  },
  {
    icon: "🎬",
    title: "Producción de contenido",
    items: [
      {
        name: "OBS Studio",
        desc: "Para streaming en YouTube y grabaciones de pantalla. Gratis, potente y fiable.",
        url: "https://obsproject.com",
        icon: Cast,
      },
      {
        name: "Elgato Stream Deck +",
        desc: "Panel de control con botones físicos y diales táctiles. Automatiza escenas, música, luces y cualquier cosa del setup con un toque.",
        url: "https://www.elgato.com/es/stream-deck-plus",
        icon: LayoutGrid,
      },
      {
        name: "CapCut Pro",
        desc: "Edición de vídeo para reels, shorts y TikToks. Rápido y con buenos efectos automáticos.",
        url: "https://www.capcut.com",
        icon: Film,
      },
    ],
  },
  {
    icon: "☁️",
    title: "Infraestructura & despliegue",
    items: [
      {
        name: "Hetzner VPS",
        desc: "Mi servidor principal. Buena relación precio/rendimiento y datacenter en Europa.",
        url: "https://www.hetzner.com",
        icon: Server,
      },
      {
        name: "Coolify (self-hosted)",
        desc: "Herramienta de deploy sobre el VPS. Como Vercel pero en tu propio servidor.",
        url: "https://coolify.io",
        icon: Rocket,
      },
      {
        name: "GitHub Actions",
        desc: "CI/CD para todos mis proyectos. Tests, builds y deploys automatizados.",
        url: "https://github.com/features/actions",
        icon: GitBranch,
      },
    ],
  },
  {
    icon: "🏃",
    title: "Lifestyle",
    items: [
      {
        name: "Tesla Model Y Standard Range (2024)",
        desc: "Mi coche eléctrico. Autopilot en autovía, carga en casa y cero visitas a la gasolinera.",
        url: "https://www.tesla.com/es_es/modely",
        icon: Car,
      },
    ],
  },
  {
    icon: "🧠",
    title: "Productividad & IA",
    items: [
      {
        name: "Claude Code",
        desc: "Agente de coding de Anthropic. Lo uso para tareas complejas de desarrollo, refactors y análisis de código.",
        url: "https://claude.ai/code",
        icon: Bot,
      },
      {
        name: "OpenClaw",
        desc: "Mi asistente personal con IA corriendo en el VPS, conectado a Telegram. El que gestiona este setup.",
        url: "https://openclaw.ai",
        icon: Sparkles,
      },
      {
        name: "GitHub Copilot",
        desc: "Integrado en el editor. Autocompletado y generación de código en tiempo real.",
        url: "https://github.com/features/copilot",
        icon: Code,
      },
      {
        name: "Gemini Nano Banana",
        desc: "Generación de imágenes con Gemini 3 Pro Image. Para thumbnails, ilustraciones y assets visuales.",
        url: "https://deepmind.google/gemini",
        icon: LucideImage,
      },
      {
        name: "Google Drive (Docs & Slides)",
        desc: "Para documentación colaborativa, presentaciones de charlas y material de clases.",
        url: "https://drive.google.com",
        icon: HardDrive,
      },
      {
        name: "Linear",
        desc: "Gestión de proyectos y tareas. Rápido, con buen diseño y sin overhead.",
        url: "https://linear.app",
        icon: CheckSquare,
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "2.5rem",
        flexWrap: "wrap",
        marginBottom: "3rem",
        borderBottom: "3px solid var(--border)",
        paddingBottom: "3rem",
      }}>
        {/* Left: text */}
        <div style={{ flex: "1 1 280px", minWidth: 0 }}>
          <div
            style={{
              display: "inline-block",
              background: "var(--accent)",
              border: "3px solid var(--border)",
              borderRadius: "4px",
              padding: "4px 12px",
              marginBottom: "1.25rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: "2px 2px 0 var(--border)",
            }}
          >
            /uses
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Mi setup
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
            }}
          >
            Hardware, software y herramientas que uso a diario para desarrollar,
            grabar vídeos y crear contenido. Inspirado en{" "}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text)", borderBottom: "2px solid var(--accent)" }}
            >
              uses.tech
            </a>
            .
          </p>
        </div>

        {/* Right: photo */}
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
          <div style={{
            border: "3px solid var(--border)",
            borderRadius: "8px",
            boxShadow: "6px 6px 0 var(--border)",
            overflow: "hidden",
            lineHeight: 0,
          }}>
            <Image
              src="/setup.jpg"
              alt="Mi setup — escritorio con monitores, teclado mecánico y accesorios Elgato"
              width={1200}
              height={900}
              style={{ display: "block", width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {categories.map((cat) => (
          <section key={cat.title}>
            {/* Section header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
                borderBottom: "3px solid var(--border)",
                paddingBottom: "0.75rem",
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>{cat.icon}</span>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  margin: 0,
                }}
              >
                {cat.title}
              </h2>
            </div>

            {/* Items grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {cat.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="neo-card"
                    style={{
                      padding: "1.1rem 1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, minWidth: 0 }}>
                        {/* Icon badge */}
                        <div
                          style={{
                            flexShrink: 0,
                            width: "30px",
                            height: "30px",
                            background: "var(--accent)",
                            border: "2px solid var(--border)",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "2px 2px 0 var(--border)",
                          }}
                        >
                          <Icon size={15} strokeWidth={2.5} />
                        </div>
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 800,
                            fontSize: "0.92rem",
                            color: "var(--text)",
                            lineHeight: 1.3,
                          }}
                        >
                          {item.name}
                        </span>
                      </div>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="uses-link-badge"
                          style={{ flexShrink: 0, marginTop: "2px" }}
                        >
                          ↗
                        </a>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        margin: 0,
                        paddingLeft: "38px",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div
        style={{
          marginTop: "4rem",
          padding: "1.25rem 1.5rem",
          background: "var(--surface)",
          border: "3px solid var(--border)",
          borderRadius: "6px",
          boxShadow: "4px 4px 0 var(--border)",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          💡 Esta página se actualiza cuando cambio algo relevante. Si algo de
          aquí te genera dudas, puedes preguntarme en{" "}
          <a
            href="https://twitter.com/carlosazaustre"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text)", borderBottom: "2px solid var(--accent)" }}
          >
            Twitter/X
          </a>
          .
        </p>
      </div>
    </div>
  );
}
