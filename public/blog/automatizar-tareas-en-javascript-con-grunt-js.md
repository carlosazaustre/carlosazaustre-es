---
title: Automatizar tareas en JavaScript con Grunt.js
date: '2013-08-01'
url: 'https://carlosazaustre.es/blog/automatizar-tareas-en-javascript-con-grunt-js'
tags: []
excerpt: >-
  Aprende a automatizar tareas en JavaScript con Grunt.js: configura un
  Gruntfile, instala plugins y optimiza tu flujo de desarrollo con minificación
  CSS y más.
---

# Automatizar tareas en JavaScript con Grunt.js

> Publicado el 2013-08-01 — https://carlosazaustre.es/blog/automatizar-tareas-en-javascript-con-grunt-js

[Grunt.js](http://gruntjs.com/) es una librería JavaScript que nos permite configurar tareas automáticas y así ahorrarnos tiempo en nuestro desarrollo y despliegue de aplicaciones webs.

Con un simple fichero JS que llamaremos `Gruntfile`, indicamos las tareas que queremos automatizar con un simple comando y las escribimos en él en formato JSON.

![Automatización de tareas con Grunt JS](/images/automatizar-tareas-en-javascript-con-grunt-js/grunt-logo_g3kshp.png)

A continuación muestro como sería este fichero para automatizar las tareas de arranque del servidor y preprocesamiento de archivos stylus a CSS y su minificación.

Lo primero que necesitamos es instalar Grunt de manera global en nuestro equipo, doy por hecho que ya tenemos Node.js instalado, si no es así pásate por esta entrada.

Para ello tecleamos:

```shell
$ sudo npm install -g grunt
$ sudo npm install -g grunt-cli
```

Grunt posee diversos plugins para tareas específicas, nosotros usaremos `grunt-contrib-watch`, `grunt-contrib-stylus`, `grunt-contrib-cssmin` y `grunt-contrib-bg-shell`. Estas librerías nos permitirán vigilar cambiso que hagamos en determinados directorios para así actuar y ejecutar la tarea que queremos, preprocesar stylus y convertirlo a CSS, minificar el CSS y ejecutar instrucciones por linea de comandos respectivamente.

Para cargar los plugins, debemos incluir en nuestro fichero `Gruntfile.js` las siguientes líneas:

```javascript
grunt.loadNpmTasks("grunt-contrib-watch");
grunt.loadNpmTasks("grunt-contrib-stylus");
grunt.loadNpmTasks("grunt-contrib-cssmin");
grunt.loadNpmTasks("grunt-bg-shell");
```

las tareas que vamos a definir serán las siguientes:

```javascript
// Con ésta tarea llamada 'compile' llamamos a las
// tareas 'stylus' y 'cssmin' que ahora definiremos
grunt.registerTask("compile", ["stylus", "cssmin"]);

// Ésta tarea llamada 'server' nos permitirá correr
// el servidor a al vez que las tareas 'compile' y
// 'watch' que ahora definiremos
grunt.registerTask("server", ["bgShell:runNode", "compile", "watch"]);
```

Procedemos a crear las tareas:

- `bgShell:runNode` con ella indicamos un comando para ejecutar por el inteerprete.
- `stylus`: Con ella preprocesamos los ficheros `.styl` que tengamos a un único fichero .css (Stylus es un preprocesador de CSS como lo son Compass, Sass, Less,… pero más hipster porque funciona bajo Node.js ;)
- `cssmin`: Con esto minificamos el fichero css resultante en una sola línea de texto para que sea menos pesado y nuestra aplicación web tarde menos en cargar
- `watch`: Gracias a ella cualquier cambio que hagamos en un fichero CSS o STYLUS se dará cuenta y ejecutará el preprocesamiento para que no tengamos que preocuparnos de resetear nada.

El código para definir las tareas sería algo así:

```javascript
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		bgShell: {
			runNode: {
				cmd: 'node app.js',
				bg: true
			}
		},

		stylus: {
			compile: {
				options: {
					paths: [stylesheetsDir],
					'include css': true
				},
				files: {
					'public/app/css/app.min.css': stylesheetsDir + '/index.styl'
				}
			}
		},

		watch: {
			stylesheets: {
				files: [stylesheetsDir + '/**/*.styl', stylesheetsDir + '/**/*.css'],
				tasks: ['stylus'],
				options: {
					interrupt: true
				}
			}
		}
	});
```

Para arrancar nuestra aplicacieon y hacer correr las tareas, en lugar de ejecutar `node app.js` por ejemplo, tendríamos que ejecutar

```shell
grunt server
```

Puedes ver un ejemplo completo en el siguiente repositorio [grunt-node-sandbox](https://github.com/carlosazaustre/grunt-node-sandbox). Por supuesto se pueden automatizar más cosas, como por ejemplo minificar el JavaScript, generar archivos preconfigurados de backbone, añadir etiquetas a nuestros archivos con la fecha, nombre de autor, etc.. Un montón de cosas que puedes ver por [aquí](http://gruntjs.com/sample-gruntfile)
