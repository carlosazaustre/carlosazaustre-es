---
title: "Mi experiencia cambiando de AngularJS a ReactJS"
date: "2017-03-17"
url: "https://carlosazaustre.es/blog/mi-experiencia-cambiando-de-angularjs-a-reactjs"
tags: []
---

# Mi experiencia cambiando de AngularJS a ReactJS

> Publicado el 2017-03-17 — https://carlosazaustre.es/blog/mi-experiencia-cambiando-de-angularjs-a-reactjs

> En este artículo quiero contar mi experiencia de trabajar con Angular durante un tiempo y mi cambio a React hace unos meses. No se trata de un post de "Angular vs React" ambas me parecen buenas tecnologías, si no simplemente quiero mostrar que cosas hicieron que dejase Angular y probase otros stack diferentes para el Front-End.

Empecé con Angular prácticamente en sus inicios, allá por 2012, entre las versiones 1.0.8 y 1.2, durante una temporada que pasé trabajando en Irlanda y tuve tiempo para dedicar a formarme leyendo libros técnicos, haciendo cursos y siguiendo tutoriales.

En esa época también empezó a pegar fuerte Node.js y se formó el llamado [stack MEAN (con MongoDB, ExpressJS, Angular y Node.js)](/desarrollo-full-stack-javascript-tambien-conocido-como-mean/) y aposté por el.

## Que había antes de Angular

![jQuery y Backbone JS](/images/mi-experiencia-cambiando-de-angularjs-a-reactjs/spaguetti-jquery-backbone.png)
Angular es genial, porque en su momento, la alternativa "buena" era Backbone y la "mala" JQuery.

Me explico con lo de "buena" y "mala".

Hace unos años no había tanta lógica de negocio en el lado Front-End de las aplicaciones web como ahora, pero si querías hacer algo, podías hacerlo en JavaScript puro o ayudarte de librerías como jQuery que reducían el código _cross-browser_ y te ayudaban a manipular el DOM.

Lo malo de jQuery era que al final te olvidabas de programar en JavaScript y acababas usando jQuery para todo y tu código comenzaba a _spaguettizarse_ si no tenías un poco de cuidado.

![Spaguetti Code](http://i.imgur.com/N5KEXLU.gif)

Backbone solucionaba esto, implementando una arquitectura MVC para el Front-End. El problema es que JavaScript hace unos años no tenía la potencia ni las herramientas que tenemos ahora. Entonces si querías modularizar tu código, tenías que hacer uso de Require.js, lo cual, en mi opinión, era un dolor.

## La llegada de Angular.js

![Angular JS](/images/mi-experiencia-cambiando-de-angularjs-a-reactjs/angular-js.png)
Entonces apareció Angular, que en su momento era una forma de extender el HTML a través de directivas. Proporcionaba también un patrón MVC, llamado MVVM (Model View-View Model), implementaba _doble data-binding_, gestión de módulos, promesas, etc... Muchas cosas que por entonces no estaban en JavaScript y que si quisiéramos utilizar jQuery o JavaScript Vanilla para hacerlo, sería mucho código.

Como digo, he estado trabajando con Angular varios años, desde principios de la versión 1.2 a la 1.5 y me ha servido mucho para aprender JavaScript y como arquitecturar aplicaciones modernas en el Front-End, sobre todo siguiendo las guías de estilo de [Todd Motto](https://github.com/toddmotto/angular-styleguide) y [John Papa](https://github.com/johnpapa/angular-styleguide).

El problema llegó cuando JavaScript evolucionó y la llegada del [nuevo estándar (ES6)](/ecmascript6/) añadió de forma nativa funcionalidades que implementaba Angular.

## JavaScript evoluciona: ES6

![](/images/mi-experiencia-cambiando-de-angularjs-a-reactjs/ecmascript-6.png)
Ahora tenemos gestión de módulos de forma nativa (No es soportado actualmente pero está ahi). Tenemos [Promesas](/manejando-la-asincronia-en-javascript/) también de forma nativa, el [API de Fetch](/consumiendo-un-api-rest-desde-react-js-con-ecmascript6/), etc... Un montón de nuevas funcionalidades de las que no necesitamos ninguna librería o framework para ayudarnos (Salvo _Babel_ para transpilar código).

Si quieres usar ES6 en Angular 1x, la cosa se complica bastante. Angular tiene su propio sistema de módulos y si quieres utilizar los de ES6 (o utilizar `require` con Browserify) Tienes que meter prácticamente cada controlador en un módulo de Angular, y luego exportarlo con ES6, etc...

Si ES6 te facilita la vida a la hora de programar en JavaScript, unirlo con Angular lo complicaba más.

![Angular Pen!](/images/mi-experiencia-cambiando-de-angularjs-a-reactjs/angular-1-es6-8-638.jpg)

## El nacimiento de los WebComponents y Angular 2

![](/images/mi-experiencia-cambiando-de-angularjs-a-reactjs/web-components.png)
Paralelamente al desarrollo de Angular, se propuso la especificación de los [WebComponents](/como-crear-webcomponent-de-forma-nativa/) y fue el inicio de la programación orientada a componentes. Polymer y React seguían esa arquitectura y en Angular 1x se podía conseguir, [utilizando directivas como componentes](/angular-js-directivas-como-componentes/). Al final una directiva de Angular es un componente (tiene un tag HTML) y encapsula una plantilla HTML y un controlador con JavaScript.

De hecho a partir de la versión 1.5 aparece la función `component()` que permite hacer justo eso, transformar una directiva en componente.

Viendo como evolucionaba JavaScript y el estándar de WebComponents, se propuso reescribir Angular siguiendo los nuevos estándares, es lo que se conoce como Angular v2 o simplemente Angular.

El problema es que, a mi parecer, se complicaba mucho la sintaxis. La nueva versión de Angular no se parecía nada a la anterior. Se hicieron intentos de que la transición fuera más sencilla (Desarrollando versiones 1.5, 1.6 y 1.7 que fueran incorporando las novedades de Angular 2 gradualmente).

Pero si en ese momento estabas trabajando con la v1.x, sientes que estás trabajando con un framework condenado a la extinción. Y la alternativa, si querías seguir con Angular, era aprender Angular 2.

Yo lo intenté, e hice pequeñas pruebas, pero me parecía muy complicado, además seguía en Beta y no era conveniente usar en producción.

Durante todo ese tiempo, React fue una de las librerías que más despegó y empezó a hacerse madura y su ecosistema y comunidad crecieron mucho. Empezó a convertirse en un proyecto estable y como tiempo atrás le di un vistazo, quise darle una oportunidad.

## Mis primeros pasos con React

![](/images/mi-experiencia-cambiando-de-angularjs-a-reactjs/react-first-steps.png)
Entonces, poco antes del verano de 2016, [empecé a probar React](/mi-inmersion-en-react/), vi lo mucho que había evolucionado desde la primera vez que lo vi en 2015. Pude ver lo bien que se integraba con el nuevo estándar de JavaScript y la sencillez con la que se podían hacer las cosas.

Las únicas pegas que encontré en inicio, eran la [sintáxis JSX](/jsx-para-novatos/). Al principio crees que es HTML y claro, añadir HTML a código JavaScript no es lo que se debe hacer, pero luego comprendes que no es HTML, es código JavaScript pero escrito de una forma más sencilla de programar y de entender.

React no es el sustituto de Angular, porque React es sólo una librería que hace una única cosa: Renderizar componentes en el DOM. Pero lo hace muy bien.

Para implementar con React y su ecosistema, una aplicación web como haríamos con Angular, necesitamos más librerías y programar más.

Esto para algunas personas puede parecer una desventaja, pero a mi personalmente me parece lo contrario.

Con un framework, ya sea Angular o cualquier otro. Si quieres usar por ejemplo un sistema de routing, tienes que usar el que está construido para el propio framework.

Con React, si quieres implementar Routing, puedes hacerlo tu mismo con JavaScript Vanilla, o utilizar una librería, la que tu prefieras. Puede ser la que ha creado la comunidad con react-router, o puedes usar page.js o la que tu prefieras. No estás atado a nada.

React te permite ser más modular e ir añadiendo lo que necesites poco a poco. Si necesitas utilizar promesas puedes utilizar las que ES6 te provee de forma nativa, si necesitas hacer llamadas AJAX, puedes utilizar fetch o una librería como `request` o `axios` o incluso jQuery son `$.ajax()`.

## Conclusión

Esta forma es la que me parece más correcta, porque te permite ser más independiente y la arquitectura de tu aplicación ya no depende de una única librería o herramientas.

También programar de esta forma me ha hecho aprender más sobre arquitecturas front-end y mejorar como profesional.

Como siempre digo, ésta es mi opinión, basada en mi experiencia con ambas tecnologías. Angular 2 es un excelente framework (si no, nadie lo usaría) y React es una tecnología más dentro del gran ecosistema que existe en el Frontend (Polymer, Vue, Backbone, etc...)

Dependiendo del tipo de aplicación que quieras hacer, quizá una de ellas te complique más el desarrollo y otra te lo simplifique mucho más. Todo es cuestión de probar y ver cuál es útil en cada momento.
