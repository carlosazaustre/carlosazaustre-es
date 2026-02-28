---
title: Automatizando tu flujo de trabajo en el Frontend con GulpJS
date: '2014-07-26'
url: >-
  https://carlosazaustre.es/blog/automatizando-tu-flujo-de-trabajo-en-el-frontend-con-gulpjs
tags:
  - javascript
  - nodejs
  - herramientas
excerpt: >-
  Aprende a automatizar tareas en el frontend con GulpJS y Node.js: minifica
  CSS, concatena archivos JS y optimiza tu flujo de trabajo de forma sencilla.
---

# Automatizando tu flujo de trabajo en el Frontend con GulpJS

> Publicado el 2014-07-26 — https://carlosazaustre.es/blog/automatizando-tu-flujo-de-trabajo-en-el-frontend-con-gulpjs

[GulpJS](http://gulpjs.com) es un automatizador de tareas escrito en JavaScript y que corre bajo Node.js que sigue la misma filosofía que [Grunt](/automatizar-tareas-en-javascript-con-grunt-js/). GulpJS mejora en cuanto facilidad de programación y rapidez a la hora de ejecutar las tareas. Si has usado Grunt, creo que verás que la sintaxis para declarar tareas es mucho más entendible que la del propio Grunt.

En este artículo mostraré un _Gulpfile_ básico en el que declararemos varias tareas habituales que solemos hacer en el Frontend (minificar CSS, JS, etc…) que nos solucionarán la vida. Si aún no has probado un automatizador de tareas, prepárate para descubrir un mundo nuevo :D

El fichero de configuración de tareas debe llamarse `Gulpfile.js` y estar situado en el directorio raíz de nuestro proyecto. Para poder ejecutrar gulp en nuestro equipo, debemos tener instalado [Node.js](http://nodejs.org/) y las siguientes dependencias de manera global

```shell
$ npm install -g gulp
```

Pensemos que tareas solemos hacer normalmente en nuestros desarrollos frontend. Lo más habitual es que usemos un preprocesador de CSS (Sass, Less, Stylus,…) para realizar el diseño de la web. Esto nos lleva a tener varios archivos y necesitamos que se conviertan en uno solo y con formato CSS. Esto lo podemos hacer con la siguiente tarea configurada en nuestro _Gulpfile_

```js
var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('css', function () {
gulp.src('./styles/**/*.styl')
.pipe(stylus({compress: true}))
.pipe(gulp.dest('./css'));
.pipe(connect.reload()); // Más adelante explicamos por qué</span>
});
```

Esta tarea recoge los ficheros `.styl` (de Stylus) que se encuentren en la carpeta _styles_ del proyecto, los preprocesa a CSS, los minifica en un solo fichero y lo deja en la carpeta _css_

Imaginemos ahora que tenemos varios ficheros JS, y los vamos añadiendo en nuestro HTML con las etiquetas `script`. Sería genial que un programa nos leyera esas referencias y se encargara de concatenarlas en un único fichero JS e incluso minificarlo. ¿Es posible? Si lo es:

```js
var gulp = require("gulp");
var useref = require("gulp-useref");
var gulpif = require("gulp-if");

gulp.task("compress", function () {
  gulp
    .src("./index.html")
    .pipe(useref.assets())
    .pipe(gulpif("*.js", uglify()))
    .pipe(useref.restore())
    .pipe(useref())
    .pipe(gulp.dest("./dist"));
});
```

Esta tarea toma de nuestro `index.html` que sería de esta forma:

```html
<!-- build:js js/vendor.min.js -->
<script src="lib/jquery/dist/jquery.js"></script>
<script src="lib/lodash/lodash.js"></script>
<script src="lib/angular/angular.js"></script>
<script src="lib/angular-route/angular-route.js"></script>
<script src="lib/angular-cookies/angular-cookies.js"></script>
<!-- endbuild -->
```

Gulp recoge el contenido entre las etiquetas de comentario en HTML, y concatena todos esos archivos JS en uno solo, en este caso `vendor.min.js`

También podemos trabajar con imágenes. Aunque con Photoshop o cualquier otro programa las hayamos optimizado para la web, siempre pueden ser comprimidas mucho más con un optimizador de imágenes. También podemos hacer esto con Gulp:

```js
var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var pngcrush = require("imagemin-pngcrush");

gulp.task("images", function () {
  gulp
    .src("./static/*.{png,jpg,jpeg,gif,svg}")
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngcrush()],
      })
    )
    .pipe(gulp.dest("./dist/static"));
});
```

Esta tarea toma las imágenes en formato `PNG`, `JPG`, `GIF` y `SVG` que se encuentren en la carpeta ‘static’ y las comprime y optmiza depositándolas en la carpeta `dist/static`

Estas tareas son geniales, pero ¿No sería aún mejor que se ejecutaran cada vez que hiciesemos un cambio en los ficheros CSS y JS? Eso lo conseguimos con la tarea `watch`

```js
gulp.task('watch', function() {
  gulp.watch('./styles/**/*.styl', ['css']),
  gulp.watch('./**/*.html, ['compress'])
});
```

Y para terminar, si pudiesemos ver los cambios que hacemos en el CSS y JS según guardamos sin tener que recargar el navegador, ahorraríamos una cantidad importante de tiempo. Gulp también nos facilita esto con el plugin `livereload`;

```js
var gulp = require("gulp");
var connect = require("gulp-connect");
var historyApiFallback = require("connect-history-api-fallback");

gulp.task("webserver", function () {
  connect.server({
    root: "./app",
    hostname: "0.0.0.0",
    port: 9000,
    livereload: true,
    middleware: function (connect, opt) {
      return [historyApiFallback];
    },
  });
});
```

Esto nos crea un servidor web de desarrollo que se ejecuta en localhost en el puerto 9000 y se recargará cada vez que se ejecute un cambio. Solo es necesario registrar la tarea y lo tenemos listo:

```js
gulp.task("default", ["webserver", "watch"]);
```

Sólo tenemos que ejecutar el comando ‘gulp’ en el terminal y tendremos todo en funcionamiento.

Gulp al igual que Grunt posee una gran comunidad y hay disponibles cientos de plugins para hacer cualquier tipo de tarea, sólo hay que revisar la documentación y el directorio NPM para encontrar el que más se ajuste a nuestras preferencias.
