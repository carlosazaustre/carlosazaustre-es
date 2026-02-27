/**
 * lib/book-recommendation.ts
 *
 * Analiza el título, slug y tags de un post y devuelve qué libro recomendar.
 * Devuelve null si el contenido no tiene relación con ninguno de los libros.
 */

export type BookKey = "aprendiendo-javascript" | "dominando-javascript" | "aprendiendo-react";

export interface BookInfo {
  key: BookKey;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  url: string;
  cta: string;
}

export const BOOKS: Record<BookKey, BookInfo> = {
  "aprendiendo-javascript": {
    key: "aprendiendo-javascript",
    title: "Aprendiendo JavaScript",
    subtitle: "Desde cero hasta ECMAScript 6+",
    description:
      "Si estás empezando con JavaScript o quieres asentar las bases del lenguaje, este libro te lleva desde cero hasta dominar las características modernas de ES6 en adelante.",
    cover: "/book-aprendiendo-javascript.jpg",
    url: "https://amzn.to/4tZb96k",
    cta: "Consíguelo en Amazon →",
  },
  "dominando-javascript": {
    key: "dominando-javascript",
    title: "Dominando JavaScript",
    subtitle: "Técnicas avanzadas para el desarrollo web moderno",
    description:
      "Da el salto al siguiente nivel: patrones avanzados, asincronía, arquitectura de aplicaciones y las últimas características del ecosistema JavaScript.",
    cover: "/book-dominando-javascript.jpg",
    url: "https://amzn.to/4aOMxVe",
    cta: "Consíguelo en Amazon →",
  },
  "aprendiendo-react": {
    key: "aprendiendo-react",
    title: "Aprendiendo React",
    subtitle: "Guía práctica para construir interfaces modernas",
    description:
      "Aprende React desde cero: componentes, hooks, gestión de estado y el ecosistema moderno para crear aplicaciones web profesionales.",
    cover: "/book-aprendiendo-react.jpg",
    url: "https://amzn.to/4aFSHZ4",
    cta: "Consíguelo en Amazon →",
  },
};

// ─── Señales de detección ────────────────────────────────────────────────────

// React — cualquier mención de React o su ecosistema directo
const REACT_SIGNALS = [
  "react", "redux", "jsx", "next.js", "nextjs", "vite", "zustand",
  "react-query", "react query", "hook", "componente", "virtual dom",
];

// JavaScript avanzado — Dominando JavaScript
const JS_ADVANCED_SIGNALS = [
  "solid", "async", "asincroni", "asíncroni", "promesa", "promise",
  "ecmascript6", "ecmascript 6", "es6", "es2015", "es2016", "es2017",
  "es2018", "es2019", "es2020", "webpack", "browserify", "gulp", "grunt",
  "node", "typescript", "patron", "patrón", "arquitectura", "closures",
  "prototype", "higher order", "functional", "inmutab", "modulo",
  "template literal", "desestructuraci", "destructuring", "generador",
  "generator", "symbol", "proxy", "reflect", "module", "import", "export",
  "tagged template", "spread", "rest param",
];

// JavaScript básico — Aprendiendo JavaScript
const JS_BEGINNER_SIGNALS = [
  "empezando", "primeros pasos", "para novatos", "para novato",
  "introduccion", "introducción", "que es javascript", "qué es javascript",
  "el camino", "camino para ser", "aprende javascript", "aprender javascript",
  "fundamento", "sintaxis", "variable", "funcion basica", "función básica",
  "condicional", "bucle", "loop", "array basico", "array básico",
];

// Slugs que tienen señal React fuerte
const REACT_SLUG_PATTERNS = [
  "react", "redux", "jsx", "hook", "zustand",
];

// Slugs con señal JS avanzado
const JS_ADVANCED_SLUG_PATTERNS = [
  "solid", "ecmascript6", "ecmascript-6", "es6", "es2015", "es2016",
  "async", "asincronia", "promesas", "promise", "webpack", "browserify",
  "gulp", "grunt", "node", "typescript", "closures", "modulo", "tagged",
  "generator", "spread", "desestructuraci", "inmutab",
];

// Slugs con señal JS básico
const JS_BEGINNER_SLUG_PATTERNS = [
  "javascript", "empezando", "primeros-pasos", "para-novatos", "el-camino",
  "aprende", "fundamento",
];

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quitar tildes
}

function matchesAny(text: string, patterns: string[]): boolean {
  const n = normalize(text);
  return patterns.some((p) => n.includes(normalize(p)));
}

// ─── Función principal ───────────────────────────────────────────────────────

export function getBookRecommendation(post: {
  title: string;
  slug: string;
  tags?: string[];
}): BookKey | null {
  const titleAndSlug = `${post.title} ${post.slug}`;
  const tags = (post.tags ?? []).map((t) => t.toLowerCase()).join(" ");
  const all = `${titleAndSlug} ${tags}`;

  // 1. ¿Habla de React?
  const hasReact =
    matchesAny(titleAndSlug, REACT_SIGNALS) ||
    REACT_SLUG_PATTERNS.some((p) => normalize(post.slug).includes(p)) ||
    tags.includes("react");

  if (hasReact) return "aprendiendo-react";

  // 2. ¿Habla de JavaScript?
  const normalizedSlug = normalize(post.slug);
  const hasJs =
    normalize(all).includes("javascript") ||
    normalize(all).includes("ecmascript") ||
    normalize(all).includes(" js ") ||
    normalizedSlug.includes("javascript") ||
    normalizedSlug.includes("ecmascript") ||
    normalizedSlug.includes("js-") ||
    normalizedSlug.endsWith("-js") ||   // node-js, angular-js...
    normalizedSlug.startsWith("js");    // js-algo

  if (!hasJs) return null;

  // 3. ¿JS avanzado → Dominando JavaScript?
  const isAdvanced =
    matchesAny(titleAndSlug, JS_ADVANCED_SIGNALS) ||
    JS_ADVANCED_SLUG_PATTERNS.some((p) => normalizedSlug.includes(normalize(p)));

  if (isAdvanced) return "dominando-javascript";

  // 4. ¿JS básico → Aprendiendo JavaScript?
  const isBeginner =
    matchesAny(titleAndSlug, JS_BEGINNER_SIGNALS) ||
    JS_BEGINNER_SLUG_PATTERNS.some((p) => normalizedSlug.includes(normalize(p)));

  if (isBeginner) return "aprendiendo-javascript";

  // 5. Si hay JS pero no encaja en avanzado ni básico → Aprendiendo JS por defecto
  return "aprendiendo-javascript";
}
