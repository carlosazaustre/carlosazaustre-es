---
title: "Docker como entorno de desarrollo local"
date: "2018-09-01"
url: "https://carlosazaustre.es/blog/docker-como-entorno-de-desarrollo-local"
tags: []
---

# Docker como entorno de desarrollo local

> Publicado el 2018-09-01 — https://carlosazaustre.es/blog/docker-como-entorno-de-desarrollo-local

En este artículo quiero compartir como implementar un entorno de desarrollo local en tu ordenador para tus aplicaciones empleando para ello Docker. Lo configuraremos de manera que funcione como un _LiveReload_, a cada cambio que hagamos en el código de nuestra aplicación, el contenedor lo refleje.

En otros artículos he comentado [cómo crear contenedores de Docker en Mac OSX](/manejando-docker-desde-os-x-creando-nuestro-primer-contenedor/) e incluso [cómo desplegarlos en producción en Digital Ocean](/desplegando-contenedores-docker-en-digital-ocean/).

Hoy quiero hablar de Docker como una alternativa a [Vagrant como entorno de desarrollo](/como-configurar-un-entorno-de-desarrollo-virtual-con-vagrant/) y provisionamiento.

Docker ha evolucionado mucho en poco tiempo. En un principio solo era posible utilizarlo en un sistema Linux, debido a que utiliza la tecnología de contenedores del sistema operativo. Hace poco empezó a ser utilizable en sistemas Mac y Windows gracias la máquina virtual `boot2docker`. Y hoy en día gracias a **[Docker Toolbox](https://docs.docker.com/mac/step_one/)** es posible utilizarlo en cualquier sistema.

## Definiendo el entorno de desarrollo con Docker Compose

En el ejemplo de este artículo voy a utilizar **Ubuntu 14.04** como sistema operativo base y una aplicación **Node.js** muy sencilla que ilustre lo que queremos hacer.

Primero de todo vamos a crear una carpeta para nuestro proyecto, en el directorio que prefieras de tu máquina local. En el vamos a incluir un fichero `Dockerfile`, un fichero `docker-compose.yml` y una carpeta para el código fuente de nuestra aplicación que puede ser de nombre `app/`.

Dentro de `app/` vamos a crear un fichero `package.json` muy simple con el siguiente código:

```javascript
{
  "name": "project",
  "scripts": {
    "start": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.x.x"
  },
  "devDependencies": {
    "nodemon": "*"
  }
}
```

Y un fichero con el código de la aplicación de nombre `app.js` con el siguiente contenido (de momento):

```javascript
console.log("Hola Mundo!");
```

Ahora procedemos con el fichero de la imagen Docker, el `Dockerfile`, que tendrá el siguiene contenido:

<pre class="language-shell">
  <code class="language-shell">
    FROM node:4.4.0 MAINTAINER cazaustre@gmail.com WORKDIR /app COPY app/ .
  </code>
</pre>

En éste fichero básicamente estamos diciendo que utilice la imagen de Node versión 4.4.0 como base, y que se coloque en el directorio `/app` para trabajar allí. Lo siguiente será que copie el contenido de la carpeta `app` local en el directorio actual del contenedor (que sera `app` por la instrucción anterior)

Dejamos este fichero así y continuamos con el fichero `docker-compose.yml`:

<pre class="language-shell">
  <code class="language-shell">
    web: build: . command: 'npm start' volumes: - ./app:/app
  </code>
</pre>

Este fichero nos ayuda a reducir código del Dockerfile y de comandos a la hora de correr el contenedor. Más adelante también nos servirá para defiir otros contenedores y enlazarlos.

Creamos un contenedor de nombre `web` que realiza lo siguiente:

- Con `build` indicamos que imagen de Dockerfile tiene que utilizar. Con la notación `.` leerá el fichero Dockerfile de directorio principal (donde se encuentre el fichero `docker-compose.yml`)

- Con `command` indicamos que comando tiene que ejecutarse al correr el contenedor. En este caso `npm start` que ejecuta el script `start` definido en el `package.json` (`nodemon app.js`)

- Y `volumes` es la parte más importante, ya que nos permite enlazar un directorio local con un directorio dentro del contenedor. En este caso, el directorio `app` donde está definido el código de la aplicación, lo enlazamos con `app` dentro del contenedor. Este es el directorio de trabajo que ya definimos con `WORKDIR` en el fichero `Dockerfile`.

Para poner en marcha este workflow, primero ejecutamos `$ docker-compose build` para construir los contenedores:

<pre class="language-shell">
  <code class="language-shell">
    root@ubuntu:/home/carlosazaustre/Development/project# docker-compose build
    Building web Step 1 : FROM node:4.4.0 ---> 564c70a84ab7 Step 2 : MAINTAINER
    cazaustre@gmail.com ---> Using cache ---> 62f115911e67 Step 3 : WORKDIR /app
    ---> Using cache ---> eb7e7144e107 Step 4 : COPY app/ . ---> b151f82fbff3
    Removing intermediate container 9afda7bedfff Successfully built b151f82fbff3
  </code>
</pre>

Y después `$ docker-compose up` para ponerlo en marcha:

<pre class="language-shell">
  <code class="language-shell">
    root@ubuntu:/home/carlosazaustre/Development/project# docker-compose up
    Recreating project_web_1 Attaching to project_web_1 web_1 | npm info it
    worked if it ends with ok web_1 | npm info using npm@2.14.20 web_1 | npm
    info using node@v4.4.0 web_1 | npm info prestart project@ web_1 | npm info
    start project@ web_1 | web_1 | > project@ start /app web_1 | > nodemon
    app.js web_1 | web_1 | [nodemon] 1.9.1 web_1 | [nodemon] to restart at any
    time, enter `rs` web_1 | [nodemon] watching: *.* web_1 | [nodemon] starting
    `node app.js` web_1 | Hola Mundo! web_1 | [nodemon] clean exit - waiting for
    changes before restart
  </code>
</pre>

Si todo sale bien, al final en el terminal tiene que aparecer el mensaje `Hola Mundo!` que es lo que hace el fichero `app.js`

## Creando nuestra App Node.js

Ahora vamos a modificar un poco el fichero `app.js` para que cree un pequeño servidor web con `Express`:

```javascript
const express = require("express");
const app = express();
const port = 3000;

app.set("port", port);

app.get("/", (req, res) => {
  res.send("Hola Mundo!");
});

app.listen(app.get("port"), (err) => {
  console.log(`Server running on port ${app.get("port")}`);
});
```

Y cambiamos el código del fichero `docker-compose.yml` para definir un par de cosas nuevas:

<pre class="language-shell">
  <code class="language-shell">
    web: build: . command: sh -c 'npm install; npm start' ports: - '3000:3000'
    volumes: - ./app:/app
  </code>
</pre>

- El comando que ejecutaremos ahora es `sh -c 'npm install; npm start'` que lo que hace es abrir un terminal de shell en el contenedor y ejecutar los comandos `npm install` para instalar las dependencias definidas en el `package.json` y `npm start` para correr el script `start`.

- Con `ports` exponemos fuera del contenedor el puerto que está utilizando la aplicación, en este caso el `3000`

Si ahora ejecutamos de nuevo `$ docker-compose build` y `$ docker-compose up` tendremos la siguiente salida

<pre class="language-shell">
  <code class="language-shell">
    Recreating project_web_1 Attaching to project_web_1 web_1 | npm info it
    worked if it ends with ok web_1 | npm info using npm@2.14.20 web_1 | npm
    info using node@v4.4.0 web_1 | npm info prestart project@ web_1 | npm info
    start project@ web_1 | web_1 | > project@ start /app web_1 | > nodemon
    app.js web_1 | web_1 | [nodemon] 1.9.1 web_1 | [nodemon] to restart at any
    time, enter `rs` web_1 | [nodemon] watching: *.* web_1 | [nodemon] starting
    `node app.js` web_1 | Server running on port 3000
  </code>
</pre>

Como se puede ver, el servidor está escuchando en el puerto `3000`. Si abrimos un navegador en la dirección `http://localhost:3000` veremos lo siguiente.

> **La IP no será `localhost` si estamos en Mac o Windows**, debido a que Docker necesita una máquina virtual linux para ejecutarse. En ese caso será la IP que nos proporcione la máquina virtual.

> Para este ejemplo estoy usando Linux Ubuntu, por eso empleo `localhost`

![Docker Hola Mundo](/images/docker-como-entorno-de-desarrollo-local/docker-entorno-desarrollo-hola-mundo.png)

## Realizando cambios en nuestra App

Como tenemos el contenedor corriendo, el volumen enlazado, y el script `nodemon` ejecutándose, si hacemos cambios en el código, se verán reflejados en el contenedor.

Vamos a cambiar el código de `app.js` para que a la ruta `/:nombre` nos muestre el nombre que pasamos en la URL:

```javascript
const express = require("express");
const app = express();
const port = 3000;

app.set("port", port);

app.get("/:nombre", (req, res) => {
  res.send(`Hola ${req.params.nombre}!`);
});

app.listen(app.get("port"), (err) => {
  console.log(`Server running on port ${app.get("port")}`);
});
```

En cuanto salvemos, la terminal mostrará el siguiente mensaje:

<pre class="language-shell">
  <code class="language-shell">
    ... web_1 | [nodemon] restarting due to changes... web_1 | [nodemon]
    starting `node app.js` web_1 | Server running on port 3000
  </code>
</pre>

Y si en el navegador cambiamos la URL a `http://localhost:3000/Carlos` tendremos lo siguiente:

![Docker como entorno de desarrollo](/images/docker-como-entorno-de-desarrollo-local/docker-entorno-desarrollo-livereload.png)

De esta manera, tenemos un entorno de desarrollo definido gracias a Dockerfile, que luego podremos trasladar a producción, pero a su vez lo podemos utilizar al mismo tiempo que vamos cambiando nuestro código como si el entorno estuviese instalado en nuestra máquina virtual.
