---
title: "Desplegando nuestro API REST Node/IO.js en la nube con Digital Ocean"
date: "2015-07-01"
url: "https://carlosazaustre.es/blog/desplegando-nuestro-api-rest-en-la-nube-con-digital-ocean"
tags: []
---

# Desplegando nuestro API REST Node/IO.js en la nube con Digital Ocean

> Publicado el 2015-07-01 — https://carlosazaustre.es/blog/desplegando-nuestro-api-rest-en-la-nube-con-digital-ocean

Despues de haber [creado nuestra API RESTful en Node/IO.js](/construyendo-un-api-rest-con-io-js-y-ecmascript-6/), nos gustaría tenerla desplegada en un servidor para que pueda ser accesible desde cualquier cliente.

En éste artículo veremos como desplegarla en producción, con Git y [DigitalOcean](https://www.digitalocean.com/?refcode=f716de9860aa) como infraestructura.

[El **código fuente** utilizado lo tienes en el siguiente respositorio de **GitHub**, úsalo :)](http://github.com/carlosazaustre/iojs-api-example)

1. [Registro en DigitalOcean](#registroendigitalocean)
2. [Instalación del Entorno](#instalacindelentorno)
3. [Descarga del proyecto desde GitHub](#descargadelproyectodesdegithub)
4. [Corriendo el servidor](#corriendoelservidor)

---

### Registro en DigitalOcean

Vamos a utilizar [Digital Ocean](https://www.digitalocean.com/?refcode=f716de9860aa) como IaaS (**I**nfrastructure **a**s **a** **S**ervice) por su facilidad de uso y configuración. Además si te registras con este [link, **consigues 10$ gratis**](https://www.digitalocean.com/?refcode=f716de9860aa), lo que suponen 2 meses de uso continuado de la instancia más pequeña.

Despues de registrarnos, creamos un Droplet.
![](/images/desplegando-nuestro-api-rest-en-la-nube-con-digital-ocean/Screen-Shot-2015-06-27-at-23-13-18.png)

Si tienes problemas a la hora de configurar DigitalOcean, puedes seguir [éste post](/como-configurar-tu-servidor-cloud-en-digitalocean/) que escribí hace un tiempo.

Le ponemos un nombre, por ejemplo `iojs-api` y elegimos el tamaño más pequeño (5$ al mes) que para este ejemplo nos sirve más que de sobra.

![](/images/desplegando-nuestro-api-rest-en-la-nube-con-digital-ocean/Screen-Shot-2015-06-27-at-23-38-03.png)

vamos a **elegir Ubuntu 14.04 como distribución del sistema** y en la región por defecto que es Nueva York:

![](/images/desplegando-nuestro-api-rest-en-la-nube-con-digital-ocean/Screen-Shot-2015-06-27-at-23-52-27.png)

No se te olvide crear una clave SSH para poder acceder al servidor desde la terminal sin tener que usar una contraseña. Así es más seguro y más cómodo. [Aquí](https://help.github.com/articles/generating-ssh-keys/) y [aquí](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2) puedes ver como [generar una clave RSA para SSH](https://help.github.com/articles/generating-ssh-keys/).

![](/images/desplegando-nuestro-api-rest-en-la-nube-con-digital-ocean/Screen-Shot-2015-06-27-at-23-52-49.png)

---

### Instalación del entorno

Una vez esté creado el droplet podemos acceder desde la terminal vía SSH, donde `45.55.66.47` es la IP de nuestro servidor
![](/images/desplegando-nuestro-api-rest-en-la-nube-con-digital-ocean/Screen-Shot-2015-06-28-at-00-17-42.png)

```shell
$ ssh root@45.55.66.47
```

Una vez dentro podemos actualizar los paquetes del sistema operativo e instalar nuestro entorno. [En este post explico como se instala node](/como-instalar-node-js-en-ubuntu/), pero IO.js sería de manera similar eligiendo la versión `iojs-v.2.3.1` ya que nuestro API lo hemos programado bajo ese entorno en local.

```shell
root@iojs-api:~# nvm install iojs-v2.3.1
```

También instalamos MongoDB, que será nuestra base de datos para almacenar los registros. En este enlace puedes ver [como instalar MongoDB en Ubuntu](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)

Por último no nos olvidemos de instalar **git** ya que es nuestro sistema de actualización del proyecto. Descargaremos el repositorio desde GitHub a DigitalOcean.

---

### Descarga del proyecto desde GitHub

Con el entorno instalado (Node/IO, MongoDB y Git) ya podemos instalar las dependencias de nuestro proyecto. Necesitaremos `babel` para traducir el código ES6 que IO.js todavía no entiende. Lo instalamos de forma global

```shell
root@iojs-api:~# npm install -g babel
```

También vamos a instalar [**PM2**. Es un gestor de procesos](https://github.com/Unitech/PM2) que nos sirve para correr Node de una forma muy robusta frente a errores y actualizaciones.

```shell
root@iojs-api:~# npm install -g pm2
```

Por útimo creamos una clave privada en el servidor para poder comunicarnos con el repositorio de GitHub y poder hacer así el despliegue.

```shell
root@iojs-api:~# cd .ssh
root@iojs-api:~# ssh-keygen -t rsa
root@iojs-api:~# cat id_rsa.pub
ssh-rsa AAAAB3N[...]lGEr root@iojs-api
```

la copiamos en GitHub, en las preferencias del repositorio. Ya entonces podremos hacer **pulls** e incluso cambios al repositorio.
![](https://carlosazaustre.es/blog/content/images/2015/06/Screen-Shot-2015-06-28-at-11-31-32.png)

Clonamos el proyecto. En mi caso lo tengo en la url: `git@github.com:carlosazaustre/iojs-api-example.git`
Y posteriormente hacemos `npm install` para instalar las dependencias definidas en el `package.json` del proyecto

```shell
root@iojs-api:~# git clone git@github.com:carlosazaustre/iojs-api-example.git
root@iojs-api:~# cd iojs-api-example
root@iojs-api:~# npm install
```

---

### Corriendo el servidor

Ya solo tenemos que correr el API en el servidor con PM2, para que una vez salgamos de la terminal, el proceso siga funcionando. El comando sería el siguiente:

```shell
root@iojs-api:~# cd iojs-api-example
root@iojs-api:~# pm2 start index.js -i 0 ---next-gen-js --interpreter iojs --watch
```

con `start index.js` iniciamos el API, y con `--next-gen-js --interpreter iojs` le indicamos que tienes que hacer una transformación de ECMAScript 6 a 5 o a lo que entienda IO.js. `--watch` nos sirve para que esté atento a si se producen cambios para que se reinicie. Y por último `-i 0` le indicamos que se inicie en modo `cluster`.

Si ahora vamos a un navegador a la URL `http://45.55.66.47:3000/employees` o a la IP que te haya asignado Digital Ocean, podemos ver el siguiente resultado.

![](/images/desplegando-nuestro-api-rest-en-la-nube-con-digital-ocean/Screen-Shot-2015-06-28-at-11-38-44.png)

Si hacemos pruebas, como un `POST` con un objeto empleado y luego de nuevo un `GET` tendríamos un resultado como el siguiente:

![](/images/desplegando-nuestro-api-rest-en-la-nube-con-digital-ocean/Screen-Shot-2015-06-28-at-12-03-58.png)

Y con un `GET` específico
![](/images/desplegando-nuestro-api-rest-en-la-nube-con-digital-ocean/Screen-Shot-2015-06-28-at-12-04-14.png)

Ya tenemos nuestro API disponible, si queremos camuflar el puerto y la IP de nuestro servidor, podemos utilizar un dominio propio o un subdominio (por ejemplo: `api.midominio.com`) y seguir este [post de cómo configurar un proxy inverso con Nginx](/como-servir-tu-api-rest-en-node-js-a-traves-de-nginx/).

Recuerda que en [éste enlace de **GitHub** tienes el **repositorio del proyecto**](http://github.com/carlosazaustre/iojs-api-example) para hacer pruebas y mejorarlo si quieres :)
