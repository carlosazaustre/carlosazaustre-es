---
title: ¿Qué es AngularJS? Primeros pasos para aprenderlo
date: '2013-09-09'
url: 'https://carlosazaustre.es/blog/empezando-con-angular-js'
tags:
  - angular
  - javascript
  - web
  - tutorial
related:
  - tutorial-aplicacion-web-con-angularjs-y-routing
  - tutorial-ejemplo-de-aplicacion-web-con-angular-js-y-api-rest-con-node
  - autenticacion-con-token-en-angularjs
---

# ¿Qué es AngularJS? Primeros pasos para aprenderlo

> Publicado el 2013-09-09 — https://carlosazaustre.es/blog/empezando-con-angular-js

[AngularJS](http://angularjs.org) es un framework MVC de JavaScript para el Desarrollo Web Front End que permite crear aplicaciones <b>SPA</b> <i>Single-Page Applications</i>. Entra dentro de la familia de frameworks como <a href="http://backbonejs.org">BackboneJS</a> o <a href="http://backbonejs.org">EmberJS</a>.

Con tanta oferta de frameworks se nos hace difícil elegir cuál usar en nuestras aplicaciones, qué ventajas tienen unos frente a otros, etc. En esta entrada voy a comentar que hace a AngularJS diferente al resto y unos cuantos enlaces a recursos online donde aprender a usar este framework y coger soltura. Allá vamos.

☝️**ACTUALIZACIÓN**: [Nueva entrada en el blog con un sencillo tutorial de **cómo crear una aplicación web con Angular JS y una API REST en Node**](/tutorial-ejemplo-de-aplicacion-web-con-angular-js-y-api-rest-con-node/).

Anteriormente en la parte Front-End de las aplicaciones web sólo teníamos a jQuery (además de otras librerías parecidas como Mootools, Prototype,…) para ayudarnos con el código JavaScript del cliente. Podíamos manipular el DOM de una forma más sencilla, añadir efectos, llamadas AJAX, etc… pero no teníamos un patrón a seguir. Todo el código JS iba en funciones que íbamos creando según necesitáramos, lo que provocaba que con el tiempo el código fuera difícilmente manejable y se convirtiese en el temido _Spaguetti Code_.

Por suerte surgieron frameworks que implementaban el patrón MVC (Modelo, Vista, Controlador) y nos ayudaban a separar conceptos. El más conocido es BackboneJS, que surgió en 2010 creada por **Jeremy Ashkenas** (Creador también de [CoffeeScript](http://coffeescript.org)) y depende de otras 2 librerías: jQuery y Underscore.js Es usado por múltiples Start-ups como [Pinterest](http://pinterest.com), [Foursquare](http://foursquare.com), [AirBnB](http://airbnb.com), [Trello](http://trello.com), etc…

BackboneJS te permite crear tu app rápidamente aunque en ocasiones es complicado de utilizar. La mayoría de los desarrolladores eligen BackboneJS porque parece la opción más segura, lleva más tiempo entre nosotros, hay mucha documentación sobre él y está mantenido por una gran comunidad.

![](https://carlosazaustre.es/blog/content/images/2015/02/square_odd9l7.png)

Sin embargo AngularJS está pisando fuerte. Aunque su primera versión es de 2009, se ha hecho muy popular a finales de 2012 y ahora en 2013 está en pleno auge. Tanto que ya se habla de una nueva _technology stack_ como antes era **LAMP** (**L**inux + **A**pache + **M**ySQL + **P**HP) ahora la tendencia es **[MEAN](http://www.mean.io/)** (**M**ongoDB/**M**ongoose + **E**xpressJS + **A**ngularJS + **N**odeJS), lo que también se traduce a aplicaciones _JavaScript End-to-End_. AngularJS está mantenido por Google y bastante comunidad. También como punto a su favor está lo sencillo que crear Tests unitarios y _End-to-End_ con [Jasmine](http://pivotal.github.io/jasmine/) y [Karma](http://karma-runner.github.io/0.10/index.html), algo que suele ser un poco costoso al principio.

Este es un ejemplo de como se implementa el patrón MVC en AngularJS:

```javascript
//Model: Objetos JavaScript
$scope.files = ["foo", "bar", "baz"];
```

```html
<!-- View: HTML -->
<div ng-repeat="f in files"></div>
```

```javascript
//Controller: Código Javascript
function addFile(fileName) {
  $scope.files.push(fileName);
}
```

lo que da como resultado:

```shell
foo
bar
baz
```

AngularJS permite extender el vocabulario HTML con directivas y atributos, manteniendo la semántica y sin necesidad de emplear librerías externas como [jQuery](http://jquery.com) o [Underscore.js](http://underscorejs.org) para que funcione. Para aprender a utilizar este framework en poco tiempo os recomiendo sigáis estos pasos que [Joel Hooks cita en su blog](http://joelhooks.com/blog/2013/08/03/learn-angularjs-in-a-weekend/):

### 1. [Tutorial oficial de AngularJS](http://docs.angularjs.org/tutorial)

Google ha puesto a disposición de nosotros en la página oficial del proyecto un [tutorial paso a paso](http://docs.angularjs.org/tutorial) a través de una sencilla aplicación web (Un catálogo de Smartphones) que nos sirve para entender lo básico y el vocabulario. La única contra de este material es que utiliza como plantilla el proyecto _[angular-seed](https://github.com/angular/angular-seed)_ que aunque es bueno para aprender, no es recomendable para un proyecto real que necesite escalar. Aun así, empezar por aquí es un buen paso.

### 2. Video-Tutoriales de [Egghead.io.](http://egghead.io)

Una vez completado el tutorial el siguiente paso es echar un vistazo a los videos de [John Lindquist, un experto desarrollador en AngularJS](http://egghead.io). Son vídeos cortos, de no más de 8 minutos cada uno, en los que entra en detalle en los conceptos mÃ¡s difíciles de AngularJS. Aunque no entiendas todo de primeras no importa, ten estos vídeos presente para más adelante.

### 3. Un vistazo a una [Aplicación AngularJS real](https://github.com/angular-app/angular-app)

Ahora es momento de ver las “tripas” de una aplicación AngularJS que funciona en el mundo real. El mejor ejemplo es el código que desarrollaron **Peter Bacon Darwin** y **Pawel Kozlowsk**i para el libro [_Mastering Web Application with AngularJS_](http://www.packtpub.com/angularjs-web-application-development/book). El [código fuente está disponible en GitHub](https://github.com/angular-app/angular-app) y podemos ver la estructura de directorios, el uso de módulos, testing, comunicación con un API RESTful en el Back-End, seguridad, etc. Es una aplicación 100% MEAN !:)

### 4. Crea tu primera aplicación con [Ng-Boilerplate.](https://github.com/joshdmiller/ng-boilerplate)

Llegados a este punto ya deberíamos tener bastantes conocimientos para construir una aplicación con AngularJS. Para ello podemos utilizar el proyecto [ng-boilerplate](https://github.com/joshdmiller/ng-boilerplate) el cual es una buena base para empezar a desarrollar una aplicación vÃ¡lida para un entorno de producción al contrario que [angular-seed ](https://github.com/angular/angular-seed) el cual solo es válido para aprender la tecnología.

Si consigues llegar hasta aquí, tendrás un buen conocimiento del desarrollo de aplicaciones web usando AngularJS, yo me encuentro ahora mismo entre la 2ª y 3ª etapa y voy viendo los avances, por lo tanto recomiendo seguir estos pasos si estás interesado en este nuevo framework, el cuál creo que en poco tiempo pasará a ser bastante más usado que Backbone.
