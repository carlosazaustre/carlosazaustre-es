---
title: "Mi inmersión en React"
date: "2016-09-13"
url: "https://carlosazaustre.es/blog/mi-inmersion-en-react"
tags: []
---

# Mi inmersión en React

> Publicado el 2016-09-13 — https://carlosazaustre.es/blog/mi-inmersion-en-react

_Antes de nada quiero aclarar que AngularJS me gusta (por si no se nota de mis anteriores posts :P)._

Aposté por Angular cuando mucha gente todavía renegaba de JavaScript y del [stack MEAN](/desarrollo-full-stack-javascript-tambien-conocido-como-mean/). He aprendido mucho utilizando este framework en mis desarrollos, de patrones de diseño, de programación básica y avanzada, etc...

He trabajado con las versiones de la v1.2 a la v1.5, y me parece excelente como ha evolucionado y como se ha ido integrando poco a poco con ECMAScript 6 (ES2015) y ha ido abandonando Bower para utilizar NPM.

Con las versiones 1.4 y 1.5 puedes trabajar con una [arquitectura de frontend basada en componentes](/desarrollo-por-componentes-con-angular-1-5-con-es6-es2015/) haciendo tus aplicaciones más mantenibles y escalables. Me resulta más cómoda ésta forma de trabajar que el típico MVC.

Sin embargo, siempre me gusta explorar nuevas cosas y no quedarme estancado. Sentía que con Angular me estaba quedando muy limitado a ese framework, y viendo la evolución de ECMAScript quise probar a utilizar JavaScript Puro (o _VanillaJS_) combinándolo con pequeñas librerías que resolvieran problemas concretos.

<blockquote class="twitter-tweet" data-lang="en">
  <p lang="es" dir="ltr">
    Últimamente estoy empleando más VanillaJS (ES6) + pequeñas librerías en
    lugar de Frameworks ¿Estaré madurando?
  </p>
  &mdash; Carlos Azaustre (@carlosazaustre) <a href="https://twitter.com/carlosazaustre/status/742671743605694465">June 14, 2016</a>
</blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Antes del verano empecé a utilizar [yo-yo.js](https://github.com/maxogden/yo-yo), una librería para renderizar HTML (al estilo React, pero más ligera) que conocí gracias a un [curso en Platzi](https://platzi.com/cursos/javascript/). Empecé a seguir este patrón y para el estado de la aplicación utilicé [store-emitter](https://github.com/sethvincent/store-emitter) (algo parecido a _Redux_), [page.js](https://visionmedia.github.io/page.js/) para las rutas, y [request-promise](https://www.npmjs.com/package/request-promise) para realizar peticiones HTTP (o el propio [fetch de ES2015](/ejemplo-de-aplicacion-con-react-js-en-ecmascript-6/)).

Me encantó esta forma de trabajar, pudiendo utilizar lo que quisiera para armar una web app.

Con esta experiencia, me animé este verano a profundizar en React, que [ya lo había probado tiempo atrás](/empezando-con-react-js-y-ecmascript-6/) y me gustó.

He descubierto que aunque React es una librería que se encarga del tema de renderizado de las vistas (y lo hace realmente bien), tiene un ecosistema y comunidad enormes.

![React, Redux, GraphQL](/images/mi-inmersion-en-react/react-redux-graphql-1.png)

Mi problema con Angular es que yo me quedaría en la v1.5 (o en la v1.6 que próximamente lanzarán), aunque sea algo complicado utilizar ECMAScript 6 (que me encanta) con ello. Se puede hacer, pero se enrevesa mucho el código, sobre todo a la hora de crear módulos.

Angular2 soluciona esto ya que utiliza el sistema de módulos de ES2015, pero para mi gusto, se complica mucho la forma de programar. TypeScript ayuda, pero tampoco me gusta TypeScript (soy así...) Cierto es que no es necesario utilizar TypeScript de forma obligatoria, [pero la alternativa no es mejor...](/angular-2-primeros-pasos/)

En esto creo que gana React, ya que se integra muy bien con ES2015 y el [desarrollo de componentes es muy intuitivo](/ejemplo-de-aplicacion-con-react-js-en-ecmascript-6/).

El resto de cosas que hace el framework las puedes encontrar en el ecosistema de React, para manejar el estado de la aplicación puedes utilizar lo que quieras, pero creo que el patrón Flux y su implementación en Redux se integran perfectamente con esta forma de programar. También el enrutado lo tienes cubierto.

Con React también puedes crear aplicaciones isomórficas o universales junto con Express y Node.js. Con Angular2 también se va a poder, pero ya digo que _Ng2_ no me gusta mucho su sintaxis, la veo muy complicada (para mi gusto).

Y ya lo último es React Native. Si, es una librería diferente, pero si sabes programar con React y Redux, puedes crear una aplicación nativa (no un WebView, una aplicación nativa) para iOS y Android con JavaScript. En el mundo Angular tenemos _ionic_, pero no dejar de ser un _WebView_. También tenemos NativeScript pero no puedo hablar porque no lo conozco mucho. Conozco React Native porque lo he probado y es realmente poderoso.

En resumen, mi cambio a React no se debe a una moda (React lleva en el mercado alrededor de 2 años) pero siento que es una librería muy madura, permite usar otras librerías con ella y hacer tu aplicación más modular, se integra muy bien con ECMAScript 6 y tiene un gran ecosistema y muchas cosas por venir (No he hablando aún de GraphQL...)

Hoy por hoy, prefiero trabajar con pequeñas librerías y utilizar todo lo que pueda de ECMAScript 6 que es el estándar de JavaScript.

Seguiré los pasos que de Angular 2 estoy seguro que cuando sea estable y en futuras versiones (2.1 o 2.2), será muy potente ya que tiene una gran comunidad.

Como siempre digo, hay que intentar probar todas las herramientas que tenemos a nuestra disposición y quedarse con lo que más cómodo nos sea según nuestra forma de trabajar. Personalmente prefiero trabajar con ES2015 y pequeñas librerías y tener más libertad.

En cuanto la temática del blog a partir de ahora, escribiré más sobre React y su escosistema (Redux, GraphQL, UniversalJS, ReactNative,...) ya que siempre he escrito en mi blog sobre las tecnologías con las que trabajo, lo que voy a aprendiendo y sobre todo lo que más me divierta :)
