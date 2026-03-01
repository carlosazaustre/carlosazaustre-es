---
title: "Cómo hacer que tus imágenes sean Responsive"
date: "2015-10-21"
url: "https://carlosazaustre.es/blog/imagenes-responsive"
tags: []
---

# Cómo hacer que tus imágenes sean Responsive

> Publicado el 2015-10-21 — https://carlosazaustre.es/blog/imagenes-responsive

Actualmente tenemos gran variedad de dispositivos desde los que accedemos a internet. Smartphones, tablets, laptops, desktops, televisores, incluso relojes.

Todos ellos tienen un **tamaño de pantalla diferente y también una resolución diferente**. Una imagen en un smartphone puede verse muy nítida, pero ese mismo archivo en un monitor de alta resolución se verá pixelada.

![Tipos de dispositivos y resoluciones](/images/imagenes-responsive/resoluciones-y-tamanos-de-pantalla-responsive.png)

Lo ideal sería tener la misma imagen pero en varios tamaños y que el navegador eligiese cual presentar en cada momento.

¿Es esto posible?

## Atributo SRCSET al rescate!

`srcset` es un atributo dentro del elemento `img` que nos permite justo eso, tener varias imágenes a distintas resoluciones, y el navegador, en función del tamaño o la resolución, mostrará una u otra.

### Ejemplo de imagen

Para mostrar una imagen hemos hecho 6 copias de ella, cada una con un tamaño diferente.

- `img-mobile.jpg`
- `img-mobileHD.jpg`
- `img-tablet.jpg`
- `img-tabletHD.jpg`
- `img-large.jpg`
- `img-largeHD.jpg`

Y queremos que cada una se muestre en un determinado momento.

Si aplicamos el patrón **Mobile First**, lo ideal es que la primera imagen o la imagen por defecto sea la de menor resolución posible. Así los dispositivos móviles (con menor velocidad de conexión que en un entorno desktop) puedan cargar la imagen más rápido.

Para conseguir esto, en el atributo `src` de `img` colocamos la imagen de menor resolución: `img-mobile.jpg`.

```javascript
<img src="img-mobile.jpg" />
```

Tenemos otra imagen, `img-mobileHD.jpg` con el doble de resolución para si nos encontramos en un smartphone con pantalla retina. Para que el navegador cargue esta imagen la colocamos dentro del atributo `srcset` indicándole el parámetro `2x` lo que hace que el navegador entienda que se renderice esta imagen para una pantalla con doble resolución.

```javascript
<img src="img-mobile.jpg" srcset="img-mobileHD.jpg 2x" />
```

El resto de imágenes, para tablets y pantallas grandes, se colocan dentro del atributo `srcset` separadas por comas.

Por ejemplo, para una tablet sin pantalla retina queremos que se muestre si la pantalla del dispositivo es mayor de 768 píxeles, en este caso le añadimos el parámetro `768w`.

```javascript
<img src="img-mobile.jpg" srcset="img-mobileHD.jpg 2x, img-tablet.jpg 768w" />
```

Si tenemos una imagen optimizada para tablets con pantalla retina, `img-tabletHD.jpg`, debemos incluir la medida en píxeles y tambien el patrón de resolución `2x`. Algo tal que así:

```javascript
<img
  src="img-mobile.jpg"
  srcset="img-mobileHD.jpg 2x, 
             img-tablet.jpg 768w, 
             img-tabletHD.jpg 768w 2x"
/>
```

Recuerda, siempre separadas por comas.

El HTML final con las 6 imágenes sería así:

```javascript
<img
  src="img-mobile.jpg"
  srcset="img-mobileHD.jpg 2x, 
             img-tablet.jpg 768w, 
             img-tabletHD.jpg 768w 2x, 
             img-large.jpg 1200w, 
             img-largeHD.jpg 1200w 2x"
/>
```

## Pero ¿Puedo usar esto actualmente?

Claro que si. Si vamos a la web [CanIUse](http://caniuse.com/#search=srcset) vemos que la mayoría de los navegadores lo implementan. Por tanto no hay excusas.

Además a unas malas, el elemento `<img>` tiene el atributo `src` que por defecto nos mostrará esa imagen si no entiende el `srcset`.

## ¿Cuál es el mejor tipo de fichero para mis imágenes web?

Vale, ya podemos utilizar varios tamaños y resoluciones de imágenes para hacer nuestra web más _Responsive_.

Pero si trabajamos un poco más, podemos lograr una **optimización mayor sólo por elegir el tipo de fichero adecuado**.

Tenemos dos tipos de imágenes que podemos utilizar

- Imágenes vectoriales
- Imágenes rasterizadas

Las **imágenes vectoriales** son las ideales para los logos, fuentes de iconos y sobre todo formas con colores planos. El formato más común para estos archivos es el `.SVG` de _Scalable Vector Graphics_. Al ser construidos vectorialmente en lugar de con píxeles, pueden escalar a múltiples formatos sin perder calidad.

Las **imágenes rasterizadas** son las ya conocidas por todos. Son las imágenes que podemos hacer con una cámara de fotos. Al contrario que las vectorizadas, si escalamos una imagen de un tamaño pequeño a otro más grande, perderemos calidad y la veremos _pixelada_.

Podemos seguir la siguiente guía descrita por [Google Developers](https://developers.google.com/web/fundamentals/design-and-ui/media/images/optimize-images-for-performance?hl=en)

- **JPG** para las fotografías. Cuando una imagen tiene muchos colores, es la mejor opción.

- **SVG** cuando tengamos un logo o imágenes muy lineales y con colores sólidos (Sin gradientes). Si no podemos usar SVG, podemos usar PNG o WebP

- **PNG** siempre mejor que **GIF**. Ofrece más colores y mejor ratio de compresión.

- **Video** para animaciones complejas. Mucho mejor que un GIF, mejor calidad de imagen.

## Reducir el tamaño de fichero.

Aunque usemos un sistema de compresión como JPG o PNG, siempre hay unos _kilobytes_ de más que programas como Photoshop no terminan de comprimir eficientemente.

Ante esto, podemos usar algunas herramientas, tanto instalables como online, que nos permiten comprimir aún más las imágenes sin perder calidad.

Yo en particular utilizo Gulp y un [plugin](https://www.npmjs.com/package/gulp-image-optimization) para automatizar este proceso. En mis **Gulpfile** suelo tener una tarea como la siguiente:

```javascript
var gulp = require('gulp');
var imageop = require('gulp-image-optimization');
var imageFiles = [
  './src/images/*.jpg',
  './src/images/*.jpeg,
  './src/images/*.png,
  './src/images/*.gif
];

gulp.task('images', function() {
  gulp.src(imageFiles)
    .pipe(imageop({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./dist/img'));
});
```

Esto hace que cada vez que ejecutemos la tarea `gulp images` lea todas las imágenes con extensión `.jpg`, `.jpeg`, `.png` y `.gif` de la carpeta `src/images`, les pase el optimizador que nos da el plugin `gulp-image-optimization` y las deje comprimidas y listas para producción en la carpeta `dist/img`.

## ¿Y < picture > ?

`<picture>` también es una opción que podemos utilizar, el problema es que con éste elemento no tenemos en cuenta la resolución de pantalla, sólo el tamaño.

Esto significa que si queremos que en resolución _retina_ se vea bien, siempre tendremos que tener una imagen de gran tamaño, que en un dispositivo sin esa resolución, no apreciaremos y por tanto estaremos desperdiciando recursos.

Las imágenes anteriores en un elemento `<picture>` sería así:

```html
<picture>
  <source media="(min-width: 1200px)" src="img-largeHD.jpg" />
  <source media="(min-width: 768px)" src="img-tabletHD.jpg" />
  <source src="img-mobileHD.jpg" />
</picture>
```

Dentro de los elementos `source` podemos tener un atributo `media` en el que podemos indicar a que tamaño de `viewport` cambien las imágenes.

Hablo de esto y mucho más en el [**Curso de Responsive Design** en Platzi](https://platzi.com/cursos/responsive-design/?utm_source=carlosazaustre&utm_medium=cta&utm_campaign=responsive-design) de 2015

Nos vemos allí :)
