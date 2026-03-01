---
title: 'WebSockets: Cómo utilizar Socket.io en tus aplicaciones web'
date: '2015-09-24'
url: >-
  https://carlosazaustre.es/blog/websockets-como-utilizar-socket-io-en-tu-aplicacion-web
tags:
  - nodejs
  - javascript
  - web
  - tutorial
related:
  - como-crear-una-api-rest-usando-node-js
  - >-
    primera-aplicacion-web-en-raspberrypi-con-nodejs-cylonjs-controlando-leds-desde-el-movil
  - desarrollo-full-stack-javascript-tambien-conocido-como-mean
excerpt: >-
  Aprende a usar WebSockets con Socket.io en tus aplicaciones web. Comunicación
  bidireccional en tiempo real entre cliente y servidor de forma sencilla.
---

# WebSockets: Cómo utilizar Socket.io en tus aplicaciones web

> Publicado el 2015-09-24 — https://carlosazaustre.es/blog/websockets-como-utilizar-socket-io-en-tu-aplicacion-web

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=ppiAvvkvAz0)
/>

Los [websockets](http://www.html5rocks.com/en/tutorials/websockets/basics/) son una tecnología que permite una comunicación bidireccional entre cliente y servidor sobre un único socket TCP. En cierta manera es un buen sustituto de AJAX como tecnología para obtener datos del servidor, ya que no tenemos que pedirlos, el servidor nos los enviará cuando haya nuevos.

Uno de los ejemplos más comunes para aprender a utilizar websockets, es desarrollando chat. Es lo que es lo que veremos en este tutorial.

> En mi [canal de Youtube](https://www.youtube.com/user/azaman1984) puedes verlo en formato **videotutorial**

Lo único que necesitaremos para que funcione es un servidor de websockets, que construiremos en Node.js con la librería [Socket.io](http://socket.io/) que nos facilita el desarrollo de aplicaciones utilizando Websockets en el cliente y en el servidor.

### Iniciando la aplicación

Empezamos creando un paquete de Node con `npm init -y` para generar un `package.json` con las opciones por defecto:

```js
{
  "name": "sockets",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [],
  "author": "Carlos Azaustre",
  "license": "ISC"
}
```

Ahora crearemos un fichero `server/main.js` que será nuestro servidor web. Para ello necesitaremos las librerías `express` y `socket.io` que instalamos vía `npm`:

```js
$ npm install --save express
$ npm install --save socket.io
```

En `server/main.js` creamos una aplicación con **express**, que pasaremos a un servidor http y todo esto irá ligado al servidor de websockets que creamos con **socket.io**

```js
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
```

Pondremos el servidor a escuchar en `localhost` con el puerto `8080`:

```js
server.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});
```

Para probar nuestro chat vamos a tener un array de mensajes de prueba que enviaremos cuando se conecte un cliente web.

```js
var messages = [
  {
    author: "Carlos",
    text: "Hola! que tal?",
  },
  {
    author: "Pepe",
    text: "Muy bien! y tu??",
  },
  {
    author: "Paco",
    text: "Genial!",
  },
];
```

Ahora necesitamos que el servidor de websockets, que lo tenemos en la variable `io`, esté atento a que se realice una conexión. Eso lo logramos con `io.on()` y pasándole el mensaje `connection`. Dentro de éste método enviaremos el array de objetos mensaje con el evento `'messages'`:

```js
io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);
});
```

El evento `messages` lo recogeremos en el cliente, en el fichero JavaScript de la parte cliente. Así que ahora es momento de crear la parte pública de la aplicación con un `index.html` y un `main.js`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Aplicación con Sockets</title>
    <script src="/socket.io/socket.io.js"></script>
    <script src="main.js"></script>
  </head>
  <body>
    <h1>My App</h1>
  </body>
</html>
```

El `index.html` además de enlazar el `main.js` enlaza en su `<head>` el script de `socket.io`.
Socket.io es una librería que funciona tanto en cliente como servidor precisamente para conseguir la conexión bidireccional.

### Recibiendo mensajes

En `main.js` (de la parte cliente) conectamos el cliente con el servidor de websockets que tenemos en `http://localhost:8080` y escuchamos el evento `messages`.

```js
var socket = io.connect("http://localhost:8080", { forceNew: true });

socket.on("messages", function (data) {
  console.log(data);
});
```

`data` tendrá el array de mensajes que envía el servidor. En lugar de imprimirlo por consola queremos que se muestre en el HTML, por tanto vamos a cambiar algunas cosas.

Primero añadimos un `div` con el id `messages` donde pondremos todos los mensajes que lleguen.

```html
<div id="messages"></div>
```

Después en nuestro `server/main.js` tenemos que indicar cual es la ruta que tendrán los ficheros estáticos, lo hacemos con el middleware `express.static`.

```js
app.use(express.static("public"));
```

Siendo `public` la carpeta donde tenemos el `index.html` y el `main.js`.

En `main.js` del cliente, vamos a crear una función que llamaremos `render()` que se encargará de pintar en el HTML los mensajes:

```js
function render(data) {
  var html = data
    .map(function (elem, index) {
      return `<div>
        		 <strong>${elem.author}</strong>:
                 <em>${elem.text}</em>
        </div>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

socket.on("messages", function (data) {
  render(data);
});
```

Lo que hace esta función es iterar sobre los datos que llegan a través del socket con la función `map` de JavaScript, y para cada elemento del array pinta una plantilla HTML con el nombre del autor y el texto del mensaje de cada elemento-mensaje.

Para este ejemplo estamos usando una de las [novedades de ECMAScript6 o ECMAScript2015](/ecmascript6) que ya pueden usarse en el navegador sin necesidad de utilizar transpiladores como **Babel.js**, y son los _Template Strings_ que no es más que escribir Strings delimitados con el acento invertido y nos permite prescindir de concatenaciones con el símbolo `+` y podemos utilizar variables con `${nombre_variable}` para pintarlas dentro del String.

Después usamos el método `join`, que pintará los elementos del array separados por un espacio. Si no hacemos eso, nos pintará una coma `,` entre los elementos.

Por último, cuando el template esté completo lo insertamos en el DOM, dentro del `div` con id `messages`

### Enviando mensajes

Ya recibimos mensajes y los pintamos en el HTML, pero ahora para tener un chat más completo, queremos poder enviar mensajes propios, notificar al servidor y que este se encargue de que todos los clientes web conectados reciban esos mensajes al instante, sin tener que preguntar si hay nuevos.

Para poder enviar mensajes, lo primero que necesitamos es un formulario en nuestro HTML:

```html
<form onsubmit="return addMessage(this)">
  <input type="text" id="username" placeholder="Tu Nombre" />
  <input type="text" id="texto" placeholder="Cuéntanos algo..." />
  <input type="submit" value="Enviar!" />
</form>
```

El formulario tendrá dos campos, para el nombre del autor y para el texto del mensaje, además del botón de `submit` para enviar. Lo que no tiene este formulario es un action, ya que eso provocaría que se recargara la página. Por ello, para saber cuando se envía el formulario utilizaremos el evento `onsubmit` que llamará a la función `addMessage` de la aplicación cliente.

Definamos la función en el fichero `public/main.js`

```js
function addMessage(e) {
  var mensaje = {
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
  };

  socket.emit("new-message", mensaje);
  return false;
}
```

La función simplemente recoge el valor de los inputs del autor y el texto y los envía por el socket con el mensaje `new-mensaje` para que lo escuche el servidor. Por tanto ahora es el momento de escuchar ese evento en el servidor. Volvemos a `server/main.js`

```js
socket.on("new-message", function (data) {
  messages.push(data);

  io.sockets.emit("messages", messages);
});
```

El socket escuchará el evento `new-message` y cuando llegue traerá consigo los datos en `data`. Lo que haremos será añadir ese nuevo mensaje que nos llega en `data` al array de `messages` con el método push.

Y ahora para notificar a los clientes conectados tenemos que avisarles de alguna forma. Si lo hacemos con `socket.emit` estamos creando una comunicación 1:1, pero una sala de chat no es así, no es una comunicación privada. Tenemos que notificar a todos los clientes conectados. Esto lo conseguimos con `io.sockets.emit` que notificará a todos los sockets conectados.

De esta forma si abrimos varios navegadores en la URL `http://localhost:8080`, podemos ver que la actualización es instantánea. Todo gracias a los websockets :)

![Ejemplo con Websockets](/images/websockets-como-utilizar-socket-io-en-tu-aplicacion-web/websockets-ejemplo.jpg).

Esto es sólo una prueba de concepto. Con websockets se pueden hacer muchas cosas, como videojuegos combinándolo con canvas, o imagina una pizarra colaborativa dónde tu pintas algo y todos los que están viendo esa web pueden en tiempo real ver lo que estás haciendo.

### Código de la aplicación

Este es el código completo utilizado en este tutorial, como puedes ver es muy simple. En pocas líneas de código puedes implementar una comunicación totalmente realtime:

- public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Aplicación con Sockets</title>
    <script src="/socket.io/socket.io.js"></script>
    <script src="main.js"></script>
  </head>
  <body>
    <h1>My App</h1>
    <div id="messages"></div>
    <br />
    <form onsubmit="return addMessage(this)">
      <input type="text" id="username" placeholder="Tu Nombre" />
      <input type="text" id="texto" placeholder="Cuéntanos algo..." />
      <input type="submit" value="Enviar!" />
    </form>
  </body>
</html>
```

- public/main.js

```js
var socket = io.connect("http://localhost:8080", { forceNew: true });

socket.on("messages", function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data
    .map(function (elem, index) {
      return `<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

function addMessage(e) {
  var message = {
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
  };

  socket.emit("new-message", message);
  return false;
}
```

- server/main.js

```js
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var messages = [
  {
    id: 1,
    text: "Hola soy un mensaje",
    author: "Carlos Azaustre",
  },
];

app.use(express.static("public"));

app.get("/hello", function (req, res) {
  res.status(200).send("Hello World!");
});

io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con Sockets");
  socket.emit("messages", messages);

  socket.on("new-message", function (data) {
    messages.push(data);

    io.sockets.emit("messages", messages);
  });
});

server.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});
```

> Esto y mucho más está incluido mi libro **Aprendiendo JavaScript**, [disponible en LeanPub](http://leanpub.com/aprendiendojavascript).
