---
title: Estructura y funcionamiento de un componente en React
date: '2016-09-28'
url: 'https://carlosazaustre.es/blog/estructura-de-un-componente-en-react'
tags:
  - react
  - javascript
---

# Estructura y funcionamiento de un componente en React

> Publicado el 2016-09-28 — https://carlosazaustre.es/blog/estructura-de-un-componente-en-react

Un componente de **React** se puede crear de varias formas. Una de ellas es con el método `createClass` que ofrece la librería.

```javascript
const React = require('react')

const MyComponent = React.createClass({
...
})
```

Y la otra es utilizando las clases que ofrece ECMAScript 6 (ES2015). En este caso heredan de la clase `Component` de React y necesitan llamar al constructor padre en el método `constructor` Si usamos Webpack con Babel podemos también usar el sistema de módulos de ES2015:

```javascript
import React form 'react'

class MyComponent extends React.Component {
  constructor () {
    super()
  }
  ...
}
```

A lo largo de los artículos y tutoriales que escriba, siempre usaré la notación de clases, que me parece mucho más clara y además sigue el estándar de ES2015.

### Render

Todo componente de React, tiene un método `Render` que es el que se encarga de renderizar en el navegador el HTML correspondiente al componente.

Este método se llama automáticamente cuando se crea un componente y cuando el estado del componente se actualiza (veremos esto más adelante).

En este método es donde usamos JSX para facilitar el desarrollo y creación de elementos HTML. Veamos un ejemplo:

```javascript
import React from "react";

class MyComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <span>Hola!, soy un componente</span>
      </div>
    );
  }
}
```

### Propiedades

Un componente en React puede recibir propiedades como parámetros desde un componente padre para poder insertar valores y eventos en su HTML.

Imagina que tienes un componente que representa un menú con varias opciones, y éstas opciones las pasamos por parámetros como una propiedad llamada `options`:

Veamos esto en código:

```javascript
import React from "react";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    let menuOptions = ["Opción 1", "Opción 2", "Opción 3"];
    return ;
  }
}
```

¿Cómo accedemos a estas propiedades en el componente hijo a la hora de renderizarlo? Por medio de las `props`. Veamos como con el código del componente ``:

```javascript
import React from "react";

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let options = this.props.options;
    return (
      <ul>
        {options.map((option) => (
          <li>{option}</li>
        ))}
      </ul>
    );
  }
}
```

En el método `render` creamos una variable `options` con el valor que tenga `this.props.options`. Éste _options_ dentro de _props_ es el mismo atributo _options_ que tiene el componente ``y es a través de `props` como le pasamos el valor desde el _padre_ al componente _hijo_.

El código final de este ejemplo sería:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let menuOptions = ['Opción 1', 'Opción 2', 'Opción 3']
    return 
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let options = this.props.options
    return (
      <ul>
        {options.map(option => <li>{option}</li>)}
      </ul>
    )
  }
}

ReactDOM.render(, document.getElementById('app')
```

Y esto muestra en el navegador algo como lo siguiente:

- Opción 1
- Opción 2
- Opción 3

Puedes ver el código en el siguiente JSBin: [Código](http://jsbin.com/xegicihalo/edit?html,js,output)

### Estado

Además de las `props`, los componentes en React pueden tener estado. Lo característico del estado es que si éste cambia, el componente se renderiza automáticamente. Veamos un ejemplo de esto.

Si tomamos el código anterior y en el componente ``guardamos en su estado las opciones de menu, el código de _App_ sería así:

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOptions: ["Opción 1", "Opción 2", "Opción 3"],
    };
  }

  render() {
    return ;
  }
}
```

De ésta manera, las "opciones" pertenecen al estado de la aplicación (App) y se pueden pasar a componentes hijos (Menu) a través de las _props_.

Ahora, si queremos cambiar el estado, añadiendo una nueva opción al menú tenemos a nuestra disposición la función `setState`, que nos permite modificarlo.

Aprovechando esto, vamos a modificar el estado a través de un evento disparado desde el componente hijo hacia el padre

### Eventos

Si las propiedades pasan de padres a hijos, es decir hacia abajo, los eventos se disparan hacia arriba, es decir de hijos a padres. Un evento que dispare un componente, puede ser recogido por el padre.

Veámoslo con un ejemplo. El componente `` va a tener una nueva propiedad llamada `onAddOption`:

```javascript
render() {
    return (
      
  )
  }
```

Esta propiedad va a llamar a la función `handleAddOption` en `` para poder modificar el estado:

```javascript
handleAddOption () {
    this.setState({
      menuOptions: this.state.menuOptions.concat(['Nueva Opción'])
    })
  }
```

Cada vez que se llame a la función, añadirá al estado el item `Nueva Opción`. Cómo dijimos al inicio, cada vez que se modifique el estado, se _"re-renderizará"_ el componente y veremos en el navegador la nueva opción añadida.

Para poder llamar a esa función, necesitamos disparar un evento desde el hijo. Voy a añadir un elemento `<button>` y utilizar el evento `onClick` de JSX, que simula al listener de click del ratón y ahi llamaré a la función "propiedad" `onAddOption` del padre.

El código de completo es:

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOptions: ["Opción 1", "Opción 2", "Opción 3"],
    };
  }

  render() {
    return (
      
    );
  }

  handleAddOption() {
    this.setState({
      menuOptions: this.state.menuOptions.concat(["Nueva Opción"]),
    });
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let options = this.props.options;
    return (
      <div>
        <ul>
          {options.map((option) => (
            <li>{option}</li>
          ))}
        </ul>
        <button onClick={this.props.onAddOption}>Nueva Opción</button>
      </div>
    );
  }
}

ReactDOM.render(, document.getElementById("app"));
```

Cada vez que hagamos click en el botón, llamará a la función que le llega por _props_. Ésta función, llama en el componente padre (App) a la función `handleAddOption` y la _bindeamos_ con `this`, para que pueda llamar a `this.setState` dentro de la función. Éste `setState` modifica el estado y llama internamente a la función `render` lo que provoca que se vuelva a "pintar" todo de nuevo.

Y así es como funciona básicamente un componente de React. Más adelante veremos cuales son lo métodos de ciclo de vida y cómo utilizarlos.

Tienes el código de éste otro ejemplo a tu disposición en el siguiente JSBin: [Código](http://jsbin.com/kagejehusa/edit?js,console,output)

¿Quieres aprender más sobre React? Te lo enseño en mi [**curso online** sobre fundamentos de **React.js**](http://cursos.carlosazaustre.es/p/react-js/)
