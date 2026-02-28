---
title: Desarrollo basado en Componentes con Vue.js
date: '2018-10-17'
url: 'https://carlosazaustre.es/blog/desarrollo-basado-en-componentes-con-vue-js'
tags:
  - vuejs
  - tutorial
  - javascript
  - web
---

# Desarrollo basado en Componentes con Vue.js

> Publicado el 2018-10-17 — https://carlosazaustre.es/blog/desarrollo-basado-en-componentes-con-vue-js

Las arquitecturas web basadas en Componentes es lo que más se emplea hoy en día en el desarrollo web moderno. Vue.js también nos permite crear Componentes y montar nuestra aplicación con ellos.

## Cómo crear un componente en Vue

Vue tiene un API para crear Componentes. No sigue el estándar de la W3C de los WebComponents, pero el estilo es muy similar y puedes utilizar `templates` para ello.

En éste tutorial vamos a crear un pequeño componente reutilizable que muestra la información de una película: Su título y una imagen.

Para ello, creamos un fichero `index.html` que contendrá el elemento raíz `#app` dónde colocaremos nuestra aplicación de Vue, el `script` con la librería y otro `script` más dónde tendremos nuestro código:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Componentes con Vue.js</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.2/vue.js"></script>
    <script src="app.js"></script>
  </body>
</html>
```

A continuación creamos un fichero `app.js` al mismo nivel que `index.html` para que el enlace del `<script>` funcione correctamente.

Aquí vamos a crear el componente `<movie-card>` e instanciar la aplicación de Vue. Primero debemos crear el componente para que el código se interprete correctamente. Si instanciamos antes la app de Vue y luego el componente tendremos errores porque Vue no lo reconocerá.

Para crear un componente tenemos que usar la función `Vue.component` que recibe un `string` con el nombre de nuestro componente, que será el nombre que tendrá el elemento en el DOM, y un objeto de configuración que contendrá el nombre de las props, el template, datos, métodos, etc...

Para crear un componente `movie-card` escribimos lo siguiente:

```javascript
Vue.component("movie-card", {
  props: ["image", "title"],
  template: `
    <div>
      <img width="100" v-bind:src="image" v-bind:alt="title"/>
      <h2>{{ title }}</h2>  
    </div>
  `,
});
```

El componente recibirá como propiedades una `image` y un `title`, y su aspecto en el DOM será el de un `<div>` que contiene un elemento `<img>` que mostrará la imagen y otro `h2` que mostrará el título de la película.

Para ver el componente en acción, podemos hacer varias cosas. Como primera opción, podemos insertar el componente `<movie-card>` en el HTML dentro del `<div id="app">` dónde tenemos instanciado Vue.

Para instanciar Vue, en el código de `app.js` justo debajo del componente que acabamos de crear, escribimos lo siguiente:

```javascript
new Vue({
  el: "#app",
});
```

Y así en `index.html` podemos escribir lo siguiente:

```html
<div id="app">
  <movie-card
    title="Regreso al Futuro"
    image="http://es.web.img3.acsta.net/pictures/14/04/03/13/45/034916.jpg"
  >
  </movie-card>
</div>
```

Esto nos mostraría la imagen junto al título de la película en el navegador. Pero si queremos mostrar varias `<movie-card>` cuyos datos obtengamos a través de un API externo u otro servicio, sólo con esto no se podría.

En la instancia de Vue, utilizaremos la propiedad `data` para emplear un array de objetos con la información de varias películas.

```javascript
new Vue({
  el: "#app",
  data: {
    movies: [
      {
        title: "Regreso al Futuro",
        image:
          "http://es.web.img3.acsta.net/pictures/14/04/03/13/45/034916.jpg",
      },
      {
        title: "Matrix",
        image:
          "http://t0.gstatic.com/images?q=tbn:ANd9GcQq3pIz-aKgkmYX1dJ-EL-AlHSPcOO7wdqRIJ5gJy9qNinXpmle",
      },
      {
        title: "Interestellar",
        image:
          "http://t1.gstatic.com/images?q=tbn:ANd9GcRf61mker2o4KH3CbVE7Zw5B1-VogMH8LfZHEaq3UdCMLxARZAB",
      },
    ],
  },
});
```

De esta forma podemos acceder a estos datos dentro de Vue, y lo siguiente que tenemos que hacer es pintarlos.

Para ello, tendríamos que iterar por todos los elementos de éste array y pintar un componente `<movie-card>` por cada uno de ellos.

Eso lo vamos a conseguir con la directiva `v-for` que hace precisamente eso, y sería tan sencillo como lo siguiente en el fichero `index.html`:

```html
<div id="app">
  <movie-card
    v-for="(movie, index) in movies"
    :key="index"
    :title="movie.title"
    :image="movie.image"
  >
  </movie-card>
</div>
```

Si se quiere, en lugar de escribir esto en el HTML, podemos utilizar la propiedad `template` de Vue en el código JavaScript y dejar el `index.html` únicamente con el `<div id='app'>` sin nada en su interior, ya se encargará Vue de insertarlo:

```javascript
new Vue({
  el: "#app",
  data: {
    movies: [
      {
        title: "Regreso al Futuro",
        image:
          "http://es.web.img3.acsta.net/pictures/14/04/03/13/45/034916.jpg",
      },
      {
        title: "Matrix",
        image:
          "http://t0.gstatic.com/images?q=tbn:ANd9GcQq3pIz-aKgkmYX1dJ-EL-AlHSPcOO7wdqRIJ5gJy9qNinXpmle",
      },
      {
        title: "Interestellar",
        image:
          "http://t1.gstatic.com/images?q=tbn:ANd9GcRf61mker2o4KH3CbVE7Zw5B1-VogMH8LfZHEaq3UdCMLxARZAB",
      },
    ],
  },
  template: `
    <div>
      <movie-card v-for="(movie, index) in movies"
        :key="index"
        :title="movie.title"
        :image="movie.image">
      </movie-card>
    </div>
  `,
});
```

Esta es la forma que tiene Vue de crear componentes, que por supuesto no es la única, pero que para algo sencillo nos puede servir sin necesidad de más herramientas.

Más adelante veremos que cuando nuestra aplicación crece y tenemos varios componentes, con estilos propios, datos, eventos, etc... esto no es escalable ya que tendríamos que tener las templates en el HTML o insertarlas en el código JavaScript haciendo que el código no fuera manejable.

Esto Vue lo soluciona de una manera muy interligente con los _Single File Components_ que veremos en un próximo artículo.
