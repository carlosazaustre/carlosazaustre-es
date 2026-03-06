export interface Book {
  slug: string;
  title: string;
  subtitle: string;
  series: string | null;
  seriesNumber: number | null;
  isbn: string;
  cover: string;
  amazonUS: string;
  amazonES: string;
  amazonMX: string;
  ratingValue: number;
  ratingCount: number;
  description: string;
  longDescription: string;
  topics: string[];
  forWho: string;
  tags: string[];
  publishedDate: string;
  seoTitle: string;
  seoDescription: string;
}

export const BOOKS: Book[] = [
  {
    slug: "aprendiendo-javascript",
    title: "Aprendiendo JavaScript",
    subtitle: "Desde cero hasta ECMAScript 6+",
    series: "JavaScript desde cero",
    seriesNumber: 1,
    isbn: "979-8700179263",
    cover: "/book-aprendiendo-javascript.jpg",
    amazonUS: "https://amzn.to/4tZb96k",
    amazonES: "https://www.amazon.es/Aprendiendo-JavaScript-Desde-hasta-ECMAScript-ebook/dp/B01DL4BWEY",
    amazonMX: "https://www.amazon.com.mx/Aprendiendo-JavaScript-Desde-hasta-ECMAScript-ebook/dp/B01DL4BWEY",
    ratingValue: 4.4,
    ratingCount: 200,
    description:
      "El punto de partida para aprender JavaScript de verdad. Desde los fundamentos del lenguaje hasta las características modernas de ECMAScript 6+, con ejemplos prácticos y progresivos que te llevan de cero a un nivel sólido.",
    longDescription:
      "¿Quieres aprender JavaScript pero no sabes por dónde empezar? Este libro es el punto de partida que necesitas. Está pensado para personas sin experiencia previa en programación o que vienen de otros lenguajes y quieren entender JavaScript de raíz.\n\nA lo largo del libro aprenderás los fundamentos del lenguaje: variables, tipos de datos, funciones, objetos y arrays. Después profundizamos en las características modernas de ECMAScript 6, 7 y más allá: arrow functions, destructuring, clases, promesas, async/await, módulos y mucho más.\n\nCada concepto se explica con ejemplos reales y progresivos, sin dar nada por sentado. El objetivo es que cuando termines el libro tengas una base sólida sobre la que construir cualquier proyecto web.",
    topics: [
      "Fundamentos del lenguaje: variables, tipos, operadores",
      "Funciones: declaraciones, expresiones, arrow functions",
      "Arrays y objetos en profundidad",
      "ECMAScript 6+: clases, destructuring, spread, módulos",
      "Programación asíncrona: callbacks, promesas, async/await",
      "El DOM y manipulación del navegador",
      "Buenas prácticas y patrones básicos",
    ],
    forWho:
      "Personas sin experiencia previa en programación, estudiantes de informática, o developers de otros lenguajes que quieren aprender JavaScript desde cero.",
    tags: ["JavaScript", "ECMAScript 6", "Programación", "Web Development"],
    publishedDate: "2021-02-14",
    seoTitle: "Aprendiendo JavaScript — Libro de Carlos Azaustre",
    seoDescription:
      "Aprende JavaScript desde cero hasta ES6+ con el libro de Carlos Azaustre. Fundamentos, programación asíncrona y ECMAScript moderno. Disponible en Amazon.",
  },
  {
    slug: "dominando-javascript",
    title: "Dominando JavaScript",
    subtitle: "Técnicas avanzadas para el desarrollo web moderno",
    series: "JavaScript desde cero",
    seriesNumber: 2,
    isbn: "979-8338283325",
    cover: "/book-dominando-javascript.jpg",
    amazonUS: "https://amzn.to/4aOMxVe",
    amazonES: "https://www.amazon.es/Dominando-JavaScript-T%C3%A9cnicas-avanzadas-desarrollo/dp/B0DG5XNFNS",
    amazonMX:
      "https://www.amazon.com.mx/Dominando-JavaScript-T%C3%A9cnicas-avanzadas-desarrollo-ebook/dp/B0DG5FXY1G",
    ratingValue: 4.2,
    ratingCount: 17,
    description:
      "El salto de intermedio a avanzado. Patrones de diseño, rendimiento, el motor de JavaScript, testing y las técnicas que usan los equipos profesionales en producción.",
    longDescription:
      "Ya sabes JavaScript, pero sientes que tu código no llega al nivel que debería. Dominando JavaScript es la continuación natural de Aprendiendo JavaScript y el libro que necesitas para dar el salto a desarrollador senior.\n\nAquí no encontrarás explicaciones de lo básico. Iremos directo a los temas que marcan la diferencia en proyectos reales: cómo funciona el motor V8, el event loop y la gestión de memoria; patrones de diseño como módulos, observadores y factories; técnicas avanzadas de programación funcional; testing con Jest; y cómo optimizar el rendimiento de tus aplicaciones.\n\nCon este libro entenderás por qué el código funciona como funciona, no solo cómo escribirlo.",
    topics: [
      "El motor de JavaScript: V8, event loop y call stack",
      "Closures, hoisting y el scope en profundidad",
      "Programación funcional: map, filter, reduce, currying",
      "Patrones de diseño: módulo, observador, factory, singleton",
      "Gestión de memoria y optimización de rendimiento",
      "Testing con Jest: unit tests, mocks, coverage",
      "Módulos ES y sistemas de bundling",
    ],
    forWho:
      "Developers con conocimientos básicos o intermedios de JavaScript que quieren profundizar y escribir código de nivel profesional.",
    tags: ["JavaScript", "Programación avanzada", "Patrones de diseño", "Testing"],
    publishedDate: "2024-09-01",
    seoTitle: "Dominando JavaScript — Libro de Carlos Azaustre",
    seoDescription:
      "JavaScript avanzado: patrones de diseño, event loop, testing y optimización. El libro para developers que quieren dar el salto a nivel senior. En Amazon.",
  },
  {
    slug: "aprendiendo-react",
    title: "Aprendiendo React",
    subtitle: "Guía práctica para aprender desde cero",
    series: null,
    seriesNumber: null,
    isbn: "979-8852737427",
    cover: "/book-aprendiendo-react.jpg",
    amazonUS: "https://amzn.to/4aFSHZ4",
    amazonES: "https://www.amazon.es/Aprendiendo-React-pr%C3%A1ctica-aprender-desde-ebook/dp/B0CHP6C3HH",
    amazonMX:
      "https://www.amazon.com.mx/Aprendiendo-React-pr%C3%A1ctica-aprender-desde-ebook/dp/B0CHP6C3HH",
    ratingValue: 4.4,
    ratingCount: 72,
    description:
      "La guía práctica para dominar React desde cero. Hooks, estado, routing, llamadas a APIs y puesta en producción con Next.js. Todo lo que necesitas para construir aplicaciones React reales.",
    longDescription:
      "React es la librería más usada para construir interfaces de usuario. Si ya sabes JavaScript y quieres dar el paso al desarrollo frontend profesional, este libro es tu guía.\n\nAprenderás React desde los conceptos fundamentales: componentes, props y estado. Después iremos a lo que de verdad se usa en producción: todos los hooks principales (useState, useEffect, useContext, useMemo, useCallback), gestión de estado, React Router para el enrutado, y comunicación con APIs REST.\n\nEl libro cierra con una introducción a Next.js y el renderizado del lado del servidor (SSR), SEO para aplicaciones React y cómo optimizar el rendimiento antes del deploy.",
    topics: [
      "Componentes: function components, props, composición",
      "Hooks: useState, useEffect, useContext, useMemo, useCallback",
      "Gestión de estado: local, Context API y patrones escalables",
      "Routing con React Router",
      "Consumo de APIs REST y manejo de datos asíncronos",
      "Introducción a Next.js y Server Side Rendering",
      "SEO y optimización de rendimiento en React",
    ],
    forWho:
      "Developers que ya conocen JavaScript y quieren aprender React para construir aplicaciones web modernas y profesionales.",
    tags: ["React", "JavaScript", "Frontend", "Next.js", "Hooks"],
    publishedDate: "2023-09-01",
    seoTitle: "Aprendiendo React — Libro de Carlos Azaustre",
    seoDescription:
      "Aprende React desde cero: hooks, estado, routing y Next.js. La guía práctica de Carlos Azaustre para developers JavaScript. Disponible en Amazon.",
  },
];

export function getAllBooks(): Book[] {
  return BOOKS;
}

export function getBookBySlug(slug: string): Book | undefined {
  return BOOKS.find((b) => b.slug === slug);
}
