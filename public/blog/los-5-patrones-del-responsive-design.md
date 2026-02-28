---
title: "Los 5 patrones del Responsive Design con Flexbox"
date: "2015-11-04"
url: "https://carlosazaustre.es/blog/los-5-patrones-del-responsive-design"
tags: []
---

# Los 5 patrones del Responsive Design con Flexbox

> Publicado el 2015-11-04 — https://carlosazaustre.es/blog/los-5-patrones-del-responsive-design

_Responsive Design_ significa adaptar tu diseño al tamaño de pantalla del dispositivo. Puedes hacerlo como tu quieras, pero existen 5 patrones ya definidos que te ayudarán en tu diseño. Sus nombre son:

- Tiny Tweaks
- Mostly Fluid
- Column Drop
- Layout Shifter
- Off Canvas

## Tiny Tweaks

Es el patrón más simple y sencillo de implementar de todos. Se basa en una sóla columna para el contenido.

![Patrón Tiny Tweaks](/images/los-5-patrones-del-responsive-design/tiny-tweaks.png)

Sus cambios son básicamente que dependiendo del tamaño de pantalla, se amplían los espaciados y el tamaño de fuente.

Es muy utilizado en sitios con mucho contenido escrito, así mejoran la experiencia de lectura.

Implementar este patrón en HTML y CSS sería así:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Tiny Tweaks</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <nav>Navbar</nav>
    <section class="columna1">Sección 1</section>
  </body>
</html>
```

```css
/* Tiny Tweaks */
.columna1 {
  padding: 10px;
  width: 100%;
}

@media (min-width: 600px) {
  .columna1 {
    padding: 20px;
    font-size: 1.5em;
  }
}

@media (min-width: 800px) {
  .columna1 {
    padding: 40px;
    font-size: 2em;
  }
}
```

## Mostly Fluid

Este patrón consiste en tener una grilla o _Grid_ de tamaño flexible.

![Patrón Mostly Fluid](/images/los-5-patrones-del-responsive-design/mostly-fluid.png)

Cuando estamos en un smartphone todo forma una única columna, y en varias filas quedan colocados los distintos bloques.

Según vaya creciendo la pantalla, los distintos bloques se agrupan ocupando toda la pantalla disponible.

En pantallas más grandes, el diseño es el mismo pero queda agrupado dentro de un contenedor que queda centrado en la página con un tamaño fijo de ancho.

Este patrón, implementado en HTML y CSS utilizando **Flexbox**, sería así:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mostly Fluid</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <nav>Navbar</nav>
    <div class="container">
      <section class="columna1">Sección 1</section>
      <section class="columna2">Sección 2</section>
      <section class="columna3">Sección 3</section>
      <section class="columna4">Sección 4</section>
      <section class="columna5">Sección 5</section>
    </div>
  </body>
</html>
```

```css
/* Mostly Fluid */
.container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
}

.columna1,
.columna2,
.columna3,
.columna4,
.columna5 {
  width: 100%;
}

@media (min-width: 600px) {
  .columna2,
  .columna3,
  .columna4,
  .columna5 {
    width: 50%;
  }
}

@media (min-width: 800px) {
  .columna1 {
    width: 60%;
  }
  .columna2 {
    width: 40%;
  }
  .columna3,
  .columna4,
  .columna5 {
    width: 33.3%;
  }

  .container {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

El bloque que contiene todos los bloques (`.container`) le añadimos la propiedad `display: flex` de _Flexbox_ y que muestre el contenido en filas `row`.

Con `wrap` indicamos que si los bloques tienen que ocupar varias filas lo hagan.

Después con un par de _Media-Queries_ disponemos dos breakpoints, uno para `600px` simulando una tablet y otro para pantallas de más de `800px`, simulando laptops y desktops de gran tamaño.

Para el tamaño _tablet_, hacemos que todas las columnas, salvo la primera, ocupen el 50%. De esta manera tenemos la primera columna ocupando todo el ancho de la pantalla y las restantes ocuparán 2 filas con dos bloques cada una.

En el _breakpoint_ para pantallas de gran tamaño, hacemos que la primera columna y la segunda estén situadas en la primera fila, ocupando el 60% y el 40% del ancho respectivamente, y las tres restantes ocuparán 1/3 de la fila cada una.

En este momento, al `<div>` contenedor, le damos un ancho fijo de `800px` para que el contenido quede centrado en la pantalla sin ocupar todo el ancho.

## Column Drop

Este patrón consiste en que cada bloque de contenido, que en un smartphone vemos en filas, vaya formando columnas según vaya siendo más grande la pantalla del dispositivo.

![Patrón Column Drop](/images/los-5-patrones-del-responsive-design/column-drop.png)

Tendremos un _primer breakpoint_ donde la segunda fila pasa a ser columna, pero ocupando la primera posición, habitualmente para un menú de navegación.

El contenido que aparecía en primer lugar en la versión móvil, pasa a ocupar la segunda columna en el primer corte.

Tendremos un segundo punto de corte donde la última fila se convierte en columna también.

Este sería el código HTML y CSS para este patrón, utilizando Flexbox para ello:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Column Drop</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <nav>Navbar</nav>
    <div class="container">
      <section class="columna1">Sección 1</section>
      <section class="columna2">Sección 2</section>
      <section class="columna3">Sección 3</section>
    </div>
  </body>
</html>
```

```css
/* Column Drop */
.container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
}

.columna1,
.columna2,
.columna3 {
  width: 100%;
}

@media (min-width: 600px) {
  .columna1 {
    width: 60%;
    -webkit-order: 2;
    order: 2;
  }

  .columna2 {
    width: 40%;
    -webkit-order: 1;
    order: 1;
  }

  .columna3 {
    width: 100%;
    -webkit-order: 3;
    order: 3;
  }
}

@media (min-width: 800px) {
  .columna2,
  .columna3 {
    width: 20%;
  }
}
```

Para poder colocar con mayor facilidad la segunda fila en primera columna, hemos empleado la propiedad `order` de Flexbox, indicándole con un número que posición debe ocupar.

## Layout Shifter

Este es uno de los patrones más complejos. Consiste en mover los bloques de contenido cambiando totalmente el _Layout_, de ahí el nombre del patrón.

![Patrón Layout Shifter](/images/los-5-patrones-del-responsive-design/layout-shifer.png)

Gracias a Flexbox, estos cambios podemos realizarlos con mayor facilidad.

Las columnas 2 y 3 estarán englobadas dentro de un bloque que llamaremos `container-inner` que nos permitirá hacer el cambio de _layout_.

De nuevo, el código HTML y CSS para este patrón resultaría así:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Layout Shifter</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <nav>Navbar</nav>
    <div class="container">
      <section class="columna1">Sección 1</section>
      <div class="container-inner">
        <section class="columna2">Sección 2</section>
        <section class="columna3">Sección 3</section>
      </div>
    </div>
  </body>
</html>
```

```css
/* Layout Shifter */
.container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
}

.columna1,
.columna2,
.columna3,
.container-inner {
  width: 100%;
}

@media (min-width: 600px) {
  .columna1 {
    width: 25%;
    height: 100vh;
  }

  .container-inner {
    width: 75%;
  }
}

@media (min-width: 800px) {
  .container {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

De nuevo, a partir del _breakpoint_ de `800px`, fijamos un ancho para el contenedor de manera que no ocupe toda la página.

## Off Canvas

Para el final he dejado el patrón más complejo de implementar pero uno de los más utilizados, sobre todo en aplicaciones móvile.

![Patrón Off Canvas](/images/los-5-patrones-del-responsive-design/off-canvas.png)

Este patrón esconde contenido en la pantalla y únicamente es visible si realizamos un determinado gesto. Este contenido oculto normalmente es un menú de navegación. Cuando la pantalla es más ancha, este contenido se hace visible.

El HTML para la página sería el habitual:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Off Canvas</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <nav>Navbar</nav>
    <div class="container">
      <section class="columna1">Sección 1</section>
      <section class="columna2">Sección 2</section>
    </div>
  </body>
</html>
```

Y el CSS vamos a verlo paso a paso

En primer lugar, la columna 1 que será la que aparezca oculta, le damos un ancho fijo, y le añadimos un `position: absolute`.

También le aplicamos una transición CSS a la transformación que vamos a declarar a continuación

```css
.columna1 {
  position: absolute;
  width: 250px;
  height: 100vh;
  -webkit-transition: -webkit-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
  z-index: 1;
}
```

La transformación consiste en 2 fases. Para ocultar la capa, le aplicamos la transformación `translate(-250px, 0)` que lo que hace es "mover" la capa 250px hacia la izquierda en el eje X. Como el tamaño de la capa le hemos definido en 250px, quedará oculto

También creamos una clase `columna1 open` que añadiremos con JavaScript más adelante. Esta clase "mueve" a la posición 0 del eje X la capa, lo que hace sea visible.

Como hemos aplicado una `transition` este efecto será suave y otorga una mayor experiencia de usuario.

```css
.columna1 {
  -webkit-transform: translate(-250px, 0);
  transform: translate(-250px, 0);
}

.columna1.open {
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}
```

La columna 2 (central) no tiene mayor misterio. Queremos que ocupe el 100% del ancho y todo el alto de la página.

```css
.columna2 {
  width: 100%;
  height: 100vh;
  position: absolute;
}
```

Cuando la pantalla sea más ancha, vamos a aplicar al contenedor padre las propiedades de Flexbox. Esta vez el añadimos la propiedad `nowrap` que hace que el tamaño de ancho de los bloques de adapte en una sola fila, sin crear varias.

Ahora la columna que estaba oculta, la sacamos a la luz, aplicando la transformación de `translate(0,0)`

```css
@media (min-width: 600px) {
  .container {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row nowrap;
    flex-flow: row nowrap;
  }

  .columna1 {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}
```

Muy bien, ahora es momento de _aplicar magia_ con JavaScript. Queremos que al hacer el típico gesto de _swipe_ en el móvil hacia la derecha, aparezca el menú _off-canva_, y al hacer el gesto contrario se oculte hacia la izquierda.

Podemos usar los eventos nativos de JavaScript `touchstart` y `touchmove` pero el código puede quedar demasiado farragoso.
Para solucinar esto tenemos la libreria [Hammer.js](http://hammerjs.github.io/) que tiene programados los diferentes gestos que podemos usar en un teléfono o tablet.

Para aplicar esto, lo primero que vamos a hacer es añadir unos `id` a los paneles en el HTML:

```html
<div class="container">
  <section id="sidePanel" class="c1">Sección 1</section>
  <section id="mainPanel" class="c2">Sección 2</section>
</div>
```

`sidePanel` será el panel _off-canva_ y `mainPanel` será el panel principal.

Añadimos también al HTML el script con la librería **Hammer.js**. Podemos usar una local descargada o un CDN como he puesto en el ejemplo.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.4/hammer.min.js"></script>
```

Y a continuación añadimos el código que detectará los eventos `swiperight` cuando arrastremos el dedo hacia la derecha y `swipeleft` cuando lo hagamos al contrario. Estos eventos irán adjuntos al elemento `mainPanel` que será el que los escuche.

Por tanto primero _cacheamos_ los elementos `sidePanel` y `mainPanel`, y después se los añadimos a un objeto `Hammer` que lo gestionará.

Cuando el evento ocurra, simplemente queremos que se añada la clase de CSS `open` al `sidePanel` en el caso de que no esté añadida, y si no que la quite. Esto lo conseguimos con la función de JS `toggle`. El código JS final sería así:

```javascript
(function () {
  var mainPanel = document.getElementById("mainPanel");
  var sidePanel = document.getElementById("sidePanel");

  var hammerPanel = new Hammer(mainPanel);

  hammerPanel
    .on("swiperight", function (e) {
      sidePanel.classList.toggle("open");
    })
    .on("swipeleft", function (e) {
      sidePanel.classList.toggle("open");
    });
})();
```

---

Con esto tendríamos los 5 patrones de diseño Responsive implementados sin necesidad de frameworks. Todos ellos pueden combinarse entre sí, por ejemplo usar _Off-Canvas_ con un _Column Drop_ que use a su vez _Tiny Tweaks_. Todo es posible!

Si quieres seguir profundizando sobre esto te dejo algunas referencias:

- [Google Web Fundamentals - Responsive Design Patterns](https://developers.google.com/web/fundamentals/design-and-ui/responsive/patterns/?hl=en)
- [Multidevice Layout Patterns](http://www.lukew.com/ff/entry.asp?1514)
- [Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)
- [El gran poder de CSS3 Flexbox](http://filisantillan.com/el-gran-poder-de-css3-flexbox/)

De esto y mucho más hablo en el [Curso de **Responsive Design** en Platzi](https://platzi.com/cursos/responsive-design/?utm_source=carlosazaustre&utm_medium=cta&utm_campaign=responsive-design)
