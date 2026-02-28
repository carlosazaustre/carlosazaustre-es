---
title: Cómo lanzar una aplicación web en Google Cloud Run con Cloud Build
date: '2019-07-08'
url: 'https://carlosazaustre.es/blog/google-cloud-run'
tags:
  - nodejs
  - web
  - tutorial
  - herramientas
---

# Cómo lanzar una aplicación web en Google Cloud Run con Cloud Build

> Publicado el 2019-07-08 — https://carlosazaustre.es/blog/google-cloud-run

En el pasado evento del Cloud Next, Google anunció un nuevo producto dentro de sus servicios: [Cloud Run](https://cloud.google.com/run/). Una evolución de App Engine que básicamente permite correr cualquier lenguage de backend sobre un contenedor de Docker.

En este artículo voy a describir como empezar con éste servicio y correr tu primera aplicación Node.js con ello. ¡Vamos allá!

### Crear el proyecto en Google Cloud

Vamos a la consola de [Google Cloud](https://console.cloud.google.com) y creamos un nuevo proyecto, yo lo he llamado `hello-cloud-run` pero puedes llamarle como quieras. Recuerda el `Project ID` que lo utilizaremos despues.

![crear proyecto en Google Cloud](/images/google-cloud-run/Screenshot-2019-07-02-at-21.02.43.png)

![Nuevo proyecto en Google Cloud](/images/google-cloud-run/Screenshot-2019-07-02-at-21.03.12.png)

![Creando el proyecto](/images/google-cloud-run/Screenshot-2019-07-02-at-21.03.25.png)

![Proyecto creado y Project ID](/images/google-cloud-run/Screenshot-2019-07-02-at-21.03.51.png)

> Para poder usar Google Cloud necesitas una cuenta de gmail, activar el _billing_. Si es la primera vez que te registras tienes [300$ de _free trial_](https://console.developers.google.com/billing/freetrial?hl=en).

### Activar APIs

Tenemos que activar un par de APIs para no tener problemas, la de Cloud Run y la de Cloud Build que utilizaremos más tarde.

![Activación de APIs en Google Cloud](/images/google-cloud-run/Screenshot-2019-07-02-at-21.05.19.png)

Clickamos en _Enable APIs and Services_ y buscamos Cloud Run

![Cloud Run](/images/google-cloud-run/Screenshot-2019-07-02-at-21.05.50.png)

Activamos el API de Cloud Run y hacemos lo mismo con Cloud Build

![Activar API de Cloud Run](/images/google-cloud-run/Screenshot-2019-07-02-at-21.05.58.png)

![Activar API de Cloud Build](/images/google-cloud-run/Screenshot-2019-07-02-at-21.34.05.png)

### Código de nuestra app de ejemplo

Este es el código que he preparado para este ejemplo. Es una aplicación Node.js que al dirigirse el usuario a la URL raiz le devuelve un `JSON` con dos propiedades, la fecha de hoy y el tiempo que lleva activa la aplicación.

Creamos un proyecto de Node, ejecutando el siguiente comando por consola:

```
$ npm init -y
```

Y seguidamente instalamos `express` como dependencia:

```
$ npm i express
```

Creamos un fichero `index.js` con el siguiente contenido:

```javascript
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const dateUp = Date.now();

app.get("/", (req, res) => {
  const today = new Date();

  res.json({
    date: today,
    up: `${(Date.now() - dateUp) / 1000} seg.`,
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
  console.log("Press CTRL + C to quit");
});
```

Modificamos un poco el fichero `package.json` para añadirle el script de inicio:

```json
...
"scripts": {
   "start": "NODE_ENV=production node index.js"
  },
...
```

De esta forma cuando ejecutemos el comando `npm start` correrá la mini aplicación en producción. Podemos probarlo en local para ver si todo va OK.

Lo siguiente es crear el fichero `Dockerfile` con el que vamso a definir el contenedor que va albergar esta mini aplicación de ejemplo. Tendrá el siguiente contenido:

```go
FROM node:10

WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install --only=production

# Copy the local code to the container
COPY . .

# Build production app
# RUN npm run Build

# Start the service
CMD npm start
```

Aquí estamos diciendo que tome como base `Node.js v10`, el directorio del contenedor donde estará el código será `/usr/src/app`. Definimos como variables de entorno el puerto `PORT 8080` y el `HOST 0.0.0.0`. Copiamos los ficheros `package.json` y `package-lock.json` al `WORKDIR` e instalamos las dependencias con `RUN npm install --only=production`.
Movemos el codigo de la app al contenedor con `COPY . .` y con el último comando se pone en marcha la app.

Podemos probar si todo está bien hasta ahora, generando la imagen y el contenedor de Docker. Eso lo conseguimos con los siguientes comandos en la terminal:

```shell
$ docker build --tag hello-cloud-run:01 .
$ docker run -p 8080:8080 hello-cloud-run:01
```

> Para que esto te funcione necesitas tener Docker instalado en tu equipo

Con el comando de `build` hemos creado una imagen siguiendo el `Dockerfile` con el nombre `hello-cloud-run:01` y el comando de `run` lo que hace es correrlo en [http://localhost:8080](http://localhost:8080)

Si todo va bien debería salirte algo tal que así:

![Aplicacion Node.js corriendo en un contenedor Docker en Localhost](/images/google-cloud-run/Screenshot-2019-07-05-at-17.59.45.png)

### Automatizar el despliegue del contenedor al Container Registry

Con nuestro proyecto configurado en Google Cloud y el código de la aplicación escrito y contenerizado, lo siguiente es subirlo al _Container Registry_

Para hacer más PRO este tutorial, vamos a utilizar un fichero YAML de configuración con Google Cloud Build. Similar a como haríamos con Travis CI por ejemplo, pero personalizado para Cloud Build.

De esta forma, cada vez que hagamos push a master de nuestro repositorio de código (en Github por ejemplo) se ejecutará Cloud Build y lo subirá al Container Registry además de ejecutarlo en Cloud Run. Magic!

Primero creamos un trigger en Cloud Build dentro de la consola de Google Cloud:

![Cloud Build Triggers](/images/google-cloud-run/Screenshot-2019-07-02-at-22.57.51.png)

Al crearlo elegimos que la fuente será un repositorio de GitHub:

![Crear Trigger](/images/google-cloud-run/Screenshot-2019-07-02-at-22.58.02.png)

Nos autenticamos en el servicio (En este caso GitHub) y elegimos el repositorio que lanzará el trigger.
Para ello primero debes crear tu repositorio en Github.

Puedes utilizar el de mi [mi repo](https://github.com/carlosazaustre/hello-cloud-run) (Haciendo un fork) como base, o crear el tuyo propio y luego elegirlo entre los que tienes en tu cuenta:

![Trigger Github repository](/images/google-cloud-run/Screenshot-2019-07-02-at-22.58.40.png)

Y en las _settings_ elige que para el **Build Configuration** vamos a utilizar un fichero, el `cloudbuild.yaml` que seguidamente crearemos.

![Screenshot-2019-07-02-at-23.30.39](/images/google-cloud-run/Screenshot-2019-07-02-at-23.30.39.png)

Y listo, ya lo tienes. En las opciones puedes elegir si quieres que se dispare cada vez que subes a una rama, o cada vez que hagas un `tag`

![Trigger creado](/images/google-cloud-run/Screenshot-2019-07-02-at-22.59.41.png).

#### Añadimos permisos

Una vez activado el API de [Cloud Run](https://console.cloud.google.com/apis/library/run.googleapis.com?_ga=2.191926124.-772456817.1555320972) tenemos que realizar los siguientes pasos para permitir acceso desde el exterior a nuestra aplicación.

1. Asignamos el rol de **Cloud Rn Admin** al Cloud Build service account:
   1. Desde la consola de Google Cloud, accede al [menu IAM](https://console.cloud.google.com/iam-admin/iam/project?_ga=2.217088720.-772456817.1555320972)
   2. En la lista de miembros, localiza y selecciona `[PROJECT_NUMBER]@cloudbuild.gserviceaccount.com`
   3. Clicka en el botón **EDIT** (Icono de lápiz) de la fila para dar aprobar el nuevo rol a la cuenta.
   4. CLicka en **Add another role**
   5. Selecciona **Cloud Run** y luego **Cloud Run Admin**
   6. Clicka en **Save**
2. Asignamos el rol **IAM Service Account User** al Cloud Build Service Account desde el [Cloud Run Runtime service account](https://cloud.google.com/run/docs/securing/service-identity#runtime_service_account)
   1. Desde la consola de Google Cloud, accede al menu de [Service Accounts](https://cloud.google.com/run/docs/securing/service-identity#runtime_service_account)
   2. En la lista de miembros, localiza y selecciona `[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`
   3. Clicka en **SHOW INFO PANEL** arriba a la derecha
   4. En el panel de **PERMISSIONS**, clicka en el botón de **Add Member**
   5. Introduce la service account de Cloud Build: `[PROJECT_NUMBER]@cloudbuild.gserviceaccount.com` en el nuevo campo de **New Member**
   6. En el desplegable de **Role**, selecciona **Service Accounts** y luego **Service Account User**.
   7. Clicka en **Save**

Ahora en nuestro código vamos a crear el fichero `cloudbuild.yaml` que ejecutará los comandos necesarios para construir la imagen de docker, subirla al container registry y desplegarla en Cloud Run:

```yaml
steps:
  # build the container image
  - name: "gcr.io/cloud-builders/docker"
    args:
      ["build", "-t", "gcr.io/$PROJECT_ID/hello-cloud-run:${SHORT_SHA}", "."]
    # push the container image to Container Registry
  - name: "gcr.io/cloud-builders/docker"
    args: ["push", "gcr.io/$PROJECT_ID/hello-cloud-run"]
    # deploy container image to Cloud Run
  - name: "gcr.io/cloud-builders/gcloud"
    args:
      [
        "beta",
        "run",
        "deploy",
        "hello-cloud-run",
        "--image",
        "gcr.io/$PROJECT_ID/hello-cloud-run:${SHORT_SHA}",
        "--region",
        "us-central1",
        "--allow-unauthenticated",
      ]
    env:
      - "PORT=8080"
images:
  - gcr.io/$PROJECT_ID/hello-cloud-run
```

Siendo `<PROJECT_ID>` el identificador de tu proyecto que vimos al inicio.

### Probando que todo funcione

Lo que nos queda hacer es subir nuestro código a un repositorio, que puede ser Github, como por ejemplo como lo tengo yo en [mi repo](https://github.com/carlosazaustre/hello-cloud-run) y cada vez que hagamos un cambio y lo subamos a la rama `Master`, el build se ejecutará, subirá el código al Container Registry y lo desplegará en Cloud Run!

Cuando hagas `push` revisa dentro de la consola de Google Cloud, si el Cloud Build ha disparado un evento:

![Histórico de triggers en Cloud Build](/images/google-cloud-run/Screenshot-2019-07-05-at-18.17.00.png)

Si ha sido correcto, puedes revisar en el Container Registry si la imagen de Docker ha sido creada:

![Imagen de Docker en el Container Registry](/images/google-cloud-run/Screenshot-2019-07-02-at-23.07.23.png)

Y por último, en Cloud Run revisa que se está ejecutando

![Cloud Run Ejecutándose](/images/google-cloud-run/Screenshot-2019-07-02-at-23.18.36.png)

Un último detalle es permitir invocaciones externas al servicio porque por defecto (al menos creo que porque aún es un servicio en Beta) el servicio queda privado.

Se podría configurar a través de Cloud Build pero no he conseguido hacerlo funcionar. Una opción más rápida es una vez que el servicio está creado, desde la consola de Google Cloud, activarlo:

Se añade `allUsers` a los nuevos miembros y el rol de `Cloud Run > Cloud Run Invoker`

![Permitir invocaciones externas](/images/google-cloud-run/Screenshot-2019-07-05-at-18.45.44.png)

Puedes ver una explicación más detallada en [éste post de Dev.to](https://dev.to/googlecloud/help-i-forgot-to-click-allow-unauthenticated-invocations-on-google-cloud-run-2hoj)

Y ya está! Haz click en la URL que aparece asociada a tu proyecto y si todo va bien tendrás algo así en el navegador:

![App corriendo](/images/google-cloud-run/Screenshot-2019-07-05-at-18.25.03.png)

#### Referencias

- [Cloud Run Docs](https://cloud.google.com/run/docs/)
- [Cloud Build Docs](https://cloud.google.com/cloud-build/docs/configuring-builds/build-test-deploy-artifacts)
