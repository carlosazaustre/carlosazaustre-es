---
title: JavaScript Promises. Uso de promesas en AngularJS
date: '2015-04-27'
url: 'https://carlosazaustre.es/blog/uso-de-promesas-en-angularjs'
tags:
  - javascript
  - angular
---

# JavaScript Promises. Uso de promesas en AngularJS

> Publicado el 2015-04-27 — https://carlosazaustre.es/blog/uso-de-promesas-en-angularjs

Las promesas son **objetos de JavaScript** que sustituyen de alguna manera a los callbacks. Se utilizan cuando no se puede retornar el valor de una función porque aún no se conoce, pero no podemos dejar que bloqueen la función esperando a que llegue. El objeto promesa en un futuro contendrá el valor que esperamos retornar. Es complicado de entender en un principio, pero si conocemos como funciona, en ocasiones nos puede resultar útil.

Hay que indicar que una **Promesa** no nos sustituye el hecho de utilizar callbacks para leer su valor, pero lo que nos evita es caer en el temido _Callback Hell_.

```javascript
obj.metodo1(data, function (data1) {
  obj.metodo2(data1, function (data2) {
    obj.metodo3(data2, function (data3) {
      obj.metodo4(data3, function (data4) {
        // Hasta el infinito y más allá
      });
    });
  });
});
```

Utilizaremos en su lugar los métodos `then()` y `catch()` para implementar la funcionalidad. El ejemplo del _Callback Hell_ anterior con promesas sería de la siguiente manera:

```javascript
obj
 .metodo1(data)
 .then(obj.metodo2(data1))
 .then(obj.metodo3(data2)
 .then(obj.metodo4(data3))
 ...
```

Un uso adecuado para ello es en los servicios en AngularJS, usando la directiva o servicio del core de Angular `$q`, que contiene toda la funcionalidad de las promesas. Veamos un ejemplo.

Por ejemplo, supongamos que tenemos un controlador `myController` de una vista de nuestra aplicación angular que llame a un recurso a través de un API con el método `GET`:

```javascript
function MyController($scope, $http) {
  $http.get("http://midominio.com/recursos.json").success(function (data) {
    $scope.elementos = data;
  });
}
```

Por buenas prácticas y por separación de conceptos y también para hacer nuestro código más mantenible y escalable, debemos separar la lógica de nuestra aplicación (la llamada `$http`) en un servicio y el controlador dejarlo sólo para la conexión entre nuestros servicios y la vista HTML.

Por tanto creamos un servicio `dataService` que se encarga de comunicarse con nuestro API y en él haremos las llamadas HTTP.

La función dentro de nuestros servicio que nos devolverá todos los recursos (elementos) de nuestra base de datos a través de un supuesto API será la función `getAll`. En esta función haremos lo mismo que hacíamos en el controlador pero utilizando el objecto `$q` de AngularJS para crear promesas (o "Promises").

Antes de hacer la llamada `HTTP GET` creamos un objeto que contendrá la promesa a devolver y el objeto `defered` que se usa dentro de la función asíncrona y tiene dos métodos que luego veremos `resolve()` y `reject()`.

```javascript
var defered = $q.defer();
var promise = defered.promise;
```

Seguidamente realizamos la llamada HTTP, y en el método `Success`, que nos devuelve los datos del servidor o API si la llamada ha finalizado correctamente, invocamos la función `resolve()` de nuestra promesa y le pasamos por argumentos los datos recibidos. Éste método sirve para indicar que se ha obtenido la información y pasarlo como parámetro

```
defered.resolve(data);
```

En caso de que en nuestra llamada ocurriese un error, se llamaría a la función `Error`, en ese caso invocaremos a la función `reject()` de nuestra promesa, que indica que la petición ha sido rechazada y se le pasa el error por parámetro:

```
defered.reject(err);
```

Finalmente devolveremos el objecto promesa que creamos antes y será el que reciba el controlador:

```
return promise;
```

Nuestro servicio `dataService` quedaría así:

```javascript
function dataService($http, $q) {
  return {
    getAll: getAll,
  };

  function getAll() {
    var defered = $q.defer();
    var promise = defered.promise;

    $http
      .get("http://midominio.com/recursos.json")
      .success(function (data) {
        defered.resolve(data);
      })
      .error(function (err) {
        defered.reject(err);
      });

    return promise;
  }
}
```

Solamente nos queda inyectar ese servicio en nuestro controlador y llamar a la función `getAll()` y tratar la promesa con los métodos `then()` y `catch()` que se llaman cuando finalice la petición o se produzca un error:

```javascript
function myController (dataService) {
    dataService
        .getAll()
        .then(function(data) {
            $scope.elementos = data;
        })
        .catch(function(err)) {
            // Tratar el error
        }
}
```

De esta manera tenemos separados los conceptos y las funcionalidades en nuestra aplicación Angular y utilizando promesas para devolver el resultado de nuestras peticiones.

Para ampliar más esta información, puedes visitar:

- [NodeSchool Workshopper - Promise It Won't Hurt](https://github.com/stevekane/promise-it-wont-hurt)
- [Promises/A+](https://promisesaplus.com/)
- [Q](http://documentup.com/kriskowal/q)
- [AngularJS DOCS: Servicio $q](https://docs.angularjs.org/api/ng/service/$q)
