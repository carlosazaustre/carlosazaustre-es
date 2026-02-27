---
title: "El futuro de CSS Grid Layout"
date: "2015-12-28"
url: "https://carlosazaustre.es/blog/css-grid-layout-css"
tags: []
---

# El futuro de CSS Grid Layout

> Publicado el 2015-12-28 — https://carlosazaustre.es/blog/css-grid-layout-css

CSS4 como tal no existe. A partir de CSS3 el estándar para hojas de estilo en cascada se divide en módulos, cada uno con su número de versión.

Por ejemplo, **Flexbox** está en su versión 1 aunque por tecnología esté a camino entre CSS3 y lo que sería CSS4. [Aquí puedes leer un excelente artículo sobre Flexbox por Fili Santillán](http://filisantillan.com/el-gran-poder-de-css3-flexbox/)

Dentro de estos **nuevos módulos CSS4** nos encontramos con **Grid Layout**, también en su primera versión. Es una nueva forma de maquetar y colocar la información en nuestras páginas webs.

No sustituye a Flexbox, si no que lo complementa y es una alternativa para el mismo problema.

La especificación completa (en borrador) la tienes en [la web de la W3C](http://www.w3.org/TR/2015/WD-css-grid-1-20150917/), pero como es bastante densa, en este artículo voy a explicar a modo de tutorial como se maquetaría y se daría estilo con CSS Grid Layout

## Cómo usar CSS Grid Layout

Para empezar hay que saber que **ésta propuesta viene desde Microsoft**, por lo que actualmente **sólo es soportado en Internet Explorer 11 y 12 y el nuevo Microsoft Edge**.

Pero si somos _Chrome Addicts_, **podemos utilizarlo en Chrome** (no toda la especificación) en nuestro navegador favorito **si activamos una determinada _flag_**, vamos a ello.

Procura tener instalada la última versión de Chrome, y dirígete a la URL `chrome://flags`

![Chrome Flags](/images/css-grid-layout-css/chrome-flags-1.png)

Dentro de las numerosas funcionalidades que nos ofrece, debemos activar la que dice **Enable experimental Web Platform features.**

Después de activarla, reiniciamos Chrome y ya tendremos habilitada esa funcionalidad.

## Ejemplo de maquetación

Vamos a maquetar un sitio sencillo, compuesto por un _header_, un menú lateral, un contenido principal y un _footer_.

El código HTML para este ejemplo sería:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Grid Layout</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <header class="header">
        <h2>Cabecera</h2>
      </header>
      <div class="main">
        <h2>Main</h2>
        <p>Este es el contenido principal. Lorem ipsum</p>
      </div>
      <aside class="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Opcion 1</li>
          <li>Opcion 2</li>
          <li>Opcion 3</li>
          <li>Opcion 4</li>
        </ul>
      </aside>
      <footer class="footer">
        <h2>Footer</h2>
      </footer>
    </div>
  </body>
</html>
```

Con CSS Grid Layout no importa el orden que ocupen los bloques en el HTML, pues el módulo a través de sus propiedades se encarga de colocarlo en la posición que queramos.

Pero tenemos que ser prácticos y lo más habitual y recomendado es escribir el HTML en el orden semántico, de cara también a mantenibilidad, rastreo de buscadores e indexabilidad en los mismos.

Ahora vayamos al CSS, en primer lugar vamos a darle unos colores de fondo a cada bloque a fin de distinguirlos en el ejemplo

```css
.header,
.footer,
.sidebar,
.main {
  padding: 1.2em;
}

.header {
  color: white;
  background-color: #0d47a1;
}
.footer {
  background-color: #2196f3;
}
.main {
  background-color: #bbdefb;
}
.sidebar {
  background-color: #eeeeee;
}
```

Ahora pasamos a maquetar en formato de grilla o _Grid_.

Imaginemos un _Grid_ compuesto por 3 columnas y 5 filas. En un _wireframe_ sería algo así:

![Wireframe de un grid layout 3x5](/images/css-grid-layout-css/2015/10/wireframe-css-grid-layout.png)

Usaremos la columna 2 y las filas 2 y 4 como espaciadores.

Para codificar esto en CSS sería de la siguiente forma:

```css
body {
  margin: 0 auto;
}

.container {
  display: grid;
  /* Grid de 3x5 */
  /* 3 columnas: 1a de 200px, 2a como margen (1%), 3a ocupa el espacio restante */
  grid-template-columns: 200px 1% 1fr;
  /* 5 filas: grid-rows: 1a, 3a y 5a ancho automático, 2a y 4a como margen de 15px */
  grid-template-rows: auto 15px auto 15px auto;
}
```

El _header_ y el _footer_ ocuparán todo el ancho de la fila, es decir 3 columnas. Si la especificación estuviese completa podríamos decir lo siguiente:

```css
.header,
.footer {
  grid-column-span: 3;
}
```

Pero el selector `grid-column-span` aún no está implementado en Chrome, por lo que tenemos que hacer un pequeño _hack_.

Diremos que los bloques empezarán en la columna y acaban en la columna 3+1. De esta manera:

```css
.header,
.footer {
  grid-column-start: 1;
  grid-column-end: 4;
}
```

Así logramos el efecto que buscábamos.

El _header_ estará colocado en la fila 1, y el _footer_ en la última fila, la 5. En CSS se traduce así:

```css
.header {
  grid-row: 1;
}

.footer {
  grid-row: 5;
}
```

Ahora queremos que el _sidebar_ o menú esté en lo que sería la primera columna del _Grid_ y la tercera fila:

```css
.sidebar {
  grid-column: 1;
  grid-row: 3;
}
```

Y por último, el contenido principal encerrado en el `<div>` con la clase `main` queremos situarlo en la tercera columna y tercera fila, al lado del _sidebar_:

```css
.main {
  grid-column: 3;
  grid-row: 3;
}
```

El resultado final en nuestro navegador será como el que vemos en la imagen de a continuación

![Página web con CSS Grid Layout](/images/css-grid-layout-css/2015/10/css-grid-layout.png)

## Y... ¿Esto es Responsive?

Por supuesto, y muy fácil. Sólo hay que pensar como sería el _Grid_ en cada tamaño de pantalla y según la _media-query_ cambiar el orden.

En este ejemplo no he aplicado el patrón _Mobile First_, pero si aplicamos _Graceful Degradation_ podemos hacer algo tal que así:

```css
@media (max-width: 400px) {
  .container {
    display: block;
  }
}
```

Cuando el tamaño de pantalla sea menor de 400px (o como máximo 400px) le quitamos la propiedad `display: grid` a la clase `container` que lo engloba todo, por `display: block`.

![CSS Grid Layout Responsive](/images/css-grid-layout-css/responsive-grid-layout.png)

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=CUzfyp2gMoU)
/>

## Siguientes pasos

Como he dicho, esto no es un estándar actualmente. Es un [borrador de propuesta](http://www.w3.org/TR/2015/WD-css-grid-1-20150917/), aún sin implementar en muchos navegadores, pero no está de más conocer que se está _cociendo_ por ahí.

Si quieres seguir profundizando en este tema, esta web es muy completa: [Grid by Example](http://gridbyexample.com/examples/)
