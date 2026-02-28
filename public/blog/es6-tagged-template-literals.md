---
title: ES6 Tagged Template Literals
date: '2018-09-01'
url: 'https://carlosazaustre.es/blog/es6-tagged-template-literals'
tags:
  - javascript
---

# ES6 Tagged Template Literals

> Publicado el 2018-09-01 — https://carlosazaustre.es/blog/es6-tagged-template-literals

[ECMAScript v6, la nueva versión del estándar de JavaScript](/ecmascript6), ha traído muchas novedades y hay una de ellas que ha pasado desapercibida y me parece muy interesante.

Son las _ES6 Tagged Template Literals_.

Pero antes veamos un poco de introducción.

## Template Strings

Como sabrás si has estado pendiente de las novedades que trae ES6, con esta nueva versión tenemos una nueva forma de escribir _strings_ en JavaScript. A mi parecer más cómoda y legible que cómo se hacía antes.

Por ejemplo, si antes queríamos imprimir un _string_ con varias variables, teníamos que hacer esto:

```javascript
console.log(
  "Hola, me llamo " +
    nombre +
    ", tengo " +
    edad +
    " años y soy de " +
    pais +
    "."
);
```

Con ES6 utilizando **template strings** podemos escibir lo mismo de una forma más cómoda utilizando las comillas invertidas y el símbolo del dólar `$` seguido de las llaves `{}` sin necesidad de usar el operador `+` para concatenar los _strings_.

```javascript
console.log(`Hola me llamo ${nombre}, tengo ${edad} años y soy de ${pais}`);
```

También es muy útil a la hora de imprimir _strings_ multilínea que antes resultaban muy engorrosos. Podíamos hacer así:

```javascript
console.log("Esto es una línea\nEsto es otra línea\n y esto es la 3a línea");
```

o así, para poderlo leer "mejor":

```javascript
console.log(
  "Esto es una línea\n" + "Esto es otra línea\n" + "y esto es la 3a línea"
);
```

El operador de la comilla invertida que utilizamos en los _template strings_ nos permite añadir espacios y saltos de línea sin usar operadores especiales ni el `+` para concatenarlos.

```javascript
console.log(`Esto es una línea
     Esto es otra línea
     y esto es la 3a línea`);
```

Bien, pues sabiendo esto, te presento los ES6 Tagged Template Literals.

## Tagged Templates

¿Y esto qué es? Pues no son más que funciones como cualquier otra, pero que son diferentes la forma en la que se las llama.

Imagina que tienes ésta función:

```javascript
function miTaggedTemplateLiteral(strings) {
  return console.log(strings);
}
```

La podríamos llamar directamente pasándole el _string_ con las comillas invertidas, sin necesidad de utilizar los paréntesis `()` y nos devolvería un array con los strings pasados como parámetro:

```javascript
miTaggedTemplateLiteral`Hola`;
// ['Hola']
miTaggedTemplateLiteral`Hola k ase`;
// ['Hola k ase'];
```

Si le pasamos variables, se vuelve más interesante, porque estas variables la función es capaz de separarlas, colocando en un array los _strings_ y las variables por separado

```javascript
function miTaggedTemplateLiteral(strings, value, value2) {
  return console.log(strings, value, value2);
}

let nombre = "Carlos";
let edad = 32;
miTaggedTemplateLiteral`Hola soy ${nombre} y tengo ${edad} años`;

// ["Hola soy ", " y tengo ", " años"]
// "Carlos"
// 32
```

Si no sabes cuantos variables vas a utilizar puedes utilizar _rest parameters_ y la función quedaría así y funcionaría igual:

```javascript
function miTaggedTemplateLiteral(strings, ...values) {
  return console.log(strings, ...values);
}
```

## Utilidad

¿Y esto para que puede serme útil? Pues es una buena forma de utilizar JavaScript y la potencia de ES6 para construir templates. Veamos como:

Si juntamos la funcionalidad de los _template strings_ de poder escribir en varias líneas, el operador _rest_ y con la posibilidad de utilizar este tipo de funciones, podemos crear una función que manipule estos datos y llamarla de esta manera:

```javascript
const data = {
  nombre: "Google Pixel L",
  imagen: "http://example.com/miImagen.png",
  precio: 699,
};

const miProducto = generaTemplate`<article>
  <h1>${nombre}</h1>
  <img src="${imagen}" />
  <span>${precio} € </span>
</article>`(data);

console.log(miProducto);
/* "<article>
  <h1>Google Pixel L</h1>
  <img src=http://example.com/miImagen.png />
  <span>699 € </span>
</article>"
*/
```

Y la función `generaTemplate` sería algo como esto:

```javascript
function generaTemplate(strings, ...keys) {
  return function (data) {
    let temp = strings.slice();
    keys.forEach((key, i) => {
      temp[i] = temp[i] + data[key];
    });
    return temp.join("");
  };
}
```

Puedes ver esto en funcionamiento en el siguiente [JSBin](http://jsbin.com/mutedicali/1/edit?js,console)

Esta misma funcionalidad y mucho mejor implementada es lo que hace la [librería `html` de JavaScript](https://www.npmjs.com/package/html) creada por [Max Ogden](https://github.com/maxogden) también creador de librerías como [yo-yo](https://github.com/maxogden/yo-yo) similar a React pero mucho más sencilla que en lugar de utilizar JSX utiliza ésta funcionalidad que hemos visto de las _Tagged Template Literals_ y también es utilizada en un pequeño framework web muy interesante llamado [Choo](https://github.com/yoshuawuyts/choo) creado por [Yoshua Wuyts](https://github.com/yoshuawuyts) que si tengo tiempo me gustaría probar y hablar de el en próximos posts.

## Recursos

A continuación te comparto una serie de links dónde puedes profundizar sobre éste tema:

- [Exploring ES6: Tagged Templates](http://exploringjs.com/es6/ch_template-literals.html#sec_tagged-templates-examples)
- [2ality: Computing tag functions for ES6 template literals](http://www.2ality.com/2016/11/computing-tag-functions.html)
- [MDN: Template Literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals)
