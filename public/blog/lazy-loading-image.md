---
title: Lazy loading de imágenes ya forma parte del estándar HTML
date: '2020-02-25'
url: 'https://carlosazaustre.es/blog/lazy-loading-image'
tags:
  - html
  - web
excerpt: >-
  El atributo loading para imágenes e iframes ya forma parte del estándar HTML.
  Aprende a implementar lazy loading nativo con polyfill para todos los
  navegadores.
---

# Lazy loading de imágenes ya forma parte del estándar HTML

> Publicado el 2020-02-25 — https://carlosazaustre.es/blog/lazy-loading-image

El pasado 12 de Febrero de 2020 el atributo `loading` para imágenes e iframes se hizo por fin parte del estándar HTML. Si bien ya se podía utilizar activando un par de _flags_ en el navegador Chrome, hasta ahora no formaba parte de las funcionalidades que soporta el navegador.

```
chrome://flags/#enable-lazy-image-loading
chrome://flags/#enable-lazy-frame-loading
```

## ¿Que soporte tiene por los navegadores?

Ahora bien, aunque se trate de un estándar HTML, todavía no tiene el soporte de todos los navegadores
![can i use loading](/images/lazy-loading-image/lazy-loading-images-caniuse.png)
_Fuente: [caniuse.com](https://caniuse.com/#feat=loading-lazy-attr)_

Por lo que si lo quieres utilizar, todavía necesitas de un _polyfill_ y un poco de JavaScript.

## Cómo utilizar lazy-loading nativo para imágenes

Para utilizar el `lazy-loading` nativo de HTML, lo más apropiado primero es detectar si el navegador soporta la funcionalidad. Si no lo hace, entonces recurríamos a un script de terceros, librería o una implementación propia en el caso de que queramos ofrecer la misma experiencia a todos los navegadores.

Para ello, con el siguiente pequeño `script` realizamos la comprobación:

```html
<script>
  if ("loading" in HTMLImageElement.prototype) {
    console.log("El navegador soporta `lazy-loading`...");
  } else {
    console.log("`lazy-loading` no soportado...");
  }
</script>
```

Si el navegador lo soporta, no tenemos más que implementar el atributo `loading` dentro del tag `img` de HTML

```html
<img loading="lazy" src="https://placekitten.com/441/441" width="320" alt="" />
```

Aquí tienes un ejemplo llamando al api de `placekitten` para mostrar 50 imágenes (de gatos). El código HTML sería el siguiente:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <title>Lazy Loading Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="UTF-8" />
  </head>

  <body>
    <img
      loading="lazy"
      src="https://placekitten.com/400/400"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/401/401"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/402/402"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/403/403"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/404/404"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/405/405"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/406/406"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/407/407"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/408/408"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/409/409"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/410/410"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/411/411"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/412/412"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/413/413"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/414/414"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/415/415"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/415/415"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/420/420"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/421/421"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/422/422"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/423/423"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/424/424"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/425/425"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/426/426"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/427/427"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/428/429"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/430/430"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/431/431"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/432/432"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/433/433"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/434/434"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/435/435"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/436/436"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/437/437"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/438/438"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/439/439"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/440/440"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/441/441"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/442/442"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/443/443"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/444/444"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/445/445"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/446/446"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/447/447"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/448/448"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/449/449"
      width="320"
      alt=""
    />
    <img
      loading="lazy"
      src="https://placekitten.com/450/450"
      width="320"
      alt=""
    />
    <script>
      if ("loading" in HTMLImageElement.prototype) {
        console.log("Browser support `loading`...");
      } else {
        console.log("Not supported");
      }
    </script>
  </body>
</html>
```

Si probamos este código en un navegador, y abrimos las _Developer Tools_ en la pestaña de _Network_ veremos que las primeras son cargadas automáticamente, pero a medida que hacemos _scroll_ por la página, el resto se va descargando poco a poco.

En éste vídeo te dejo una demo:

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=bRhdooBHqnc)
/>

## ¿Y si mi navegador no soporta el _lazy-load_ nativo?

Si el navegador aún no implementa este nuevo estándar, gracias a la comprobación que hemos hecho antes, podemos hacer que se cargue una librería externa que actúe como _polyfill_ y permita recrear el _lazy-load_ veamos un ejemplo:

```html
<img data-src="image-gato1.jpg" loading="lazy" alt=".." class="lazyload" />
<img data-src="image-gato2.jpg" loading="lazy" alt=".." class="lazyload" />
<img data-src="image-gato3.jpg" loading="lazy" alt=".." class="lazyload" />

<script>
  if ("loading" in HTMLImageElement.prototype) {
    // Si el navegador soporta lazy-load, tomamos todas las imágenes que tienen la clase
    // `lazyload`, obtenemos el valor de su atributo `data-src` y lo inyectamos en el `src`.
    const images = document.querySelectorAll("img.lazyload");
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // Importamos dinámicamente la libreria `lazysizes`
    let script = document.createElement("script");
    script.async = true;
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/lazysizes.min.js";
    document.body.appendChild(script);
  }
</script>
```

En este ejemplo te habrás percatado de que en los tags `img` no tenemos el atributo `src` si no uno llamado `data-src` esto lo hacemos para que funcione tanto de forma nativa como para la librería `lazysizes` que busca la imagen dentro de ese _data-atribute_

Si quieres ser más _fancy_ puedes recorrer a un _import_ dinámico de ésta manera:

```html
...
<script>
  (async () => {
    if ("loading" in HTMLImageElement.prototype) {
      const images = document.querySelectorAll("img.lazyload");
      images.forEach((img) => {
        img.src = img.dataset.src;
      });
    } else {
      // Importamos dinámicamente la libreria `lazysizes`
      const lazySizesLib = await import("/lazysizes.min.js");
      // Se inicia lazysizes (lee el atributo `data-src` y la clase `lazyload`)
      lazySizes.init();
    }
  })();
</script>
```

## Atributo _loading_

El atributo loading permite al navegador retrasar la carga de imáges y de _iframes_ que están fuera de pantalla, hasta que el usuario haga _scroll_ cerca de ellas. Éste atributo soporta 3 valores:

- `lazy`: Retrasa la carga de la imagen hasta que el usuario alcanza con el _scroll_ una distancia calculada desde el _viewport_.
- `eager`: Carga la imagen inmediatamente, sin importar donde está situada o colocada en la pantalla. En resumen, no hace _lazy-loading_.
- `auto`: Implementa el comportamiento por defecto del navegador para la carga de las imágenes. En resumen, poner `auto` es lo mismo que no poner el atributo `loading`.

### Distancia calculada

Las imagénes que están situadas _above the fold_, es decir, en la vista actual sin hacer _scroll_ son cargadas automáticamente. Las que están por debajo no se cargan hasta que el usuario llega a ellas haciendo _scroll_.

Esta distancia calculada depende de varios factores: El tipo de recurso (si es una imagen o un iframe con un video por ejemplo), Si está habilitado el modo _lite_ en Chrome par Android, el tipo de conexión (3G, 4G, HSDPA,...)

## ¿El nuevo atributo `loading` solo sirve para imágenes?

El nuevo atributo no sólo sirve para el tag `img` de HTML. También se puede utilizar para imágenes con `srcset`, dentro de `picture` y en `iframes`. Aquí tienes algunos ejemplos:

```html
<!-- Lazy-loading en imágenes con picture. Se implementa dentro de <img> como fallback. -->
<picture>
  <source
    media="(min-width: 40em)"
    srcset="img-big.jpg 1x, img-big-hd.jpg 2x"
  />
  <source srcset="img-small.jpg 1x, img-small-hd.jpg 2x" />
  <img src="img-fallback.jpg" loading="lazy" />
</picture>

<!-- Lazy-loading en imágenes que tienen un srcset -->
<img
  src="small.jpg"
  srcset="img-large.jpg 1024w, img-medium.jpg 640w, img-small.jpg 320w"
  sizes="(min-width: 36em) 33.3vw, 100vw"
  loading="lazy"
/>

<!-- Lazy-loading en iframes  -->
<iframe src="video-player.html" loading="lazy"></iframe>
```

## Conclusión

Si tu aplicación se basa en una alta carga de imágenes, como puede ser _Instagram_, ésta funcionalidad te va a permitir ahorrar mucho tiempo de carga y que la experiencia de usuario sea buena. Aún queda recorrido para que sea implementada nativamente en todos los navegadores pero mientras tanto podemos usar un _polyfill_ si la funcionalidad no está en el navegador.

### Referencias

Te dejo una lista de enlaces con más referencias sobre esto:

- [HTML Spec: Image Loading Attribute](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-loading)
- [Native lazy-loading for the web, (web.dev)](https://web.dev/native-lazy-loading/)
- [MDN: WebPerformance, Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading#Images)
- [Native image lazy-loading for the web!, (Addy Osmani)](https://addyosmani.com/blog/lazy-loading/)
