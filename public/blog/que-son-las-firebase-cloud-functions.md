---
title: ¿Qué son las Firebase Cloud Functions?
date: '2017-06-19'
url: 'https://carlosazaustre.es/blog/que-son-las-firebase-cloud-functions'
tags:
  - firebase
  - javascript
  - nodejs
related:
  - conectando-firebase-a-react
  - usando-firebase-storage-con-react-js
  - firebase-hosting-ssr
---

# ¿Qué son las Firebase Cloud Functions?

> Publicado el 2017-06-19 — https://carlosazaustre.es/blog/que-son-las-firebase-cloud-functions

Las Cloud Functions de Firebase son un nueva funcionalidad que ofrece la plataforma de Google y que anunciaron en el pasado [Google Cloud Next'17](https://www.youtube.com/watch?v=GNR9El3XWYo).

Esta nueva funcionalidad permite crear funciones escritas en JavaScript, en un entorno Node.js, que son invocadas por eventos de Firebase (Cuando se escribe en la base de datos, cuando se crea un usuario, cuando se sube un fichero, etc).

Esto nos permite tener una solución _Backend as a Service_ bastante completa con Firebase.

![Cloud Functions for Firebase](/images/que-son-las-firebase-cloud-functions/firebase_cloud_functions_for_startups.jpg)

Las Cloud Functions son el siguiente nivel en lo que se refiere a Computación en la nube. Tendríamos 3 niveles:

- **Infraestructura como Servicio (IaaS)**:
  En éste nivel tienes acceso completo a la máquina virtual dónde puedes elegir el Sistema Operativo e instalar lo que quieras.
  La ventaja es que tienes libertad total y la desventaja es que necesitas controlar muchas cosas (Seguridad, Actualizaciones del S.O., del entorno, etc..)
  Algunos ejemplos de servicios IaaS serían:

  - Amazon EC2
  - Google Cloud Compute Engine
  - Digital Ocean

- **Plataforma como Servicio (PaaS)**:
  En éste segundo nivel no tienes que preocuparte del Sistema Operativo ni los parches de seguridad relativos, simplemente te enfocas en tu App (backend+frontend) y la despliegas en el entorno que te ofrece el proveedor, la gran mayoría permiten todo tipo de lenguajes (Node.js, Python, Ruby, Java, etc...)
  Algunos ejemplos de servicios PaaS son:

  - Google Cloud App Engine
  - Heroku

- **Funciones como Servicio (FaaS)**:
  Este tercer nivel te abstrae por completo del sistema operativo, del desarrollo del backend completo y de mantenimiento de un sistema monolítico. Con las funciones, puedes tener dividido tu Backend en microservicios que serían las diferentes funciones y cada una de ellas se encargaría de una tarea concreta.
  Los servicios que ofrecen esto ahora mismo son:
  - Amazon Lambda
  - Google Cloud Functions
  - Cloud Functions for Firebase

## ¿Qué puedo hacer con las Cloud Functions?

Una vez puestos en situación, vamos a ver que tipo de cosas nos permiten hacer las Cloud Functions, en concreto las que proporciona Firebase.

- **Notificaciones**:
  Podemos enviar notificaciones Push a los dispositivos de nuestros usuarios uniendo Firebase Cloud Messaging y el trigger de la base de datos que salte cuando escribamos en un determinado registro, por ejemplo cuando un usuario tiene un nuevo "follower":
  ![Notificaciones con Firebase Cloud Functions](/images/que-son-las-firebase-cloud-functions/notify.png)

- **Filtrado de mensajes**:
  Uniendo los triggers de la base de datos con las Cloud Functions de nuevo podemos hacer que cuando se escriba un mensaje en un registro de la base de datos, poderlo "sanitizar" (eliminar código HTML o JS malicioso, ocultar información tipo emails o números de teléfono, etc...) y escribirlo ya "limpio" en la base de datos:
  ![Sanitizacion de mensajes](/images/que-son-las-firebase-cloud-functions/sanitization.png)

- **Tratamiento de imágenes**:
  Combinando triggers de Firebase Storage con la base de datos y las Cloud Functions, podemos hacer que cada vez que un usuario suba una imagen al Storage, descargarla, reducirla de tamaño y colocarla de nuevo en Storage y escribir un registro en la base de datos. Todo con una función.
  ![Thumbnail de imágenes](/images/que-son-las-firebase-cloud-functions/intensive.png)

Y muchísimas más que se disparan si lo unes a las [APIs de Machine Learning que tiene Google Cloud](https://cloud.google.com/products/machine-learning/) (Vision, Video, Speech, Translate, etc..) Pero eso es tema para otro post :)

## ¿Cómo creo mi primera Cloud Function?

Para poder crear funciones con Firebase, necesitas primero de todo tener instalado Node.js y NPM en tu equipo para poder instalar la librería `firebase-tools`:

```
$ npm install -g firebase-tools
```

Esto nos va a permitir utilizar el comando `firebase` en la terminal.

Primero nos situamos en un directorio de nuestro equipo donde queramos tener nuestro proyecto y ejecutamos:

```
$ firebase login
```

Nos pedirá autenticarnos con una cuenta de Google y ya tendremos acceso los proyectos que creemos en el [panel de control de Firebase](https://console.firebase.google.com)

Por último corremos el comando `firebase init` con la opción de `functions` y nos creará un proyecto de firebase listo para crear funciones:

```shell
$ firebase init functions
```

Y la estructura de archivos generada será la siguiente:

```shell
myProyecto
 +- .firebaserc    # Fichero oculto para ayudarnos a cambiar
 |                 # de proyecto con el comando `firebase use`
 |
 +- firebase.json  # Describe las propiedades de nuestro proyecto
 |
 +- functions/     # Directorio que contiene el código de las Functions
      |
      +- package.json  # Fichero de npm que describe las dependencias.
      |
      +- index.js      # Fichero principal del código de Funciones
      |
      +- node_modules/ # Directorio dónde se encuentran instaladas las dependencias (Declaradas en
                       # package.json)
```

Una vez tenemos esto, empezamos a escribir en el fichero `miProyecto/functions/index.js`

Lo primero que debemos añadir son las dependencias de `firebase-functions` y `firebase-admin` para poder utilizar los triggers que disparan las funciones y tener acceso de administrador la base de datos de nuestro proyecto:

```javascript
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
```

Y un ejemplo de función, siguiendo la documentación oficial de Firebase, sería poner en mayúsculas un texto que se escriba en la base de datos, eso lo podríamos hacer de la siguiente manera:

```javascript
exports.makeUppercase = functions.database
  .ref("/messages/{pushId}/original")
  .onWrite((event) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = event.data.val();
    console.log("Uppercasing", event.params.pushId, original);
    const uppercase = original.toUpperCase();
    return event.data.ref.parent.child("uppercase").set(uppercase);
  });
```

Cuando se escriba en la base de datos, en el registro `/messages/{pushId}/original` se dispara el evento `onWrite` que recoge la función `makeUppercase` que exportamos.

Y luego la función lo que hace es tomar el texto, que viene en el objeto `event.data.val()`, pasarlo a mayúsculas y escribirlo en el registro `/messages/{pushId}/uppercase` ya que `event.data.ref` hace referencia al registro con el que definimos el trigger que es `/messages/{pushId}/original` y con `.parent.child` vamos hacia arriba y creamos un nuevo hijo.

Y con esto es básicamente el inicio de cualquier función que desarrollemos. Después ya el grado de complejidad y la integración de librerías será menor o mayor.

## Talleres de Firebase Cloud Functions para Startups

Durante la 2ª quincena de Julio, [Paola](https://twitter.com/ggarciapaola) y yo vamos a estar impartiendo unos talleres sobre [Firebase Cloud Functions para Startups](https://functionsforstartups.firebaseapp.com/) en varias ciudades de Europa.

Este es nuestro calendario por ahora:

- Miércoles **21 de Junio** - **GDG Madrid**
  [Taller en Campus Madrid](https://www.campus.co/madrid/es/events/ag1zfmd3ZWItY2FtcHVzcj8LEgZDYW1wdXMiBFJvb3QMCxIGQ2FtcHVzIgZtYWRyaWQMCxIFRXZlbnQiEmExOWYxMDAwMDA0MElZWkFBMgw) (Classroom de la 3ª planta)

- Viernes **23 de Junio** - **GDG Aalborg (Dinamarca)** [Workshop @ CREATE Aalborg University](https://www.meetup.com/GDG-Aalborg/events/240662900/)

- Sábado **1 de Julio** - **GDG Braga (Portugal)** [Workshop @ Braga I/O](https://www.meetup.com/GDG-Braga/events/240588970/)

Si eres organizador de un GDG, contacta conmigo para ver si es posible que impartamos este taller en tu comunidad :)

_Más información y fuentes: [Cloud Functions for Firebase Documentation](https://firebase.google.com/docs/functions/)._
