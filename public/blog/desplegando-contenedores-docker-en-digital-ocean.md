---
title: >-
  Desplegando contenedores en DigitalOcean con Docker, Docker Compose y Docker
  Machine
date: '2015-07-02'
url: >-
  https://carlosazaustre.es/blog/desplegando-contenedores-docker-en-digital-ocean
tags:
  - nodejs
  - herramientas
  - tutorial
  - web
---

# Desplegando contenedores en DigitalOcean con Docker, Docker Compose y Docker Machine

> Publicado el 2015-07-02 — https://carlosazaustre.es/blog/desplegando-contenedores-docker-en-digital-ocean

Hace unos meses escribí un post sobre [como manejar contenedores Docker en MAC](/manejando-docker-desde-os-x-creando-nuestro-primer-contenedor/), ya que se necesita una máquina virtual (_boot2docker_) para poder utilizarlos.

Hoy quería probar Docker en _producción_ y en este artículo voy a subir el [API REST que hice anteriormente con Node/Io.js y MongoDB](/como-crear-una-api-rest-usando-node-js/) pero en **dos contenedores Docker diferentes** (uno con la **aplicación Node/IO** y otro con **MongoDB**) a un instancia de [DigitalOcean](https://www.digitalocean.com/?refcode=f716de9860aa) desde contenedores Docker. Vamos allá.

El [**código fuente** de este proyecto lo tienes en **GitHub** como siempre](http://github.com/carlosazaustre/iojs-api-example). Siéntete libre de descargarlo y usarlo.

1. [Montando el entorno con Docker Compose](#montandoelentornocondockercompose)
2. [Desplegando los contenedores con Docker Machine](#desplegandoloscontenedorescondockermachine)

> Si tienes dudas sobre Docker, te recomiendo que leas [el artículo que escribí hace un tiempo sobre ello](/manejando-docker-desde-os-x-creando-nuestro-primer-contenedor/).

---

### Montando el entorno con Docker Compose

Primero necesitamos montar el entorno de trabajo en local. Como dije en la introducción **vamos a usar dos contenedores**, uno para servicio, el API REST en Node u IO.js será uno, y el otro será el que contenga la base de datos, en este caso MongoDB. SI por ejemplo usásemos Nginx, Redis, etc... irían en otros contenedores diferentes. De esta forma, si necesitamos escalar, podemos poner cada contenedor en una máquina más adelante sin mucha dificultad.

![docker containers mongodb node](/images/desplegando-contenedores-docker-en-digital-ocean/docker-containers.jpg)

Una vez tenemos [instalado Docker en nuestros equipos](/manejando-docker-desde-os-x-creando-nuestro-primer-contenedor/), levantamos el servicio, en el caso de Mac, usando **boot2docker** y recargando las variables de entorno de Docker que contienen la IP privada, etc...

```
$ boot2docker up
$ source ~/.bash_profile
```

Para poder manejar varios contenedores de manera sencilla y poder levantarlos y pararlos en conjunto, instalaremos **Docker Compose**, con el que a a través de un fichero `.yml` configuraremos nuestro entorno fácilmente.

Ya sea desde Mac o Linux, lo podemos instalar así:

```
$ sudo -i
root# curl -L https://github.com/docker/compose/releases/download/1.3.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
root# chmod +x /usr/local/bin/docker-compose
root# exit
$
```

> **Nota**
> Como vamos a probar varias veces, seguramente querremos borrar y parar los contenedore e imágenes que creamos más de una vez, y hacerlo de uno en uno puede resultar desesperante, por tanto estos dos comandos de a continuación nos harán ahorrar tiempo:
> Eliminar todos contenedores
> `$ docker rm $(docker kill $(docker ps -aq))`
> Eliminar todas imágenes
> `$ docker rmi $(docker images -qf "dangling=true")`
> Fuente: [Stackoverflow](http://stackoverflow.com/questions/17665283/how-does-one-remove-an-image-in-docker)

Creamos un único `Dockerfile` para nuestra aplicación Node/IO.js, ya que el contenedor de MongoDB lo crearemos desde el propio `docker-compose.yml` ya que no necesitamos más que la imagen de Mongo. En el caso de la aplicación IO.js, aparte del entorno necesitamos copiar el código del proyecto, instalar dependencias, etc...

```
FROM iojs:2.3.0

ADD . /iojs-api
WORKDIR /iojs-api
RUN npm install -g babel; npm install
```

Tomamos como imagen fuente la de `iojs:2.3.0` creada y mantenida por la propia comunidad de Docker. De esta manera nos ahorramos importar el sistema operativo, configurarlo, instalarle IO.js, Git, etc... , la imagen `iojs:2.3.0` ya incorpora todo eso. Si queremos tener un entorno más personalizado podemos hacerlo, pero para este tutorial lo he obviado.

Ya en el fichero `docker-compose.yml` escribimos todo el entorno para la ejecución de los contenedores

```yaml
api:
  build: .
  command: babel-node /iojs-api/index.js --restart=always
  ports:
    - "3000:3000"
  links:
    - mongodb
mongodb:
  image: mongo:2.6
  ports:
    - "27017:27017"
```

¿Qué estamos indicando en este fichero? Pues, que vamos a crear un contenedor llamado `api` el cual a través del comando `build: .` le decimos que lo construya con el `Dockerfile` que hay en la raiz del proyecto. Cuando finalice su montaje, ejecutará el comando `babel-node /iojs-api/index.js --restart=always` que es el que lanza el servidor Io.js con nuestro API. Mapeamos el puerto `3000` del contenedor con el `3000` del sistema y con `links` le decimos que se enlace con el contenedor `mongodb` que a continuación creamos.

> **Nota**:

> Se recomienda no usar supervisores de procesos en contenedores Docker y usar en su lugar el flag `--restart=always`

> Fuente [StackOverflow](http://stackoverflow.com/questions/28942614/should-i-use-forever-pm2-within-a-docker-container)

El contenedor Mongodb no se crea a partir de un `Dockerfile` por eso no hay comando `build` pero si un comando `image` donde le indicamos a partir de que imagen de Docker crearlo, en este caso `mongo:2.6`. También mapeamos los puertos que vamos a usar, en el caso de Mongo es el `27017`

Ejecutando el siguiente comando levantaremos los contenedores y se pondrán en funcionamiento

```
$ docker-compose up
```

Si los paramos para hacer cambios y necesitamos reconstruir las imágenes, lo haremos con el comando:

```
$ docker-compose build
```

Te habrás fijado que no funciona, y da un error de conexión con Mongo, ¿Sabes por qué? porque la URL de nuestra base de datos Mongo ya no es localhost, es una privada que le asigna Docker. ¿Y cómo lo averiguamos?

Si ejecutas el siguiente comando, podemos ver las variables de entorno que crea Docker para nuestra aplicación

```
$ docker-compose run api env
Starting iojsapi_mongodb_1...
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=9b0a72280cd4
TERM=xterm
IOJSAPI_MONGODB_1_PORT=tcp://172.17.0.4:27017
IOJSAPI_MONGODB_1_PORT_27017_TCP=tcp://172.17.0.4:27017
IOJSAPI_MONGODB_1_PORT_27017_TCP_ADDR=172.17.0.4
IOJSAPI_MONGODB_1_PORT_27017_TCP_PORT=27017
IOJSAPI_MONGODB_1_PORT_27017_TCP_PROTO=tcp
IOJSAPI_MONGODB_1_NAME=/iojsapi_api_run_1/iojsapi_mongodb_1
IOJSAPI_MONGODB_1_ENV_MONGO_VERSION=2.6.10
MONGODB_PORT=tcp://172.17.0.4:27017
MONGODB_PORT_27017_TCP=tcp://172.17.0.4:27017
MONGODB_PORT_27017_TCP_ADDR=172.17.0.4
MONGODB_PORT_27017_TCP_PORT=27017
MONGODB_PORT_27017_TCP_PROTO=tcp
MONGODB_NAME=/iojsapi_api_run_1/mongodb
MONGODB_ENV_MONGO_VERSION=2.6.10
MONGODB_1_PORT=tcp://172.17.0.4:27017
MONGODB_1_PORT_27017_TCP=tcp://172.17.0.4:27017
MONGODB_1_PORT_27017_TCP_ADDR=172.17.0.4
MONGODB_1_PORT_27017_TCP_PORT=27017
MONGODB_1_PORT_27017_TCP_PROTO=tcp
MONGODB_1_NAME=/iojsapi_api_run_1/mongodb_1
MONGODB_1_ENV_MONGO_VERSION=2.6.10
NPM_CONFIG_LOGLEVEL=info
IOJS_VERSION=2.3.0
HOME=/root
```

Hay dos que vamos a utilizar
`MONGODB_1_PORT_27017_TCP_ADDR=172.17.0.4` y `MONGODB_1_PORT_27017_TCP_PORT=27017`

Son el host y puerto de MongoDB dentro de nuestro contenedor, por tanto vamos a indicárselo en el código, en el fichero `index.js` cuando nos conectamos a la base de datos.

```javascript
const mongoHost = process.env.MONGODB_1_PORT_27017_TCP_ADDR || "127.0.0.1";
const mongoPort = process.env.MONGODB_1_PORT_27017_TCP_PORT || 27017;
const database = `mongodb://${mongoHost}:${mongoPort}/directory`;
```

De esta manera, si las variables de entorno están definidas las usará. Por el contrario si estamos fueras de los contendedor de Docker, empleará `localhost`

Con los cambios realizados, reconstruimos las imágenes y levantamos de nuevo el entorno:

```
$ docker-compose build
$ docker-compose up
```

Si probamos el API en `http://dockerhost:3000/employees` veremos que funciona:

![](/images/desplegando-contenedores-docker-en-digital-ocean/Screen-Shot-2015-06-30-at-10-39-15.png)

---

### Desplegando los contenedores con Docker Machine

Ahora vamos a usar otro proyecto de Docker, llamado **Docker Machine** que nos permite crear servidores desde la linea de comandos de nuestra terminal y con ayuda de Docker Compose, desplegarlos a producción en segundos

De nuevo vamos a usar [DigitalOcean](https://www.digitalocean.com/?refcode=f716de9860aa) para servir nuestra API _contenerizada_. Pero podemos [usar otros servidores como Amazon, Azure, etc..](https://docs.docker.com/machine/#drivers)

Para poder crear servidores con [DigitalOcean](https://www.digitalocean.com/?refcode=f716de9860aa) necesitamos un token que nos dé acceso a su API. Lo podemos conseguir clickando en el menu API dentro de nuestra cuenta.

![](/images/desplegando-contenedores-docker-en-digital-ocean/Screen-Shot-2015-06-30-at-10-59-39.png)
Será un número parecido a este: `7ghr3247fg98429jhd5dufhwg325de9ff1ab`. Lo copiamos (Ten cuidado de no compartir este número con nadie, o tendrán acceso a tu cuenta)

Ahora desde la linea de comandos, gracias al _Access Token_ de Digital Ocean y su driver podemos crear un droplet con el nombre `iojsapi_DO` con el comando `docker-machine create`:

```
$ docker-machine create --driver digitalocean --digitalocean-access-token 7ghr3247fg98429jhd5dufhwg325de9ff1ab iojsapi_DO

Creating CA: /Users/carlosazaustre/.docker/machine/certs/ca.pem
Creating client certificate: /Users/carlosazaustre/.docker/machine/certs/cert.pem
Creating SSH key...
Creating Digital Ocean droplet...
To see how to connect Docker to this machine, run: docker-machine env iojsapi_DO
```

Para poder trabajar con el entorno recién creado, seleccionamos la _maquina_ con el siguiente comando

```
$ eval "$(docker-machine env iojsapi_DO)"
```

Si ahora ejecutamos `docker-compose` se desplegará nuestro entorno en el nuevo droplet creado en DigitalOcean

```
$ docker-compose up
```

Podemos ir a un navegador o hacer uso de la aplicación _Postman_ para probar nuestra API que estará corriendo en la IP que DigitalOcean nos ha proporcionado y el puerto `3000`. En mi caso en `http://45.55.195.22:3000`

![](/images/desplegando-contenedores-docker-en-digital-ocean/Screen-Shot-2015-06-30-at-11-23-32.png)

¿Notas como tu cerebro ha crecido un poco? :)

**Más información**:

- [Manejando contenedores Docker en Mac OSX](/manejando-docker-desde-os-x-creando-nuestro-primer-contenedor/)
- [Docker: Linking containers together](https://docs.docker.com/userguide/dockerlinks/)
- [Documentación de Docker Compose](https://docs.docker.com/compose)
- [Documentación de Docker Machine](https://docs.docker.com/machine/)
- [Curso de Docker en Platzi](https://platzi.com/cursos/administracion-servidores/docker/?ref=carlosazaustre.es)
