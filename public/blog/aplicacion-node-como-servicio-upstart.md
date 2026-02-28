---
title: Ejecuta tu App NodeJS como un Servicio en Linux
date: '2016-03-04'
url: 'https://carlosazaustre.es/blog/aplicacion-node-como-servicio-upstart'
tags:
  - nodejs
  - herramientas
  - web
excerpt: >-
  Aprende a ejecutar tu aplicación Node.js como un servicio en Linux con
  Upstart. La solución más elegante para producción en Ubuntu, con reinicio
  automático.
---

# Ejecuta tu App NodeJS como un Servicio en Linux

> Publicado el 2016-03-04 — https://carlosazaustre.es/blog/aplicacion-node-como-servicio-upstart

Imagina que tienes una App escrita en Node.js y necesitas desplegarla en producción.

Ya sabes que con el comando `node app.js` no es una buena opción, ya que si la aplicación se cae no hay manera de volverlo a arrancar automáticamente. Necesitarías entrar en el servidor y correr el comando de nuevo.

Hay opciones como `forever` y `pm2` que te permiten tener tu aplicación Node corriendo continuamente y reiniciarse en caso de caída.

Sin embargo una opción más elegante es correr tu aplicación como servicio en tu sistema operativo. Como corre por ejemplo Nginx o MongoDB.

En este artículo vemos como hacerlo para Linux (En concreto para Ubuntu) utilizando **upstart**.

![Upstart](/image/saplicacion-node-como-servicio-upstart/upstart80.png)

[_Upstart_](https://es.wikipedia.org/wiki/Upstart) es un _demonio_ basado en eventos que maneja el arranque de tareas y servicios durante el arranque del sistema, los detiene en el apagado y los supervisa mientras el sistema está funcionando. Originalmente fue desarrollado para las distribuciones Ubuntu pero se pretende que sea adecuado para su implementación en todas las distribuciones Linux.

Tienes más información en la página del proyecto [upstart](http://upstart.ubuntu.com/)

## Tu aplicación Node

Partamos de una aplicación Node.js muy simple. El siguiente código nos sirve:

```javascript
// app.js
var express = require("express");
var app = express();
var port = process.env.PORT;

app.get("/", function (req, res) {
  res.send("Hola Mundo!");
});

app.listen(port);
```

Y este sería el fichero `package.json`:

```javascript
{
  "name": "mi-aplicacion",
  "version": "1.0.0",
  "dependencies": {
     "express": "^4.13.3"
  },
  "scripts": {
     "start": "node app.js"
  }
}
```

Ésta aplicación simplemente muestra en el navegador `Hola Mundo!` cuando entramos a la URL principal (por ejemplo: `http://dominio.com/:port`) Siendo `port` el valor que recoja de una variable de entorno `PORT`.

## Fichero de configuración Upstart

Creamos un fichero de configuración de _upstart_ llamado `miAplicacion.conf` con el siguiente código:

```shell
start on runlevel [2345]
stop on runlevel [!2345]

respawn
respawn limit 10 5

setuid ubuntu
chdir /opt/myAplicacion

env PORT=3000

exec npm start
```

Explicamos línea a línea que hace este fichero.

Los sistemas operativos tipo UNIX tienen diferentes [niveles de ejecución](https://es.wikipedia.org/wiki/Nivel_de_ejecuci%C3%B3n) (_runlevels_). Los 7 niveles de ejecución del sistema son:

- **0**: Nivel Alto: Para el apagado del sistema
- **1**: Nivel de usuario único.
- **2**: Nivel de modo multiusuario. (sin soporte de red).
- **3**: Nivel de modo multiusuario con soporte de red
- **4**: Igual que el Nivel 3.
- **5**: Igual que el Nivel 3 con soporte gráfico.
- **6**: Reinicia el sistema

En este caso vamos a asociarle los niveles `2`, `3`, `4` y `5`. con `start on runlevel [2345]` y `stop on runlevel ![2345]`

El comando`respawn` nos ayuda a que el servicio se reinicie en caso de que se caiga y con `respawn limit 10 5` le indicamos que no reinicie más de 5 veces en 10 segundos. Esto nos sirve para que no se quede en un bucle de reinicios en caso de que haya un malfuncionamiento de la aplicación. Sólo se reiniciará si es una caída puntual.

Con `setuid ubuntu` indicamos que usuario ejecuta la aplicación. Es conveniente que este usuario no sea root, es más recomendable por seguridad crear un usuario del sistema operativo con permisos limitados para ejecutar la aplicación. En este caso el usuario es `ubuntu`

El siguiente paso es indicar en que directorio o carpeta del sistema está el código de nuestra aplicación node. Puede ser cualquiera pero es una buena opción tenerlo en la ruta `/opt/miAplicacion` siendo `miAplicacion` el nombre de nuestro proyecto.

A continuación podemos _setear_ variables de entorno, como por ejemplo si estamos en producción o desarrollo, el puerto, claves secretas de APIs, etc... lo podemos hacer con el comando `env` seguido de la variable de entorno, un igual y el valor: `env PORT=3000`, con esto la variable de entorno `PORT` queda igualada a `3000` y la aplicación correrá en el puerto 3000.

Por último con el comando `exec` ejecutamos un comando. En este caso ejecutaremos el comando `npm start` que tenemos definido en el `package.json`.

(Internamente `npm start` llama al comando `node app.js` que tenemos configurado en el objeto `scripts` del `package.json`)

## Despliegue

Por último, para hacer funcionar todo, necesitas tener el código de tu aplicación node (el `app.js` y el `package.json`) en la carpeta `/opt/miAplicacion` de tu servidor.

Tener un usuario del sistema llamado `ubuntu` o el que tu prefieras, pero a ser posible que no sea `root`.

Y copiar el fichero de configuración `miAplicacion.conf` en la carpeta `/etc/init/` del sistema que es donde se encuentran los servicios upstart.

Ya solo necesitas ejecutar el comando `service miAplicacion start` en tu servidor y tendrás tu aplicación node.js corriendo como servicio en producción.
