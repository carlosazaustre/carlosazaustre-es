---
title: "JavaScript. Un lenguaje para dominarlos a todos"
date: "2013-06-17"
url: "https://carlosazaustre.es/blog/javascript"
tags: []
---

# JavaScript. Un lenguaje para dominarlos a todos

> Publicado el 2013-06-17 — https://carlosazaustre.es/blog/javascript

Hasta no hace mucho Javascript se usaba para "adornar" las webs, ponerles efectos bonitos que no podíamos conseguir con CSS o HTML, alertas y poco más. La libreráa **jQuery** nos facilitó mucho la vida, haciendo más fácil el manejo del **DOM** (_Document Object Model_) y el uso de funciones. Más adelante con la llegada de **AJAX** (**A**synchronous **J**avaScript **A**nd **X**ML), lo empezamos a utilizar para cargar contenido dinámicamente en nuestras webs. AJAX hizo posible que aplicaciones web como _Gmail_ sean lo que son.

## JavaScript, el lenguaje más popular

Sólo hay que echar un vistazo a [GitHub](http://github.com), la mayor comunidad de proyectos _OpenSource_, y ver cuales son los lenguajes más _Trending Topic:_

![lenguajes](/images/javascript/Screen-Shot-2013-06-11-at-16_57_29_neocjb.png)

Se puede ver que incluso en la lista de los 10 más usados, el último lugar corresponde a [CoffeeScript](http://coffeescript.org/) un metalenguaje que compila a Javascript, por lo que casi el 25% de los lenguajes más utilizados en la red es JS.

![js](/images/javascript/js_xkixgr.jpg)

## JavaScript en el cliente: frameworks MVC

Pero JS está evolucionando muchísimo, algunos lo consideran el lenguaje de programación del futuro, pero creo que es ya del presente. JS ha crecido en el navegador, apareciendo numerosos **frameworks MVC** (_Model View Controller_) que permiten desde el cliente hacer numerosas operaciones antes relegadas al servidor, haciéndolas más rápidas y escalables.

## JSON y MongoDB: datos en JavaScript

**Javascript ha llegado también al modelo de datos**. Anteriormente el intercambio de los mismos entre páginas web se hacia con XML, ahora y desde hace un tiempo tenemos **JSON** (**J**ava**S**cript **O**bject **N**otation) mucho más ligero que XML y que se entiende perfectamente con JS ya que usan la misma notación.

### MongoDB: base de datos NoSQL orientada a documentos

Si tenemos modelo de datos, **tenemos también base de datos**. **MongoDB** es una base de datos **NoSQL** (Base de datos no relacional) orientada a documentos.

![MongoDB](/images/javascript/MongoDB_yaii3q.png)
En lugar de guardar la información en tablas, se almacenan en forma de documentos JSON. De manera que pueden ser llamados facilmente desde JS e incorporarlos en nuestras aplicaciones webs. No significa que vayan a desaparecer las bases de datos tradicionales. En algunos momentos necesitamos que sean relacionales, pero para diversos tipos de aplicaciones una base NoSQL es una solución bastante óptima.

## Node.js: JavaScript también en el servidor

Si tenemos JS en cliente, modelo de datos y bases de datos escritas en JS, **¿Tenemos algo parecido en el servidor?** Por supuesto.

![5958685476_78ab9d2a86_m](/images/javascript/5958685476_78ab9d2a86_m_od23ju.jpg)

El [proyecto **Node.js**](https://github.com/joyent/node) ha llevado JS al lado del servidor. Fue presentado en 2009 por **Ryan Dahl** en la [JSConf](http://jsconf.com/). Creado a partir del motor [V8](<http://en.wikipedia.org/wiki/V8_(JavaScript_engine)>) para renderizar Javascript del navegador Google Chrome.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=ztspvPYybIY)
/>

Ahora podemos crear servidores webs con Javascript en el Back-End que soportan bas
