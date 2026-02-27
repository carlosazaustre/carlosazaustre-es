---
title: "Angular 2. Primeros pasos empleando Browserify y Babel"
date: "2015-11-09"
url: "https://carlosazaustre.es/blog/angular-2-primeros-pasos"
tags: []
---

# Angular 2. Primeros pasos empleando Browserify y Babel

> Publicado el 2015-11-09 — https://carlosazaustre.es/blog/angular-2-primeros-pasos

El pasado viernes [fuí invitado como ponente al #DevFestCordoba](https://cordoba.gdgdevfest.com/speakers/) organizado por el [GDG de Córdoba](https://twitter.com/gdgcordobaESP) (España). Mi charla fue sobre Angular 2. Qué trae nuevo y qué deja atrás.

![Angular 2 basado en ECMAScript6 y WebComponents](/images/angular-2-primeros-pasos/angular-2-ecmascript6-webcomponents.png)

En la charla compartí mi experiencia probando la versión Alpha de Angular2, y como a través de la documentación que existe hoy en día y tutoriales que he ido buscando, lograr hacer funcionar un entorno de trabajo en el que no use TypeScript ni System.js

En este tutorial te cuento como preparar tu entorno de trabajo con un **Gulpfile** [utilizando **browserify**](/browserify-desarrollando-tu-frontend-como-en-node-js/), **babelify** y algunos polifylls, para poder iniciarte en Angular2 sin mucha complicación.

![Trabajando con Angular 2 y las herramientas Browserify y Babel](/images/angular-2-primeros-pasos/angular-2-browserify-y-babel.png)

## Instalando dependencias

El primer paso es crear nuestro proyecto de `npm` para instalar a continuación las dependencias.

> **Atención**

> Aún no he conseguido que el proyecto funcione con las versiones 12.x de `browserify` ni con la 6.x de `babel`, por lo que asegúrate de que instalas las que te indico en este artículo para que te funcione correctamente.

Instalamos las siguientes dependencias de desarrollo:

- **Babel** nos sirve para traducir [ECMAScript6](/ecmascript6) a ECMAScript5 que es el que entienden hoy en día los navegadores.

- **Babel-plugin-angular2-annotations** es un plugin de Babel que nos permite usar los decoradores que trae Angular, basados en ECMAScript7 (Qué aún no son un estándar pero lo serán).

- **Browserify** nos permite usar módulos en el Frontend como haríamos en Node.js y junto con **Babelify** realizamos una transformación para poder usar los `import` nativos de ES6.

- **Vinyl-buffer** y **Vinyl-source-stream** nos permiten trabajar con el fichero resultante de Browserify.

- **Watchify** Nos permite reconstruir el fichero resultante de Browserify cuando hagamos cambios en nuestro código fuente de una manera ágil.

- **Gulp** Es el gestor de tareas que utilizaremos para el build y el watch de archivos

- **http-server** es un servidor web de desarrollo para probar nuestro proyecto en local.

Los comandos serían los siguientes:

```shell
$ npm init -y
$ npm i -g babel@5.8.23
$ npm i -D babel-core@5.8.25
$ npm i -D babel-plugin-angular2-annotations@2.0.1
$ npm i -D babelify@6.3.0
$ npm i -D browserify@11.0.1
$ npm i -D vinyl-buffer@1.0.0
$ npm i -D vinyl-source-stream@1.1.0
$ npm i -D watchify@3.6.0
$ npm i -D gulp@3.9.0
$ npm i -D http-server@0.8.5
```

Las dependencias del proyecto serán las siguientes:

- **Angular2** utilizaremos la versión `alpha.44`

- **reflect-metadata** Es un polifyll que nos permite usar los decoradores de ES7. Si no lo incluimos nos dará un error en consola y no se ejecutará el proyecto.

- **zone.js** Implementa _Zones_ en JavaScript. Una
  _Zone_ es un contexto de ejecución que persiste a través de tareas asíncronas. Si no lo incluimos, las rutas por ejemplo no Funcionarán.

Los comandos para instalar las dependencias son:

```shell
$ npm i -S angular2@2.0.0-alpha.44
$ npm i -S reflect-metadata@0.1.0
$ npm i -S zone.js@0.5.8
```

## Preparando nuestro Gulpfile

El siguiente paso es [crear el fichero Gulpfile](/automatizando-tu-flujo-de-trabajo-en-el-frontend-con-gulpjs/) que nos permita automatizar estas tareas.

Si tenemos instalado Babel de forma global, podemos emplear sintaxis de ECMAScript6 en el fichero de gulp si lo llamamos `gulpfile.babel.js`.

El contenido del fichero será el siguiente:

```javascript
// -- Gulp Plugins ------------------------------------
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';

// -- Helper functions --------------------------------
function bundle(b) {
  return b.bundle()
    .on('error', (err) => console.log(err);)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public'));
}

// -- Gulp Tasks --------------------------------------
gulp.task('copy', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('build', ['copy'], () => {
  const b = browserify('./src/app.js')
    .transform(babelify);

  return bundle(b);
});

gulp.task('watch', () => {
  const b = browserify('./src/app.js', watchify.args)
    .transform(babelify);

  const w = watchify(b)
    .on('update', () => bundle(w))
    .on('log', gutil.log);

  return bundle(w);
});

gulp.task('default', ['copy', 'watch']);

```

Únicamente tenemos dos tareas a destacar, `build` que compila el código ES6 con decoradores ES7 que tengamos en la carpeta `src/app.js` y le aplica la transformación con `babelify` y la deja en el directorio `/public` que será el de producción.

La tarea `watch` vigila los cambios que se hagan en `app.js` y dispara de nuevo `browserify` para añadírselos.

Estas tareas y el servidor de desarrollo local, los vamos a incluir en el objeto `scripts` del `package.json` para llamarlas con el comando `npm`:

```javascript
...
"scripts": {
  "start": "http-server public",
  "dev": "gulp"
}
...
```

> **Atención**

> Cuando usamos `babelify`, si no le indicamos nada, buscará un archivo de nombre `.babelrc` con la configuración de plugins y nivel de compilado que queremos.
> Éste es el que has de usar:

```javascript

  "optional": ["es7.decorators"],
  "plugins": [
    "angular2-annotations"
  ]
}
```

> De esta manera le indicamos que trate los Decoradores de ES7 y utilice el plugin `Babel-plugin-angular2-annotations`.

Así para ejecutar el servidor, corremos `npm start` y para ejecutar gulp y que vigile los cambios: `npm run dev`.

## El index.html de la SPA en Angular 2.

Creamos un fichero `index.html` que será la única página de éste ejemplo de SPA con Angular2. Únicamente incluimos el fichero `app.js` en los scripts ya que las librerías se están incluyendo en ese fichero gracias a browserify:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Angular2</title>
  </head>
  <body>
    <h1>Primeros pasos con Angular2 (con Babel y Browserify)</h1>
    <hello-app>Cargando...</hello-app>

    <script src="app.js"></script>
  </body>
</html>
```

A destacar el elemento `<hello-app>`. Es un componente que crearemos a continuación y será el que lleve toda la aplicación.

El desarrollo con Angular2 [es muy parecido a React, en plan de que se plantea un desarrollo orientado a componentes](/ejemplo-de-aplicacion-con-react-js-en-ecmascript-6/) en lugar de vistas con muchas funcionalidades.

También se elimina la directiva `ng-app`. Ahora la aplicación se cargará por el método `bootstrap` que ahora veremos.

## Funcionalidad de nuestra aplicación en App.js

Creamos a continuación el fichero `app.js` que será el punto de arranque de nuestra aplicación. En el irá una clase ES6 para el componente `<hello-app>`, utilizando nomenclatura _CamelCase_:

```javascript
class HelloApp {}
```

Sobre esta clase aplicamos los decoradores `@Component` y `@View` donde le indicamos el nombre del selector, la plantilla HTML, etc...

```javascript
@Component({
  selector: "hello-app",
})
@View({
  directives: [HelloComponent],
  template: `
    <div>
      <hello-component></hello-component>
    </div>
  `,
})
class HelloApp {}
```

El `selector` de `@Component` es el nombre que tendrá el componente en el HTML como las antiguas directivas de Angular 1.x.

Dentro de `@View` tenemos el atributo `template` donde colocamos el marcado HTML que sustituye al componente, y como vamos a usar uno propio que enseguida crearemos, debemos inyectarlo como dependencia en el atributo `directives`.

Por último nos queda llamar al método `bootstrap` con el componente global que arrancará nuestra aplicación y le indica el punto de entrada:

```javascript
bootstrap(HelloApp, []);
```

Para que el método `bootstrap`, los decoradores `@Component` y `@View` y el componente `HelloComponent` que ahora implementaremos funcionen, debemos importarlos al inicio:

```javascript
import { Component, View, bootstrap } from "angular2/angular2";
import { HelloComponent } from "./hello.component";
```

El fichero `app.js` completo, incluyendo los polyfills de los que hablamos al inicio sería así:

```javascript
import "zone.js/lib/browser/zone-microtask";
import "reflect-metadata";

import { Component, View, bootstrap } from "angular2/angular2";
import { HelloComponent } from "./hello.component";

@Component({
  selector: "hello-app",
})
@View({
  directives: [HelloComponent],
  template: `
    <div>
      <hello-component></hello-component>
    </div>
  `,
})
class HelloApp {}

bootstrap(HelloApp, []);
```

## Creando un nuevo componente en Angular 2

En un fichero separado (`hello.component.js`), vamos a crear un nuevo componente: `HelloComponent` que es el que importamos desde `app.js`.

Para ello seguimos la misma secuencia que al crear el componente `HelloApp`, salvo que esta vez exportaremos la clase para que pueda ser importada:

```javascript
export class HelloComponent {}
```

De la misma manera, le añadimos los decoradores de Component y View. Esta vez no usamos otra directiva, por tanto no incluimos ninguna dependencia:

```javascript
@Component({
  selector: "hello-component",
})
@View({
  template: `<p>{{ message }}</p>`,
})
export class HelloComponent {}
```

El HTML que engloba este Component es un elemento párrafo `<p>` con un _binding_ a una variable `message`.

Para poder modificar esa variable debemos hacerlo desde la clase `HelloComponent` en su constructor. EL fichero final con los módulos necesarios sería el siguiente:

```javascript
import { Component, View } from "angular2/angular2";

@Component({
  selector: "hello-component",
})
@View({
  template: `<p>{{ message }}</p>`,
})
export class HelloComponent {
  constructor() {
    this.message = "Hola, Angular 2!";
  }
}
```

## Probando en el navegador

Una vez completado el código de este ejemplo, si ejecutamos en el terminal `gulp` o `npm run dev` para hacer el build y posteriormente `npm start` para iniciar el servidor web de desarrollo, nos dirigimos a `http://localhost:8080` en el navegador y veremos algo como ésto:

![Localhost con aplicación en Angular 2](/images/angular-2-primeros-pasos/tutorial-angular-2.png)

## Próximos pasos

En siguientes entradas veremos [cómo incluir rutas y eventos](/angular-2-rutas-y-componentes/) para conocer cómo cambian con respecto a Angular 1.x.
