---
title: 3 formas de comunicar componentes en AngularJS 1.x
date: '2016-01-27'
url: >-
  https://carlosazaustre.es/blog/formas-de-comunicar-componentes-en-angularjs-1-x
tags:
  - angular
  - tutorial
---

# 3 formas de comunicar componentes en AngularJS 1.x

> Publicado el 2016-01-27 — https://carlosazaustre.es/blog/formas-de-comunicar-componentes-en-angularjs-1-x

> Este es un post invitado escrito por <a href="https://twitter.com/erixdev">Emilio Grande</a>, autor del blog <a href="https://jsjutsu.com/blog/">JSJutsu</a> el cuál te invito a leer.

Emilio hace un buen resumen sobre las 3 principales maneras que existen en AngularJS 1.x para comunicar componentes (o directivas hasta la versión 1.4).

## Introducción

Dentro de las necesidades más habituales en una aplicación [AngularJS](https://angularjs.org/) está la de **comunicar diferentes componentes**.

En AngularJS podemos hacer esto de diferentes formas, y conviene conocerlas para saber cuál aplicar en cada caso.

**Una buena aplicación JavaScript está [dividida en componentes](/angular-js-directivas-como-componentes/)** y es importante saber cómo relacionarlos de la forma más limpia posible.

Vamos a ver cómo comunicar los componentes rojo y azul del siguiente ejemplo:

```html
<div ng-app="myApp">
  <div class="controllerOne" ng-controller="controllerOne as c1">
    <!-- Componente Rojo -->
    <div class="controllerTwo" ng-controller="controllerTwo as c2">
      <input type="text" />
      <button>Send Event</button>
    </div>
    <!-- /Componente Rojo -->

    <!-- Componente Azul -->
    <div class="controllerThree" ng-controller="controllerThree as c3">
      <div>Nothing here...</div>
    </div>
    <!-- /Componente Azul -->
  </div>
</div>
```

![Aplicación Base](/images/formas-de-comunicar-componentes-en-angularjs-1-x/comm_ang_ejemploBase.png)

En este caso los componentes están encapsulados en _controladores_, pero podrían ser directivas perfectamente.

## Forma 1: a través del _scope_

La **forma más sencilla** y más utilizada para comunicar componentes **es usando el _scope_**.

Consiste en utilizar el **_scope_ común a los componentes más próximo**.

En AngularJS 1x, cada componente tiene su propio _scope_. El _scope_ **hereda en forma de árbol desde el _scope_ raíz de la aplicación, que es _$rootScope_**.

En concreto, en este ejemplo es así:

![Herencia $scope](/images/formas-de-comunicar-componentes-en-angularjs-1-x/comm_ang_herenciaScope.png)

Por tanto, en este caso podemos comunicar C2 (Rojo) y C3 (Azul), a través del componente C1. Veamos cómo:

```html
<div ng-app="myApp">
  <div class="controllerOne" ng-controller="controllerOne as c1">
    <!-- Componente Rojo -->
    <div class="controllerTwo" ng-controller="controllerTwo as c2">
      <input type="text" ng-model="c1.message" />
      <button ng-click="c1.sendEvent()">Send Event</button>
    </div>
    <!-- /Componente Rojo -->

    <!-- Componente Azul -->
    <div class="controllerThree" ng-controller="controllerThree as c3">
      <div>{{ c1.data }}</div>
    </div>
    <!-- /Componente Azul -->
  </div>
</div>
```

```javascript
controller("controllerOne", function () {
  var vm = this;
  vm.data = "Nothing here...";
  vm.sendEvent = function () {
    vm.data = vm.message;
  };
});
```

Lo que hemos hecho aquí es simplemente utilizar el _scope_ del componente padre (C1), al que tienen acceso los componentes hijos (C2 y C3).

![Comunicando con $scope](https://carlosazaustre.es/blog/content/images/2016/01/comm_ang_forma1.png)

### Ventajas e inconvenientes

Usar el _scope_ es **lo más simple y lo que menos código requiere**.

El problema es que en una **aplicación grande los _scopes_ compartidos pueden rápidamente volverse inmanejables y establecer un grado de acoplamiento muy alto**, lo cual no es deseable.

## Forma 2: a través de eventos

AngularJS 1.x proporciona un [sistema de eventos](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$on) muy útil al que se accede mediante los **métodos _$broadcast_, _$on_ y _$emit_**.

Lo que haremos aquí es: **emitir eventos hacia abajo en el árbol** con _$broadcast_.

Veamos cómo.

```html
<div ng-app="myApp">
  <div class="controllerOne" ng-controller="controllerOne as c1">
    <!-- Componente Rojo -->
    <div class="controllerTwo" ng-controller="controllerTwo as c2">
      <input type="text" ng-model="c2.message" />
      <button ng-click="c2.sendEvent()">Send Event</button>
    </div>
    <!-- /Componente Rojo -->

    <!-- Componente Azul -->
    <div class="controllerThree" ng-controller="controllerThree as c3">
      <div>{{ c3.data }}</div>
    </div>
    <!-- /Componente Azul -->
  </div>
</div>
```

```javascript
.controller('controllerTwo', function($scope){
  var vm = this;
  vm.sendEvent = function() {
    $scope.$parent.$broadcast('msg', vm.message);
  };
})
.controller('controllerThree', function($scope){
  var vm = this;
  vm.data = 'Nothing here...';
  $scope.$on('msg', function(evt, msg){
    vm.data = msg;
  });
});

```

En este caso el componente C2 emite un evento de tipo 'msg', a través del componente C1. El componente C3 está escuchando los eventos 'msg', y al recibirlos ejecuta su función de _callback_.

![Comunicando con eventos](/images/formas-de-comunicar-componentes-en-angularjs-1-x/comm_ang_forma2.png)

### Ventajas e inconvenientes

Los eventos son útiles para **comunicar eventos específicos de componentes padres a hijos**.

En caso de tener que comunicar componentes a otro nivel y tener que recurrir a emit o scopes padres (como en el ejemplo), o incluso al $rootScope, una vez más en una aplicación grande podemos tener eventos que circulen por toda la aplicación. Esto no nos interesa.

## Forma 3: a través de un servicio

La forma más elaborada de comunicar componentes, y a la vez la más mantenible, es mediante **servicios intermedios requeridos por ambos componentes**.

Veamos el ejemplo.

```html
<div ng-app="myApp">
  <div class="controllerOne" ng-controller="controllerOne as c1">
    <!-- Componente Rojo -->
    <div class="controllerTwo" ng-controller="controllerTwo as c2">
      <input type="text" ng-model="c2.message" />
      <button ng-click="c2.sendEvent()">Send Event</button>
    </div>
    !-- /Componente Rojo --> !-- Componente Azul -->
    <div class="controllerThree" ng-controller="controllerThree as c3">
      <div>{{ c3.data() }}</div>
    </div>
    !-- /Componente Azul -->
  </div>
</div>
```

```javascript
.factory('utilityService', function() {
  return {
    message: 'Nothing here...',
    getMessage: function() {
      return this.message;
    },
    setMessage: function(msg) {
      this.message = msg;
    }
  };
})

.controller('controllerTwo', function(utilityService){
  var vm = this;
  vm.sendEvent = function() {
    utilityService.setMessage(vm.message);
  };
})

.controller('controllerThree', function(utilityService){
  var vm = this;
  vm.data = function(){
    return utilityService.getMessage();
  }
});

```

Con esta última forma, hemos creado un **servicio que inyectamos en ambos componentes**, y es el que se encarga de gestionar la información a compartir.

![Comunicando con servicios](/images/formas-de-comunicar-componentes-en-angularjs-1-x/comm_ang_forma3.png)

### Ventajas e inconvenientes

Los **servicios son la mejor manera de comunicar las diferentes piezas de nuestro puzzle** y pueden ser requeridos en cualquier sitio que se precise de la aplicación.

La desventaja, que requieren de más código para prepararlos y en situaciones simples puede ser _"matar moscas a cañonazos"_.

## Conclusión

AngularJS es muy flexible y nos permite compartir y comunicar las diferentes piezas de nuestra aplicación de forma organizada y controlable.

Como sabes por éste blog, [Angular 2 y sus componentes](/angular-2-rutas-y-componentes/) cambian la forma de trabajar totalmente, pero la idea es la misma: partir la aplicación en componentes.

Además a Angular 1 todavía le queda mucho recorrido por delante :)
