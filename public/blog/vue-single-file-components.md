---
title: 'Vue: Single File Components'
date: '2018-10-10'
url: 'https://carlosazaustre.es/blog/vue-single-file-components'
tags:
  - vuejs
  - javascript
  - tutorial
related:
  - primeros-pasos-en-vue
  - desarrollo-basado-en-componentes-con-vue-js
  - que-es-lo-que-me-gusta-de-vue-js
---

# Vue: Single File Components

> Publicado el 2018-10-10 — https://carlosazaustre.es/blog/vue-single-file-components

Con Vue podemos crear componentes de múltiples formas, la más sencilla es cómo vismo en un post anterior donde utilizamos el método `Vue.component()`.

Sin embargo esa forma, aunque es la más sencilla y práctica, no es la más escalable, ya que nos obliga a escribir el HTML dentro del método `Vue.component()` o a utilizar múltiples `<templates>` en el HTML.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=b0ozkpDiplU)
/>

Para solventar esto, existe una solución que junto con Webpack y un módulo (`vue-loader`) nos permite tener en un único fichero la vista (template), el diseño (css) y la lógica (javascript). Estos ficheros tienen una extensión `.vue` y tienen la siguiente forma:

```html
<template>
  <!-- Marcado HTML -->
</template>

<script>
  /* Código JavaScript */
</script>

<style>
  /* Estilos CSS */
</style>
```

Lo bueno de éste fichero, es que al no ser un fichero final de producción, es un fichero de desarrollo que luego Webpack interpreta y extrae las diferentes partes a sus ficheros correspondientes, nos da mucha versatilidad, por ejemplo:

Si preferimos utilizar Pug/Jade para el marcado en lugar de HTML convencional, podemos hacerlo porque Webpack leerá el fichero y gracias a los "loaders" _transpilará_ el código al resultado final.

De igual manera, si prefieres utilizar TypeScript o CoffeeScript para el código JavaScript, también es posible, al igual que el estilo, puedes utilizar cualquier preprocesador que quieras: Less, Stylus, Sass, SCSS, PostCSS,...

Lo único que tienes que hacer es indicar en cada _tag_ que tipo estás utilizando con el atributo `lang`. Por ejemplo:

```html
<template lang="pug"> ... </template>

<script lang="ts"></script>

<style lang="scss"></style>
```

Esto lo hace muy versátil y práctico para equipos de trabajo dónde haya personas dedicadas al diseño y maquetación, y otras personas encargadas del código. De esta manera, la persona dedicada al CSS puede utilizar el preprocesador que prefiera, el desarrollador utilizar TypeScript si lo prefiere, etc...

Entonces para este ejemplo vamos a tomar el componente que hicimos en el anterior post, que tenía esta pinta:

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

Y lo traducimos a un Vue Single File Component:

```html
<template>
  <div>
    <img width="100" v-bind:src="image" v-bind:alt="title" />
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
  export default {
    name: "movie-card",
    props: {
      image: String,
      title: String,
    },
  };
</script>

<style scoped>
  h2 {
    font-size: 18pt;
  }
</style>
```

En la parte `<script>` utilizamos sintáxis de ES6, ya que con Webpack y Babel se realizará el _transpiling_ aunque el navegador ya empieza a implementar éstas novedades.

Exporta por defecto un objeto JavaScript que contiene varias propiedades. En este ejemplo le indicamos con `name` que el componente se llamará `<movie-card>` y con `props` las propiedades que podemos pasarle y el tipo que tienen éstas.

Por supuesto, un Vue Component tiene muchas más propiedades, cómo datos de estado internos, metódos, eventos, etc... pero para este ejemplo hemos utilizado un componente más sencillo.

Para el estilo tenemos algo muy interesante y es que si usamos el atributo `scoped` como he puesto en el ejemplo, lo que nos permite es aislar los estilos del resto de componentes y de la aplicación.

De esta manera no tenemos que preocuparnos de nombres de clases o de estilar elementos como el `<h2>` porque únicamente se le dará el estilo al elemento `<h2>` de éste componente, dejando el resto de elementos `<h2>` que pueda haber en el resto de aplicación con el estilo que tengan o el de por defecto.

Más adelante veremos cómo integrar ésto con Webpack y con la herramienta de línea de comandos de Vue.
