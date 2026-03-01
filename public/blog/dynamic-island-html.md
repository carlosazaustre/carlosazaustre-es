---
title: 'Cómo hacer la Dynamic Island del iPhone 14 con HTML, CSS y JavaScript'
date: '2022-11-06'
url: 'https://carlosazaustre.es/blog/dynamic-island-html'
tags:
  - html
  - css
  - javascript
related:
  - css-2026-elimina-javascript-chrome-146-147
  - como-crear-webcomponent-de-forma-nativa
  - los-5-patrones-del-responsive-design
excerpt: >-
  Aprende a crear la Dynamic Island del iPhone 14 con HTML, CSS y JavaScript.
  Tutorial paso a paso con código completo para reproducirla en la web.
---

# Cómo hacer la Dynamic Island del iPhone 14 con HTML, CSS y JavaScript

> Publicado el 2022-11-06 — https://carlosazaustre.es/blog/dynamic-island-html

## ¿Qué es la Dynamic Island?

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=3LYaZyVPW58)
/>

La Dynamic Island es una característica que se ha introducido en el iPhone 14
y que permite a los usuarios crear una isla personalizada en la pantalla de inicio del iPhone.
En este artículo vamos a crear una versión web de la Dynamic Island utilizando HTML, CSS y JavaScript.

Este es el resultado que obtendrás:

![Dynamic Island con HTML y CSS](/images/dynamic-island-html/dynamic-island-html.gif)

## HTML

El HTML es bastante simple, solo necesitamos un contenedor para la isla
y un contenedor para el contenido de la misma.

Crea una carpeta en tu ordenador, la puedes llamar `dynamic-island` y abre tu editor favorito (yo utilizo VSCode).
Dentro crea un archivo `index.html` con el siguiente contenido:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <title>Document</title>
    <script src="./main.js"></script>
  </head>
  <body>
    <div class="island">
      <div class="island-content">
        <div class="player">
          <img
            class="player-picture"
            src="./assets/spotify-logo.png"
            alt="Spotify"
          />
          <div class="player-details">
            <p>Now Playing...</p>
            <h2>Hablando.js - Podcast</h2>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```

Como puedes ver dentro de la etiqueta `<head>`, he añadido links a un archivo de estilos y a un archivo de JavaScript.
Estos archivos los vamos a crear en los siguientes pasos.

Lo interesante de esta parte es esto:

```html
<div class="island">
  <div class="island-content">
    <div class="player">
      <img
        class="player-picture"
        src="./assets/spotify-logo.png"
        alt="Spotify"
      />
      <div class="player-details">
        <p>Now Playing...</p>
        <h2>Hablando.js - Podcast</h2>
      </div>
    </div>
  </div>
</div>
```

Tenemos un `<div>` con la clase `island` y dentro otro con la clase `island-content`. Esto nos permitirá
jugar con las transiciones y los efectos de la isla.

Dentro de `island-content` tenemos otro `div` en el que vamos a simular la información de
una reproducción de Spotify. Este `div` contiene una imagen con el logo de la aplicación y un `div` con
detalles de la reproducción.

vamos con el CSS.

## CSS

Lo que vamos a hacer no es nada "rocambolesco", solo vamos a crear la isla, darle un fondo de color negro,
bordes redondeados, y transiciones para cuando el usuario pase el ratón por encima de la isla esta
cambie de tamaño de una manera fluida.

Basicamente, mucho uso de Flexbox y un poco de animaciones.

```css
body {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "IBM Plex Sans", sans-serif; // Puedes usar otra fuente
}

.island {
  width: 85px;
  background-color: #000;
  height: 25px;
  border-radius: 50px;
  position: absolute;
  top: 37px;
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.island:hover {
  cursor: pointer;
  width: 75%;
  height: 60px;
  border-radius: 70px;
  transition: 0.3s ease;
}

.island-content {
  opacity: 0;
  transform: scale(0);
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0 0.6em;
  justify-content: space-between;
  align-items: center;
}

.island:hover .island-content {
  transition: 0.3s ease;
}

.player {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.player-picture {
  width: 40px;
  margin-right: 0.7em;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center center;
}

.player-details {
  color: #fff;
}

.player-details p {
  font-size: 14px;
  font-weight: 300;
  opacity: 0.3;
  margin: 0 0 0.5em 0;
}

.player-details h2 {
  white-space: nowrap;
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  color: #f5f5f5;
}
```

## JavaScript

Ahora vamos a añadir un poco de JavaScript para que el contenido de la isla (el reproductor)
se muestre cuando el usuario acerque el ratón por encima de ella y desaparezca cuando lo saque.

Como no estamos usando frameworks ni librerías, únicamente Vanilla JavaScript, necesitamos añadir
un "listener" para que se ejecute el código cuando ya está el DOM listo.

```javascript
window.addEventListener("DOMContentLoaded", main);
```

De esta forma, el código de la función `main` se ejecutará cuando el DOM esté listo. Dentro de `main`
cacheamos los elementos corresponndientes a los `div`: `island` y `island-content`.

```js
const island = document.querySelector(".island");
const islandContent = document.querySelector(".island-content");
```

Ahora, añadimos "listener" a cada uno de ellos. A `island` le añadimos un listener para cuando el
usuario pase el ratón por encima de él, y a `islandContent` le añadimos un listener para cuando el
usuario saque el ratón de él.

Dentro de su función de callback, jugaremos con la opacicidad y la escala, usando CSS de manera programática.

```js
island.addEventListener("mouseenter", () => {
  islandContent.style.opacity = 1;
  islandContent.style.transform = "scale(1)";
});

islandContent.addEventListener("mouseleave", () => {
  islandContent.style.opacity = 0;
  islandContent.style.transform = "scale(0)";
});
```

El código completo de `main.js` sería este:

```js
function main() {
  const island = document.querySelector(".island");
  const islandContent = document.querySelector(".island-content");

  island.addEventListener("mouseenter", () => {
    setTimeout(() => {
      islandContent.style.opacity = 1;
      islandContent.style.transform = "scale(1)";
    }, 100);
  });

  islandContent.addEventListener("mouseleave", () => {
    islandContent.style.opacity = 0;
    islandContent.style.transform = "scale(0)";
  });
}

window.addEventListener("DOMContentLoaded", main);
```

Pruébalo y dime que mejorarías 😊
