---
title: "Tutorial de AngularJS. Ejemplo de Aplicación web con AngularJS y Routing"
date: "2014-01-20"
url: "https://carlosazaustre.es/blog/tutorial-aplicacion-web-con-angularjs-y-routing"
tags: []
---

# Tutorial de AngularJS. Ejemplo de Aplicación web con AngularJS y Routing

> Publicado el 2014-01-20 — https://carlosazaustre.es/blog/tutorial-aplicacion-web-con-angularjs-y-routing

Hace unos días vimos [como crear una simple page application con Angular JS partiendo de una API Rest con Node](/tutorial-ejemplo-de-aplicacion-web-con-angular-js-y-api-rest-con-node/). hoy vamos a ver otro ejemplo de aplicación web con AngularJS pero en lugar de usar llamadas HTTP vamos a ver como tratar rutas y plantillas dentro de la parte _frontend_ sin recargar la página.

![Angular JS tutorial](/images/tutorial-aplicacion-web-con-angularjs-y-routing/square-300x3001_scxhwx.png)

Lo primero, al igual que la otra vez, veamos cual será la estructura de archivos de la aplicación:

```shell
main.js
index.html
/pages
--- home.html
--- acerca.html
--- contacto.html
```

- **`main.js`** contiene el código JavaScript de la aplicación, aquí manejaremos las rutas y los controladores
- **`index.html`** es la página principal donde inyectaremos las vistas
- **`pages`** es un directorio donde estarán las plantillas que serán inyectadas en index.html como vistas

Veamos que tenemos que poner en `main.js`

```js
// Creación del módulo
var angularRoutingApp = angular.module("angularRoutingApp", ["ngRoute"]);

// Configuración de las rutas
angularRoutingApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "pages/home.html",
      controller: "mainController",
    })
    .when("/acerca", {
      templateUrl: "pages/acerca.html",
      controller: "aboutController",
    })
    .when("/contacto", {
      templateUrl: "pages/contacto.html",
      controller: "contactController",
    })
    .otherwise({
      redirectTo: "/",
    });
});

angularRoutingApp.controller("mainController", function ($scope) {
  $scope.message = "Hola, Mundo!";
});

angularRoutingApp.controller("aboutController", function ($scope) {
  $scope.message = 'Esta es la página "Acerca de"';
});

angularRoutingApp.controller("contactController", function ($scope) {
  $scope.message =
    'Esta es la página de "Contacto", aquí podemos poner un formulario';
});
```

Expliquemos cada parte, primero creamos el modulo que es el que engloba los controladores, rutas y demás configuraciones, en este caso lo hemos llamado `angularRoutingApp`. Después hemos creado las rutas con la directiva `$routeProvider`, pero atención, para que esto funcione, debemos pasarle el módulo **`ngRoute`** a nuestro módulo para que lo entienda y añadir la librería **`angular-route.js`** (o `angular-route.min.js`) ya que la librería estándar de Angular no controla las rutas.

Con esto ya podemos crear rutas que como podéis ver se llaman con el método `when` al que pasamos la URL en si, la plantilla que se ha de cargar y el controlador que manejará el comportamiento de ese pedazo de la aplicación.

Después hemos añadido los controladores en los que únicamente ponemos un mensaje dentro del ámbito del controlador que será diferente para cada página que se cargue.

Ahora pasemos a ver el `index.html`

```html
<!-- index.html -->
<html ng-app="angularRoutingApp">
  <head>
    <link
      rel="stylesheet"
      href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
    />
  </head>
  <body ng-controller="mainController">
    <header>
      <h1>Angular Routing</h1>
      <nav>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#acerca">Acerca de</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
    <div id="main">
      <!-- Aquí inyectamos las vistas -->
      <div ng-view></div>
    </div>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.7/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.3/angular-route.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```

Al igual que el anterior ejemplo, indicamos a todo el HTML que utilizaremos la aplicación `angularRoutingApp` con la directiva **`ng-app`**, los controladores con **`ng-controller`** en el body y lo más importante, la directiva **`ng-view`** es donde indicamos en que parte del HTML vamos a inyectar las vistas.

Por último nos quedan las plantillas que no son más que unas sencillas lineas de HTML que usamos para inyectar contenido. Estas son las 3 que hemos creado para el ejemplo:

```html
<div class="jumbotron text-center">
  <h1>Acerca De</h1>
  <p>{{ message }}</p>
</div>

<div class="jumbotron text-center">
  <h1>Contacto</h1>
  <p>{{ message }}</p>
</div>

<div class="jumbotron text-center">
  <h1>Página Principal</h1>
  <p>{{ message }}</p>
</div>
```

Todas tienen la variable `message` cuyo valor es diferente en cada una debido a los controladores que hemos escrito en **`main.js`**

Y con esto ya tenemos una sencilla aplicación web con rutas que no refresca la página con cada enlace. Muy diferente a aquellos tiempos oscuros cuando se usaba _PHP Include_ o Iframes para mostrar diferentes secciones.

![angularjsapprouting](/images/tutorial-aplicacion-web-con-angularjs-y-routing/Screen-Shot-2014-01-20-at-15_04_28_jzqdvq.png)

El código de este ejemplo esta disponible en el [siguiente repositorio de github](https://github.com/carlosazaustre/angular-routing).
