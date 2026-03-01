---
title: 'Cómo crear un API REST usando Node.js, Express y MongoDB'
date: '2017-09-21'
url: 'https://carlosazaustre.es/blog/como-crear-una-api-rest-usando-node-js'
tags:
  - nodejs
  - javascript
  - tutorial
  - web
related:
  - autenticacion-con-token-en-node-js
  - como-relacionar-tus-modelos-en-mongodb
  - como-servir-tu-api-rest-en-node-js-a-traves-de-nginx
excerpt: >-
  Aprende a crear una API REST con Node.js, Express y MongoDB paso a paso.
  Tutorial completo del stack MEAN con Mongoose y operaciones CRUD desde cero.
---

# Cómo crear un API REST usando Node.js, Express y MongoDB

> Publicado el 2017-09-21 — https://carlosazaustre.es/blog/como-crear-una-api-rest-usando-node-js

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=SKoK6braZlk)
/>

El primer paso para implementar un <a href="/desarrollo-full-stack-javascript-tambien-conocido-como-mean/">sitio web moderno</a> es la construcción de un API REST que podemos consumir desde una aplicación web, mobile o nativa.

En éste tutorial explicaré como desarrollar servidor web que sirva una <a href="http://en.wikipedia.org/wiki/REST_API">API RESTful</a> usando para ello la tecnología de <a href="http://nodejs.org/">Node.js</a> y <a href="http://www.mongodb.org/">MongoDB</a> como base de datos. Es el llamado <b>MEAN Stack</b> También es una buena opción para empezar y aprender Node.js desde cero.

Como framework para Node, voy a emplear **Express** en su versión 4.x y para conectarme a Mongo y mapear los modelos de datos, utilizaré [Mongoose](http://mongoosejs.com/).

Una API RESTful es aquella que emplea todos los verbos HTTP (GET, POST, PUT y DELETE mayormente) Como ejemplo para este tutorial, desarrollaré una aplicación [**CRUD** (Create/Read/Update/Delete)](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) que utiliza todos los verbos HTTP, para mostrar como trabaja. Vamos allá!

## Cambios en Express versión 4 con respecto a la versión 3.x

![Tutorial desarrollo de un API REST con NodeJS, Express y MongoBD](/images/como-crear-una-api-rest-usando-node-js/tutorial-api-res-node-js-express-mongo-mongoose.png)

Esto es importante En la versión 4, varios _middlewares_ fueron eliminados de Express y ahora son dependencias separadas, como es el caso de _bodyParser, compress, logger, session, favicon, methodOverride, etc…_

Ya no se encuentran dentro del paquete *Express* y hay que importarlos como un módulo aparte si tenemos pensado utilizarlos. De esta manera _Express_ es ahora un módulo más ligero.

## Desarrollando nuestro API RESTful

### Iniciando el proyecto

El primer paso es crear un directorio en tu entorno local para la aplicación, e iniciar un repositorio para guardar los cambios y que luego podamos desplegarlo por ejemplo en Heroku. Yo personalmente uso [Git](http://git-scm.com/) porque es una maravilla de la creación y porque a Heroku es lo que le mola ;)

```js
$ mkdir node-api-rest-example
$ cd node-api-rest-example
$ git init
```

Antes de empezar, necesitas tener Node instalado en tu ordenador, para que funcione en tu entorno local de desarrollo. Para ello si tienes Mac te recomiendo que lo hagas de la siguiente manera:

```js
$ brew update
$ brew install node
```

Puede que lleve unos minutos mientras se descargan los paquetes. Una vez tengas node instalado, podemos empezar :)

El primer código que necesitamos escribir en una aplicación basada en Node es el archivo `package.json`. Éste archivo nos indica que dependencias vamos a utilizar en ella. Este archivo va en el directorio raíz de la aplicación:

Por lo tanto `package.json` tendrá:

```js
{
 "name": "node-api-rest-example",
 "version": "2.0.0",
 "dependencies": {
 "mongoose": "~3.6.11",
 "express": "^4.7.1",
 "method-override": "^2.1.2",
 "body-parser": "^1.5.1"
 }
}
```

Y ahora para descargar las dependencias escribimos lo siguiente en la consola y NPM (el gestor de paquetes de Node) se encargará de instalarlas.

```shell
$ npm install
```

### Nuestro servidor Node.js

Con todo listo, podemos comenzar a _codear_ de verdad. Creamos un fichero llamado `app.js` en el directorio raíz que será el que ejecute nuestra aplicación y arranque nuestro server. Crearemos en primer lugar un sencillo servidor web para comprobar que tenemos todo lo necesario instalado, y a continuación iremos escribiendo más código.

```js
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");
mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(router);

app.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});
```

¿Qué hace este código? Muy sencillo, las primeras líneas se encargan de incluir las dependencias que vamos a usar, algo así como los includes en C o PHP, o los import de Python. Importamos [Express](http://expressjs.com/) para facilitarnos crear el servidor y realizr llamadas HTTP. Con `http` creamos el servidor que posteriormente escuchará en el puerto 3000 de nuestro ordenador (O el que nosotros definamos).

Con `bodyParser` permitimos que pueda _parsear_ JSON, `methodOverride()` nos permite implementar y personalizar métodos HTTP.

Podemos declarar las rutas con `app.route(nombre_de_la_ruta)` seguido de los verbos `.get()`, `.post()`, etc… y podemos crear una instancia para ellas con `express.Router()`. En este primer ejemplo vamos hacer que sólo reciba una petición `GET` del navegador y muestre en el mismo la frase `Hello World`

Para ejecutar este pequeño código sólo tienes que escribir en consola lo siguiente y abrir un navegador con la url [http://localhost:3000](http://localhost:3000)

```js
$ node app.js
Node server running on http://localhost:3000
```

Si todo va bien, esto es lo que se verá:

![Tutorial de NodeJS creando API REST - Hello World Node](/images/como-crear-una-api-rest-usando-node-js/tutorial_api_rest_en_node-holamundo.png)

Y como usamos GIT, no hay que olvidarse de hacer _commit_ de nuestro código. Puedes descargar el código fuente de este proyecto en el [repositorio que tengo en GitHub](https://github.com/carlosazaustre/node-api-rest-example/tree/feature-express4)

```js
$ git add .
$ git commit -m 'Initial commit'
```

### Creando los modelos de nuestra API REST

En esta parte vamos a crear un modelo usando [Mongoose](http://mongoosejs.com/) para poder guardar la información en la base de datos siguiendo el esquema. Como base de datos vamos a utilizar [MongoDB](http://www.mongodb.org/).[ MongoDB es una base de datos Open Source NoSQL orientada a documentos tipo JSON](http://en.wikipedia.org/wiki/MongoDB), lo cual nos viene que ni pintado para entregar los datos en este formato en las llamadas a la API. Si quieres ver un buen resumen de MongoDB te recomiendo [ésta presentación de **Israel Gutierrez**](http://www.slideshare.net/gootyfer/full-metal-mongo) (amigo y profe) que incluye las nociones básicas.

Para este ejemplo vamos a crear una base de datos de series de TV, por tanto vamos a crear un modelo (Archivo: `models/tvshow.js`) que incluya la información de una serie de TV, como pueden ser su título, el año de inicio, país de producción, una imagen promocional, número de temporadas, género y resumen del argumento:

```js
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var tvshowSchema = new Schema({
  title: { type: String },
  year: { type: Number },
  country: { type: String },
  poster: { type: String },
  seasons: { type: Number },
  genre: {
    type: String,
    enum: ["Drama", "Fantasy", "Sci-Fi", "Thriller", "Comedy"],
  },
  summary: { type: String },
});

module.exports = mongoose.model("TVShow", tvshowSchema);
```

Con esto ya podemos implementar la conexión a la base de datos en el archivo `app.j`\* añadiendo las siguientes líneas:

```js
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tvshows");
```

Quedando así el código de _app.js_:

```js
var express = require("express"),
  app = express(),
  http = require("http"),
  server = http.createServer(app),
  mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(router);

mongoose.connect("mongodb://localhost/tvshows", function (err, res) {
  if (err) {
    console.log("ERROR: connecting to Database. " + err);
  }
  app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
  });
});
```

Para que esto funcione en nuestro entorno local, necesitamos tener instalado MongoDB. Dependiendo de vuestro sistema operativo de hace de una forma u otra. [Aquí tenéis la documentación oficial](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/). Si tienes Mac, se instala de la misma manera que Node.js:

```shell
$ brew update
$ brew install mongodb
```

Una vez hecho esto, para poder iniciar MongoDB debes ejecutar en otra terminal:

```js
$ mongod
all output going to: /usr/local/var/log/mongodb/mongo.log
```

Con Mongo arrancado ya podemos ejecutar la aplicación como en la parte anterior con `node app.js` desde la terminal, si todo va bien tendremos algo en la pantalla como esto:

```js
$ node app.js
Node server running on http://localhost:3000
Connected to Database
```

Ahora desde otra terminal, podemos entrar al shell de MongoDB y comprobar que la base de datos se ha creado correctamente. Para ello ejecutamos el comando `mongo`

```js
$ mongo
MongoDB shell version: 2.4.1
connecting to: test
> use tvshows
switched to db tvshows
> show dbs
local	0.078125GB
tvshows	(empty)
>_
```

Ya tenemos todo configurado y listo para albergar los datos, sólo nos queda crear las rutas que definirán las llamadas a la API para poder guardar y consultar la información

### Implementando los controladores de nuestas rutas o _endpoints_

los controladores de las rutas de nuestro API los vamos a crear en un archivo separad que llamaremos `controllers/tvshows.js`. Gracias a `exports` conseguimos modularizarlo y que pueda ser llamado desde el archivo principal de la aplicación. El código de a continuación es el comienzo del archivo con la primera función que será la que devuelva todos los registros almacenados:

```js
//File: controllers/tvshows.js
var mongoose = require("mongoose");
var TVShow = mongoose.model("TVShow");

//GET - Return all tvshows in the DB
exports.findAllTVShows = function (req, res) {
  TVShow.find(function (err, tvshows) {
    if (err) res.send(500, err.message);

    console.log("GET /tvshows");
    res.status(200).jsonp(tvshows);
  });
};
```

De esta manera tan sencilla, al llamar a la función `findAllTVShows` se envia como respuesta toda la colección de `tvshows` almacenada y en formato [JSON](http://www.json.org/). Si queremos que sólo nos devuelva un registro con un identificador único, tenemos que crear una función tal que la siguiente:

```js
//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
	TVShow.findById(req.params.id, function(err, tvshow) {
    if(err) return res.send(500. err.message);

    console.log('GET /tvshow/' + req.params.id);
		res.status(200).jsonp(tvshow);
	});
};
```

Con las funciones `find()` y `findById()` podemos buscar en la base de datos a partir de un modelo. Ahora desarrollaré el resto de funciones que permiten insertar, actualizar y borrar registros de la base de datos. La función de a continuación sería la correspondiente al método POST y lo que hace es añadir un nuevo objeto a la base de datos:

```js
//POST - Insert a new TVShow in the DB
exports.addTVShow = function (req, res) {
  console.log("POST");
  console.log(req.body);

  var tvshow = new TVShow({
    title: req.body.title,
    year: req.body.year,
    country: req.body.country,
    poster: req.body.poster,
    seasons: req.body.seasons,
    genre: req.body.genre,
    summary: req.body.summary,
  });

  tvshow.save(function (err, tvshow) {
    if (err) return res.status(500).send(err.message);
    res.status(200).jsonp(tvshow);
  });
};
```

Primero creamos un nuevo objeto `tvshow` siguiendo el patrón del modelo, recogiendo los valores del cuerpo de la petición, lo salvamos en la base de datos con el comando `.save()` y por último lo enviamos en la respuesta de la función.

La siguiente función nos permitirá actualizar un registro a partir de un ID. Primero buscamos en la base de datos el registro dado el ID, y actualizamos sus campos con los valores que devuelve el cuerpo de la petición:

```js
//PUT - Update a register already exists
exports.updateTVShow = function (req, res) {
  TVShow.findById(req.params.id, function (err, tvshow) {
    tvshow.title = req.body.petId;
    tvshow.year = req.body.year;
    tvshow.country = req.body.country;
    tvshow.poster = req.body.poster;
    tvshow.seasons = req.body.seasons;
    tvshow.genre = req.body.genre;
    tvshow.summary = req.body.summary;

    tvshow.save(function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(tvshow);
    });
  });
};
```

Y por último para completar la funcionalidad CRUD de nuestra API, necesitamos la función que nos permita elminar registros de la base de datos y eso lo podemos hacer con el código de a continuación:

```js
//DELETE - Delete a TVShow with specified ID
exports.deleteTVShow = function (req, res) {
  TVShow.findById(req.params.id, function (err, tvshow) {
    tvshow.remove(function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).send();
    });
  });
};
```

Como puedes ver, usamos de nuevo el método `.findById()` para buscar en la base de datos y para borrarlo usamos `.remove()` de la misma forma que usamos el `.save()` para salvar.

Ahora tenemos que unir estas funciones a las peticiones que serán nuestras llamadas al API. Volvemos a nuestro archivo principal, `app.js` y declaramos las rutas, siguiendo las pautas de Express v.4

```js
var TVShowCtrl = require("./controllers/tvshows");

// API routes
var tvshows = express.Router();

tvshows
  .route("/tvshows")
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows
  .route("/tvshows/:id")
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

app.use("/api", tvshows);
```

El archivo completo [**controllers/tvshows.js**](https://github.com/carlosazaustre/node-api-rest-example/blob/feature-express4/controllers/tvshows.js) lo puedes ver y descargar [desde el repositorio en GitHub](https://github.com/carlosazaustre/node-api-rest-example/blob/feature-express4/controllers/tvshows.js).

#### Probando nuestro API REST en el navegador

A continuación voy a probar una herramienta online que nos permite _jugar_ con las llamadas al API y poder consultar y almacenar datos para probarla y ver su funcionamiento un poco más claro.

Para ello nos dirijimos a [restconsole.com](http://restoconsole.com) que es una extensión de [Google Chrome](https://www.google.com/intl/en/chrome/browser/), que permite hacer lo que queremos de una manera visual y sencilla.

![Tutorial desarrollo de un API REST con NodeJS - REST Console](/images/como-crear-una-api-rest-usando-node-js/tutorial_api_rest_en_node-restconsole.png)

Antes de probarlo, debemos tener mongo y el servidor node de nuestra app corriendo. Una vez hecho esto introducimos los siguientes datos para hacer una llamada POST que almacene un registro en la base de datos.

- **Target**: http://localhost:3000/tvshow (Dónde está ejecutándose la aplicación y la llamada al método POST que hemos programado)
- **Content-Type**: application/json (en los dos input que nos dan)
- **Request-Payload**: Aquí va el cuerpo de nuestra petición, con el objeto JSON siguiente (por ejemplo):

```js
{
  "title": "LOST",
  "year": 2004,
  "country": "USA",
  "poster": "http://ia.media-imdb.com/images/M/MV5BMjA3NzMyMzU1MV5BMl5BanBnXkFtZTcwNjc1ODUwMg@@._V1_SY317_CR17,0,214,317_.jpg",
  "seasons": 6,
  "genre": "Sci-Fi",
  "summary": "The survivors of a plane crash are forced to live with each other on a remote island, a dangerous new world that poses unique threats of its own."
}
```

![Tutorial desarrollo de un API REST con NodeJS REST Console POST](/images/como-crear-una-api-rest-usando-node-js/tutorial_api_rest_en_node-restconsole-post.png)

Pulsamos `SEND` y si todo va bien, la petición se realizará y abajo de la aplicación _REST Console_ veremos algo como esto:

![Tutorial desarrollo de un API REST con NodeJS - REST Console Response a POST](/images/como-crear-una-api-rest-usando-node-js/tutorial_api_rest_en_node-restconsole-response.png)

¿Cómo comprobamos si se ha guardado en nuestra base de datos? Muy sencillo, en nuestro terminal ejecutamos el Shell de mongo con el comando `mongod` e introducimos los siguiente comandos:

```shell
$ mongo
MongoDB shell version: 2.4.1
connecting to: test
> show databases
tvshows	0.203125GB
> use tvshows
switched to db tvshows
> show collections
system.indexes
tvshows
> db.tvshows.find()
{ "title" : "LOST", "year" : 2004, "country" : "USA", "poster" : "http://ia.media-imdb.com/images/M/MV5BMjA3NzMyMzU1MV5BMl5BanBnXkFtZTcwNjc1ODUwMg@@._V1_SY317_CR17,0,214,317_.jpg", "seasons" : 6, "genre" : "Sci-Fi", "summary" : "The survivors of a plane crash are forced to live with each other on a remote island, a dangerous new world that poses unique threats of its own.", "_id" : ObjectId("51b44d7899ac57fb18000002"), "__v" : 0 }

```

Y ahi la tenemos, puedes probar a introducir alguna más, para tener mayor contenido con el que probar. Una vez introduzcas varios registros, puedes probar a llamarlos a través de la petición GET que hemos preparado: `http://localhost:3000/tvshows` la cuál te mostrará algo parecido a esto:

![Tutorial de NodeJS, creando un API REST - Petición GET](/images/como-crear-una-api-rest-usando-node-js/tutorial_api_rest_en_node-response_get.png)
También podemos llamar a un sólo registro gracias a la petición `GET tvshows/:id` que programamos, si ejecutamos por ejemplo **http://localhost:3000/tvshow/51b44d7899ac57fb18000002** nos devolverá un único objeto:

![Tutorial de NodeJS, creando un API REST - Petición GET con ID ](/images/como-crear-una-api-rest-usando-node-js/tutorial_api_rest_en_node-response-get-id.png)

Los métodos restantes `PUT` y `DELETE` funcionan de manera parecida al `POST` sólo que hay que pasarte el valor del ID del objeto que queremos actualizar o borrar. Te invito a que lo pruebes en la [Tutorial de NodeJS, creando un API REST - REST Console](http://restconsole.com).

Con esto tendríamos el funcionamiento básico y programación de lo que sería una API REST. Como puedes ver es bastante sencillo y utilizas Javascript en todas partes, como lenguaje de servidor ([Node](http://nodejs.org)), como formato de datos ([JSON](http://json.org)) y como base de datos ([MongoDB](http://www.mongodb.org/))

A continuación te dejo una serie de video tutoriales de [mi canal de YouTube](https://www.youtube.com/user/azaman1984) sobre éste tema

> Todo el código utilizado está subido en el[ repositorio que he creado en GitHub](https://github.com/carlosazaustre/node-api-rest-example/tree/feature-express4), te animo a descargarlo, probarlo y modificarlo para aprender :)
