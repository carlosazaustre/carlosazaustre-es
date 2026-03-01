---
title: 4 Formas de crear un Componente en React
date: '2017-01-24'
url: 'https://carlosazaustre.es/blog/formas-de-crear-un-componente-en-react'
tags:
  - react
  - javascript
  - tutorial
related:
  - estructura-de-un-componente-en-react
  - jsx-para-novatos
  - empezando-con-react-js-y-ecmascript-6
excerpt: >-
  Aprende a crear componentes en React de 4 formas: clases ES6, funciones,
  stateless y createClass. Descubre cuándo usar cada estilo según tu proyecto.
---

# 4 Formas de crear un Componente en React

> Publicado el 2017-01-24 — https://carlosazaustre.es/blog/formas-de-crear-un-componente-en-react

Un componente en React puede crearse de diferentes formas dependiendo de la versión de JavaScript que estemos utilizando y del propósito del componente.

En este artículo recopilo las diferentes formas que existen y en que situación se suele utilizar cada una de ellas. Vamos allá

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=sOMA7amhGzU)
/>

##Componente de React con ES5
Esta es la primera forma que hubo y que puedes encontrar en muchos tutoriales por la red. Se basa en el método `createClass` de la librería React y la estructura sería la siguiente:

```javascript
var MiComponente = React.createClass({
  propTypes: {...},
  getDefaultProps: {...},
  getInitialState: function () {...},
  render: function () {...}
});
```

Al método `createClass` se le pasa un objeto que contiene las funciones típicas del ciclo de vida si se han de utilizar, el método `render`, los `propTypes`, el estado inicial se configuraría en la función `getInitialState` y las `props` por defecto se definen en `getDefaultProps`.

##React con ES6 (o ES2015)
Con el nuevo estándar de JavaScript podemos utilizar `classes` y en este caso, podemos _"heredar"_ del objeto `React.Component`. La creación de un componente utilizando ésta sintaxis sería la siguiente:

```javascript
class MiComponente extends React.Component {
  constructor (props) {
     super(props);
     this.state = {...};
  }
  render () {...}
}
MiComponent.propTypes = {...};
MiComponent.defaultProps = {...};
```

Al utilizar la sintáxis de clases, tenemos un método `constructor` dónde configuramos el estado inicial y se reciben las propiedades. El método `render` es una función más dentro de la clase y en este caso las `propTypes` se definen fuera de la clase como una propiedad al igual que las `defaultProps`.

## Componente de React como función

Otra forma de crear un componente en React, con el nuevo estándar es crearlo como una función. Esta forma se utiliza cuando el componente es puramente representacional o sin estado.

¿Cuándo es mejor crear un componente de esta manera? Si en tu componente únicamente utilizas el método render, y no estás haciendo uso del estado, es mejor que lo definas como una función. De esta manera tu aplicación final tendrá mejor _performance_.

```javascript
const MiComponente = function (props) {
 return (...);
};
```

Incluso puedes aplicar las últimas funcionalidades de ES2015 como el _object destructuring_ para las propiedades y las _arrow functions_ para definir la función.

Sería algo así:

```javascript
const MiComponente = ({prop1, prop2 }) => (...);
```

## Utilizando ES7

Aunque la versión 7 de ECMAScript aún no está aprobada ni implementada por los navegadores, podemos utilizarla en nuestro código utilizando [Babel](http://babeljs.io) y el preset `stage-0` para ello.

¿Que diferencia hay con respecto a ES6? ES7 introduce las [_Property Initialiazers_](https://github.com/tc39/proposal-class-public-fields) que podemos aplicar a las `defaultProps` y a las `propTypes` para que estén incluidas dentro de la definición de la clase.

Y también puede aplicarse al estado inicial, definiendo éste fuera del método `constructor`.

Esta sería la sintaxis:

```javascript
class MiComponent extends React.Component {
  static propTypes = {...}

  static defaultProps = {...}

  state = {...}

  constructor (props) {
    super(props);
  }

  render () { ... }

}
```

Como ves, hay varias formas de crear un componente de React, todas son válidas, tan solo depende del caso de uso y de la especificación de ECMAScript que quieras utilizar.

Lo más habitual hoy en día es utilizar la versión de clase de ES2015 o la versión como función en el caso de componentes sin estado. Aunque si utilizas el `stage-0` de babel nada impide que utilices las `Property Initialiazers` y prepares a tus componentes para ES7 :)

¿Quieres aprender más sobre React? [Te espero en mi **curso online** sobre **Fundamentos de React.js**](http://cursos.carlosazaustre.es/p/react-js/)
