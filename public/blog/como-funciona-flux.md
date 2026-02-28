---
title: ¿Qué es Flux? Entendiendo su arquitectura
date: '2018-05-25'
url: 'https://carlosazaustre.es/blog/como-funciona-flux'
tags:
  - javascript
  - react
  - arquitectura
related:
  - como-funciona-redux-conceptos-basicos
  - empezando-con-react-js-y-ecmascript-6
  - ejemplo-de-aplicacion-con-react-js-en-ecmascript-6
---

# ¿Qué es Flux? Entendiendo su arquitectura

> Publicado el 2018-05-25 — https://carlosazaustre.es/blog/como-funciona-flux

Como suele pasar en el desarrollo Front-End de los últimos años, [existe un gran número de librerías, frameworks](/frameworks-de-javascript/) y herramientas que si uno no está más o menos pendiente y al día, resulte abrumador.

El motivo de este post es explicar qué es exactamente Flux y cómo funciona.

## Arquitectura Flux

![Flux](/images/como-funciona-flux/flux-logo.png)

[Flux](https://facebook.github.io/flux/docs/in-depth-overview.html#content) es una arquitectura para el manejo y el flujo de los datos en una aplicación web, particularmente en el Front-End. Fue ideada por Facebook y vendría a sustituir el patrón MVC (o MVVM).

El patrón MVC para el Front-End empezó a ser necesario cuando las aplicaciones web empezaron a hacerse más grandes y con librerías como jQuery o el propio _Vanilla JavaScript_ se hacían difíciles de manejar. Por eso nacieron frameworks como Backbone, Ember y/o Angular.

Todos ellos siguen una arquitectura Modelo-Vista-Controlador, o algo parecido (MVVM, MV\*). Haciendo más sencillo el manejo de datos en aplicaciones web con cierto grado de complejidad.

![Modelo Vista Controlador](/images/como-funciona-flux/mvc.png)

Flux nació desde Facebook por un problema que se les presentaba al tener una comunicación bidireccional entre los modelos y los controladores, haciéndoles muy difícil poder depurar y rastrear errores.

Flux propone una arquitectura en la que el **flujo de datos es unidireccional**. Los datos viajan desde la vista por medio de acciones y llegan a un _Store_ desde el cual se actualizará la vista de nuevo.

![Data flow en Flux](/images/como-funciona-flux/1-rictDFcDHCvOacMUaWxZEQ.png)

Teniendo un único camino, y un sitio donde se almacena el _estado_ de la aplicación, es más sencillo depurar errores y saber que está pasando en cada momento.

Como digo, Flux es un patrón de diseño o forma de "arquitecturar" una aplicación web, en concreto la forma en la que se manejan los datos o estado de la aplicación (datos de un usuario, datos recogidos a partir de un API REST o _webservice_, etc...) No se trata de una librería ni framework.

Al igual que un patrón MVC está formado por un Modelo, una Vista y un Controlador, en Flux tenemos distintos actores:

### Vista

La vista serían los **componentes web**, ya sean [construidos nativamente](/como-crear-webcomponent-de-forma-nativa/), con Polymer, con [Angular](/desarrollo-por-componentes-con-angular-1-5-con-es6-es2015/), React, etc...

### Store

La _Store_ sería **lo más parecido al modelo de la aplicación**. Guarda los datos/estado de la aplicación y en Flux puede haber varias (Luego veremos que en algunas implementaciones sólo hay un único store).

No hay métodos en la _Store_ que permitan modificar los datos en ella, eso se hace a través de _dispatchers_ y acciones.

### Acciones

Un acción es simplemente un **objeto JavaScript que indica una intención de realizar algo** y que lleva datos asociados si es necesario. Por ejemplo si tenemos una aplicación tipo _Carrito de la compra_, y añadimos un item al carrito, la acción que representaría esto sería:

```javascript
{
    type: 'ADD_ITEM',
    item: item
}
```

### Dispatcher

Las acciones como la anterior son enviadas a un _dispatcher_ que se encarga de _dispararla_ o propagarla hasta la Store.

La vista es la que se encarga de enviar las acciones al _dispatcher_.

Un _dispatcher_ no es más que un **mediador entre la _Store_ o _Stores_ y las acciones**. Sirve para desacoplar la Store de la vista, ya que así no es necesario conocer que Store maneja una acción concreta.

En Resumen, el patrón FLUX sigue el siguiente recorrido:

- La vista, mediante un evento envía una acción con la intención de realizar un cambio en el estado
- La acción contiene el tipo y los datos (si los hubiere) y es enviada al dispatcher.
- El dispatcher propaga la acción al Store y se procesa en orden de llegada.
- El Store recibe la acción y dependiendo del tipo recibido, actualiza el estado y notifica a las vistas de ese cambio.
- La vista recibe la notificación y se actualiza con los cambios.

Todo en un único sentido.

## Implementaciones de Flux

Existen numerosas implementaciones de este patrón de desarrollo en JavaScript. Muchas de ellas ya no están mantenidas y poco a poco una de ellas se ha ido posicionando como referencia.

Posiblemente te suenen librerías como:

- Reflux
- McFly
- Marty.js
- Delorean
- Fluxxor
- Lux.js
- Fluxible
- Omniscent
- Redux
- ...

### Redux

Hoy por hoy la más utilizada y que prácticamente se ha convertido en un estándar es [Redux](http://redux.js.org), creada por [Dan Abramov](https://twitter.com/dan_abramov) (Actualmente dentro del equipo de React.js)

![Redux](/images/como-funciona-flux/logo_redux.png)

Es una librería muy pequeña (apenas 2Kb de tamaño) con muy pocos métodos que implementa el patrón Flux con algunas modificaciones que la hacen más sencilla de manejar. Es agnóstica al framework o librería que utilices para tus desarrollos, ya que es únicamente JavaScript por lo que puedes utilizarla junto a Angular, con Polymer y con React.

En próximos artículos hablaré más en detalle de Redux y sus características.
