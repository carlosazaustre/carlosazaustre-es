---
title: Ejemplo de aplicación con React.js en ECMAScript 6
date: '2015-06-23'
url: >-
  https://carlosazaustre.es/blog/ejemplo-de-aplicacion-con-react-js-en-ecmascript-6
tags:
  - react
  - javascript
  - tutorial
---

# Ejemplo de aplicación con React.js en ECMAScript 6

> Publicado el 2015-06-23 — https://carlosazaustre.es/blog/ejemplo-de-aplicacion-con-react-js-en-ecmascript-6

Hoy vamos a ver un pequeño ejemplo de aplicación web empleando [React.js](/empezando-con-react-js-y-ecmascript-6/) para crear componentes reutilizables y aprovecharemos para usar [ECMAScript 6](/ecmascript6/), el nuevo estándar de JavaScript, que traduciremos al estándar que todavía entienden los navegadores actuales con [Browserify](/browserify-desarrollando-tu-frontend-como-en-node-js/) y Babel (Babelify).

Vamos a ser una aplicación muy sencilla, sin mucha interacción, simplemente representaremos datos, más adelante veremos cosas más completas.

Esto será lo que vamos a hacer. He delimitado con recuadros lo que yo consideraría como un componente, y por tanto un elemento de React.

![Aplicación desglosada en componentes](/images/ejemplo-de-aplicacion-con-react-js-en-ecmascript-6/react-components.jpg)

Tendremos un `EmpleadoAvatar` (recuadro rojo), un `EmpleadoRow` (recuadro verde) y por último un `EmpleadoList` (recuadro azul).

La estructura de directorios y ficheros que voy a utilizar será la siguiente:

```shell
- src/
	- index.jsx
    - components/
    	- empleado-avatar/
        	- index.jsx
            - index.styl
        - empleado-row/
        	- index.jsx
            - index.styl
        - empleado-list
        	- index.jsx
            - index.styl
- node_modules
- build
	- index.html
    - js/
    	- bundle.js
- gulpfile.js
```

En la carpeta `components` tengo 3 componentes, el correspondiente al avatar del empleado, a la fila que contiene la información y al listado completo. Cada uno de ellos es una carpeta con su código JavaScript (`index.jsx`) y sus estilos, en el caso de que tuvieramos que definirlos. En este ejemplo utilizo `stylus`. `index.jsx` debajo de la carpeta `src` será el fichero de entrada de nuestra aplicación, el _main_.

En `node_modules` estarán nuestras dependencias tanto para desarrollo como finales. Para emplear React necesitamos instalar su librería, lo haremos por `npm`

```shell
$ npm install --save react
```

Despues ya podemos implementar nuestros componentes. Empezamos por `EmpleadoAvatar`. Veamos su código en `empleado-avatar/index.jsx`

```javascript
import React from "react";

class EmpleadoAvatar extends React.Component {
  render() {
    return (
      <figure className="media-left">
        <img
          className="media-object"
          width="64px"
          src={`http://taller-angular.carlosazaustre.es/asset/${this.props.picture}`}
        />
      </figure>
    );
  }
}

export default EmpleadoAvatar;
```

Creamos un componente que hereda de React.Component y va devolver una vista con un `figure` y un `img`, sus atributos o `props` van a ser únicamente la URL de la imagen que contiene la foto del empleado. Exportamos el módulo como `EmpleadoAvatar` para poder utilizarlo en otra parte de nuestra aplicación, como por ejemplo en el `EmpleadoRow`.

Voy a emplear Bootstrap para los estilos. Si tuviesemos estilos específicos de cada componente, podrían ir en su carpeta junto con el `index.jsx` y posteriormente con una tarea de Gulp, los preprocesaríamos y tendríamos un único fichero `.css` para producción.

Ahora pasemos a ver el código del siguiente componente, `empleado-row/index.jsx`:

```javascript
import React from "react";
import EmpleadoAvatar from "../empleado-avatar";

class EmpleadoRow extends React.Component {
  render() {
    return (
      <li className="media">
        
        <div className="media-body">
          <h4>{this.props.name}</h4>
          <p>
            {this.props.title} &nbsp;
            <span className="label label-info">{this.props.department}</span>
          </p>
        </div>
      </li>
    );
  }
}

export default EmpleadoRow;
```

Importamos de nuevo la librería `React` y el componente que hemos creado en el paso anterior `EmpleadoAvatar`. En `EmpleadoAvatar` definimos un `props` que era la imagen, con `picture`. Pues bien, ahora en este nuevo componente, como utilizaos el anterior vemos que le pasamos el atributo de la siguiente manera:

```jsx

```

Porque `picture` es una `prop` de `EmpleadoAvatar` y lo que le pasamos en una `prop` del componente que estamos creando, por eso le pasamos `this.props.picture`.

El siguiente componente sería el listado de emplados, veamos su código `empleado-list/index.jsx`

```javascript
import React from "react";
import EmpleadoRow from "../empleado-row";

class EmpleadoList extends React.Component {
  render() {
    return (
      <ul className="media-list">
        {this.props.listado.map((empleado) => {
          return (
            
          );
        })}
      </ul>
    );
  }
}

export default EmpleadoList;
```

Aquí utilizamos el componente `EmpleadoRow` junto con sus `props`: `name, picture, title` y `department` dentro del nuevo componente `EmpleadoList` el cual tiene un nuevo `prop` llamado `listado` que recibirá un array de objetos con la información de los empleados.

A este array le aplicamos la función `map` de JavaScript para que recorra cada elemento del array y devuelva un componente `EmpleadoRow` con sus propiedades. Exportamos el componente y seguimos.

Ahora veamos el código de `index.jsx` que es el fichero principal de la aplicación y el que va a renderizar la vista.

```javascript
import React from "react";
import EmpleadoList from "./components/empleado-list";

let empleados = [
  {
    id: 1,
    fullName: "Laya Dueñas",
    title: "CEO",
    department: "Business",
    pic: "empleado01.png",
  },
  {
    id: 2,
    fullName: "Astryd Vallés",
    title: "CMO",
    department: "Marketing",
    pic: "empleado02.png",
  },
  {
    id: 3,
    fullName: "Shantell Meza",
    title: "CFO",
    department: "Business",
    pic: "empleado03.png",
  },
  {
    id: 4,
    fullName: "Sergio Ocampo",
    title: "CTO",
    department: "Engineering",
    pic: "empleado04.png",
  },
  {
    id: 5,
    fullName: "Ares Jiménez",
    title: "Art Director",
    department: "Marketing",
    pic: "empleado05.png",
  },
  {
    id: 6,
    fullName: "Marta Pérez",
    title: "Frontend Dev",
    department: "Engineering",
    pic: "empleado06.png",
  },
  {
    id: 7,
    fullName: "Ellen Balderas",
    title: "Digital Strategist",
    department: "Marketing",
    pic: "empleado07.png",
  },
  {
    id: 8,
    fullName: "Cynthia Valentín",
    title: "Backend Dev",
    department: "Engineering",
    pic: "empleado08.png",
  },
  {
    id: 9,
    fullName: "Bernard Jung",
    title: "DevOps Engineer",
    department: "Engineering",
    pic: "empleado09.png",
  },
];

React.render(
  ,
  document.getElementById("application")
);
```

En este fichero tenemos un array de objectos _Empleado_. Importamos el componente `EmpleadoList` y le pasamos a su `prop`, `listado`, el array `empleados` en el método `render()` de React. también le pasamos el elemento HTML donde queremos insertar la vista. En este caso usaremos el `div` con id `#application`.

Es el momento de crear el `index.html` principal de la aplicación. Lo hacemos en la carpeta `build` donde tendremos los archivos de _producción_.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>React Example</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.css"
    />
  </head>

  <body>
    <h1>Listado de Empleados</h1>
    <div id="application"></div>

    <script src="/js/bundle.js"></script>
  </body>
</html>
```

El fichero `js/bundle.js` es el que vamos a generar ahora gracias a Browserify y Babelify en una tarea de gulp. Primero instalamos las dependencias que utilizaremos:

```shell
$ npm install --save-dev gulp
$ npm install --save-dev gulp-webserver
$ npm install --save-dev gulp-stylus
$ npm install --save-dev browserify
$ npm install --save-dev babelify
$ npm install --save-dev vinyl-source-stream
$ npm install --save-dev gulp-minify-css
$ npm install --save-dev nib
```

Y este sería nuestro `gulpfile.js`

```javascript
var gulp = require("gulp");
var webserver = require("gulp-webserver");
var stylus = require("gulp-stylus");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var nib = require("nib");
var minify = require("gulp-minify-css");

gulp.task("server", function () {
  gulp.src("./build").pipe(
    webserver({
      host: "0.0.0.0",
      port: 8080,
      fallback: "index.html",
      livereload: true,
    })
  );
});

gulp.task("stylus", function () {
  gulp
    .src("./src/styles/style.styl")
    .pipe(
      stylus({
        use: nib(),
        "include css": true,
      })
    )
    .pipe(minify())
    .pipe(gulp.dest("./build/css/"));
});

gulp.task("build", function () {
  browserify({
    entries: "./src/index.jsx",
    extensions: [".jsx"],
    debug: true,
  })
    .transform(babelify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./build/js"));
});

gulp.task("watch", function () {
  gulp.watch("./src/**/*.jsx", ["build"]);
  gulp.watch(
    ["./src/styles/**/*.styl", "./src/components/**/*.styl"],
    ["stylus"]
  );
});

gulp.task("default", ["server", "watch"]);
```

He añadido también tareas de preprocesado CSS en Stylus, por si tenemos estilos particulares para cada componente. Pero en este ejemplo estoy usando tan solo Bootstrap.

Para ejecutar y probar la aplicación debemos escribir en el terminal:

```shell
$ gulp build
$ gulp
```

Y en `http://localhost:8080` tendremos nuestra app corriendo.
