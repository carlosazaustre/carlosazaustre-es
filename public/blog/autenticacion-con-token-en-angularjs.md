---
title: Cómo hacer autenticación basada en token con AngularJS
date: '2015-02-26'
url: 'https://carlosazaustre.es/blog/autenticacion-con-token-en-angularjs'
tags:
  - angular
  - javascript
  - tutorial
---

# Cómo hacer autenticación basada en token con AngularJS

> Publicado el 2015-02-26 — https://carlosazaustre.es/blog/autenticacion-con-token-en-angularjs

Bienvenid@ a la última entrega de la serie de **Autenticación basada en token en aplicaciones web**. En las anteriores entradas vimos las [bases de este método](/que-es-la-autenticacion-con-token/) y [cómo programarlo en nuestro servidor o API REST con Node.js](/autenticacion-con-token-en-node-js/). En éste artículo veremos **como implementarlo en el lado del cliente con Angular.js**

#### Usando librerías de terceros

Podemos hacerlo de varias maneras. Implementarlo manualmente o utilizar una librería que nos facilite el desarrollo. Yo recomiendo esto último y en concreto la **librería [Satellizer](https://github.com/sahat/satellizer)**, desarrollada por [Sahat Yalkabov](http://sahatyalkabov.com/) que desarrolló durante su etapa de _non-student_ en la [Hacker School](https://www.hackerschool.com/) de Nueva York.

Esta librería soporta autenticación por usuario/contraseña además de proveedores OAuth como Facebook, Twitter, Google, Github, etc... Es sencilla de usar y funciona perfectamente. A continuación veremos como configurarla.

#### Instalación y configuración

Primero necesitamos instalarla, podemos hacerlo por Bower o si usamos Browserify por NPM.

```
$ bower install --save satellizer
```

De seguido, en nuestro fichero principal de Angular, supongamos el `app.js`, importamos el módulo y configuramos la librería. El nombre de la directiva que utiliza _Satellizer_ es `$auth` y `$authProvider`.

```js
angular
	.module("myApp", ["satellizer"])
    .config(function($authProvider) {
    	// Parametros de configuración
        $authProvider.loginUrl = "http://api.com/auth/login";
        $authProvider.signupUrl = "http://api.com/auth/signup";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "myApp",
    });
```

En `$authProvider.loginUrl` y `$authProvider.signupUrl` indicamos cual es la ruta de nuestro servidor o API REST que maneja la autenticación. Como vimos en el anterior post, éstas rutas on `/auth/login` y `/auth/signup`.

En `$authProvider.tokenName` le indicamos un nombre al token y `$authProvider.tokenPrefix` para añadirle un prefijo al nombre del token por si queremos diferenciarlo en nuestro LocalStorage de otros. En este caso, el token quedará guardado en LocalStorage con la clave `myApp_token`.

#### Controladores

Lo siguiente a implementar son los controladores. Tendremos dos principalmente, el de login y el de registro, además del de logout.

```js
angular
	.module("myApp.controllers")
    .controller("SignUpController", SignUpController)
    .controller("LoginController", LoginController);
    .controller("LogoutController", LogoutController);

function SignUpController($auth, $location) {
	var vm = this;
    this.signup = function() {
    	$auth.signup({
        	email: vm.email,
            password: vm.password
        })
        .then(function() {
        	// Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $location.path("/private");
        })
        .catch(function(response) {
        	// Si ha habido errores, llegaremos a esta función
        });
    }
}

function LoginController($auth, $location) {
	var vm = this;
    this.login = function(){
    	$auth.login({
        	email: vm.email,
            password: vm.password
        })
        .then(function(){
        	// Si se ha logueado correctamente, lo tratamos aquí.
            // Podemos también redirigirle a una ruta
            $location.path("/private")
        })
        .catch(function(response){
        	// Si ha habido errores llegamos a esta parte
        });
    }
}

function LogoutController($auth, $location) {
	$auth.logout()
    	.then(function() {
        	// Desconectamos al usuario y lo redirijimos
            $location.path("/")
        });
}
```

Es un código sencillo si ya has visto AngularJS anteriormente. Creamos las funciones correspondientes que utilizaremos desde las vistas `this.signup`, `this.login`. Estas funciones a su vez llamarán a la librería _Satellizer_ a través de la directiva `$auth` llamando a las funciones `$auth.login()`, `$auth.signup()` y `$auth.logout()`.

Estas funciones por debajo, realizan todo el manejo de insertar en la cabecera HTTP el token de autenticación que recibe del servidor cuando se registra/autentica y que envía en cada petición HTTP una vez autenticado.

#### ¿Dónde se almacena el Token?

Vamos a ver un poco como está hecho _Satellizer_ por dentro. Puedes mirarlo en su [repositorio en GitHub](https://github.com/sahat/satellizer/blob/master/satellizer.js) ya que es _OpenSource_, e incluso puedes ayudar a mejorarlo con tus aportes :)

Entre todos los módulos que están programados en _Satellizer_, vemos uno llamado `satellizer.shared` donde se comparten los métodos y funciones que utiliza el resto de la librería. Digamos que éste es el núcleo de la funcionalidad.

`shared.getToken()` busca en nuestro LocalStorage la clave que hemos definido para almacenar nuestro Token y nos lo devuelve

```js
shared.getToken = function () {
  var tokenName = config.tokenPrefix
    ? config.tokenPrefix + "_" + config.tokenName
    : config.tokenName;
  return $window.localStorage[tokenName];
};
```

`shared.getPayload()` toman el token y devuelve el `payload` que es la 2a parte del token

```js
shared.getPayload = function () {
  var tokenName = config.tokenPrefix
    ? config.tokenPrefix + "_" + config.tokenName
    : config.tokenName;
  var token = $window.localStorage[tokenName];

  if (token && token.split(".").length === 3) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse($window.atob(base64));
  }
};
```

Y por último la función `shared.setToken()`, almacena el token recibido en el LocalStorage:

```js
shared.setToken = function (response, isLinking) {
  var token =
    response.access_token ||
    (config.tokenRoot && response.data[config.tokenRoot]
      ? response.data[config.tokenRoot][config.tokenName]
      : response.data[config.tokenName]);
  var tokenName = config.tokenPrefix
    ? config.tokenPrefix + "_" + config.tokenName
    : config.tokenName;

  if (!token) {
    tokenName = config.tokenRoot
      ? config.tokenRoot + "." + config.tokenName
      : config.tokenName;
    throw new Error(
      'Expecting a token named "' +
        tokenName +
        '" but instead got: ' +
        JSON.stringify(response.data)
    );
  }

  $window.localStorage[tokenName] = token;

  if (config.loginRedirect && !isLinking) {
    $location.path(config.loginRedirect);
  }
};
```

##### ¿Cómo se envía el token en cada petición HTTP?

De eso se encarga la directiva `$httpProvider` que funciona como interceptor o middleware y se activa en cada petición HTTP.

```js
//...
.config(['$httpProvider', 'satellizer.config', function($httpProvider, config) {
      $httpProvider.interceptors.push(['$q', function($q) {
        var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
        return {
          request: function(httpConfig) {
            var token = localStorage.getItem(tokenName);
            if (token && config.httpInterceptor) {
              token = config.authHeader === 'Authorization' ? 'Bearer ' + token : token;
              httpConfig.headers[config.authHeader] = token;
            }
            return httpConfig;
          },
          responseError: function(response) {
            return $q.reject(response);
          }
        };
      }]);
    }]);
```

De esta manera, en cada petición HTTP, se inserta en las cabeceras el token si lo tenemos en el LocalStorage y ya despues el backend (nuestro servidor o API) se encarga de ver si existe, es correcto o no y devolver el código de respuesta para cada caso.

#### Rutas y vistas

Volvemos al módulo principal de nuestra aplicación y añadimos las rutas del frontend a continuación de la configuración del `$authProvider` podemos usar `ngRoute` o `ui.route` si queremos tener estados en lugar de rutas y poder tener vistas anidadas (_nested views_). Yo suelo utilizar `ui.router` me parece más cómodo. Para ello primero instalamos la librería correspondiente:

```shell
$ bower install --save angular-ui-router
```

Y lo configuramos en `app.js`

```js
angular
	.module("myApp", ["satellizer", "ui.router"])
    .config(function($authProvider, $stateProvider) {
    	// Parametros de configuración
        $authProvider.loginUrl = "http://api.com/auth/login";
        $authProvider.signupUrl = "http://api.com/auth/signup";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "myApp",

        // Configuración de las rutas/estados
        $stateProvider
        	.state("home", {
            	url: "/",
                templateUrl: "views/index.html"
                controller: "HomeController"
            })
            .state("login", {
            	url: "/login",
                templateUrl: "views/login.html",
                controller: "LoginController",
                controllerAs: "login"
            })
            .state("signup", {
            	url: "/signup",
                templateUrl: "views/signup.html",
                controller: "SignUpController",
                controllerAs: "signup"
            })
            .state("logout", {
            	url: "/logout",
                templateUrl: null,
                controller: "LogoutController"
            })
            .state("private", {
            	url: "/private",
                templateUrl: "views/private.html",
                controller: "PrivateController",
                controllerAs: "private"
            });
    });
```

En este código he configurado dos rutas adicionales, la de `Home` en `/` y la de `Private` en `/private` pero éstas no las voy a desarrollar en este ejemplo. Esas ya son propias de tu aplicación.

Lo que si voy a mostrar es como serían las vistas para el `login` y el `signup`.

```html
<!-- views/signup.html -->
<form ng-submit="signup.signup()" method="post">
  <input type="email" ng-model="signup.email" />
  <input type="password" ng-model="signup.password" />
  <button type="submit">Registrarse</button>
</form>
```

```html
<!-- views/login.html -->
<form ng-submit="login.login()" method="post">
  <input type="email" ng-model="login.email" />
  <input type="password" ng-model="login.password" />
  <button type="submit">Autenticarse</button>
</form>
```

En ellas vemos los `ng-model` que utilizamos y que obtenemos en el controlador.

Si quieres más información (en inglés) sobre estos temas de autenticación por Token, te dejo unos enlaces a blogs y websites que me han servido para documentarme y aprender a manejar este sistema.

**Fuentes**

- [Cookies vs Tokens. Getting Auth right with Angular.js](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
- [The Anatomy of a JSON Web Token](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
- [The Ins and Outs of token based authentication](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication)
- [Token-based authentication with AngularJS and NodeJS](http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543)
