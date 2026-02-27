---
title: "¿Es tu web realmente Mobile First?"
date: "2015-10-14"
url: "https://carlosazaustre.es/blog/es-tu-web-realmente-mobile-first"
tags: []
---

# ¿Es tu web realmente Mobile First?

> Publicado el 2015-10-14 — https://carlosazaustre.es/blog/es-tu-web-realmente-mobile-first

Uno de los últimos cambios que introdujo el algoritmo de Google para las búsquedas se basa en que a partir de ahora **se da prioridad en los resultados de búsqueda a las páginas que sean “Responsive”**, es decir, adaptadas a los dispositivos móviles

¿A qué se debe eso? A que cada vez más, **el tráfico de navegación web pasa por smartphones**, relegando a la navegación de escritorio a un segundo plano.

No es así en todos los mercados, los desarrolladores solemos _googlear_ o buscar en _Stackoverflow_ cuando estamos programando en nuestros laptop o desktops.

Pero la **mayoría de los usuarios**, ya usan el **teléfono como un ordenador**, para navegar, jugar, comunicarse y sobre todo para buscar información.

## ¿Qué es Mobile First?

Dentro de los distintos patrones de diseño adaptado a móviles, tenemos básicamente dos:

- Graceful Degradation
- Progressive Enhancement

![Graceful Degradation vs Progressive Enhancement](/images/es-tu-web-realmente-mobile-first/graceful-degradations-vs-progressive-enhancement.png)
Fuente de la Imagen: [Metamonks.com](http://metamonks.com/mobile-first-vs-responsive/)

El primero, **Graceful Degradation**, se basa en que tenemos un diseño para Desktop y lo vamos adaptando de más a menos hasta llegar a un diseño para móvil.

Es la técnica que se utilizaba hasta ahora para darle a una web un diseño _Responsive_.

**Progressive Enhancement** se basa en comenzar por un diseño adaptado a smartphones y poco a poco lo vamos adaptando, añadiendo funcionalidades y estilos según crece el tamaño del navegador. Esta técnica se conoce también como **Mobile First**.

_Mobile First_ nos exige a los desarrolladores y diseñadores a crear productos con el mínimo de funcionalidades, para centrarnos más en el contenido que se ofrece y en la experiencia de usuario.

## ¿Es tu página Mobile Friendly?

Pero _Mobile First_ no significa tener una web que se vea bien en un smartphone y ya está.

Tenemos que tener en cuenta una serie de pasos para saber si realmente tenemos **una web adaptada a móviles**.

No solo por Google y el SEO, si no porque si la experiencia que ofrecemos en un dispositivo reducido no es la correcta, el usuario se irá de nuestra página.

Una de las primeras herramientas que Google nos ofrece es la [Mobile Friendly Test](https://www.google.com/webmasters/tools/mobile-friendly/). Introduciendo la URL de nuestra web o la que queramos comprobar, vemos si cumple las características.

![Mobile Friendly Test](/images/es-tu-web-realmente-mobile-first/mobile-friendly-test.png)

En el caso de que tengamos algún error, esta herramienta nos avisa y nos da indicaciones para corregirlo.

Si nuestra página es _Mobile-Friendly_, cuando hagamos una búsqueda en Google desde un smartphone veremos el tag:

![Página de resultados de Google en Mobile](/images/es-tu-web-realmente-mobile-first/resultado-de-google-en-mobile.png)

## ¿Afecta la velocidad de carga a nuestra web?

Por supuesto que afecta, también no solo al SEO y al algoritmo de búsqueda de Google, si no también a la experiencia.

> Si una web te tarda varios segundos en cargar ¿Cuanto tiempo tardas en marcharte de ella?

Tenemos que cuidar el peso de las imágenes, las peticiones HTTP, los scripts bloqueantes, etc..

Para saber si tienes algo que está retardando la carga de la página, Google tiene otra herramienta: [Google Pagespeed Insights](https://developers.google.com/speed/pagespeed/insights/).

Introduce la URL en la barra de búsqueda y la herramienta hará el resto

![Google PageSpeed Insights](/images/es-tu-web-realmente-mobile-first/resultado-pagespeed-insights.png)

Si tenemos algún recurso que bloquea el rendimiento, la herramienta nos avisa y nos da consejos para optimizarlo.

**Tener un 100/100 es muy complicado**, por no decir imposible. Pero si quieres tener un buen rendimiento, es importante que los valores estén en verde.

Eso Google lo valora, y lo que es más importante, los usuarios también.

## En resumen

Si quieres que tu web sea lo más _mobile first friendly_ posible, aplica los siguientes consejos y recomendaciones, que yo mismo he seguido para mi blog:

- Haz un **diseño adaptable a móviles**, el pixel perfect hace tiempo que murió.
- Ten **cuidado con las imágenes**. Reduce su peso.
- **Minifica tu código CSS** y si es posible, colócalo inline en el HTML
- **Minfica tu código JS**. Si es poco ponlo inline, y siempre al final de la página.
- Si no es vital, colócale el atributo async:
  `<script async src=”...”></script>`
- No hagas **redirecciones innecesarias**.
- Envía los recursos con **compresión GZIP** desde tu servidor.
- **Minifica tu HTML**
- Establece parámetros de **caché** para los recursos.

Poco a poco tu web irá ganando velocidad y eso lo comprobarás en tus analíticas con el tiempo.

Si quieres aprender más y profundizar sobre esto, **del 28 al 30 de Noviembre** estaré impartiendo el [**curso** online sobre **Responsive Design** en Platzi](https://platzi.com/cursos/responsive-design/?utm_source=carlosazaustre&utm_medium=cta&utm_campaign=responsive-design).
