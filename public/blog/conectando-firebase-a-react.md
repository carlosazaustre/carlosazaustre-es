---
title: Cómo conectar Firebase a una aplicación React
date: '2016-10-04'
url: 'https://carlosazaustre.es/blog/conectando-firebase-a-react'
tags:
  - firebase
  - react
related:
  - usando-firebase-storage-con-react-js
  - que-son-las-firebase-cloud-functions
  - gatsby-deploy-firebase
excerpt: >-
  Aprende a conectar Firebase a React paso a paso. Usa la base de datos realtime
  de Google en tu aplicación React con este tutorial práctico en español.
---

# Cómo conectar Firebase a una aplicación React

> Publicado el 2016-10-04 — https://carlosazaustre.es/blog/conectando-firebase-a-react

[Firebase](https://firebase.google.com/) es un set herramientas e infraestructura de Google que nos ayuda a los desarrolladores a implementar un Backend rápidamente sin necesidad de _codear_.

Empezó como una Base de Datos Realtime _as a Service_ pero tras el Evento de Google I/O 2016 se anunciaron multitud de _features_ convirtiendolo en un _Backend As A Service_ vitaminado con Analytics, Grow Tools, Monetización, etc...

En el artículo de hoy voy a utilizar una de sus funcionalidades, como es la base de datos realtime, en conjunto con React.js para probar su funcionamiento

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=qPV-pKUmAv4)
/>

## Creando un proyecto en Firebase

Lo primero que tenemos que hacer es dirigirnos a la web de Firebase en [https://firebase.google.com/](https://firebase.google.com/) y con nuestra cuenta de Google acceder a la consola

![Web de Firebase](/images/conectando-firebase-a-react/1-firebase-login.png)

Una vez dentro de la consola, creamos un nuevo proyecto:
![Consola de Firebase](/images/conectando-firebase-a-react/2-firebase-create-project.png)

Y elegimos el nombre que queramos darle. Para este ejemplo voy a llamarlo `react-firebase` pero puedes ponerle el nombre que prefieras para identificarlo. También nos pedirá una zona geográfica o país para que se acomode a nuestras necesidades según los países de nuestra audiencia.

![Crear proyecto](/images/conectando-firebase-a-react/3-data-project.png)

Una vez creado el proyecto, entramos al dashboard del mismo. Podemos ver que como primer paso nos da la opción de elegir el código para una aplicación iOS, una aplicación Android o una aplicación web.

En este ejemplo vamos a crear una web app con React, por tanto elijo la tercera opción:

![Copiar código](/images/conectando-firebase-a-react/4-select-code-web.png)

Al elegir la opción web nos facilita el `script` que debemos utilizar en un documento HTML si queremos iniciar Firebase:

![Api Keys](/images/conectando-firebase-a-react/5-code-apikey.png)

Nosotros, al utilizar React, únicamente vamos a necesitar el objeto `config` y la función `firebase.initializeApp(config)`. Así que únicamente copiamos ese código que incluye las URLs de nuestro proyecto en Firebase, así como los IDs y API Key necesarios para acceder a su API:

```javascript
const config = {
  apiKey: "AIzaSy***********************",
  authDomain: "react-firebase-94af6.firebaseapp.com",
  databaseURL: "https://react-firebase-94af6.firebaseio.com",
  storageBucket: "react-firebase-94af6.appspot.com",
  messagingSenderId: "796************",
};
firebase.initializeApp(config);
```

Más adelante utilizaremos éste código.

## Creando la Base de Datos Realtime

Dentro del panel del control de nuestro proyecto, en el menú de la izquierda, tenemos la opción **Database**, si hacemos click en la opción accedemos al dashboard para crear y administrar nuestra base de datos.

La [base de datos que ofrece Firebase](https://firebase.google.com/docs/database/) es del tipo NoSQL y guarda los datos en formato JSON. Algo parecido a MongoDB por ejemplo.

Para empezar crearemos un objeto con el nombre `object` con una propiedad `name` cuyo valor sea, por ejemplo: `Carlos`. Esto lo veremos reflejado en nuestra app más adelante.

![Administrador de la base de datos](/images/conectando-firebase-a-react/6-database-console.png)

## Creando nuestra WebApp React

Ahora pasamos a crear nuestra aplicación React.js, lo primero que hacemos es iniciar un proyecto con NPM escribiendo en la terminal:

```shell
$ npm init -y
```

Y seguidamente, como cualquier proyecto que hagamos en React, y utilicemos Babel y Webpack instalamos las dependencias:

```shell
$ npm i -S react react-dom
$ npm i -D webpack webpack-dev-server babel-cli babel-preset-es2015 babel-preset-stage-2 babel-loader
```

Y creamos un fichero `webpack.config.js` típico como el que expliqué en mi [anterior artículo](/primeros-pasos-con-webpack/)

Vamos a implementar toda la funcionalidad en un mismo fichero para reducir la complejidad del tutorial. El fichero en cuestión lo vamos a llamar `app.jsx`

En este fichero vamos a crear un componente React sencillo y después le añadiremos la conexión a Firebase. Tiene la siguiente pinta:

```javascript
// app.jsx
import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  render() {
    return <h1>Hola!</h1>;
  }
}

ReactDOM.render(, document.getElementById("app"));
```

Éste código, después de aplicar el _transpiler_ con babel, de momento va a mostrar en el navegador una etiqueta `<h1>` con el texto `Hola!`.

Ahora le aplicamos la magia de Firebase

## Conectando Firebase a React

Lo primero en esta parte es instalar la dependencia de Firebase desde npm, con ella podemos acceder al API de Firebase y utilizar sus funcionalidades

```shell
$ npm install --save firebase
```

Después, además de importar la librería recién instalada y antes de crear el componente, vamos a añadir la configuración que copiamos anteriormente del panel de control de Firebase:

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSy*********************',
  authDomain: 'react-firebase-94af6.firebaseapp.com',
  databaseURL: 'https://react-firebase-94af6.firebaseio.com',
  storageBucket: 'react-firebase-94af6.appspot.com',
  messagingSenderId: '7968**********'
}
firebase.initializeApp(config)

class App extends Component { ... }
```

Seguidamente, vamos implementar el constructor del componente, para añadirle una propiedad al estado.
Como vimos en un [artículo anterior](/estructura-de-un-componente-en-react/), el estado es importante porque a cada cambio que se produzca en él, se invocará al método `render()` automáticamente y mostrará la nueva información en el navegador.

Por tanto, añadimos al estado la propiedad `name` con el valor `Pepe`.

```javascript
class App extends Component {
  constructor() {
    super();
    this.state = { name: "Pepe" };
  }
}
```

Y cambiamos en el método `render()` el texto a renderizar para que muestre el estado:

```javascript
render () {
  return <h1>{this.state.name}</h1>
}
```

Ahora... ¿Cómo hacemos para modificar el estado según el valor que tengamos en la base de datos?

Para ello vamos a utilizar un método del ciclo de vida del componente React: `componentDidMount()`. Éste método solo se ejecuta una única vez en una aplicación cliente. Cuando se ejecuta, el componente ya está representado en el DOM y ya podemos acceder a él. En éste método es dónde podemos utilizar llamadas AJAX, integrar otras librerías, añadir _listeners_, etc..

Por tanto, aquí es buen lugar para acceder a Firebase. Como ya tenemos inicializado Firebase unas líneas más arriba, cada vez que realicemos una llamada a `firebase` estaremos accediendo a nuestra base de datos.

Vamos a crear una referencia al objeto que contiene el nombre, eso lo hacemos con la siguiente función:

```javascript
const nameRef = firebase.database().ref().child("object").child("name");
```

Con este objeto, podemos añadir un _listener_ que se dispare cada vez que cambie el valor del nombre. Eso lo podemos conseguir con el _listener_ `value`. Éste listener nos va a dar un _snapshot_ que guarda la información del instante en el que se disparó el evento y es cuando podremos actualizar el estado:

```javascript
nameRef.on("value", (snapshot) => {
  this.setState({
    name: snapshot.val(),
  });
});
```

De ésta manera, cada vez que se actualice el valor del nombre en la base de datos, se disparará el evento del listener, y tendremos un snapshot del valor actual. Cuando ésto ocurra, actualizamos el estado con el nuevo valor y ésto produce un _re-renderizado_ del componente en el navegador donde veremos reflejado el valor cambiado

Antes de probarlo, debemos modificar las opciones de privacidad de la base de datos. Como no estamos implementando autenticación, vamos dejar a `true` los campos de `read` y `write`:

![Permisos](/images/conectando-firebase-a-react/7-permisos.png)

Una vez hecho, podemos ver los cambios refeljados en tiempo real:

![Firebase Realtime Database](/images/conectando-firebase-a-react/ezgif-com-crop.gif)

Esto es sólo la base de la conexión de Firebase con React. A partir de aquí las posibilidades son ilimitadas :)

¿Quieres aprender más sobre React? Te lo enseño en mi [**curso online** sobre fundamentos de **React.js**](http://cursos.carlosazaustre.es/p/react-js/)
