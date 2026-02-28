---
title: Primeros pasos con Webpack
date: '2016-09-22'
url: 'https://carlosazaustre.es/blog/primeros-pasos-con-webpack'
tags:
  - javascript
  - herramientas
related:
  - automatizando-tu-flujo-de-trabajo-en-el-frontend-con-gulpjs
  - browserify-desarrollando-tu-frontend-como-en-node-js
  - automatizar-tareas-en-javascript-con-grunt-js
---

# Primeros pasos con Webpack

> Publicado el 2016-09-22 — https://carlosazaustre.es/blog/primeros-pasos-con-webpack

**[Webpack](http://webpack.github.io)** es un sistema de _bundling_ para preparar el desarrollo de una aplicación web para producción. En cierta medida se puede considerar un Browserify avanzado ya que tiene muchas opciones de configuración.

También se puede considerar una evolución de Grunt y Gulp, ya que permite de alguna manera automatizar los procesos principales que son transpilar y preprocesar código de `.scss` a `.css`, de ES7 a ES5/6, etc...

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=2M5L_uz6GO0)
/>

Para poder utilizar _Webpack_ en tu proyecto web debes tener instalado Node.js en tu equipo y con el comando `npm install -g webpack` tendrás _Webpack_ instalado de forma global en tu equipo (También puedes instalarlo a nivel de proyecto y correrlo con NPM scripts).

El comando más sencillo para realizar un bundle de tus archivos JavaScript es el siguiente:

```shell
$ webpack ./index.js ./build/app.js
```

Este comando lo que hace es leer tu fichero `index.js` que sería el principal de tu aplicación e importar todos los módulos que estén definidos y crear el fichero de "producción" `app.js` en la carpeta `build`.

Por supuesto esto se puede complicar mucho más. En lugar de escribir todo como comandos, podemos tener un fichero `webpack.config.js` donde escribamos toda la configuración que necesitemos.

Webpack permite que trabajemos con cualquier tipo de archivo (CSS, preprocesadores CSS, preprocesadores de JavaScript, imágenes, etc...) Con indicarle que _loader_ debe utilizar e instalarlo, nos es suficiente.

Gracias a esto podemos por ejemplo preprocesar el código JSX de nuestros componentes de React facilmente. Veamos que fichero de configuración de Webpack debemos escribir para ello y a continuación te explico cada línea:

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  context: __dirname,
  entry: {
    app: ['./index.jsx']
  },
  output: {
    path: './build',
    filename: 'app.js',
    publicPath: '/build/
  },
  module: {
    loaders: [
      {
        test: /(\.js|.jsx)$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      }
    ]
  }
}
```

El fichero exporta un objeto JavaScript con las siguientes configuraciones:

```javascript
resolve: {
  extensions: ['', '.js', '.jsx']
},
context: __dirname
```

Con esto le indicamos a webpack que se fije en los ficheros con extensión `.js` y `.jsx` desde el directorio en el que se encuentra el fichero webpack.config.js hacia dentro. El resto los va ignorar en el proceso de _bundling_.

```javascript
entry: {
  app: ['./index.jsx']
},
```

Aquí le indicamos que el punto de entrada desde el que debe empezar a leer y realizar el proceso es el fichero `index.jsx`

```javascript
output: {
  path: './build',
  filename: 'app.js',
  publicPath: '/build/
},
```

Con ésta configuración le estamos indicando donde ha de situarse el fichero de salida, y será en la carpeta `build` con el nombre `app.js`. Si lo servimos desde un servidor de desarrollo, la ruta pública será `/build`.

```javascript
module: {
  loaders: [
    {
      test: /(\.js|.jsx)$/,
      loader: "babel",
      query: {
        presets: ["es2015", "stage-2", "react"],
      },
    },
  ];
}
```

Llegamos a la parte más interesante, los _loaders_. Aquí en el objeto `loaders` podemos incluir tantos como queramos, dependiendo del tipo de archivo que queramos modificar. Podemos tener un loader para ficheros JavaScript y JSX como el ejemplo, podemos tener otro para ficheros de estilos y montar el CSS, podemos tener otro para imágenes, etc...

En este caso le estamos indicando con la expresión regular `/(\.js|.jsx)$/` que a todos los ficheros con extensión `.js` y/o `.jsx` les pase el _loader_ de Babel, que instalaremos con el paquete de npm `babel-loader`. Además le añadimos unas opciones de configuración a Babel con el objeto `query`. Le indicamos que utilice el preset de `es2015` para transpilar la sintaxis de JavaScript que aún no soporten los browsers a la versión que si soportan, también el preset `stage-2` que nos permite utilizar algunas cosas de la próxima versión de ECMAScript7, y por último el preset `react` que permite el preprocesamiento de JSX a JavaScript.

Para poder utilizar estos presets debemos instalar los siguientes paquetes desde NPM:

```shell
$ npm install --save-dev babel-cli
$ npm install --save-dev babel-preset-es2015
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-react
```

con esto, si corremos el comando `webpack` en nuestra terminal, tendremos el fichero final en pocos segundos. Si creamos un npm script con el comando:

```javascript
"scripts": {
  "build": "webpack --watch --colors"
}
```

Al correr `npm run build` tendremos ejecutando webpack en modo `watch` lo que significa que a cada cambio que hagamos en nuestro código, webpack creará el bundle de nuevo pero de una manera más rápida que por ejemplo con Browserify o Gulp ya que lo mantiene en memoria. Y con el flag `--colors` vemos de una manera más gráfica el resultado en la consola:

```shell
> webpack --watch --colors

Hash: 29e741b4cf44e481459f
Version: webpack 1.13.2
Time: 7316ms
 Asset    Size  Chunks             Chunk Names
app.js  751 kB       0  [emitted]  app
   [0] multi app 28 bytes {0} [built]
    + 172 hidden modules
```

## Webpack como servidor de desarrollo

También tenemos la opción de crear un servidor web de desarrollo con webpack. Para ello debemos instalar otra dependencia que es `webpack-dev-server`:

```shell
$ npm install --save-dev webpack-dev-server
```

Y modificar nuestro fichero `webpack.config.js` con el siguiente bloque:

```javascript
devServer: {
  host: '0.0.0.0',
  port: 8080,
  inline: true
},
```

Esto nos va a crear un servidor (basado en Node.js y Express) de desarrollo en local, en el puerto `8080` que servirá nuestra carpeta `build`. Necesitaremos crear un sencillo fichero `index.html` en la carpeta `/build` con lo siguiente para poder ver el resultado en el navegador:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Ejemplo Webpack</title>
  </head>
  <body>
    <script src="/build/app.js"></script>
  </body>
</html>
```

Con esto y el comando `webpack-dev-server` corriendo tendremos un servidor mostrando el contenido de la caperta build y recreando el fichero de bundle en cada cambio que hagamos.

Para probar esto, tengamos por ejemplo en el fichero `index.jsx` lo siguiente:

```javascript
import Persona from "./persona";

const carlos = new Persona("Carlos");
carlos.saluda();
```

Y en el módulo `persona.jsx` lo siguiente:

```javascript
export default class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }

  saluda() {
    console.log(`Hola! Soy ${this.nombre}`);
  }
}
```

En ambos ficheros no estamos utilizando React, pero si la extensión JSX y la versión ES2015 de JavaScript.

Al salvar estos ficheros, se recreará el bundle y si en el navegador escribimos la URL: `http://0.0.0.0:8080/build` veremos en la consola JavaScript del navegador el mensaje:

```shell
Hola! Soy Carlos
```

A medida que vayamos desarrollando, creando componentes de React, ficheros CSS, etc... éste entorno de desarrollo nos agiliza el desarrollo y nos permite ir más rápido y enfocarnos en nuestro código.

Puedes encontrar el código de este ejemplo en mi [repositorio en GitHub](https://github.com/carlosazaustre/webpack-example).

Si quieres ampliar información sobre Webpack, puedes aprender mucho más en la web [SurviveJS](http://survivejs.com/webpack/introduction/)
