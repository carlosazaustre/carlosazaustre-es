---
title: "Desarrollo Full Stack JavaScript. El conocido como Stack MEAN"
date: "2014-02-03"
url: "https://carlosazaustre.es/blog/desarrollo-full-stack-javascript-tambien-conocido-como-mean"
tags: []
---

# Desarrollo Full Stack JavaScript. El conocido como Stack MEAN

> Publicado el 2014-02-03 — https://carlosazaustre.es/blog/desarrollo-full-stack-javascript-tambien-conocido-como-mean

Con el auge de AngularJS, una nueva corriente está surgiendo en el desarrollo en JavaScript de principio a fin. El llamado stack _MEAN_. Con desarrollo _end-to-end_ nos referimos a utilizar JS en todas las partes que componen una aplicación web actual: Frontend, Backend y Base de Datos.

![mean_small_vertical](/images/desarrollo-full-stack-javascript-tambien-conocido-como-mean/mean_small_vertical_kaasp5.png)

El acrónimo **MEAN** viene de (_M_)ongo + (_E_)xpress + (_A_)ngular + (_N_)ode

## MongoDB

![MongoDB](/images/desarrollo-full-stack-javascript-tambien-conocido-como-mean/Icon_MongoDB_by_xkneo.png)

[Mongo](http://www.mongodb.org/) es una base de datos no relacional (**NoSQL**) de código abierto que guarda los datos en documentos tipo **JSON** (_JavaScript Object Notation_) pero en forma binaria (BSON) para hacer la integración de una manera más rápida. Se pueden ejecutar operaciones en JavaScript en su consola en lugar de consultas SQL. Además tiene una gran integración con Node.js con los driver propio y con Mongoose. Debido a su flexibilidad es muy escalable y ayuda al desarrollo ágil de proyectos web.

## ExpressJS

![expressjs](/images/desarrollo-full-stack-javascript-tambien-conocido-como-mean/687474703a2f2f662e636c2e6c792f6974656d732f30563253316e304b3169337931633132326730342f53637265656e25323053686f74253230323031322d30342d31312532306174253230392e35392e3432253230414d2e706e67.png)

[Express](http://expressjs.com/) es un framework por encima de Node.js que permite crear servidores web y recibir peticiones **HTTP** de una manera sencilla, lo que permite también crear APIs REST de forma rápida.

## AngularJS

![Angular JS tutorial](/images/desarrollo-full-stack-javascript-tambien-conocido-como-mean/square-300x3001_scxhwx-1.png)
[Angular](http://angularjs.org) es un framework JS para la parte cliente o Frontend de una aplicación web, que respeta el paradigma MVC y permite crear _Single-Page Applications_ (Aplicaciones web que no necesitan recargar la página), de manera más o menos sencilla. Es un proyecto mantenido por Google y que actualmente está muy en auge.

## Node.js

![Zemanta Related Posts Thumbnail](/images/desarrollo-full-stack-javascript-tambien-conocido-como-mean/nodejs-150x1505_ns3hvi.png)

[Node](http://nodejs.org/) Es un entorno de programación en JavaScript para el Backend basado en el motor **V8** de JavaScript del navegador **Google Chrome** y orientado a eventos, no bloqueante, lo que lo hace muy rápido a la hora de crear servidores web y emplear tiempo real. Fue creado en 2009 y aunque aún es joven, las últimas versiones lo hacen más robusto además de la gran comunidad de desarrolladores que posee. No solo se utiliza en servidor, se ha extendido tanto que se emplea en Stylus, un preproccesador CSS, en Grunt un gestor de tareas basado en JavaScript y en varias cosas más como tests, etc…

Una de las principales ventajas de **MEAN** es que emplea el mismo lenguaje de programación en todas las partes de la aplicación lo que permite que una persona pueda manejarse en todos los ámbitos de una aplicación web moderna aunque se especialice en uno de ellos. De esta manera se colabora más en los proyectos y el desarrollo es más continuo.

Esto, añadido a las pruebas automatizadas y los test unitarios, los repositorios **git** como GitHub o Bitbucket, los **servidores de integración continua** y las **PaaS** como **Heroku** o **Nodejitsu** hacen que el desarrollo web moderno sea más divertido y ágil.

Existen varios proyectos de esqueletos de aplicación con el stack MEAN, uno de los más conocidos es [MEAN.io](http://mean.io). Por mi parte **estoy desarrollando mi propio** [**MEAN Boilerplate**](https://github.com/carlosazaustre/mean-boilerplate) (con casinos y furcias) con estas propiedades añadiendole [**Redis**](http://redis.io/) para el almacenaje de sesiones y **[Stylus](http://learnboost.github.io/stylus/)** como preprocessador CSS. También uso [**PassportJS**](http://passportjs.org) para el login y registro con Facebook y Twitter. [El proyecto está en GitHub](https://github.com/carlosazaustre/mean-boilerplate) y os animo a colaborar o a que lo uséis en vuestros proyectos.

Llevo una semana en desarrollo con ello y poco a poco lo voy a ir ampliando y mejorando. Iré contando en el blog las cosas que vaya aprendiendo. Podéis contactar conmigo en [Twitter](http://twitter.com/carlosazaustre) y en [Google+](http://google.com/+CarlosAzaustre)

**Fuente**: [http://addyosmani.com/blog/full-stack-javascript-with-mean-and-yeoman/](http://addyosmani.com/blog/full-stack-javascript-with-mean-and-yeoman/)

[**¿Quieres más?** Descarga el ebook en español sobre **desarrollo web ágil con AngularJS y GulpJS**. ![](</blog/content/images/![](https://carlosazaustre.es/blog/content/images/2015/01/adwords_728x90.jpg)es/blog/ebook-angular/?utm_source=mean-post>)
