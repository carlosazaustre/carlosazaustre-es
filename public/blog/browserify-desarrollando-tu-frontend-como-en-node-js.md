---
title: "Browserify. Desarrollando tu Frontend como en Node.js"
date: "2015-03-12"
url: "https://carlosazaustre.es/blog/browserify-desarrollando-tu-frontend-como-en-node-js"
tags: []
---

# Browserify. Desarrollando tu Frontend como en Node.js

> Publicado el 2015-03-12 — https://carlosazaustre.es/blog/browserify-desarrollando-tu-frontend-como-en-node-js

[Browserify](http://browserify.org/) es una librería de Node.js, escrita por [substack](https://www.npmjs.com/~substack),
uno de los mayores contribuidores al core de Node.js y con mayor número de módulos publicados en NPM.

![browserify](/images/browserify-desarrollando-tu-frontend-como-en-node-js/687474703a2f2f737562737461636b2e6e65742f696d616765732f62726f777365726966795f6c6f676f2e706e67.png)
Nos permite escribir código JavaScript del cliente, como si estuviésemos programando en Node.js,
es decir, como por ahora no tenemos módulos de forma nativa en JavaScript (hasta que [se implante el estándar ECMAScript6](/ecmascript6/)
que si los trae) hay librerías que se encargan de imitar ese comportamiento (Caso de Require.js hace un tiempo).

Con esta librería, podemos instalar módulos para el cliente, con NPM, al igual que hacíamos con bower, pero ahora, podemos
llamarlos desde nuestro código con la palabra reservada `require`, al igual que en Node.js

Y también nos permite tener un sólo archivo `.js` en el cliente, ya de inicio, olvidándonos de tener que importar todas las librerías
y scripts utilizados en el HTML con `<script src="..."></script>` y luego tener que concatenar etc...

También nos permite crear nuestros propios módulos con `module.exports` y llamarlos de nuevo desde nuestro código con `require`.

En este artículo vamos a ver como sería un ejemplo sencillo utilizando una libreria externa como `jQuery` instalada a través de NPM,
y como crear nuestro propio módulo y utilizarlo dentro de nuestra aplicación. Para todo ello emplearemos Node.js como servidor y Gulp con algunos plugins para automatizar el proceso.

### Configuración de Gulp

Instalamos los siguientes módulos y plugins para automatizar algunas tareas.

```shell
$ npm install --save-dev gulp
$ npm install --save-dev gulp-uglify
$ npm install --save-dev browserify
$ npm install --save-dev vinyl-source-stream
$ npm install --save-dev vinyl-buffer
```

Esta será la tarea que crea el fichero `bundle.js` donde está el codigo fuente completo de la parte cliente, ya traducido para que
funcione en el navegador, ya que los navegadores no entienden los `require` ni los `module.exports`.

```js
gulp.task("browserify", function () {
  return browserify("./source/scripts/app.main.js")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("./public/js"));
});
```

El fichero principal dentro de nuestros fuentes es `app.main.js`, desde ahí se llama al resto de modulos y librerías externas utilizadas
y el metodo `bundle()` lo compila.

Con `buffer()` del plugin `vinyl-buffer` y `source()` del plugin `vinyl-source-stream` conseguimos poder utilizar el fichero
`bundle.js` generado para aplicarle un `uglify` o lo que se nos ocurra. Si le aplicacamos `uglify` despues del `bundle()` dará error
porque por asincronía, aún no ha sido generado el fichero cuando queremos acceder a el.

### Instalando librerías para el Frontend con NPM

Ahora vamos a Instalar librerías cliente desde NPM, Node Package Manager, el repositorio de módulos de Node.js.

Para instalar por ejemplo, la librería de jQuery, lo hacemos de la siguiente manera:

```shell
$ npm install jquery
```

En nuestro index.html (ya sea servido por Node.js, Apache, Nginx, etc) debe incluir el script `bundle.js` generado por Browserify

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Browserify Playground</title>
  </head>
  <body>
    <h1>Hola Mundo</h1>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>
```

Además para este ejemplo, hemos añadido un `h1` con el texto _Hola Mundo_.

Ahora pasamos a nuestro código fuente JavaScript, el fichero `app.main.js` llamará al módulo de jQuery con `require('jquery')` y podremos usarlo.

Este script únicamente buscará el elemento `h1` y cambiará su texto por _Hello Browserify_

```js
// source/scripts/app.main.js
var $ = require("jquery");
$("h1").html("Hola Browserify");
```

El resultado que veremos en el navegador será el siguiente:
![hola browserify](/images/browserify-desarrollando-tu-frontend-como-en-node-js/Screen-Shot-2015-03-11-at-20-45-18.png)

Para conseguir este resultado, hay que correr las tareas que hemos configurado en el `Gulpfile.js`

```shell
$ gulp build
$ gulp
```

### Integrando nuestros propios módulos

Voy a crear un fichero `app.persona.js` como módulo para ver como se exportaría e importaría en nuestra aplicación con _browserify_

```js
// source/scripts/app.persona.js

var Persona = function (nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;

  var self = this;

  return {
    saludar: function () {
      alert("Hola, mi nombre es " + self.nombre);
    },
    presentar: function () {
      alert("Tengo " + self.edad + " años.");
    },
  };
};

module.exports = Persona;
```

Exportamos la variable `Persona` como módulo, y que devuelve 2 funciones, `saludar` y `presentar`,
que son las únicas que podremos utilizar cuando las llamemos desde `app.main.js`

```js
var $ = require("jquery");
var persona = require("./app.persona");

$("h1").html("Hola Browserify");

var carlos = new persona("Carlos", 30);
carlos.saludar();
carlos.presentar();
```

Importamos el módulo recien creado con `require('./app.persona')` indicándole la ruta donde está el archivo.

Creamos un objeto `persona` en la variable `carlos`, le pasamos los parámetros `Carlos` y `30` como nombre y edad.
Llamamos a las funciones `saludar()` y `presentar()` que mostrarán una alerta JavaScript como las siguientes:

![saludar](/images/browserify-desarrollando-tu-frontend-como-en-node-js/Screen-Shot-2015-03-11-at-23-35-04.png)

![presentar](/images/browserify-desarrollando-tu-frontend-como-en-node-js/Screen-Shot-2015-03-11-at-23-35-09.png)

De esta manera, con `Browserify`, podemos programar el JavaScript del Frontend como en el backend con Node.js, pudiendo incluso
utilizar librerías no disponibles para el navegador. Y además compilar todo en un único fichero y no tener que enlazar los scripts en el HTML, salvo el `bundle.js`

![chuck-norris-aproved](http://www.gifbin.com/bin/1237811519_chuck-norris-approves.gif)

En el siguiente enlace tienes acceso al código utilizado en este ejemplo, para que lo puedas testear.

> [github.com/carlosazaustre/browserify-example](https://github.com/carlosazaustre/browserify-example)
