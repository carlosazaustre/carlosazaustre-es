---
title: Cómo pasar variables como atributos en directivas de AngularJS
date: '2015-06-15'
url: >-
  https://carlosazaustre.es/blog/como-pasar-variables-como-atributos-en-directivas-de-angularjs
tags:
  - angular
  - javascript
  - tutorial
related:
  - angular-js-directivas-como-componentes
  - formas-de-comunicar-componentes-en-angularjs-1-x
  - desarrollo-por-componentes-con-angular-1-5-con-es6-es2015
---

# Cómo pasar variables como atributos en directivas de AngularJS

> Publicado el 2015-06-15 — https://carlosazaustre.es/blog/como-pasar-variables-como-atributos-en-directivas-de-angularjs

Las directivas de Angular sirven para encapsular código HTML de manera que nuestras aplicaciones puedan tener elementos reutilizables, también conocidos como componentes.

Cuando Angular apareció fue algo muy novedoso, aunque hoy en día podemos utilizar los _Web Components_ y la librería _Polymer_ para tener algo parecido y de forma nativa de HTML5.

Una de las cosas que suele ser algo complicada de implementar es cuando en nuestra directiva colocamos un atributo y queremos que ese atributo se utilice en el HTML _interior_ de la directiva, y además que ese atributo que pasamos sea una variable dinámica que cambiará según la vista o estado en el que nos encontremos.

En este artículo vamos a ver como hacerlo con un pequeño ejemplo.

Imaginemos que queremos implementar una directiva que sea una caja de búsqueda. Y lo queremos programar como directiva porque lo vamos a usar en más partes de nuestra aplicación y ese es su objetivo, que las directivas sean reutilizables. Queremos que sea algo así:

```html
<search-bar busqueda=""></search-bar>
```

Esta directiva tendrá el siguiente código HTML por debajo:

```html
<div class="form-group">
  <input
    type="text"
    class="form-control"
    placeholder="Introduce tu texto a buscar"
    value=""
  />
</div>
```

¿Cómo hacemos para pasar el contenido del atributo `busqueda` al atributo `value` del `input` dentro de nuestra directiva? Veamos el código _JavaScript_ de la directiva, suponiendo que pertenezca a un módulo `myApp`.

```javascript
(function () {
  "use strict";

  angular.module("myApp").directive("searchBar", searchBar);

  function searchBar() {
    return {
      restrict: "E",
      scope: {
        busqueda: "@",
      },
      template:
        '<div class="form-group">' +
        '<input type="text" ' +
        'class="form-control"' +
        'placeholder="Introduce tu texto a buscar"' +
        "value={{busqueda}}" +
        "</div>",
    };
  }
})();
```

Veamos que hemos hecho aquí. Hemos pasado el contenido de la directiva como un _string_ al atributo `template`. Si el HTML es muy grande, podemos tenerlo separado en un archivo HTML y pasarle la ruta de ese archivo en el atributo `templateUrl`

En la plantilla hemos indicado que el `value` del `input` sea `value={{busqueda}}`. Es decir, le pasamos como variable el contenido del atributo `busqueda` de la directiva.

Para poder hacer esto, y tambien, si el contenido que pasamos no es fijo, si no que viene de una variable, tipo:

```html
<search-bar busqueda="{{textoBusqueda}}"></search-bar>
```

necesitamos indicarle a la directiva que tiene un _scope_ propio y cuales son los atributos de ese _scope_:

```javascript
scope: {
  busqueda: "@";
}
```

Indicándole `@` le estamos diciendo de manera unidireccional que el valor del atributo `busqueda` se copie e la propiedad `{{busqueda}}` del _scope_ de la directiva.

Usar `@` tiene un problema, al ser unidireccional, si queremos cambiar el valor de la propiedad `busqueda` del _scope_ de la directiva, no se cambia la propiedad en el controlador que estemos utilizando, y nos obloga a usar siempre la doble llave `{{ }}` si queremos enlazar la propiedad al controlador.

Para solucionar esto, podemos usar el caracter `=` que indica que la propiedad `busqueda` del _scope_ de la directiva sea exactamente la propiedad del _scope_ del controlador que estemos utilizando y tenga un atributo búsqueda.

Con estos cambios quedaría así la definición:

```javascript
(function () {
  "use strict";

  angular.module("myApp").directive("searchBar", searchBar);

  function searchBar() {
    return {
      restrict: "E",
      scope: {
        busqueda: "=",
      },
      template:
        '<div class="form-group">' +
        '<input type="text" ' +
        'class="form-control"' +
        'placeholder="Introduce tu texto a buscar"' +
        "value={{busqueda}}" +
        "</div>",
    };
  }
})();
```

y podríamos usar la directiva así:

```html
<search-bar busqueda="textoBusqueda"></search-bar>
```

Siendo `textoBusqueda` una propiedad del _scope_ donde se llama a la directiva.
