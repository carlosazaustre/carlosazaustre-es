---
title: Cómo implementar autenticación basada en token con Node.js
date: '2015-02-23'
url: 'https://carlosazaustre.es/blog/autenticacion-con-token-en-node-js'
tags:
  - nodejs
  - javascript
  - tutorial
excerpt: >-
  Aprende a implementar autenticación basada en token con Node.js y Express.
  Guía práctica con código real, modularización y buenas prácticas para tu API
  REST.
---

# Cómo implementar autenticación basada en token con Node.js

> Publicado el 2015-02-23 — https://carlosazaustre.es/blog/autenticacion-con-token-en-node-js

En el [anterior post vimos las bases de la autenticación basada en token en una aplicación web](/que-es-la-autenticacion-con-token/). En este post, vamos a ver como implementar este tipo de **autenticación en un servidor usando Node.js**

Voy a separar las funciones en varios archivos, siguiendo buenas prácticas y modularizando dependendiendo de la funcionalidad.

#### Nuestro servidor en Node.js

Lo primero es crear el archivo `server.js` dónde configuramos Express (en versión 4), importamos los módulos necesarios y hacemos correr el servidor y la base de datos.

Si te pierdes un poco, en [éste post anterior expliqué como crear un API REST en Node.js con Express y MongoDB](/como-crear-una-api-rest-usando-node-js/). Y si prefieres también tengo un [videotutorial en YouTube sobre el tema](https://www.youtube.com/watch?v=SKoK6braZlk&list=PLUdlARNXMVkl9MJl4r90Z1j1nmAfWEPV3).

Configuración básica de un servidor en Node.js utilizando Express v4.

```js
// server.js
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var authCtrl = require('./auth');
var middleware = require('./middleware');

// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', 3000);

// Importamos nuestros modelos,
// en este ejemplo nuestro modelo de usuario
require('./models/user');

// Iniciamos las rutas de nuestro servidor/API
var router = express.Router();

// Rutas de autenticación y login
router.post('/auth/signup', auth.emailSignup);
router.post('/auth/login', auth.emailLogin);

// Ruta solo accesible si estás autenticado
router.get('/private',middleware.ensureAuthenticated, function(req, res) {...} );

// Iniciamos el servidor y la base de datos
mongoose.connect('mongodb://localhost', function(err) {
	// Comprobar errores siempre
    app.listen(app.get('port'), function(){
    	console.log('Express corriendo en http://localhost:3000');
    });
});

```

Simplemente hemos importado los módulos necesarios y la configuración básica de Express. También he importado un archivo con el _Schema_ del modelo `User` donde almacenaremos nuestros usuarios. Las rutas que utilizaremos serán `/auth/signup` para el registro con email y contraseña y `/auth/login` para autenticarnos.

Luego tendremos una ruta adicional, `/private` que sólo podremos acceder a ella si estamos logueados. Si nos fijamos, he creado un middleware para esta última ruta, que se ejecutará antes de la función controladora. Lo he separado en un módulo aparte, de esta manera podemos reutilizar esta función en todas las rutas que queramos que sean privadas.

De igual manera, en las funciones controladores de `/auth/signup` y `/auth/login` utilizo otras funciones importadas como son `auth.emailSignup` y `auth.emailLogin` que definiremos a continuación.

#### Controladores

En el fichero `auth.js` voy a definir las dos funciones controladoras para el registro y autenticación de usuarios.

```js
// auth.js
var mongoose = require("mongoose");
var User = mongoose.model("User");
var service = require("./service");

exports.emailSignup = function (req, res) {
  var user = new User({
    // Creamos el usuario con los campos
    // que definamos en el Schema
    // nombre, email, etc...
  });

  user.save(function (err) {
    return res.status(200).send({ token: service.createToken(user) });
  });
};

exports.emailLogin = function (req, res) {
  User.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
    // Comprobar si hay errores
    // Si el usuario existe o no
    // Y si la contraseña es correcta
    return res.status(200).send({ token: service.createToken(user) });
  });
};
```

En `emailSignup` creo un nuevo usuario, con los campos que estimemos necesarios para nuestra aplicación, por ejemplo el email, nombre, contraseña, etc... Despues de salvar el usuario, enviamos un código `200` de OK en la respuesta, junto con un mensaje en el que pasaremos el token que creamos en la función `service.createToken()` que veremos a continuación.

Para el `emailLogin`, buscamos primero si el usuario existe y comprobamos que la contraseña es correcta o no. Si todo es OK, volvemos a enviar un código `200` en la respuesta HTTP junto con el token.

#### Codificando el JSON Web Token

Ahora vamos al "meollo" de este artículo, la creación de un Token que identifique a nuestro usuario en cada petición HTTP que realice.

Para codificar el token utilizamos una clave secreta. Es importante que esta clave permanezca lo más oculta posible. Una opción es almacenarla en un fichero `config.js` y ese fichero no subirlo al repositorio con `.gitignore` o la opción mejor es utilizar una variable de entorno (con `process.env`) que esté en nuestro servidor, y otra para nuestro entorno de desarrollo.

Sería algo así:

```js
// config.js
module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || "tokenultrasecreto",
};
```

Cuando importemos el fichero `config.js` en la variable `TOKEN_SECRET` tendremos nuestra clave para codificar.

Creamos el servicio que utilizaremos para codificar el token. Para ello vamos utilizar la librería [jwt-simple](https://www.npmjs.com/package/jwt-simple) que nos facilita la vida a la hora de codificar el _payload_ y hace todo el trabajo que expliqué en el [post anterior](/que-es-la-autenticacion-con-token/).

```js
// services.js
var jwt = require("jwt-simple");
var moment = require("moment");
var config = require("./config");

exports.createToken = function (user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};
```

Creamos un objeto `payload` en el que ponemos tres atributos: `sub`, `iat` y `exp`. Que ya [explicamos anteriormente](/que-es-la-autenticacion-con-token/). En `sub` almacenamos el ID del usuario que pasamos por parámetro.

También usamos la librería [moment](http://momentjs.com) para ayudarnos en el manejo de fechas. Con `moment().unix()` conseguimos el tiempo actual en formato UNIX, y con `moment().add(14, "days").unix()` le estamos añadiendo 14 días al momento actual. Muy útil para establecer una fecha de creación y expiración.

Por úlitmo devolvemos el JSON Web Token, codificando el payload con nuestra clave secreta.

#### Acesso a rutas con autenticación.

Cada vez que accedamos a una ruta privada, sólo accesible si estamos autenticados, como por ejemplo `/private`, le pasamos el middleware `ensureAuthenticated` que a continuación programaremos:

```js
// middleware.js
var jwt = require("jwt-simple");
var moment = require("moment");
var config = require("./config");

exports.ensureAuthenticated = function (req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "Tu petición no tiene cabecera de autorización" });
  }

  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: "El token ha expirado" });
  }

  req.user = payload.sub;
  next();
};
```

Lo primero que hacemos en la función es comprobar que la petición, `req` lleva la cabecera de autorización `req.headers.authorization`. Ésto lo envía el Frontend y lo veremos en un próximo post, con Angular.js

Si la petición no envía una autorización, envíamos el código de error `403` de acesso denegado. y si no, tomamos el token.

la cabecera, tendrá una pinta parecida a ésta:

```js
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbsciOiJIUzI1NiJ9.eyJzdWIiOiIWeRtU2ZWMyYjUyNjgxNzE2YmXiNzAxMzIiLCJpYXQiOjE0Mj10MjA0OTEsImV4cCI6MTQy67YzMDA5MX0.IH7ek7Rp_WQJvXeOd8zrBIpeFi4W6kUi_6htmaxv7Ow
```

Sólo tenemos que obtener el token de ese String y lo hacemos con el método `split` de JavaScript:

```js
var token = req.headers.authorization.split(" ")[1];
```

Decodificamos ese token con la función `decode` y la clave secreta y ya podemos identificar al usuario, con el atributo `sub` del objeto `payload`, que según este ejemplo serán un ObjectID de Mongo.

En la próxima entrada, veremos [cómo programar la autenticación en la parte del cliente con Angular.js](/autenticacion-con-token-en-angularjs/).
