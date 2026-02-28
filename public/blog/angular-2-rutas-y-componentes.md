---
title: 'Angular 2: Rutas y Componentes'
date: '2015-11-11'
url: 'https://carlosazaustre.es/blog/angular-2-rutas-y-componentes'
tags: []
excerpt: >-
  Aprende a implementar rutas basadas en componentes en Angular 2. Tutorial con
  RouteConfig, ROUTER_DIRECTIVES y HashLocationStrategy paso a paso.
---

# Angular 2: Rutas y Componentes

> Publicado el 2015-11-11 — https://carlosazaustre.es/blog/angular-2-rutas-y-componentes

Continuando con el tutorial pasado, donde vimos los [primeros pasos para trabajar con Angular 2](/angular-2-primeros-pasos/), en este artículo veremos cómo implementar rutas basadas en componentes.

Lo primero que necesitamos hacer es modificar el fichero `app.js` para añadirle la configuración de rutas. Vamos a importar los módulos correspondientes de `Angular2/Router`

```javascript
import {
  Router, RouteConfig, RouteParams,
  LocationStrategy, HashLocationStrategy,
  ROUTER_PROVIDERS, ROUTER_DIRECTIVES, ROUTER_PRIMARY_COMPONENT
} from 'angular2/router'; */
```

No necesitamos instalar una librería adicional, el módulo `router` va incluido en la librería de `angular2`, pero si necesitamos importar las directivas y componentes que vamos a emplear:

- **RouteConfig** Es un decorador que utilizaremos de la misma forma que `@Component` o `@View` para ayudarnos a configurar las rutas.

- **ROUTE_PROVIDERS** son una serie de directivas que utilizaremos a la hora de lanzar el `bootstrap` de nuestra App.

- **ROUTE_DIRECTIVES**, funciona de la misma manera, Contiene directivas como `RouterLink` y `RouterOutlet`. Las emplearemos en el `template` a la hora de _pintar_ los links.

- **ROUTE \_PRIMARY \_COMPONENT** Se utiliza para enlazar el componente de alto orden encargado del enrutado.

- **LocationStrategy** y **HashLocationStrategy** funcionan de manera similar al `LocationProvider` de Angular 1.x

El componente que se encargará del enrutado será el principal que creamos [en el artículo anterior](/angular-2-primeros-pasos/), el `<hello-app>`.

Para ello vamos a modificar la clase `HelloApp` cambiándole el `template` y añadiendo la configuración de rutas:

```javascript
@Component({
  selector: 'hello-app'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <ul>
      <li><a [router-link]="['/']">Home</a></li>
      <li><a [router-link]="['/About']">About</a></li>
    </ul>
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  { path: '/', component: HelloComponent, as: 'Hello' },
  { path: '/about, component: AboutComponent, as: 'About'}
])
class HelloApp {

}
```

¿Qué hemos hecho aquí?.

Hemos añadido al decorador `@View` el atributo `directives` y le hemos incluido `ROUTER_DIRECTIVES`. De esta forma en el template podemos usar `Router-Link` para crear enlaces con Angular 2 y la directiva `router-outlet` cuyo funcionamiento es similar al que tenía `ng-view` o `ui-view` en Angular 1.x.

En ese elemento se insertarán las vistas de la aplicación.

`@RouteConfig` por su parte, nos permite configurar las rutas en la nueva versión de Angular.

A través de un array de objetos indicamos las rutas, con un `path` para indicar la URL, `component` para indicar el componente asociado a esa vista o URL, y `as` que viene a funcionar como el antiguo `ControllerAs` de Angular 1.x

También cambia la función `bootstrap`. En el ejemplo anterior tan sólo le indicábamos la clase de arranque, pero ahora debemos pasarle las directivas que estamos utilizando:

```javascript
bootstrap(HelloApp, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(ROUTER_PRIMARY_COMPONENT, { useValue: HelloApp }),
]);
```

Le inyectamos `ROUTE_PROVIDERS` para que funcione todo el sistema de rutas.

Le proveemos `LocationStrategy` para el tema del hash en las rutas.

Por último `ROUTER_PRIMARY_COMPONENT` para indicar cual es el componente principal que se encarga del enrutado.

El fichero `app.js` completo es este:

```javascript
import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';
import 'babel-core/polyfill';

import {
  Component, View,
  provide, bootstrap
} from 'angular2/angular2';

import {
  Router, RouteConfig,
  LocationStrategy, HashLocationStrategy,
  ROUTER_PROVIDERS, ROUTER_DIRECTIVES, ROUTER_PRIMARY_COMPONENT
} from 'angular2/router';

import { HelloComponent } from './hello.component';
import { AboutComponent } from './about.component';

@Component({
  selector: 'hello-app'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <ul>
      <li><a [router-link]="['/']">Home</a></li>
      <li><a [router-link]="['/About']">About</a></li>
    </ul>
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  { path: '/', component: HelloComponent, as: 'Hello' },
  { path: '/about, component: AboutComponent, as: 'About'}
])
class HelloApp {

}

bootstrap(HelloApp, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(ROUTER_PRIMARY_COMPONENT, { useValue: HelloApp })
]);
```

## Usando parámetros de ruta

Para la ruta principal empleamos el componente que ya vimos [en el pasado tutorial](/angular-2-primeros-pasos/), pero para la URL `/about` vamos a emplear uno nuevo que será el fichero `about.component.js`:

Con este componente vamos a _jugar_ un poco más y para ello vamos a utilizar parámetros de ruta con `RouteParams`, para ello tendremos que modificar un poco `app.js`, pero antes vayamos con este componente:

```javascript
import { Component, View } from "angular2/angular2";
import { RouteParams } from "angular2/router";

@Component({
  selector: "about-component",
})
@View({
  template: "<p>{{ message }}</p>",
})
export class AboutComponent {
  constructor(routeParams: RouteParams) {
    this.message = `Hola, ${routeParams.get("nombre")}!`;
  }
}
```

¿Qué hemos hecho aquí?

Simplemente utilizamos la directiva `RouteParams` para obtener parámetros desde la URL que llama a este componente.

Ese parámetro lo llevará al mensaje que se _pinta_ en el HTML con `routeParams.get('nombre')` siendo `nombre` el parámetro que tenemos que definir en `app.js`, donde hemos configurado las rutas.

Volvemos a `app.js` y modificamos el `@RouteConfig` de ésta manera:

```javascript
@RouteConfig([
  { path: '/', component: HelloComponent, as: 'Hello' },
  { path: '/about/:nombre', component: AboutComponent, as: 'About'}
])
```

Y también el `template` dentro de `@View` para que las rutas que contienen parámetros funcionen correctamente:

```javascript
@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <ul>
      <li><a [router-link]="['/Hello']">Home</a></li>
      <li><a [router-link]="['/About', {nombre: 'Carlos'}]">About</a></li>
    </ul>
    <router-outlet></router-outlet>
  `
})
```

Le ponemos por defecto un valor de parámetro, en este caso `Carlos`

De esta manera, si vamos a la URL `http://localhost:8080` tendremos esto:

![Ejemplo 1](/images/angular-2-rutas-y-componentes/angular2-router-ejemplo-1.png)

Si pulsamos en el link `About` nos llevará a la URL `http://localhost:8080/about/carlos` y veremos esto:

![Ejemplo 2](/images/angular-2-rutas-y-componentes/angular2-router-ejemplo-2.png)

Y si por último cambiamos la URL por `http://localhost:8080/about/pepe` tendremos lo siguiente

![Ejemplo 3](/images/angular-2-rutas-y-componentes/angular2-router-ejemplo-3.png)
