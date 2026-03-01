---
title: "Google Launchpad Madrid, Día 4: Tecnología"
date: "2015-07-09"
url: "https://carlosazaustre.es/blog/google-launchpad-madrid-dia-4-tecnologia"
tags: []
---

# Google Launchpad Madrid, Día 4: Tecnología

> Publicado el 2015-07-09 — https://carlosazaustre.es/blog/google-launchpad-madrid-dia-4-tecnologia

Llegó el primer día dedicado a la **tecnología** en la semana de [Google Launchpad](/google-launchpad-week-dia-1-producto/) en [Campus Madrid](http://campus.co/madrid), donde [Paola](http://twitter.com/ggarciapaola) y yo estamos aprendiendo como mejorar [**Chefly**](https://chefly.co)

Hoy hemos contado con dos grandes charlas impartidas por [Andrés L. Martínez](http://twitter.com/davilagrau) (más conocido como _Almo_) y [Jorge Barroso](http://twitter.com/flipper83) (más conocido como _Flipper83_)

![](/images/google-launchpad-madrid-dia-4-tecnologiaIMG_20150709_100654.jpg)

_Almo_ nos ha presentado las cifras del mercado _mobile_, muy interesantes, quedando como resumen que casi el 80% de la población utiliza Android, pero la monetización de las apps llega más de la parte de iOS.

![](/images/google-launchpad-madrid-dia-4-tecnologiaIMG_20150709_101925.jpg)
![](/images/google-launchpad-madrid-dia-4-tecnologiaIMG_20150709_102256.jpg)
![](/images/google-launchpad-madrid-dia-4-tecnologiaIMG_20150709_101251.jpg)

Fuente: [Developer Economics](http://developereconomics.com/go)

Después _Flipper_ nos ha contado su experiencia como "Mobile Developer for Startups" que puede aplicarse a cualquier tipo de App, incluidas las webs.

![](/images/google-launchpad-madrid-dia-4-tecnologiaIMG_20150709_110552.jpg)

De él hemos sacado varias cosas importantes, como:

> No construyas tu producto sobre tu prototipo.

El prototipo es para validar una idea. Hazlo todo lo feo que puedas ya que luego es mejor que lo tires y empieces tu producto de cero en base a lo aprendido. No hay que tener miedo a tirar cosas.

> One page design

Ten en una sóla página el diseño global de tu aplicación. Tenlo siempre presente en tu equipo, y que todo el mundo pueda verlo diariamente y añadir notas. Así todo el mundo está en sintonía y sabe que hay que hacer, que ha cambiado y que se ha hecho ya

> MVP: M de Mínimun, pero mínimo de todo.

Hacer nuestro proyecto funcional. Que haga una sola cosa pero que funcione, lo haga bien y se vea bien.

> Feedback de usuarios.

Toma las decisiones en base a los números y datos que dan tus usuarios. No hay que ser dictarorial con el diseño y las funcionalidades de tu aplicación. Básate en lo que hacen tus usuarios y lo que demandan.

> Automatiza tu tiempo.

En una Startup lo más importante es el tiempo. Si podemos automatizar cosas, tenemos que hacerlo. Tenemos herramientas como Jenkins, Travis, Tests, etc.. Invertir en ellas nos hará ahorrar tiempo y probar mejor nuestras ideas.

Y la **más útil** para mi:

> From STUPID to SOLID code

La mejor clase de programación que he escuchado y en sólo 5 minutos. Os recomiendo que [leais sobre ello](http://williamdurand.fr/2013/07/30/from-stupid-to-solid-code/).

A continuación hemos tenido las mentorías. Más relajadas que los días anteriores, pero no por ello menos interesantes y útiles. Hoy hemos tenido menos mentorías que otros días, y nuestros mentores han sido [Javier Lafora](https://twitter.com/eLafo), [Ricardo Varela](https://twitter.com/phobeo) e [Ismael Faro](https://twitter.com/ismaelfaro). Mil gracias por su tiempo de nuevo y por las ideas aportadas!

Javier nos ha recomendado unas cuantas herramientas muy útiles para el análisis de nuestro código, monitorización y logs:

- [Pingdom]()
- [Monit]()
- [Rollbar]()

Ricardo nos ha dado un buen tip sobre el manejo de ramas en Git y realizar despliegues, utilizando la teoría del _Patrón Tofu_.

![](/images/google-launchpad-madrid-dia-4-tecnologiagit-workflow-release-cycle-2feature.png)
Fuente: [Atlassian](https://www.atlassian.com/pt/git/workflows#!workflow-gitflow)

Básicamente consiste en que las ramas "superiores" se encuentre el código o versión más estable, y en las "inferiores" la más sujeta a cambios. Por ejemplo, la rama de producción siempre por encima de "Staging" y esta de "Development". De esta manera siempre podemos volver a versiones anteriores fácilmente y tener versiones estables fácilmente localizables.

Y por último Ismael nos ha dado grandes consejos en arquitectura que poco a poco iremos implementando en [Chefly](http://chefly.co). Cosas que nos ha dejado para que miremos más adelante:

- [Cloudfare](https://www.cloudflare.com/plans)
- [Hapi.js](http://hapijs.com/)
- [Moe](https://github.com/Yelp/moe)
- [Kue](https://github.com/Automattic/kue)
- [Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit#getting-started)

Muy interesantes y que cuando definamos la próxima versión de [Chefly](https://chefly.co) valoraremos y seguramente implementemos.

En cuanto al resumen del punto de situación y el plan de acción a tomar, estos son nuestros puntos:

- **Puntos de Situación**:

Problemas encontrados en torno a la tecnología y arquitectura utilizadas:

- No hacemos test en el código (si, lo sabemos, no nos peguéis)

- No monitorizamos correctamente los servidores.

- No tenemos suficientemente automatizados los despliegues.

- La página pesa mucho, no optimizamos las imágenes y demás assets

- **Puntos de acción**:

Plan de acción a ejecutar:

- Aplicar herramientas de monitorización, logger, y análisis de código a nuestros sistemas

- Testear los puntos claves de la aplicación como el registro, login y pago. Empezar por test unitarios para hacernos a ello y pasar a test de aceptación. Antes de hacer los test es conveniente que definamos unas historias de usuario, que nos servirán para definir la UX y las funcionalidades que necesitemos.

- Llevar una gestión eficiente de las ramas de GIt. Tener una rama de “Staging” y un servidor de “Staging” para probar en un entorno similar al de producción antes de desplegar

- Cuantificar el coste que tendría utilizar una solución “hosteada” como Heroku, para no perder tiempo en Administración de servidores y dedicarnos a la parte “core”. Analizarlo y elaborar un presupuesto.

- Utilizar cloudfare para servir los assets, nos ahorrará tiempo y mejorará la carga de la página

- Tener scripts de despliegue para automatizar la subida, y posteriormente pasar a soluciones como CodeShip

- Utilizar Mongo de manera más eficiente eliminando “populates” y duplicar contenido que queramos mostrar. No es limpio, pero nos da rapidez.

¡Y mañana ya acabamos! Parece que llevamos un mes, recibiendo feedback y nuevas ideas. Está siendo una gran experiencia. Mañana veremos más tecnología y pondremos en común todo lo aprendido y a continuación manos a la obra!
