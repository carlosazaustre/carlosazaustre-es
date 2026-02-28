---
title: Consumiendo un API REST desde React.js con ECMAScript6
date: '2015-06-25'
url: >-
  https://carlosazaustre.es/blog/consumiendo-un-api-rest-desde-react-js-con-ecmascript6
tags:
  - react
  - javascript
excerpt: >-
  Aprende a consumir un API REST desde React.js usando ECMAScript6. Peticiones
  AJAX con fetch en lugar de XMLHttpRequest y datos JSON en tiempo real.
---

# Consumiendo un API REST desde React.js con ECMAScript6

> Publicado el 2015-06-25 — https://carlosazaustre.es/blog/consumiendo-un-api-rest-desde-react-js-con-ecmascript6

En los [anteriores](/empezando-con-react-js-y-ecmascript-6/) [artículos vimos como empezar con React, mostrando una serie de objetos en una aplicación web](/ejemplo-de-aplicacion-con-react-js-en-ecmascript-6/). Estos objetos estaban en una variable dentro del código de la aplicación web. Lo suyo es que estos datos nos lleguen en formato JSON desde un servicio REST, ya sea nuestro o de un tercero.

En el ejemplo de hoy vamos a llamar un API REST que nos devuelve la información de los empleados en formato JSON, y en nuestra aplicación React vamos a consumirlos usando nuevas funciones presentes en ECMAScript6 que después traduciremos a ES5 para que los navegadores que aún no soportan el nuevo estándar puedan correr la aplicación.

En ES5 si queríamos hacer una petición AJAX de manera nativa (Sin utilizar jQuery o un framework tipo AngularJS) usábamos el objeto `XMLHttpRequest`, de esta manera:

```js
var xhr = new XMLHttpRequest();

xhr.open("GET", "http://miservidor.com/recurso", true);
xhr.send();

xhr.onReadyStateChange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    document.getElementById("myApp").innnerHTML = xhr.responseText;
  }
};
```

Con ECMAScript6 tenemos acceso a una nueva función llamada `fetch` que a través de _Promesas_ nos simplifica y facilita el realizar una petición AJAX de forma nativa. Sería algo así:

```js
fecth("http://miservidor.com/recurso")
  .then((response) => {
    return response.json();
  })
  .then((recurso) => {
    console.log(recurso);
  });
```

En la primera promesa tendríamos la respuesta completa del servidor, con cabeceras, meta-datos, datos, etc.., lo que hacemos es devolver en formato JSON la respuesta para acceder a los datos, de esa manera en la segunda promesa, tendríamos nuestro recurso y y podríamos tratarlo como queramos. Si quieres profundizar más sobre `fetch` te recomiendo [este artículo de **Carlos Villuendas**](http://carlosvillu.com/introduccion-a-la-nueva-api-fetch/) o en inglés, [éste otro de Matt Gaunt en HTML5Rocks](http://updates.html5rocks.com/2015/03/introduction-to-fetch).

Estoy usando _Arrow functions_, una novedad de ES6 que sustituye a las funciones anónimas que pasamos como callbacks. Esto:

```js
.then((response) => {
	...
})
```

es lo mismo que esto:

```js
.then(function(response) {
	...
})
```

Pasamos al código de verdad. En el [siguiente enlace de **github está el repositorio** que he usado para este ejemplo](https://github.com/carlosazaustre/react-fetch). Imaginemos que la siguiente URL: `http://taller-angular.carlosazaustre.es/empleados` me devuelve un JSON compuesto de un array de objetos _Empleado_ que quiero llamar desde mi aplicación web con React.

Vamos a retomar el código del ejemplo anterior, pero cambiando algunas cosas. En primer lugar vamos a crear un nuevo componente `EmpleadoApp` que será el encargado de realizar la petición AJAX.

En este componente vamos a utilizar los `states` de React. Los `props` se definen cuando se crean los componentes, es como una inicialización del componente. Los `states` en cambio hay que pensar en ellos como una colección de datos internos que afectan al renderizado del componente. Por lo tanto, el array de objetos _Empleado_ es un buen candidato para un `state`.

Empezamos a definir el componente con un constructor de la clase.

```js
// empleado-app/index.jsx
import React from "react";
import EmpleadoList from "../empleado-list";

class EmpleadoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { empleados: [] };
  }
}
```

Hemos definido el objeto `empleados` dentro del `state` del componente, como un array vacío de inicio. Después se rellenará con la llamada AJAX.

Además de los `states`, cada componente tiene una serie de funciones o métodos pertenecientes a su ciclo de vida que podemos implementar, son los siguientes:

- **componentWillMount()** Se lanza antes de que se renderice el componente
- **componentDidMount()** Se lanza despues del renderizado del componente
- **shouldComponentUpdate()** Devuelve con un valor si el componente debería actualizarse
- **componentWillUnMount()** Se lanza antes de que el componente se elimine.

En este caso vamos a usar `componentWillMount()` para realizar la llamada AJAX y obtener el listado de empleados, antes de que se renderice el componente. Añadimos pues el siguiente método a nuestra clase `EmpleadoApp`:

```js
componentWillMount() {
    fetch('http://taller-angular.carlosazaustre.es/empleados')
      .then((response) => {
        return response.json()
      })
      .then((empleados) => {
        this.setState({ empleados: empleados })
      })
  }
```

En la respuesta con los datos, la segunda promesa, _seteamos_ el `state` empleados con los datos recibidos. Vamos ahora a implementar el método Render.

Como la llamada AJAX es asíncrona, tendremos un pequeño retardo hasta recibir los datos, y por tanto podemos mostrar un mensaje de _Cargando empleados..._ mientras se produce. Esto lo podemos realizar en la función `render()` con una sencilla comprobación del `state`:

```js
render() {
    if (this.state.empleados.length > 0) {
      return (
        <div className="container-fluid">
          
        </div>
      )
    } else {
      return <p className="text-center">Cargando empleados...</p>
    }
  }
```

Si el array `empleados` tiene elementos, podemos renderizar el componente `EmpleadoList` pasánole a su `prop` listado, los `empleados` que tenemos en el `state`.

Con todos los métodos implementados, nuestro componente `EmpleadoApp` al completo sería así:

```js
// empleado-app/index.jsx
import React from "react";
import EmpleadoList from "../empleado-list";

class EmpleadoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { empleados: [] };
  }

  componentWillMount() {
    fetch("http://taller-angular.carlosazaustre.es/empleados")
      .then((response) => {
        return response.json();
      })
      .then((empleados) => {
        this.setState({ empleados: empleados });
      });
  }

  render() {
    if (this.state.empleados.length > 0) {
      return (
        <div className="container-fluid">
          
        </div>
      );
    } else {
      return <p className="text-center">Cargando empleados...</p>;
    }
  }
}

export default EmpleadoApp;
```

Ya sólo tenemos que modificar el `index.jsx`, el fichero principal de la aplicación donde antes renderizábamos el listado pasándole como atributo el array _a mano_:

```js
// index.jsx
import React from "react";
import EmpleadoApp from "./empleado-app";

React.render(, document.getElementById("application"));
```

Y listo, ya tenemos una aplicación web con React que consume datos desde un servicio REST.

[En el siguiente enlace tienes el **repositorio en GitHub** de este proyecto](https://github.com/carlosazaustre/react-fetch).
