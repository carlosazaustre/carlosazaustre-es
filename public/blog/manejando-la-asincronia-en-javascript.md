---
title: Formas de manejar la asincronía en JavaScript
date: '2016-06-23'
url: 'https://carlosazaustre.es/blog/manejando-la-asincronia-en-javascript'
tags:
  - javascript
  - tutorial
---

# Formas de manejar la asincronía en JavaScript

> Publicado el 2016-06-23 — https://carlosazaustre.es/blog/manejando-la-asincronia-en-javascript

Si hay algo que caracteriza a JavaScript, es la asincronía que presentan algunas funciones. Concretamente las que realizan operaciones de entrada/salida como escritura o lectura del disco o una petición AJAX.

En JavaScript existen varias formas de manejar estos procesos en nuestros desarrollos.
Veamos cuales son.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=kJ389bfH7iE)
/>

## Callbacks

Es la primera y la forma más común de controlar la asincronía en JavaScript.

En el siguiente ejemplo tenemos una función que recibe como parámetros un dato de entrada: `data`, un array con datos `array` y una función de callback: `callback`.

El funcionamiento de la función es muy simple, al `array` se le añade el `data` que viene por parámetro y cuando termine, llama a la función de `callback` que recibe por parámetro, en ese caso la llama con el `array` modificado.

He añadido un pequeño bloque para comprobar si el array existe y si no lanzar un error que pasaremos al callback.

```javascript
function addToArray (data, array, callback) {
  if (!array) {
    callback(new Error('No existe el array), null)
  } else {
    array.push(data)
    callback(null, array)
  }
}
```

En el siguiente código vemos como llamara a este función y tratar el callback:

```javascript
var array = [1, 2, 3];

addToArray(4, array, function (err) {
  if (err) return console.log(err.message);
  console.log(array);
});

// [1, 2, 3, 4]
```

¿Esto que va a devolver? Cuando se termine de ejecutar la función `addToArray` se ejecutará el callback y nos mostrará el array con el nuevo dato.

Parece una tontería porque podríamos añadir el dato al array y después imprimirlo con `console.log`, pero imaginemos que esa operación de añadir un item al array fuera asincrónica, como podría ser una llamada vía AJAX.

Para simular esto vamos a utilizar la función `setTimeout` para añadir un retardo de 1 segundo:

```javascript
function addToArray (data, array, callback) {
  if (!array) {
    return callback(new Error('No existe el array', null)
  }
  setTimeout(function() {
    array.push(data)
    callback(null, array)
  }, 1000)
}

var array = [1,2,3];

addToArray(4, array, function (err) {
  if (err) return console.log(err.message)
  console.log(array)
})
// (1 seg de delay)-> [1, 2, 3, 4]
```

Si no tuviéramos una función de callback, y la función `addToArray` fuera:

```javascript
function addToArray(data, array) {
  setTimeout(function () {
    array.push(data);
  }, 1000);
}
```

y ejecutáramos la función, nos devolvería lo siguiente:

```javascript
var array = [1, 2, 3];
addToArray(4, array);
console.log(array);

// [1, 2, 3]
```

Cuando imprimimos el array aún no se ha añadido el nuevo item, por lo tanto el comportamiento que sucede no es el buscado. De esta forma los callbacks nos ayudan a lidiar con esto.

Pero si tenemos varias funciones así... puede ocurrir lo siguiente:

```javascript
var array = [1,2,3];

addToArray(4, array, function (err) {
  if (err) ...
  addToArray(5, array, function (err) {
    if (err) ...
    addToArray(6, array, function (err) {
      if (err) ...
      addToArray(7, array, function () {
        // Hasta el infinito y más allá...
      })
    })
  })
});
```

El temido **Callback Hell** o **Pyramid of Doom**

![Callback hell](/images/manejando-la-asincronia-en-javascript/callback-hell.png)

Por suerte esto se ha podido resolver utilizando librerías como [`async`](https://www.npmjs.com/package/async), o empleando promesas con librerías como [`Q`](https://www.npmjs.com/package/q).

## Promesas

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=6O8ax3JYboc)
/>

Por suerte, en la [nueva especificación de JavaScript (ES6 o ES2015)](/ecmascript6/) **las Promesas ya son nativas** y no necesitamos requerir librerías de terceros.

Veamos el mismo ejemplo que antes pero utilizando Promesas nativas de ES2015

```javascript
function addToArray(data, array) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      array.push(data);
      resolve(array);
    }, 1000);

    if (!array) {
      reject(new Error("No existe un array"));
    }
  });

  return promise;
}

const array = [1, 2, 3];
addToArray(4, array).then(function () {
  console.log(array);
});
```

Ahora la función `addToArray` crea un objeto `Promise` que recibe como parámetros una función con las funciones `resolve` y `reject`.

`resolve` la llamaremos cuando nuestra ejecución finalice correctamente.

De esta manera, podemos escribir código de manera más elegante, y el _Callback Hell_ anterior puede ser resuelto así:

```javascript
const array = [1, 2, 3];
addToArray(4, array)
  .then(function () {
    return addToArray(5, array);
  })
  .then(function () {
    return addToArray(6, array);
  })
  .then(function () {
    return addToArray(7, array);
  })
  .then(function () {
    console.log(array);
  });

// (4 seg. de delay)-> [1,2,3,4,5,6,7]
```

Esto se conoce como _anidar promesas_.

La forma de tratar errores en una promesa, es por medio de la función `catch` que recoge lo que enviamos en la función `reject` dentro de la Promesa. Y esta función solo hay que invocarla una vez, no necesitamos comprobar en cada llamada si existe error o no. Lo cual reduce mucho la cantidad de código

```javascript
const array = ''
addToArray(4, array)
  .then(...)
  .then(...)
  .then(...)
  .catch(err => console.log(err.message))

// No existe el array
```

## Async/Await

El siguiente paso en el tratamiento de los procesos asíncronos es usar los métodos `async/await`. Ésta forma no está disponible en el estándar de ES6 o ES2015, si no que **forma parte de la próxima versión ES7 o ES2016**, pero que que podemos utilizar hoy día [con Babel y el preset de plugins `stage-3`](http://babeljs.io/docs/plugins/preset-stage-3/)

La sintaxis para una función que utilice _async/await_ es la siguiente

```javascript
async function myFuncion () {
  try {
    var result = await functionAsincrona()
  } catch (err) {
    ...
  }
}
```

La función irá precedida por la palabra reservada `async` y dentro de ella tendremos un bloque `try-catch`. Dentro del `try` llamararemos a la función asíncrona con la palabra reservada `await` delante, con esto hacemos que la función _espere_ a que se ejecute y el resultado de la misma está disponible en este caso en la variable `result`.

Si ocurre algún error durante la ejecución, se ejecutará el bloque `catch` donde trataremos el error.

Combinando `async/await` con una función basada en Promesas, podemos hacer lo siguiente con el ejemplo que estábamos viendo:

```javascript
function addToArray(data, array) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      array.push(data);
      resolve(array);
    }, 1000);

    if (!array) {
      reject(new Error("No existe un array"));
    }
  });

  return promise;
}

const array = [1, 2, 3];

async function processData(data, array) {
  try {
    const result = await addToArray(data, array);
    console.log(result);
  } catch (err) {
    return console.log(err.message);
  }
}

processData(4, array);
// [1,2,3,4]
processData(5, array);
// [1,2,3,4,5]
processData(6, array);
// [1,2,3,4,5,6]
```

De esta manera estamos escribiendo código de manera secuencial pero JavaScript está _por debajo_ ejecutando código asincrónico.

Esto permite que, desarrolladores que estén menos familiarizados con JavaScript y su comportamiento, no tengan tantas barreras de entrada para empezar a trabajar con el lenguaje.

**¿Qué te parece la evolución de JavaScript? Únete a la conversación y no dudes en aportar tus impresiones.**

Si quieres conocer más sobre el lenguaje, te [recomiendo mi ebook **Aprendiendo JavaScript** que ya tienen más de 500 lectores](http://leanpub.com/aprendiendo-javascript) :)
