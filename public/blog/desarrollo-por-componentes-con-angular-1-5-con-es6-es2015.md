---
title: Desarrollo por componentes con Angular 1.5 y ES6/ES2015
date: '2016-07-04'
url: >-
  https://carlosazaustre.es/blog/desarrollo-por-componentes-con-angular-1-5-con-es6-es2015
tags:
  - angular
  - javascript
  - tutorial
---

# Desarrollo por componentes con Angular 1.5 y ES6/ES2015

> Publicado el 2016-07-04 — https://carlosazaustre.es/blog/desarrollo-por-componentes-con-angular-1-5-con-es6-es2015

En el pasado [AngularCamp](http://angularcamp.org) impartí un workshop enseñando una aplicación web de ejemplo empleando la última versión de Angular 1x, la 1.5.6 que introduce el método `.component()` para desarrollar basado en componentes (Como haría _React_ o _Angular2_) y empleando para ello ECMAScript6 (o ES2015), para que nuestro código con Angular 1x cada vez se parezca más a Angular2.

En el ejemplo uso **UIRouter** para las rutas, en su última versión _alpha_ a día de hoy. Emplearé Babel para traducir ES6 a ES5. No usaré TypeScript.

La aplicación es una lista de los speakers de la pasada AngularCamp y cada speaker tiene su vista detalle.

Sin nada más, vamos manos a la obra!

## Arquitectura de Componentes

Con Angular 1.5 podemos dividir nuestra aplicación en componentes, haciendo uso del método `.component()`. [Antes podíamos hacerlo por directivas ](/angular-js-directivas-como-componentes/) pero de esta forma el código está mejor adaptado y nos prepara para el salto a Angular2, sobre todo si empleamos el nuevo estándar de JavaScript para ello y la excelente [guía de estilo de Todd Motto](https://github.com/toddmotto/angular-styleguide).

La aplicación de ejemplo tendrá los siguientes componentes:

![Arquitectura de componentes en una web app Angular 1.5](/images/desarrollo-por-componentes-con-angular-1-5-con-es6-es2015/app_angular_components.png)

- `AppComponent` será el componente raíz donde reside toda la lógica de la aplicación.

- `HeaderComponent` y `FooterComponent` son componentes comunes que podemos reutilizar en otras aplicaciones.

- `SpeakerList`: Representa la vista principal compuesta por una lista de `SpeakerItems`.

- `SpeakerItem`: Cada uno de los Speakers representados en la lista.

- `SpeakerDetail`: Vista en detalle de cada speaker, accesible bajo una URL determinada.

## Iniciando el proyecto

Primero de todo creamos un proyecto con NPM en una carpeta e instalamos las **dependencias** que utilizaremos vía NPM

```shell
$ npm init -y
$ npm i -S angular angular-ui-router@1.0.0-alpha.5
```

Las siguientes **dependencias** no son de Angular, si no de la **parte Backend** desde la que voy a servir el API. También las instalamos con NPM a través de la terminal.

```shell
$ npm i -S express body-parser
```

Y por último las siguientes **dependencias para desarrollo** que nos servirán para usar babel en conjunto con browserify y el conjunto de plugins para que entienda ES2015.

```shell
$ npm i -S babel-runtime babel-preset-es2015 browserify watchify nodemon parallelshell
```

A continuación vamos a escribir una serie de **NPM scripts** en el fichero `package.json` para ayudarnos con la ejecución de ciertas tareas:

```js
"scripts": {
    "create": "touch ./server/public/app.js",
    "build": "browserify -t babelify -t uglifyify ./app/app.js -o ./server/public/app.js",
    "watch": "watchify -t babelify ./app/app.js -o ./server/public/app.js --debug",
    "postinstall": "npm run create && npm run build",
    "dev": "nodemon ./server/index.js",
    "serve": "parallelshell 'npm run dev' 'npm run watch'"
  },
```

- `npm run create`: Genera un fichero `app.js` vacío donde estará la versión transpilada y empaquetizada de nuestra app.

- `npm run build`: Genera el fichero final resultante de todos los ficheros JS de nuestra app. Le aplicamos la transformación **babelify** que nos permite utilizar babel en conjunto con **Browserify**, de esta manera en lugar de usar `require` para importar los módulos, podemos usar la forma de ES6/ES2015.

- `npm run watch`: Ejecuta el mismo comando que `build` pero empleando **Watchify**. Que es como Browserify, pero en lugar de crear el bundle de nuevo de todo el proyecto, solo se preocupa de los cambios, lo que nos permite crear bundles más rápidos para desarrollo.
  `postinstall`: Este comando se ejecutará después de realizar `npm install` y genera el fichero build final.

- `npm run dev`: ejecuta el servidor Node/Express básico que ahora implementaremos, de manera que se reinicie a cada cambio que hagamos.

- `npm run serve`: Gracias a **parallelshell** podemos ejecutar en paralelo varios comandos, en este caso el servidor de desarrollo con `npm run dev` y el `watch` de los cambios de la parte frontend.

Y por último, sólo nos queda que Babel ejecute los plugins que queremos, para ello creamos un fichero `.babelrc` en el directorio raíz del proyecto con el siguiente contenido:

```js
{
  "presets": ["es2015"]
}
```

De esta manera le indicamos que utilice el **preset de plugins de ES2015/ES6**.

## Servidor Node/Express.

Creamos un servidor web muy sencillo con **Node.js y Express** que tendrá una parte de ficheros estáticos donde estará el `index.html` de nuestra SPA y el fichero `.js` que genera Browserify.

También tendrá 3 rutas, 2 de ellas de nuestro _pseudo-API_ y una para servir el index.html. Aquí va el código:

```js
// server/index.js
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

/** Express configuration */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

/** API routes */
// Muestra todos los speakers.
app.get("/api/speakers", (req, res) => {
  res.sendFile(path.join(__dirname, "db", "speakers.json"));
});

// Muestra info de un único speaker.
app.get("/api/speakers/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "db", `${req.params.id}.json`));
});

// envía el index.html para la SPA.
app.get("*", (req, res, next) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    next();
  }
});

/** Inicia el servidor */
app.listen(3000, () => console.log("Express running on port 3000"));
```

En `server/db/` tengo varios ficheros `.json` que simulan una base de datos. Todo este código lo tienes en el [repositorio de éste proyecto]().

Y en `server/public/index.html` este es el documento:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AngularCamp</title>
  </head>
  <body>
    <ac-app></ac-app>
    <script type="text/javascript" src="app.js"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </body>
</html>
```

Donde `<ac-app></ac-app>` es nuestro componente raíz donde se encuentra toda la lógica de nuestra SPA AngularjS.

## Componente Raíz.

El componente principal de nuestra aplicación, o componente raíz será el **AppComponent** y su representación en html será `<ac-app></ac-app>`. Donde `ac` significaría AngularCamp.

La nueva función `component()` de Angular 1.5 sigue la siguiente sintaxis:

```js
angular.component("nombreComponente", {
  bindings: {},
  controller: function MiControlador() {},
  template: `<html></html>`,
});
```

- `bindings`: Sustitiuye a `scope` y `bindToController` del método `.directive()`

- `controller`: define el controlador del componente si lo tiene, esto es igual que en `.directive`.

- `template`: Lo mismo, puedes usar `templateUrl` si quieres usar un fichero `.html` para definir la plantilla o simplemente `template` para escribirla directamente.

Si quieres ampliar la información, [Todd Motto tiene un artículo](https://toddmotto.com/exploring-the-angular-1-5-component-method/) dónde explica los cambios con respecto al método `.directive()`

Por tanto, nuestro **AppComponent** lo vamos a tener en el fichero `/app/app.component.js` y después lo importaremos vía módulos de ES6/ES2015

```js
// /app/app.component.js
export const AppComponent = {
  template: `
    <ac-header></ac-header>
    <div ui-view></div>
    <ac-footer></ac-footer>
  `,
};
```

Simplemente es un template con un `div` que contiene el `ui-view` donde se insertarán las vistas y un par de componentes comunes que representan la cabecera y el footer: `<ac-header>` y `<ac-footer>`.

Este objeto lo importamos en `app.js` donde definimos el inicio de nuestra aplicación AngularJS:

```js
// /app/app.js
import angular from "angular";
import uiRouter from "angular-ui-router";

import common from "./common/common";
import components from "./components/components";
import { AppComponent } from "./app.component";

const root = angular
  .module("angularCamp", [uiRouter, common, components])
  .component("acApp", AppComponent);

document.addEventListener("DOMContentLoaded", () =>
  angular.bootstrap(document, ["angularCamp"])
);

export default root;
```

importamos `angular` y `angular-ui-router` además de unos módulos que ahora crearemos: `common` y `components` y el fichero que acabamos de crear `app.component.js`.

Iniciamos la aplicación por medio de `bootstrap` (No confundir con el framework de CSS) y listo.

## Componentes Common

Siguiendo la [guía de estilo de Todd Motto](https://github.com/toddmotto/angular-styleguide#common-module) es una buena práctica separar los componentes que podrían ser reutilizables de los componentes propios de la aplicación. Por tanto en `commons` vamos a tener el header y el footer, que siguen una estructura similar al _AppComponent_:

```js
// /app/common/footer/footer.component.js
export const FooterComponent = {
  template: `
    <footer class="page-footer blue-grey darken-2">
      <div class="footer-copyright blue-grey darken-1">
        <div class="container">
          © 2016 Carlos Azaustre.
        </div>
      </div>
    </footer>
  `,
};
```

```js
// /app/common/header/header.component.js
export const HeaderComponent = {
  template: `
    <nav>
      <div class="nav-wrapper red darken-4">
        <a href="#" class="brand-logo center">AngularCamp 2016</a>
      </div>
    </nav>
  `,
};
```

```js
// /app/common/common.js
import angular from "angular";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

const common = angular
  .module("app.common", [])
  .component("acHeader", HeaderComponent)
  .component("acFooter", FooterComponent).name;

export default common;
```

> Al crear el módulo, usamos la función `.name` Esto nos permite que al exportar el fichero via ES6, se exporte el nombre del módulo y así cuando se inyecta en un `angular.module` no de problemas

## SpeakerService

A continuación vamos a crear un servicio que se encargará de realizar las peticiones al API. Con ES6 vamos a implementarlo como una clase.

En el constructor inyectaremos la dependencia de la directiva `$http` y tendremos dos métodos o funciones: `getSpeakers` que devuelve todos y `getSpeaker(id)` que devuelve uno sólo:

```js
// /app/components/speaker/speaker.service.js
class SpeakerService {
  constructor($http) {
    this.$http = $http;
  }

  getSpeakers() {
    return this.$http.get("/api/speakers").then((response) => response.data);
  }

  getSpeaker(id) {
    return this.$http
      .get(`/api/speakers/${id}`)
      .then((response) => response.data);
  }
}

SpeakerService.$inject = ["$http"];

export default SpeakerService;
```

## SpeakerList Component

El primer componente específico de nuestra aplicación será el **SpeakerList** cuya función será representar en forma de lista los speakers que recibe del API. Veamos como:

```js
// /app/components/speaker/speaker-list/speaker-list.component.js
import controller from "./speaker-list.controller";

export const SpeakerListComponent = {
  bindings: {
    speakers: "<",
  },
  controller,
  template: `
    <ul class="collection">
      <speaker-item ng-repeat="speaker in $ctrl.speakers" data="speaker">
      </speaker-item>
    </ul>
  `,
};
```

Importamos el controlador que ahora veremos y nos aprovechamos de la forma abreviada de asignación de propiedades de ES6.

En `bindings` tendremos el objeto `speakers` que utilizaremos en el controlador que contiene el array de speakers, y con la notación `<` le indicamos que utilice _one-way data binding_.

Por último el `template` no es más que una lista donde por medio de la directiva `ng-repeat` repetimos un nuevo componente `<speaker-item>` por cada `speaker` que haya en `$ctrl.speakers` (Siendo `$ctrl` el alias de nuestro controlador) y le pasamos el objeto a la propiedad `data` del nuevo componente.

Para el **controlador** tendremos el siguiente fichero, que definimos como una clase de ES6:

```js
// /app/components/speaker/speaker-list/speaker-list.controller.js
class SpeakerListController {
  constructor(SpeakerService) {
    this.speakerService = SpeakerService;
    this.speakers = [];
    this.loadData;
  }

  loadData() {
    this.speakerService.getSpeakers();
    then((response) => {
      this.speakers = response.data;
    });
  }
}

SpeakerListController.$inject = ["SpeakerService"];

export default SpeakerListController;
```

## SpeakerItem Component

Este componente representa cada uno de los speakers en la lista. Tiene una propiedad `data` por donde recibe el objeto con la info del speaker que le envía el componente padre, _SpeakerList_. Este es su código:

```js
// /app/components/speaker/speaker-item/speaker-item.component.js
import controller from "./speaker-item.controller";

export const SpeakerItemComponent = {
  bindings: {
    data: "<",
  },
  template: `
    <li class="collection-item avatar" style="border-bottom: 1px solid #cccccc;">
      <img class="circle" width="96px" ng-src="{{$ctrl.data.photo}}" alt="{{$ctrl.data.name}}" />
      <span class="title">{{$ctrl.data.name}}</span>
      <p><a ng-href="#/speakers/{{$ctrl.data.id}}">{{$ctrl.data.talk}}</a></p>
    </li>
  `,
};
```

En este caso no nos hace falta controlador, ya que los datos le llegan del componente padre a través del _binding_ de `data`. Es lo que se conoce como un componente sin estado (_stateless_) ya que solo representa información sin realizar ninguna llamada externa para obtener datos.

## SpeakerDetail Component

El siguiente y último componente que tendremos para esta sencilla app, será el que representan la vista detalle del speaker.

```js
// /app/components/speaker/speaker-detail/speaker-detail.component.js

export const SpeakerDetailComponent = {
  bindings: {
    speaker: "<",
  },
  template: `
    <article class="card">
      <figure class="card-image">
        <img width="250px" src="{{$ctrl.speaker.photo}}" alt="{{$ctrl.speaker.name}}" />
        <span ng-click="$ctrl.onClick();" class="card-title">{{$ctrl.speaker.name}}</span>
      </figure>
      <section class="card-content">
        <h5>{{$ctrl.speaker.talk}}</h5>
        <p>{{$ctrl.speaker.description}}</p>
      </section>
      <aside class="card-action">
        <a href="#">{{$ctrl.speaker.complexity}}</a>
      </aside>
    </article>
  `,
};
```

En el objeto `speaker` de los `bindings` estará la información del speaker, y en lugar de realizar la llamada al servicio desde el controlador para obtener los datos, lo vamos a hacer desde la configuración de las rutas.

De esta manera nuestro controller es más ligero y en el caso de que ese sea el único cometido, nos ahorramos tener un controlador.

Lo vemos en el siguiente fichero

## Módulo Speaker.

Vamos a crear un módulo que defina todos los componentes vistos: `speaker-list`, `speaker-item` y `speaker-detail` además enlazaremos el servicio `speaker-service` y realizaremos la configuración de rutas:

```js
// /app/components/speaker/index.js
import angular from "angular";

import { SpeakerItemComponent } from "./speaker-item/speaker-item.component";
import { SpeakerListComponent } from "./speaker-list/speaker-list.component";
import { SpeakerDetailComponent } from "./speaker-detail/speaker-detail.component";
import SpeakerService from "./speaker.service";

const speaker = angular
  .module("speakers", [])
  .service("SpeakerService", SpeakerService)
  .component("speakerItem", SpeakerItemComponent)
  .component("speakerList", SpeakerListComponent)
  .component("speakerDetail", SpeakerDetailComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state("speakers", {
        url: "/",
        component: "speakerList",
      })
      .state("speaker", {
        url: "/speakers/:id",
        component: "speakerDetail",
        resolve: {
          speaker: (SpeakerService, $stateParams) =>
            SpeakerService.getSpeaker($stateParams.id),
        },
      });
    $urlRouterProvider.otherwise("/");
  }).name;

export default speaker;
```

Como puedes ver, en el estado `speaker` correspondiente a la vista detalle, tenemos una propiedad `resolve` donde obtenemos los datos antes de cargar la vista. Utilizando funciones arrow de ES6.

De esta manera podemos hacer lo mismo para el otro estado y ahorrarnos el controller.

Vamos a refactorizar. Modificamos el estado `speakers` añadiendo el `resolve`:

```js
$stateProvider.state("speakers", {
  url: "/",
  component: "speakerList",
  resolve: {
    speakers: (SpeakerService) => SpeakerService.getSpeakers(),
  },
});
```

Como puedes ver gracias a las _arrow functions_ de ES6 el código se simplifica mucho, con ES5 sería así:

```js
$stateProvider
      .state('speakers', {
        url: '/',
        component: 'speakerList',
        resolve: {
          speakers: function(SpeakerService) {
             return SpeakerService.getSpeakers()
          }
      })
```

De esta forma podemos eliminar el controlador `speaker-list.controller.js` ya que su contenido sería este:

```js
class SpeakerController {
  constructor() {}
}
export default SpeakerController;
```

## Módulo Components

Como ya tenemos nuestros componentes implementados, procedemos a crear un módulo de angular que recoja todos ellos:

```js
// /app/components/components.js
import angular from "angular";

import speaker from "./speaker";

const components = angular.module("app.components", [speaker]).name;

export default components;
```

En este caso sólo tenemos un módulo: `speaker`, pero si tuvieramos más u otros componentes los inyectaríamos aquí.

## Ejecutando la aplicación.

Ya no nos queda más que ejecutar y probar la aplicación. Si has tenido la tarea `npm run serve` corriendo habrás visto que los cambios se han ido ejecutando. Para prevenir cualquier error, paramos la tarea y corremos las siguientes en la terminal:

```shell
$ npm run build
$ npm run serve
```

Si abrimos un navegador con la url `http://localhost:3000` tendremos lo siguiente:

![Angular 1.5 + ES6/ES2015](/images/desarrollo-por-componentes-con-angular-1-5-con-es6-es2015/ezgif-1440086715.gif)

Espero que hayas aprendido algo nuevo y útil :). En un próximo artículo, veremos como añadir más funcionalidades por medio de eventos.

Recuerda que tienes el código de este tutorial en el [siguiente repositorio de GitHub](https://github.com/carlosazaustre/angularcamp-workshop).
