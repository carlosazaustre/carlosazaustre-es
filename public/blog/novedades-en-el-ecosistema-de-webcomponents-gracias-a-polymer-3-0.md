---
title: "El futuro de los WebComponents gracias a Polymer 3.0"
date: "2018-10-05"
url: "https://carlosazaustre.es/blog/novedades-en-el-ecosistema-de-webcomponents-gracias-a-polymer-3-0"
tags: []
---

# El futuro de los WebComponents gracias a Polymer 3.0

> Publicado el 2018-10-05 — https://carlosazaustre.es/blog/novedades-en-el-ecosistema-de-webcomponents-gracias-a-polymer-3-0

Recientemente se ha celebrado el Polymer Dev Summit, una conferencia anual para desarrolladores de Polymer, la librería de Google basada en [WebComponents](/images/novedades-en-el-ecosistema-de-webcomponents-gracias-a-polymer-3-0/como-crear-webcomponent-de-forma-nativa/).

Pero esta conferencia es mucho más. Google creó la librería Polymer como un Polyfill para su verdadera misión, estandarizar los WebComponents en la web. Cada año que pasa Polymer deja de ser un poco "Polymer" y se acerca más [a lo nativo que va ofreciendo el navegador](https://carlosazaustre.es/como-crear-webcomponent-de-forma-nativa/).

El estándar de los WebComponents se basa en 4 tecnologías principales:

- Templates
- Shadow DOM
- Custom Elements
- HTML Imports

_Templates_ y _Custom Elements_ están ya en todos los navegadores prácticamente o en desarrollo activo. El problema está en el Shadow DOM y sobre todo los HTMLImports.

Polymer proponía crear los WebComponents en ficheros HTML y ser importados vía Links desde los propios ficheros HTML. Mozilla no estaba de acuerdo con esta tecnología y decidió no desarrollarla.

![webcomponents-polymer-use-of-htmlimports](/images/novedades-en-el-ecosistema-de-webcomponents-gracias-a-polymer-3-0/webcomponents-polymer-use-of-htmlimports.png)

Personalmente a mi tampoco me convencía esa forma, [teniendo JavaScript y su ecosistema en continua evolución](/ecmascript6), usar esa forma no parecía muy práctica.

Eso hasta hoy.

Hoy han anunciado la próxima versión 3.0 de Polymer en la cual se han presentado importantes novedades que benefician a todo el ecosistema web.

## De HTMLImports a ES Modules

Se sustituyen los HTMLImports por módulos de JavaScript, empleando el sistema de módulos de ES2015, como se viene haciendo en el desarrollo web moderno con frameworks y librerías como [React](https://carlosazaustre.es/tag/react-js/), Angular 2 o [Vue.js](https://carlosazaustre.es/tag/vue/).

![webcomponents-polymer-loading](/images/novedades-en-el-ecosistema-de-webcomponents-gracias-a-polymer-3-0/webcomponents-polymer-loading.png)

![webcomponents-polymer-esmodules](/images/novedades-en-el-ecosistema-de-webcomponents-gracias-a-polymer-3-0/webcomponents-polymer-esmodules.png)

Además han anunciado algo muy importante, los ES Modules funcionarán nativamente en el navegador Chrome a partir de Septiembre. Esto es una gran noticia ya que llevamos 2 años con el estándar pero esta era la única _feature_ que aún no estaba implementada ni en el navegador [ni en Node.js pero poco a poco ya va viendo la luz sin necesidad de usar _Babel_ ni ningeun _transpiler_](https://github.com/standard-things/esm).

![Screen-Shot-2017-08-22-at-10.32.16](/images/novedades-en-el-ecosistema-de-webcomponents-gracias-a-polymer-3-0/Screen-Shot-2017-08-22-at-10.32.16.png)

A partir de ahora, gracias a esto, los componentes que creemos en Polymer podrán ser importados/exportados en JavaScript así:

```javascript
// Antes
window.MiElemento = // ...
// Ahora
export const MiElemento = // ...
```

```html
<!-- Antes -->
<link rel="import" href="../@polymer/polymer/polymer-element.html" />
```

```javascript
// Ahora
import { Element } from "../@polymer/polymer/polymer-element";
```

Crear ahora un WebComponente con Polymer 3.0 es muy parecido a como se haría de forma nativa, y cada vez con menos uso de _transpilers_ y _polyfills_

![webcomponents-polymer-movinghtml-to-esmodules](/images/novedades-en-el-ecosistema-de-webcomponents-gracias-a-polymer-3-0/webcomponents-polymer-movinghtml-to-esmodules.png)

```javascript
import { Element as PolymerElement } from "../@polymer/polymer/polymer-element.js";
export class MiElemento extends PolymerElement {
  static get template() {
    return `
      <h1>Hello World!</h1>
    `;
  }
}
customElements.define("mi-elemento", MiElemento);
```

## De Bower a NPM/Yarn

Otro gran movimiento viene desde la parte de gestión de paquetes. Hasta ahora Polymer estaba utilizando Bower como gestor de dependencias. Bower fue genial en su día, pero desde hace tiempo su uso en otros workflows se ha ido dejando en favor de NPM. Mucho más práctico, usable y combina mejor con el uso de modulos de JavaScript.

![webcomponents-polymer-packaging](/images/novedades-en-el-ecosistema-de-webcomponents-gracias-a-polymer-3-0/webcomponents-polymer-packaging.png)

![webcomponents-polymer-yarn](/images/novedades-en-el-ecosistema-de-webcomponents-gracias-a-polymer-3-0/webcomponents-polymer-yarn.png)

Recomiendo ver este vídeo de [Fred Schott](https://twitter.com/fredkschott) en el que resume los próximos avances de la nueva versión de Polymer

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=JH6jEcLxJEI)
/>

## Conclusión

Estos avances son muy buenos para el ecosistema web. El principal propósito de Polymer es estandarizar los WebComponents y cada vez más se pueden implementar de forma nativa.

Esto hace que otros frameworks más utilizados com React o Vue, poco a poco puedan ser más cercanos a lo nativo que provee el navegador en lugar de crear su propia lógica de creación de componentes. Esto hará que mejoren su rendimiento y sea más sencillo operar con componentes de distintos frameworks en el mismo proyecto. Es decir, tener tu aplicación en Vue y utilizar WebComponents nativos o de Polymer con facilidad debido a que usan el mismo sistema de modulos y gestión de dependencias.

Además, si [ésta propuesta](https://github.com/TheLarkInn/unity-component-specification) de [Sean Larkin](https://twitter.com/TheLarkInn), el autor de Webpack, sale adelante, todo pinta muy bien. El sistema de creación de Componentes que propone Vue.js con los _Single File Component_ que proporcionan una buena separación de responsabilidades en un único fichero. La propuesta proponer poder usar ese tipo de fichero en otros frameworks. ¿Qué tal un fichero `.polymer`, `.react`?

Con lo que más me quedo de estas _Keynotes_ es con el futuro soporte de los módulos JavaScript ES2015 en Chrome y posteriormente en el resto de navegadores. Cada vez JavaScript es más grande.

Más info: _[Polymer 3.0 preview: npm and ES6 modules](https://www.polymer-project.org/blog/2017-08-22-npm-modules.html)_
