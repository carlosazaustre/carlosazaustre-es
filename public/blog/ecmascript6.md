---
title: 'Aprende ECMAScript 6 (ES6 o ES2015), el nuevo estándar de JavaScript'
date: '2018-10-24'
url: 'https://carlosazaustre.es/blog/ecmascript6'
tags:
  - javascript
  - tutorial
related:
  - empezando-con-react-js-y-ecmascript-6
  - ejemplo-de-aplicacion-con-react-js-en-ecmascript-6
  - es6-tagged-template-literals
---

# Aprende ECMAScript 6 (ES6 o ES2015), el nuevo estándar de JavaScript

> Publicado el 2018-10-24 — https://carlosazaustre.es/blog/ecmascript6

**ECMAScript v6** (Abreviado como ES6 o ES2015) es el estándar que sigue JavaScript desde Junio de 2015. Hasta ese momento la versión de JS que estábamos usando en nuestros navegadores y Node.js, era la v5.

## La evolución de JavaScript

Primero un poco de historia. En 1995 (hace más de 20 años!) **[Brendan Eich](http://es.wikipedia.org/wiki/Brendan_Eich)** crea un lenguaje llamado **Mocha** cuando trabajaba en **Netscape**. En Septiembre de ese año lo renombra a _LiveScript_ hasta que le cambiaron el nombre a _JavaScript_ debido a una estrategia de marketing, ya que Netscape fue adquirida por _Sun Microsystems_, propietaria del lenguaje **Java**, muy popular por aquel entonces.

> **¡Advertencia!**: aclarar lo siguiente `Java != JavaScript`.
>
> ![JavaScript no es Java](/images/ecmascript6/meme-javascrip-java.jpg)

En 1997 se crea un comité (TC39) para estadarizar JavaScript por la _European Computer Manufacturers' Association_, ECMA. Se diseña el estándar del DOM (_Document Object Model_) para evitar incompatibilidades entre navegadores. A partir de entonces los estándares de JavaScript se rigen por ECMAScript.

![historia de JavaScript](/images/ecmascript6/cronologia-javascript-1.png)

En 1999 aparece la 3a versión del estándar ECMAScript, que se mantendría vigente hasta hace pocos años. Hubo pequeños intentos de escribir la versión 4, pero hasta 2011 no se aprobó y se estandarizó la versíon 5 (ES5) que es la que usamos hoy en día.

![historia de javascript](/images/ecmascript6/cronologia-javascript-2.png)

En junio de 2013 quedó parado el borrador de la versión 6, pero en Diciembre de 2014 se aprobó al fin y se espera su estandarización a partir de Junio de 2015.

## Principales novedades de ES6

> **¿Quieres aprender JavaScript desde cero hasta el nuevo estándar de ECMAScript 6?** Hazlo con mi ebook [_Aprendiendo JavaScript_](https://leanpub.com/aprendiendo-javascript) que ya tienen más de 400 lectores. Consíguelo [aquí](https://leanpub.com/aprendiendo-javascript)

ES6 trae muchos cambios significativos al lenguaje. Veamos algunos de ellos:

### Función Arrow

¿Cuántas veces has programado un código con una estructura similar a la siguiente?

```javascript
// ES5
// Imaginemos una variable data que incluye un array de objectos
var data = [{...}, {...}, {...}, ...];
data.forEach(function(elem){
	// Tratamos el elemento
    console.log(elem)
});
```

Con la función _arrow_ `=>` de ES6, el código anterior se sustituiría por:

```javascript
//ES6
var data = [{...}, {...}, {...}, ...];
data.forEach(elem => {
	console.log(elem);
});
```

Mucho más limpio y claro. CoffeeScript (un metalenguaje que compila a JavaScript) usa algo parecido.

Incluso la podemos utilizar así:

```javascript
// ES5
var miFuncion = function (num) {
  return num + num;
};
```

```javascript
// ES6
var miFuncion = (num) => num + num;
```

### Clases

Ahora JavaScript tendrá clases, muy parecidas las funciones constructoras de objectos que realizabamos en el estándar anterior, pero ahora bajo el paradigma de clases, con todo lo que eso conlleva, como por ejemplo, herencia.
Aunque no deja de ser un _azúcar sintáctico (Sugar Syntax)_ porque en JavaScript no tenemos clases, tenemos prototipos.

```javascript
class LibroTecnico extends Libro {
  constructor(tematica, paginas) {
    super(tematica, paginas);
    this.capitulos = [];
    this.precio = "";
    // ...
  }
  metodo() {
    // ...
  }
}
```

### This

La variable `this` muchas veces se vuelve un dolor de cabeza. antíguamente teníamos que cachearlo en otra variable ya que solo hace referencia al contexto en el que nos encontremos. Por ejemplo, en el siguiente código si no hacemos `var that = this` dentro de la función `document.addEventListener`, _this_ haría referencia a la función que pasamos por _Callback_ y no podríamos llamar a `foo()`

```javascript
//ES3
var obj = {
	foo : function() {...},
    bar : function() {
    	var that = this;
        document.addEventListener("click", function(e) {
        	that.foo();
        });
    }
}
```

Con ECMAScript5 la cosa cambió un poco, y gracias al método `bind` podíamos indicarle que `this` hace referencia a un contexto y no a otro.

```javascript
//ES5
var obj = {
	foo : function() {...},
    bar : function() {
        document.addEventListener("click", function(e) {
        	this.foo();
        }.bind(this));
    }
}
```

Ahora con ES6 y la función _Arrow_ `=>` la cosa es todavía más visual y sencilla.

```javascript
//ES6
var obj = {
	foo : function() {...},
    bar : function() {
    	document.addEventListener("click", (e) => this.foo());
    }
}
```

### `let` y `const`

Ahora podemos declarar variables con `let` en lugar de `var` si no queremos que sean accesibles más allá de un ámbito. Por ejemplo:

```javascript
//ES5
(function () {
  console.log(x); // x no está definida aún.
  if (true) {
    var x = "hola mundo";
  }
  console.log(x);
  // Imprime "hola mundo", porque "var" hace que sea global
  // a la función;
})();

//ES6
(function () {
  if (true) {
    let x = "hola mundo";
  }
  console.log(x);
  //Da error, porque "x" ha sido definida dentro del "if"
})();
```

Ahora con `const` podemos crear constantes que sólo se puedan leer y no modificar a lo largo del código. Veamos un ejemplo

```javascript
(function() {
	const PI;
    PI = 3.15;
    // ERROR, porque ha de asignarse un valor en la
    // declaración
})();

(function() {
	const PI = 3.15;
    PI = 3.14159;
    // ERROR de nuevo, porque es sólo-lectura
})();
```

### Template Strings

Con ES6 podemos interpolar _Strings_ de una forma más sencilla que como estábamos haciendo hasta ahora. Fíjate en este ejemplo:

```javascript
//ES6
let nombre1 = "JavaScript";
let nombre2 = "awesome";
console.log(`Sólo quiero decir que ${nombre1} is ${nombre2`);
// Solo quiero decir que JavaScript is awesome
```

También podemos tener `String` multilínea sin necesidad de concatenarlos con `+`.

```javascript
//ES5
var saludo = "ola " +
"que " +
"ase ";

//ES6
var saludo = "ola
que
ase";

console.log("hola
que
ase");
```

### Destructuring

Tenemos nuevas formas de asignar valores a Arrays y a Objetos. Veamos unos ejemplos

```javascript
var [a, b] = ["hola", "mundo"];
console.log(a); // "hola"
console.log(b); // "mundo"

var obj = { nombre: "Carlos", apellido: "Azaustre" };
var { nombre, apellido } = obj;
console.log(nombre); // "Carlos"
```

¿No te ha estallado el cerebro todavía? Pues mira esto:

```javascript
var foo = function () {
  return ["175", "75"];
};
var [estatura, peso] = foo();
console.log(estatura); //175
console.log(peso); //75
```

### Valores por defecto

Otra novedad es asignar valores por defecto a las variables que se pasan por parámatros en las funciones. Antes teníamos que comprobar si la variable ya tenía un valor. Ahora con ES6 se la podemos asignar según creemos la función.

```javascript
//ES5
function(valor) {
	valor = valor || "foo";
}

//ES6
function(valor = "foo") {...};
```

### Módulos

A esto lo llamo un `browserify` nativo. Ahora JavaScript se empieza a parecer a lenguajes como _Python_ o _Ruby_. Llamamos a las funciones desde los propios Scripts, sin tener que importarlos en el HTML, si usamos JavaScript en el navegador.

```javascript
//File: lib/person.js
module "person" {
	export function hello(nombre) {
    	return nombre;
    }
}
```

> También se puede exportar así, según una aclaración de [Sergio Daniel Xalambrí](https://twitter.com/sergiodxa)
>
> `export function hello(nombre) {...};`
> o también, si solo es una función la que tiene el módulo: `export default function(nombre) {...};`

Y para importar en otro fichero:

```javascript
//File: app.js
import { hello } from "person";
var app = {
	foo: function() {
    	hello("Carlos");
    }
}
export app;
```

## Cómo empezar a usar ES6 hoy mismo

Todo esto es muy bonito, pero ¿Cómo podemos empezar a utilizarlo hoy en día?. Lo primero más recomendable es que te instales la última versión de Chrome, que es uno de los navegadores que está implementando las nuevas _features_ de ES6 más rápidamente. Te aconsejo incluso que instales **[Chrome Canary](https://www.google.com/chrome/browser/canary.html)**, que es la versión de Chrome que prueba funcionalidades antes de lanzarlas en el Chrome original.

Para probar directamente código ES6 en la consola de tu navegador. Escribe en la barra de direcciones `chrome://flags` y tendrás una página como ésta:

![Chrome Flags](/images/ecmascript6/chrome-flags.png)

Y activar el flag **Enable Experimental JavaScript**.

Esto te permitirá probar algunas _features_ pero no todas porque algunas aún están en desarrollo.

La otra opción, más extendida, es escribir en ES6 en tus ficheros JavaScript y después "compilarlos" a la versión ES5. Existen herramientas como [babel](https://babeljs.io/) que te permiten lograrlo.

Por medio de [plugings y paquetes](https://babeljs.io/docs/en/plugins) podemos utilizar estas _features_ incluso las que estean en desarrollo para próximas versiones si [elegimos el paquete correspondiente](https://babeljs.io/setup).

Desde 2015, cada año se introducen nuevas características en JavaScript. ES6 fue el cambio más radical y es normal encontrar referencias a esta versión como ES6 o ES2015, las siguientes versiones al principio se les llamaba ES7 y ES8, pero se ha optado por indicarlas con el año en el que son lanzados.

Por eso, hasta el momento podemos encontrar ES2015, ES2016, ES2017 y el más reciente ES2018, aunque como digo, desde la versión de 2015 los cambios son menores.

![ES6 next stop](/images/ecmascript6/autopista-hacia-es6.png)

> **¿Quieres aprender JavaScript desde cero hasta el nuevo estándar de ECMAScript 6?** Hazlo con mi ebook [_Aprendiendo JavaScript_](https://leanpub.com/aprendiendo-javascript) que ya tienen **más de 500 lectores**. Consíguelo [aquí](https://leanpub.com/aprendiendo-javascript)
