---
title: Cómo iniciar un proyecto React con Vite
date: '2022-10-26'
url: 'https://carlosazaustre.es/blog/react-vite'
tags:
  - react
  - javascript
  - herramientas
related:
  - react-tutorial-modern
  - empezando-con-react-js-y-ecmascript-6
  - primeros-pasos-con-webpack
excerpt: >-
  Aprende a iniciar un proyecto React con Vite, la herramienta de tooling
  Frontend más rápida. Alternativa moderna a Webpack, Parcel y Snowpack para tus
  apps.
---

# Cómo iniciar un proyecto React con Vite

> Publicado el 2022-10-26 — https://carlosazaustre.es/blog/react-vite

![Vite](/images/react-vite/logo-vite.png)

[Vite](https://vitejs.dev/) es una herramienta de tooling para el Frontend. Lo puedes agrupar
en la categoría donde se encuentran otros como Webpack, Parcel y Snowpack.
Es muy útil para crear una estructura de proyecto que se pueda utilizar con React y de
una forma muy rápida, ya que no necesitas tener que configurar nada. Aprovecha el
sistema de módulos de ES6 (ESModules) por lo que puede ser servido dinámicamente según
lo necesite el navegador.

### Crear un proyecto React con Vite.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=niTHb7pwfRI)
/>

Asegúrate de tener instalado [Node.js](https://nodejs.org) en tu equipo.

Puedes comprobarlo ejecutando en la terminal:

```shell
$ node -v
```

Una vez
lo tengas, ejecuta los siguientes comandos:

```shell
$ npm create vite@latest <nombre-de-mi-proyecto>
```

Entre los diferentes frameworks que te sugiere, elige el que necesites, en nuestro caso `react`.
Después te pregunta si quieres utilizar TypeScript o no. Elige lo que prefieras.

```shell
✔ Project name: … vite-project
? Select a framework: › - Use arrow-keys. Return to submit.
    Vanilla
    Vue
❯   React
    Preact
    Lit
    Svelte

```

```shell
? Select a variant: › - Use arrow-keys. Return to submit.
❯   JavaScript
    TypeScript
```

```shell
Scaffolding project in /Users/carlosazaustre/dev/vite-project...

Done. Now run:

  cd vite-project
  npm install
  npm run dev
```

### Ejecutar el proyecto.

Una vez creado, dirígete al directorio creado y ejecuta el comando de instalación:

```shell
$ cd <nombre-de-mi-proyecto>
$ npm install
```

Una vez instaladas las dependencias, ejecuta el comando de desarrollo y ya puedes
empezar a trabajar.

```shell
$ npm run dev

  VITE v3.1.8 ready in 396 ms

  > Local: http://localhost:5173/
  > Network: use `--host` to expose

```

![aplicacion con react y vite corriendo en localhost](/images/react-vite/vite-react-app.png)
