---
title: >-
  CSS en 2026: las tres features de Chrome que eliminan JavaScript que llevas
  años escribiendo
date: '2026-02-27'
url: 'https://carlosazaustre.es/blog/css-2026-elimina-javascript-chrome-146-147'
tags:
  - CSS
  - JavaScript
  - Chrome
  - Frontend
  - Web Development
related:
  - css-grid-layout-css
  - dynamic-island-html
  - lazy-loading-image
---

# CSS en 2026: las tres features de Chrome que eliminan JavaScript que llevas años escribiendo

> Publicado el 2026-02-27 — https://carlosazaustre.es/blog/css-2026-elimina-javascript-chrome-146-147

# CSS en 2026: las tres features de Chrome que eliminan JavaScript que llevas años escribiendo

Llevo años escribiendo el mismo bloque de código. Tú también, probablemente.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

El `IntersectionObserver` para animar elementos cuando entran al viewport. Es parte del ciclo de cualquier proyecto frontend desde hace años. Lo escribes casi de memoria.

Pues bien, en Chrome 146 esto ya no es necesario.

El mismo efecto, en cuatro líneas de CSS. Sin JavaScript. Sin observers. Y encima corre off main thread, sin jank.

Chrome 146 y 147 traen tres features de CSS que van a cambiar la forma en que construyes interfaces web. No son experimentos de laboratorio — resuelven casos de uso reales, cotidianos, que cualquier desarrollador frontend enfrenta en cada proyecto.

Te explico las tres.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=8V_krkzedHE)
/>

---

## Scroll-triggered animations (Chrome 146): adiós IntersectionObserver

### El problema

Necesitas que un elemento aparezca con animación al hacer scroll. Fade-in, slide desde abajo, lo que sea. Hasta ahora, IntersectionObserver era la única opción viable. Funciona, pero son 10-15 líneas de JavaScript para algo que debería ser CSS puro. Y corre en el main thread.

### La solución

Chrome 146 introduce tres propiedades nuevas que trabajan juntas: `timeline-trigger`, `animation-trigger`, y el mismo `@keyframes` de siempre.

```css
@keyframes fade-slide-in {
  from {
    opacity: 0;
    translate: 0 40px;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

.fade-in {
  animation: fade-slide-in 0.5s ease-out both;
  timeline-trigger: --fade-trigger view() entry 100% exit 0%;
  animation-trigger: --fade-trigger play-forwards play-backwards;
}
```

Tres conceptos clave:

- **`@keyframes`**: igual que siempre. La animación en sí.
- **`timeline-trigger`**: define cuándo se activa el trigger. `view()` significa "cuando el elemento esté en el viewport". `entry 100%` = cuando ha entrado completamente. `exit 0%` = cuando empieza a salir.
- **`animation-trigger`**: conecta la animación al trigger. `play-forwards` reproduce al entrar. `play-backwards` revierte al salir.

Entra: anima. Sale: revierte. Sin una sola línea de JavaScript.

### La diferencia con scroll-driven animations

Hay confusión con esto porque Chrome 115 ya trajo scroll-driven animations. No es lo mismo:

- **Scroll-driven**: la animación *avanza* proporcionalmente al scroll. Ideal para barras de progreso de lectura.
- **Scroll-triggered**: la animación se *dispara* al cruzar un punto. Ideal para fade-ins, reveals, highlights.

Son herramientas distintas para casos de uso distintos.

### Trigger-scope para componentes reutilizables

Un detalle importante si usas esto en componentes: los nombres de trigger son globales por defecto. Si tienes 10 cards con el mismo trigger, pueden interferirse entre sí.

La solución es `trigger-scope`:

```css
.carousel-item {
  trigger-scope: --item-trigger;
  timeline-trigger: --item-trigger view(inline) entry 90% exit 10%;
  animation: pop-in 0.3s ease both;
  animation-trigger: --item-trigger play-forwards;
}
```

`trigger-scope` limita la visibilidad del nombre al propio elemento. Cada instancia del componente tiene su propio contexto.

### Soporte actual

| Browser | Estado |
|---------|--------|
| Chrome 146+ | ✅ |
| Edge (Chromium) | ✅ |
| Firefox | Detrás de flag |
| Safari 18+ | En desarrollo |

Para producción hoy: usa `@supports` o progressive enhancement. Si el browser no soporta la feature, el elemento simplemente aparece sin animar. No rompe nada.

---

## Element-scoped view transitions (Chrome 147): transiciones concurrentes

### El problema

Las View Transitions llegaron en Chrome 111. Probablemente ya las conoces: permiten transiciones animadas al cambiar el DOM, ideal para SPAs y navegaciones entre páginas. El problema es que solo funcionaban a nivel de documento completo. Una transición activa a la vez. Si intentabas disparar otra, cancelaba la anterior.

### La solución

Chrome 147 resuelve esto con element-scoped view transitions:

```js
// Antes (Chrome 111): solo una transición a la vez
document.startViewTransition(() => updateDOM());

// Ahora (Chrome 147): cada elemento tiene su propio contexto
const sidebar = document.querySelector('#sidebar');
const main = document.querySelector('#main');

// Se ejecutan simultáneamente sin interferirse
sidebar.startViewTransition(() => closeSidebar());
main.startViewTransition(() => loadContent());
```

En lugar de llamar a `document.startViewTransition`, llamas al método en el elemento DOM directamente. Ese elemento se convierte en el "root" de esa transición. Cada uno tiene su propio contexto y no interfieren entre sí.

Para animar el elemento scoped con CSS:

```css
.card-list::view-transition-old(card-item) {
  animation: slide-out 0.25s ease;
}

.card-list::view-transition-new(card-item) {
  animation: slide-in 0.25s ease;
}
```

Los pseudo-elementos `::view-transition-old` y `::view-transition-new` ahora son relativos al elemento, no al documento.

### Cuándo usarlo

Tiene mucho sentido en:

- Listas reordenables
- Dashboards con múltiples paneles
- Sidebars + contenido principal animándose a la vez
- Cualquier componente que necesite animar su estado interno de forma independiente

Soporte: Chrome 147+. Firefox y Safari están en progreso.

---

## corner-shape y border-shape: formas CSS sin hackeos

Esta es la que más me llama la atención, aunque todavía está en feature preview. No ha llegado a stable aún, pero es cuestión de tiempo.

### El problema que resuelve

Los tooltips con flechas. Llevas años escribiendo algo así:

```css
.tooltip::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #1A1A1A;
}
```

Con `border-shape`, el tooltip tendrá la flecha como parte del borde del elemento mismo:

```css
.tooltip {
  border-radius: 8px;
  border-shape: round(8px) round(8px) point(bottom center) round(8px);
}
```

Sin `::after`. Sin hackeos de `border: 0 solid transparent`. El elemento define su propia forma.

### Los tipos de corner-shape

```css
/* iOS-style */
.squircle {
  border-radius: 24px;
  corner-shape: squircle;
}

/* Arco hacia dentro */
.notched {
  border-radius: 16px;
  corner-shape: notch;
}

/* Esquina diagonal */
.bevel {
  border-radius: 8px;
  corner-shape: bevel;
}

/* Por esquina individualmente */
.asymmetric {
  border-radius: 0 24px 24px 0;
  corner-shape: square round round square;
}
```

Esto abre la puerta a interfaces con personalidad real sin tirar de SVG o `clip-path` para formas simples.

---

## ¿Cuándo usarlo en producción?

El patrón que aplico en estos casos es `@supports`:

```css
/* Scroll-triggered animations */
@supports (animation-trigger: --x play-forwards) {
  .fade-in {
    timeline-trigger: --fade-trigger view() entry 100% exit 0%;
    animation-trigger: --fade-trigger play-forwards play-backwards;
  }
}

/* Element-scoped view transitions */
@supports (selector(::view-transition-old(*))) {
  /* nueva sintaxis */
}
```

`@supports` te permite añadir la feature sin romper browsers legacy. El browser que no lo soporte simplemente ignora el bloque. Progressive enhancement puro.

Resumen por feature:

| Feature | Producción hoy |
|---------|---------------|
| Scroll-triggered animations | ✅ Con `@supports` |
| Element-scoped view transitions | ✅ Solo Chrome/Edge |
| corner-shape | ⏳ En preview |

---

## Conclusión

La web platform no para. Cada año hay features CSS que eliminan capas de JavaScript que llevábamos años asumiendo como necesarias.

El `IntersectionObserver` que escribiste cien veces ya tiene sustituto nativo. Las view transitions ya pueden correr en paralelo. Y los tooltips con `::after` tienen los días contados.

No hace falta migrar todo de golpe. Identifica dónde usas estos patrones en tus proyectos, añade la detección con `@supports`, y los browsers modernos se benefician desde el primer día.

---

## Preguntas frecuentes

### ¿Scroll-triggered animations es lo mismo que scroll-driven animations?

No. Las scroll-driven animations (Chrome 115) hacen que la animación avance *en proporción* al scroll — por ejemplo, una barra de progreso de lectura. Las scroll-triggered animations (Chrome 146) *disparan* la animación al cruzar un punto concreto del viewport, como un fade-in. Son herramientas distintas para casos de uso distintos.

### ¿Puedo usar element-scoped view transitions con React o cualquier framework?

Sí. La API es JavaScript nativo — llamas a `element.startViewTransition()` en lugar de `document.startViewTransition()`. Puedes integrarlo en cualquier hook, efecto o handler de eventos de tu framework. Chrome 147+ es el requisito de browser.

### ¿corner-shape ya está disponible para usar?

Todavía no en stable. Está en feature preview en versiones experimentales de Chrome. Vale la pena tenerlo en el radar y probarlo en proyectos personales para familiarizarte, pero no lo uses en producción todavía. Cuando llegue a stable, los patrones de `border-shape` y `corner-shape: squircle` van a sustituir la mayoría de hackeos con `::after` para formas de tooltip.

### ¿Qué pasa con los browsers que no soportan estas features?

Con progressive enhancement y `@supports`, nada. El elemento aparece sin animar, la transición no ocurre, o la forma usa el `border-radius` de siempre. No hay errores, no hay JavaScript roto. El usuario de un browser legacy simplemente no ve el efecto — y eso es perfectamente aceptable.

### ¿Estas features requieren algo especial en el servidor o solo son CSS del cliente?

Solo son CSS del cliente. No hay configuración de servidor, no hay dependencias npm, no hay nada que instalar. Es CSS nativo que el browser interpreta directamente.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=8V_krkzedHE)
/>
