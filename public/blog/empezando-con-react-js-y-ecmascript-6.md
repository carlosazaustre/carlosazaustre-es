---
title: Empezando con ReactJS y ECMAScript 6
date: '2015-06-22'
url: 'https://carlosazaustre.es/blog/empezando-con-react-js-y-ecmascript-6'
tags:
  - react
  - javascript
excerpt: >-
  Aprende a empezar con ReactJS y ECMAScript 6. Descubre cómo funciona JSX, el
  sistema de renderizado de vistas de Facebook y por qué React domina el
  frontend.
---

# Empezando con ReactJS y ECMAScript 6

> Publicado el 2015-06-22 — https://carlosazaustre.es/blog/empezando-con-react-js-y-ecmascript-6

[React.js](http://facebook.github.io) es una librería de JavaScript lanzada hace poco más de un año por Facebook, normalmente utilizada en el Frontend aunque puede ser utilizada en el Backend. Facebook la utiliza en producción para su red social en determinadas partes, como los comentarios y también en Instagram.

No se trata de un framework JS de cliente como pueden ser Angular, Backbone o Ember, si no de una librería que se encarga del renderizado de las vistas de una aplicación web. Es la _V_ del patrón _MVC_ por así decirlo.

Una de las primeras cosas que vi y no me gustaban mucho de React era que parecía que mezclaba el HTML con código JavaScript, pero cuando lo pruebas ves que no es así, si no que usa un transformador de código JSX (Creado por Facebook) a JavaScript para facilitarnos la vida a la hora de programar, por ejemplo este código de React usando JSX:

```js
var Item = React.createClass({
  render: function () {
    return <div>Hello Item</div>;
  },
});
```

Y sin usar la transformación JSX sería así:

```js
var Item = React.createClass({
  render: function () {
    return React.createElement("div", {}, "Hello Item");
  },
});
```

Commo puedes ver, se ve de una forma más clara con JSX lo que estamos renderizando que usando ECMAScript 5/6 puro, y eso que este ejemplo es pequeño, si estamos usando más elementos HTML, con clases, eventos, etc... se puede hacer inmanejable.

### Principales características de React

#### DOM Virtual

Lo que ha hecho que React se vuelva _trending_ es su velocidad de renderizado de vistas. Eso es posible gracias a un _Virtual DOM_ que genera React con cada componente que creamos y el algoritmo de _Diff_ que básicamente lo que hace es marcar que elementos dentro de nuestro DOM Virtual tienen cambios para renderizar solo ellos y no tener que revisar y repintar el DOM entero de nuestra página. Dónde más tiempo se pierde en una aplicación web es en el renderizado y pintado del DOM. React evita eso y por eso es tan rápido.

![](/images/empezando-con-react-js-y-ecmascript-6/4.png)
![](/images/empezando-con-react-js-y-ecmascript-6/5.png)
Fuente: [React's diff Algorithm](http://calendar.perfplanet.com/2013/diff/)

#### Diseño orientado a componentes

React nos obliga a pensar en componentes. Es la nueva tendencia en el mundo del desarrollo Frontend. Al igual que en el backend se tiende a usar micro-servicios y librerías que resuelvan una cosa concreta, en el Frontend cada vez más se está extendiendo ésta práctica de _componetizar_ los elementos de nuestras aplicaciones para poderlos reutilizar.

### Usando ES6 con React

Con React podemos usar el nuevo estándar [ECMAScript 6 (o ECMAScript 2015)](/ecmascript6t/) para escribir nuestras aplicaciones y con Babel y [Browserify](/browserify-desarrollando-tu-frontend-como-en-node-js/) tener una versión traducida a ES5 que funcione en los navegadores actuales.

Si en nuestro `index.html` tenemos añadidos los enlaces a los scripts de React.js y JSX tranformer, un componente como el anterior en ES5 es así:

```js
var ItemRow = React.createClass({
  render: function () {
    return <li className="Item-row">Elemento de una lista</li>;
  },
});
```

Usando ES6 e instalando las dependencias de React por npm, sería algo así:

```js
import React from "react";

class ItemRow extends React.Component {
  render() {
    return <li className="Item-row">Elemento de una lista</li>;
  }
}

export default ItemRow;
```

A mi me parece más claro lo que estamos haciendo utilizando ES6. Un componente de React es una clase, que hereda de un React Component. Importamos el módulo de React de forma nativa con el sistema de módulos de ES6 y también podemos exportarlo para utilizarlo en otra parte de la aplicación.

Para que esto funcione en un navegador moderno, podemos usar `Gulp` junto con unos plugins y tareas para crear la versión de producción. Primero necesitamos tener instaladas las siguientes dependencias:

```shell
$ npm install --save-dev browserify
$ npm install --save-dev babelify
$ npm install --save-dev vinyl-source-stream
```

Y el fichero `Gulpfile.js` con una tarea para hacer el `build` de la parte JavaScript/JSX sería:

```js
// gulpfile.js

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
	browserify({
    	entries: './src/index.jsx',
        extensions: ['jsx'],
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js')
    .pipe(gulp.dest('./build'))
});
```

Esta tarea toma el fichero `src/index.jsx`, el principal de la aplicación para usar browserify. Después le aplica la transformación de `babelify` que no es más que traducir ES6 a ES5 y crea un fichero `bundle.js` con toda nuestra aplicación y dependencias listo para usar en el navegador.

En la [siguiente entrada vemos un ejemplo de aplicación web _componetizada_ utilizando React.js y ECMAScript 6](/ejemplo-de-aplicacion-con-react-js-en-ecmascript-6/).
