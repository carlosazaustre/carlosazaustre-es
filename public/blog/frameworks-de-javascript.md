---
title: ¿Qué framework o librería de JavaScript elegir para mis desarrollos?
date: '2015-10-19'
url: 'https://carlosazaustre.es/blog/frameworks-de-javascript'
tags:
  - javascript
  - web
excerpt: >-
  Descubre qué framework o librería de JavaScript elegir para tu proyecto web:
  vanilla JS, jQuery y más. Una guía clara para no perderte en el ecosistema
  frontend
---

# ¿Qué framework o librería de JavaScript elegir para mis desarrollos?

> Publicado el 2015-10-19 — https://carlosazaustre.es/blog/frameworks-de-javascript

Cuando estás empezando en el desarrollo de aplicaciones web, de pronto te das cuenta que con únicamente HTML y CSS no puedes hacer mucho, <a href="/libros-recomendados-sobre-javascript-y-node/">necesitas JavaScript</a>.

Pero en cuanto empiezas a investigar sobre este lenguaje te das cuenta de que forma un ecosistema brutal, y te sientes perdido entre tanta librería, framework, plugin, etc...

He escrito este artículo para guiarte en esta selva que es el desarrollo web (En su parte Frontend principalmente).

A menos para que sepas **qué es cada librería**, por qué surgió, cuál es su objetivo y por qué fue sustituida por otra.

No desesperes, es un mundo inmenso, pero cuando entras ya no quieres salir :)

## Hace mucho, mucho tiempo...

### Vanilla JavaScript

![Vanilla JavaScript](.javascript_vanilla.png)

_Vanilla JavaScript_ es como se conoce al lenguaje **JavaScript cuando se utiliza sin ninguna librería o framework**.

La traducción más castellana sería _JavaScript a pelo_.

Al principio era la única forma de utilizar JavaScript en las páginas web, pero poco a poco se ha ido complicando.

Se han ido requiriendo más funcionalidades y JavaScript _a pelo_ se hacía demasiado pesado.

En ese momento nació jQuery.

### jQuery

![JQuery](/images/frameworks-de-javascript/jquery.png)

[jQuery](https://jquery.com/) es una librería de JavaScript que **facilita el desarrollo con éste lenguaje**.

No es un framework como tal, ya que no implementa ningún patrón de diseño, sólo sirve para hacer más fácil algunas expresiones.

La parte mala es que muchos desarrolladores se acostumbraron a este tipo de programación y olvidaron como se implementaba en JavaScript natural.

Un ejemplo del uso de jQuery es por ejemplo cuando queremos seleccionar un elemento del DOM con el id "miElemento":

```javascript
// Vanilla JavaScript
var elem = document.getElementById("miElemento");

//jQuery
var elem = $("#miElemento");
```

La **sintaxis de jQuery es más sencilla de recordar** pero provoca que a la larga olvides como funciona JavaScript.

### jQuery Mobile

jQuery también lanzó [jQuery Mobile](http://jquerymobile.com/) que básicamente se trataba de una **versión reducida de jQuery y optimizada para dispositivos móviles** que en ese momento estaban empezando a surgir.

jQuery Mobile tuvo un antecesor que fue [jQuery UI](http://jqueryui.com/), un set de recursos tanto CSS como JS para implementar interfaces gráficas. La versión mobile fue una adaptación de ésta.

## La guerra de los Frameworks CSS

![Bootstrap vs Foundation](/images/frameworks-de-javascript/bootstrap_foundation.png)
jQuery UI fue el predecesor de los frameworks CSS que surgieron. Hay infinidad de ellos, pero los que son más utilizados son Bootstrap y Foundation.

### Bootstrap

[Éste framework](http://getbootstrap.com) fue creado por un [empleado de Twitter](https://twitter.com/mdo) y lo liberó como _Open Source_.

Su popularidad se le debe a la facilidad de maquetación que supone usar sus clases CSS, así como el diseño visual de los principales elementos HTML de cualquier página web.

Es muy útil para realizar pequeños proyectos y probar su funcionamiento antes de invertir en diseño.

### Foundation

[Foundation](http://foundation.zurb.com/) es el otro gran combatiente en ésta batalla por el control del CSS.

Su funcionamiento y uso es similar a Bootstrap, y tanto uno como el otro mejoran al otro cada vez que cambian de versión.

En su momento Foundation era mejor porque implementaba mejor el patrón _Mobile First_ y las etiquetas HTML para los diferentes elementos.

Después llegó Bootstrap y con su versión 3, mejoró esta parte. Actualmente Foundation está en su versión 5 donde tiene un [apartado específico para WebApps](http://foundation.zurb.com/apps/), pero [está preparando la versión 6](http://zurb.com/article/1403/foundation-6-prototype-to-production), al igual que [Bootstrap su versión 4](http://blog.getbootstrap.com/2015/08/19/bootstrap-4-alpha/), donde ambos utilizarán Flexbox CSS para el posicionamiento de elementos en la página web, lo que hará que mejore mucho más su rendimiento.

## La llegada de los Frameworks JavaScript

jQuery estaba y sigue estando muy extendido, pero a medida que **las aplicaciones web implementaban cada vez más funcionalidades y complejidad**, jQuery se hacía inmanejable. Llamadas AJAX, cambios de vista, etc..

El **patrón de diseño MVC** (Modelo, Vista y Controlador) **se estaba empezando a necesitar en el Frontend** cuando siempre había sido una cuestión de Backend. Surgieron varios, pero el que destacó y sigue ocupando una parte importante en el pastel es Backbone.

### Backbone JS

![Backbone js](/images/frameworks-de-javascript/backbone.png)
Fue creado por Jeremy Ashkenas, autor también de la librería Underscore, y del precompilador CoffeeScript.

[Backbone](http://backbonejs.org/) debe su popularidad a que es un **framework extremadamente ligero** (7 Kb) comparado con otros, y te permite utilizar el sistema de plantillas que quieras, otras librerías, etc.. es bastante flexible.

### Ember JS

![Ember JS](/images/frameworks-de-javascript/ember-1.png)
Ember es otro framework de la familia MVC. No lo conozco mucho porque no he trabajado con él, pero las bases son similares a Backbone. Es muy popular por los desarrolladores en Ruby on Rails.

### Angular JS

![Angular JS](/images/frameworks-de-javascript/angularjs.png)
[Angular](/empezando-con-angular-js/) fue el último en llegar y **acabó superando a Backbone**. Es un proyecto iniciado por Google y alcanzó mucha popularidad rápidamente. Angular trajo funcionalidades integradas que usando JavaScript Vanilla o BackboneJS necesitaban de otras librerías para implementarlo.

Angular provee un **sistema de módulos propio**, no es necesario utilizar Require.JS como podría necesitarse en Backbone. También trae su **propio sistema de plantillas**, no es necesario implementar Moustache, Handlebars, etc... Provee **servicios propios para traer datos vía AJAX**, sin necesidad de liberías externas.

Puedes construir directivas para extender el HTML de tus aplicaciones web, etc...

Esto hace que sea un **framework más pesado**, pero del que puedes sacar mucho partido. **Su curva de aprendizaje es como una montaña rusa**, pero una vez que entiendes gran parte de su funcionamiento te resultará muy rápido crear aplicaciones web.

![Curva de aprendizaje de Angular.js](/images/frameworks-de-javascript/curva-aprendizaje-angularjs.png)

Con **la llegada de NodeJS y su popularidad, surgió [el stack MEAN](/desarrollo-full-stack-javascript-tambien-conocido-como-mean/)** compuesto por Mongo como Base de Datos, Express y NodeJS como lenguaje y framework del servidor y AngularJS para la parte cliente. Éste stack se ha hecho tan popular o más como lo fue en su día el stack LAMP (Linux + Apache + MySQL + PHP).

## Y llegó NodeJS

[Node.js supuso una revolución en el mundo del desarrollo web](/como-crear-una-api-rest-usando-node-js/). De repende los programadores que se encargaban de la parte Frontend de las aplicaciones podían entrar en el mundo Backend, ya que **NodeJS es la forma de poder programar con JavaScript en el servidor**.

Además del mundo backend, con NodeJS surgieron varias herramientas para mejorar los desarrollos y hacerlos más ágiles.

### Grunt

En un momento tuvimos [Grunt para **automatizar tareas repetitivas**](/automatizar-tareas-en-javascript-con-grunt-js/) como el minificado de archivos, concatenado, preprocesado de otros lenguajes como CoffeeScript a JavaScript, o Sass, Less, Stylus a CSS.

![Automatizadores de tareas](/images/frameworks-de-javascript/automated_tasks.png)

### Gulp

Después de Grunt vino [Gulp](/automatizando-tu-flujo-de-trabajo-en-el-frontend-con-gulpjs/), que utilizando los _Streams_ que proporciona NodeJS hizo **más sencilla la implementación y ejecución** de las tareas que hacíamos antes con Grunt.

### Browserify

![Browserify](/images/frameworks-de-javascript/browserify.png)
En medio de estos dos grandes surgió [Browserify](/browserify-desarrollando-tu-frontend-como-en-node-js/), una librería que permitía **llevar el modo de programación que se estaba empleando en NodeJS al lado cliente**. Ahora podías importar módulos con el comando `require` sin necesidad de tener una _rista_ (Lista larga) de `scripts` en el HTML.

### Webpack

Actualmente tenemos [Webpack](https://webpack.github.io/) que incorpora en pocos pasos lo que más repetíamos en Gulp, como son el transpilado, el preprocesado y el minificado. Webpack ha conseguido que, **dependiendo del tipo de proyecto, no necesites ni Gulp ni Browserify**.

Y ofrece algo muy interesante, el _Hot Loader_, permitiéndonos ver los cambios que hacemos mientras desarrollamos, sin perder el estado de la aplicación. Algo que Gulp no nos permite hacer.

## ¿Aplicaciones web híbridas?

El auge de las aplicaciones móviles, Android e iOS, hizo que algunos frameworks evolucionaran y aparecieran nuevas herramientas.

En un momento había muchas herramientas que permitían que **una web pudiera ser empaquetada como una app mobile** (Phonegap), pero la experiencia de usuario y el uso era un infierno.

### Ionic

![Ionic](/images/frameworks-de-javascript/ionic.png)
Por suerte, Phonegap evolucionó a Cordova, y surgió Ionic, una **librería basada en Angular** que nos permite crear aplicaciones móviles **para Android e iOS** programando únicamente en JavaScript y empaquetándolo con Cordova.

Todo es genial, podemos hacer aplicaciones de una sola página con AngularJS, programar el backend y el frontend empleando JavaScript, incluso aplicaciones móviles sin cambiar de lenguaje ni de stack.

Pero a los desarrolladores no nos gusta quedarnos quietos...

## El surgimiento de los WebComponents

![Web Components](/images/frameworks-de-javascript/webcomponents.png)
Webcomponents o los componentes web, son una especificación de la W3C para **componetizar la web** y reutilizar elementos que usamos en nuestro día a día.

A día de hoy tenemos formularios, inputs, tablas, encabezados, etc.. Pero cada vez más surgen nuevos patrones de diseños, repetitivos y no hay un estándar para eso.

En nuestras webs todos tenemos menús, navbars, mapas de google maps, videos de youtube, etc... Su código HTML es ilegible, convirtiéndose en una montaña de `divs` anidados. (Aprovecho para recomendar [éste artículo](http://bordertopstyle.com/divinitis/) de [Elena Torró](https://twitter.com/elenarcolepsia))

Los WebComponents tratan de solucionar eso, y ésta especificación surgió a la par que AngularJS y sus directivas

### Polymer

![Polymer Project](/images/frameworks-de-javascript/polymer.png)
Como los [WebComponents](http://webcomponents.org/) son un estándar en revisión, no está implementado al 100% en todos los navegadores y por eso surgió [Polymer](https://www.polymer-project.org/1.0/), otro proyecto de Google para **acercar el desarrollo de WebComponents a todos los navegadores.**

Actualmente su [versión 1.0 ya está disponible con multitud de mejoras y componentes](https://elements.polymer-project.org/).

Ya no es solo un _Polyfill_ si no que es una librería para facilitar el uso e implementación de WebComponents. También está el [Polymer Starter Kit](https://developers.google.com/web/tools/polymer-starter-kit/index?hl=en) que es una punto de arrance, y una forma para ver si realmente son necesarias las apps nativas o con una web mobile (sin empaquetados) puede llegar a ser tan versátil como lo nativo.

¿Conoces [AMP (**Accelerated Mobile Pages**)](https://googleblog.blogspot.com.es/2015/10/introducing-accelerated-mobile-pages.html)?

Polymer [está creciendo mucho](https://www.polymer-project.org/summit) y es una parte importante en esta guerra por el trono de scripts :P

## Programando orientado a componentes

En medio de todo esto aparece [React JS](/ejemplo-de-aplicacion-con-react-js-en-ecmascript-6/), una librería que ha **desarrollado Facebook** y que utiliza tanto en su red social como en Instagram y ha liberado como _Open Source_

### React

![React JS](/images/frameworks-de-javascript/reactjs.png)
Su popularidad está creciendo a pasos agigantados, debida en gran parte a la **velocidad de renderizado**, ya que emplea un **DOM Virtual** para ello.

React no es un framework como Angular, es únicamente una **librería** (como podía ser jQuery, o Polymer) diseñada únicamente para la interfaz gráfica. Puedes combinarla con cualquier framework o utilizar Vanilla JavaScript.

#### Flux

Facebook por su parte diseñó [Flux](https://facebook.github.io/flux/docs/overview.html#content), una **arquitectura para crear aplicaciones web con React**, pero sin usar ningún Framework, únicamente JavaScript puro sin añadidos.

El patrón de diseño que nos proporciona React es componetizar nuestras aplicaciones (No es lo mismo que webcomponents).

No pienses en un MVC completo para la aplicación.

Piensa en pequeños átomos (componentes) que conforman la materia (aplicación completa). Cada átomo tiene sus propiedades y estados.

Es una definición un poco complicada de digerir al principio, pero una vez que la conoces, no quieres desarrollar de otra manera :D

## El estándar de JavaScript evoluciona

JavaScript empezó como lenguaje para añadir animaciones e interacción en una página web.

[Ahora las páginas web son aplicaciones](javascript-el-lenguaje-de-programacion/) y JavaScript se queda corto, de ahi el nacimiento de frameworks como Angular, o de precompiladores como CoffeeScript para traducir a JavaScript.

### ECMAScript6 (ES6 o ECMAScript 2015)

JavaScript necesitaba una revisión y al fin se ha hecho realidad.

Durante varios años se ha ido definiendo [la nueva versión del estándar, ECMAScript 6](/ecmascript6/), que provee clases, módulos, nuevas funcionalidades, etc..

Se ha conseguido (en cierta medida) que incluso no sea necesario emplear frameworks para desarrollar, únicamente con librerías podemos tener un stack muy poderoso.

Como toda especificación, tarda en implementarse, y aunque se aprobó en Julio de 2015, muchos navegadores aún no tienen todas las mejoras que trae.

### Babel JS

Ahí surge [Babel](http://babeljs.io) (anteriormente conocido como 6to5) que nos **permite escribir código ES6 y que sea traducido a ES5** (La versión anterior del estándar que conocen todos los navegadores)

**React ha sido uno de los primeros en adaptar su librería a las nuevas funcionalidades** que trae ES6, lo que ha disparado aún más su popularidad.

Combinándolo con Webpack, conseguimos un entorno de desarrollo web moderno, por componentes y muy ágil.

### Aplicaciones Isomórficas

**React** está creciendo mucho en poco tiempo. Su forma de implementación permite **usar la librería en la parte de servidor con Node JS**, lo que nos permite junto con otras librerías como [React-Router](https://github.com/rackt/react-router) y [React-Engine](https://github.com/paypal/react-engine), crear componentes que puedan ser reutilizados tanto en el Frontend como en el Backend, lo que se conoce como [aplicaciones isomórficas o universales](https://github.com/carlosazaustre/universal-js-boilerplate).

**¿Qué ventajas traen las aplicaciones isomórficas?**

Una aplicación SPA (_Single Page Application_) tarda un tiempo en cargarse, pero luego la velocidad de página y la UX es muy buena. Pero a cambio pierdes el SEO que te proporciona una página renderizada en el servidor.

**Una aplicación Isomórfica une lo mejor de ambos mundos**.

Cuando accedes a la web, es renderizada desde el servidor (bueno para el SEO, y la carga de página) y el resto de interacciones que hagas serán desde el cliente, como una SPA (bueno para la usabilidad y la UX).

Es el futuro.

## ¿Qué pasa con Angular?

Angular hasta ahora era el dominante en el mundo de los frameworks de JS. Pero **React le ha estado comiendo terreno**. Y [Polymer también](https://www.youtube.com/watch?v=jVn8tlnwAEs&t=20m41s) en cierta medida.

Angular también tiene un peso importante dentro del desarrollo híbrido con Ionic, pero la llegada de [**React Native**](https://facebook.github.io/react-native/) tanto **para iOS como para Android**, le puede relegar, ya que con React Native no estamos haciendo una aplicación híbrida, estamos desarrollando una **aplicación nativa pero utilizando JavaScript** para ello.

Angular también nos proporcionó un sistema de módulos que JavaScript, nativamente, no tenía, al igual que las directivas que se asemejaban a los **WebComponents** que estaban surgiendo.

Ahora que ya estas funcionalidades ya están aquí con ECMAScript6. Es el momento de utilizarlas

### Angular 2.0

![Angular2](/images/frameworks-de-javascript/angular2.png)
La nueva versión del **framework de Google cambiará mucho la forma de programar con respecto a las versiones 1.x**, será mucho mejor, usando más recursos nativos.

El problema está que cambia tanto que una versión 1.x no es compatible con la 2.0, por lo tanto si quieres actualizar, tendrás que reescribir todo.

Otro problema es que está tardando mucho en aparecer. **Ya hay una versión [alpha](https://angular.io/)**, pero aún tardará en ser estable y utilizarse. Y mientras tanto React le está comiendo terreno.

### Ionic 2

En la parte _mobile_, React también esta pegando fuerte con Native y eso está haciendo que Ionic pierda fuelle, pero la gente detrás de **Ionic está [trabajando codo con codo](http://blog.ionic.io/angular-2-ionic/) con la gente detrás de Angular 2** para hacer un framework más poderoso.

## Entonces ¿Qué elijo?

En estos casos siempre digo que elijas la librería, lenguaje, herramienta con la que te sientas más cómodo. Olvídate de modas, y **utiliza lo que te haga más productivo** y sobre todo **te divierta desarrollando**.

En mi caso **me encuentro muy cómodo con Angular 1.x** y utilizando Gulp para automatizar tareas.

**He probado React y también me gusta** su patrón de desarrollo basado en componentes, y para hacer pequeños proyectos o empezar nuevos es buena opción.

**Polymer** no lo he probado aún, pero tengo ganas por los comentarios que me llegan de medio GDG España :D

Lo que no puedes hacer es reescribir toda tu aplicación en un nuevo framework sólo por el hecho de que lo esté _petando_. Te acabará volviendo loco.

Prueba lo que te llame la atención y si lo ves útil, adelante con él :)

Pruebes el framework o librería que pruebes, al final de día tienes que enfrentarte a JavaScript. Es importante conocer las bases para enfrentarse a cualquier reto. Puedes **aprender JavaScript desde cero hasta el nuevo estándar ES6** con mi nuevo eBook **["Aprendiendo JavaScript".](https://leanpub.com/aprendiendojavascript?utm_source=blog-post-frameworks&utm_medium=blog&utm_campaign=ebook-js)**
**Y tu, ¿Qué framework usas? ¿Cuál te gusta más?** Déjalo en los comentarios y abramos el debate.
