---
title: JSX para novatos
date: '2016-09-19'
url: 'https://carlosazaustre.es/blog/jsx-para-novatos'
tags:
  - react
  - javascript
  - tutorial
excerpt: >-
  Aprende qué es JSX, la extensión de JavaScript de React creada por Facebook.
  Descubre cómo simplifica la creación de componentes con sintaxis HTML en JS.
---

# JSX para novatos

> Publicado el 2016-09-19 — https://carlosazaustre.es/blog/jsx-para-novatos

**JSX** es una extensión de JavaScript creada por Facebook para el uso con su librería **React**. Sirve de preprocesador (como Sass o Stylus a CSS) y transforma el código a JavaScript.

De primeras te puede parecer que estás mezclando código HTML dentro de tus ficheros JavaScript, pero nada más lejos de la realidad. A continuación te lo explico.

React al basar el desarrollo de apps en componentes, necesitamos crear elementos HTML que definan nuestro componente, por ejemplo `<div>`, `<p>`, `<img>`, etc...

También necesitaremos indicar cuando se trata de componentes creados por nosotros con React, como puede ser un ``, ``, etc...

Todo esto podemos hacerlo con JavaScript con los métodos que nos ofrece React como `React.createElement`. Veamos un ejemplo:

Imagina que quieres crear un componente `` que está definido por un `div`, un `img` y algunas clases de CSS. Con JavaScript sería algo así:

```javascript
var image = React.createElement("img", {
  src: "react-icon.png",
  className: "icon-image",
});

var container = React.createElement(
  "div",
  {
    className: "icon-container",
  },
  image
);

var icon = React.createElement(
  "Icon",
  {
    className: "avatarContainer",
  },
  container
);

ReactDOM.render(icon, document.getElementById("app"));
```

Con esto tendríamos un componente `` que se traduciría al siguiente código HTML:

```html
<div class="icon-container">
  <img src="icon-react.png" class="icon-image" />
</div>
```

Si tuviésemos el siguiente CSS:

```css
.icon-image {
  width: 100px;
}
.icon-container {
  background-color: #222;
  width: 100px;
}
```

El resultado en el navegador sería así:
![resultado react jsx](/images/jsx-para-novatos/ejemplo-jsx.png)

Ahora veamos como se haría lo mismo pero empleando sintaxis JSX:

```javascript
var Icon = (
  <div className="icon-container">
    <img src="icon-react.png" className="icon-image" />
  </div>
);

ReactDOM.render(Icon, document.getElementById("app"));
```

Como puedes ver es mucho más práctico y legible esta sintaxis. Es prácticamente como escribir HTML pero no estás escribiendo HTML, es JavaScript.

Lo único que has de tener en cuenta es que hay algunas palabras reservadas en JavaScript y JSX te obliga a nombrar algunos atributos de otra manera, como es el caso de las `class` que para definir clases de CSS que con JSX debemos escribir `className`.

A medida que nuestra aplicación va creciendo y tenemos componentes más grandes, que manejan distintos eventos, esta forma de usar JSX nos va a ayudar mucho a agilizar nuestros desarrollos.

Recuerda, no es escribir HTML dentro de JS, es una forma de crear JS de una manera más práctica ;)

Para poder utilizar JSX, necesitarías añadir una librería extra a tu HTML, pero es más aconsejable utilizar un _bundler_ integrado en tu entorno de desarrollo, como puede ser WebPack o [Browserify](/browserify-desarrollando-tu-frontend-como-en-node-js/), y que éste le aplique la transformación antes de publicar tu código en producción. De esto hablaré en próximas entradas.

Si quieres **profundizar más sobre JSX**, tienes este [tutorial interactivo](http://buildwithreact.com/tutorial/jsx) y también la [documentación oficial de Facebook](https://facebook.github.io/react/docs/jsx-in-depth.html).
