---
title: Cómo configurar Nginx con Node.js en Producción
date: '2014-02-26'
url: 'https://carlosazaustre.es/blog/como-configurar-nginx-con-node-js-en-produccion'
tags:
  - nodejs
  - web
  - herramientas
excerpt: >-
  Aprende a configurar Nginx como reverse proxy con Node.js en producción en
  Amazon EC2. Gestiona múltiples procesos y puertos en tu VPS de forma
  eficiente.
---

# Cómo configurar Nginx con Node.js en Producción

> Publicado el 2014-02-26 — https://carlosazaustre.es/blog/como-configurar-nginx-con-node-js-en-produccion

¿Qué pasa si tienes un **VPS** o una [instancia **EC2 en Amazon Web Services**](/como-crear-un-servidor-web-con-amazon-web-services/) y quieres tener **varios procesos de Node ejecutándose**?

¿Y si quieres servir la parte pública de una aplicación web por un lado y la parte Backend por otro?

Si corremos nuestra app Node en el puerto 80 para que sea accesible desde una IP o dominio, no podemos usar el mismo puerto con otro proceso. ¿Cómo podemos solucionar esto? con **Nginx**.

![nodenginx](/images/como-configurar-nginx-con-node-js-en-produccion/nodenginx_rlmqcf.png)

[**Nginx**](http://nginx.org/) es un servidor web, al estilo de Apache pero orientado a eventos (como Node) y **actúa como un proxy** lo que nos permite redireccionar el tráfico entrante en función del dominio de donde vienen, hacia el proceso y puerto que nos interese.

![nginx como reverse proxy](/images/como-configurar-nginx-con-node-js-en-produccion/vn_zcknvh.png)

En este tutorial veremos como configurarlo en una instancia Amazon de una manera muy sencilla. Vamos a ello!

Gracias a Node, he pasado del mundo Frontend al Backend intentado ser un **Full-Stack Developer**. Esto ha hecho que pase de tocar el backend a acercarme peligrosamente al mundo **DevOp**, lo cuál es divertido porque aprendes algo nuevo y tienes una visión más amplia de la **arquitectura web.**

No he probado esto en local, porque me daba muchos fallos, si alguien tiene más experiencia con Nginx puede dejar en los comentarios sus aportes y entre todos aprenderemos más :)

Esto está probado en una instancia [Ec2 de Amazon Web Services](http://aws.amazon.com/ec2/). Si no sabes como arrancar y configurar una, en [ésta antigua entrada del blog cuento como hacerlo](/como-crear-un-servidor-web-con-amazon-web-services/).

Una vez tenemos nuestro servidor con Linux (Ubuntu preferiblemente), instalamos **Nginx**

```shell
$ sudo apt-get install nginx
```

Ahora creamos una carpeta donde se alojará el contenido público y HTML estático que serviremos por el puerto 80.

```shell
$ sudo mkdir -p /var/www
$ sudo chown -R ubuntu:ubuntu /var/www #Donde ubuntu es el nombre de usuario del sistema
```

Configuramos Nginx en su fichero `default` de configuración

```shell
$ sudo nano /etc/nginx/sites-available/default
```

Y sustituimos el contenido del fichero por este otro, sustituyendo `tu_dominio` por el nombre de tu dominio en cuestión.

```shell
server {
  listen 0.0.0.0:80;

  root /var/www/tu_dominio;
  index index.html index.htm;
  server_name tu_dominio.com;
  access_log /var/log/nginx/tu_dominio.access.log;
  error_log /var/log/nginx/tu_dominio.error.log debug;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

Antes de reiniciar Nginx, acuérdate de **configurar en el Panel de configuración de DNS de tu dominio**, de tal manera que `tu_dominio.com` apunte con un registro tipo `A` a la IP de tu servidor. **De paso configura un subdominio tipo** `sudominio.tu_dominio.com` que apunte también a la misma IP de tu máquina, también como registro tipo A.

Este archivo indica que escuche en el puerto 80 y muestre el contenido de la carpeta `/var/www/tu_dominio` cuando se acceda por el navegador con el nombre `tu_dominio.com`.

Para que se vea algo cuando accedamos, creamos un archivo `index.html` en esa carpeta con el contenido que queramos

```shell
$ sudo mkdir -p /var/www/tu_dominio
$ sudo nano /var/www/tu_dominio/index.html
```

Y el contenido puede ser un simple “Hola Mundo”;

Para finalizar esta parte, editamos el archivo `/etc/hosts` y añadimos los dominios de tal manera que quede así

```shell
127.0.0.1         localhost
127.0.0.1         ubuntu
<IP_del_servidor> tu_dominio.com
<IP_del_servidor> subdominio.tu_dominio.com
```

Ya podemos reiniciar Nginx

```shell
$ sudo service nginx restart
```

Creamos un symlink del archivo default en la carpeta `sites-enabled`

```shell
$ sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
```

De esta manera, si todo va bien, al acceder a `tu_dominio.com` veremos un “Hola Mundo” en el navegador.

## Configuración de Node.js con Nginx.

Ahora queremos que una aplicación Node, que está corriendo en nuestro servidor en el puerto 3000 sea accesible a través de `subdominio.tu_dominio.com`. Esto lo conseguiremos haciendo lo siguiente:

Creamos un archivo de configuración para nuestro subdominio:

```shell
$ sudo nano /etc/nginx/sites-available/subdominio.tu_dominio.com
```

Y añadimos la siguiente configuración, de modo que **Nginx actúe como un Proxy** que redirija al puerto 3000 del servidor cuando el tráfico provenga de `subdominio.tu_dominio.com`

```shell
upstream subdominio.tu_dominio.com {
  server 127.0.0.1:3000;
}

server {
  listen 0.0.0.0:80;
  server_name subdominio.tu_dominio.com;
  access_log /var/log/nginx/subdominio.tu_dominio.access.log;
  error_log /var/log/nginx/subdominio.tu_dominio.error.log debug;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarder-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;

    proxy_pass http://subdominio.tu_dominio.com;
    proxy_redirect off;
  }
}
```

Creamos un symlink para este archivo en `sites-enabled` como hicimos con el fichero `default`.

```shell
$ sudo en -s /etc/nginx/sites-available/subdominio.tu_dominio.com /etc/nginx/sites-enabled/subdominio.tu_dominio.com
```

Si accedemos a `subdominio.tu_dominio.com` nos aparecerá el mensaje `Error 502 – Bad Gateway`, esto es porque aún no tenemos nada corriendo en el puerto 3000 y no tiene nade que mostrar.

Por tanto es hora de poner en marcha nuestra app node, desde cualquier directorio del servidor que queramos y ejecutarla preferiblemente con `forever`

```shell
$ sudo npm install -g forever
$ forever start nuestra_app.js
```

Si el servidor se reiniciara por alguna razón, tendríamos que ejecutar estos comandos de node de nuevo, para evitar y esto y conseguir que las aplicaciones se nos ejecuten automáticamente con el inicio de la máquina, creamos un `job`

```shell
$ sudo nano /etc/init/subdominio.tu_dominio.com.conf
```

con el siguiente contenido:

```shell
description "subdominio.tu_dominio.com"
env APP_PATH="ruta_donde_esta_la_app_node"

start on startup
stop on shutdown

script
  cd $APP_PATH
  exec forever start nuestra_app.js
end script
```

Y listo!, si entramos en `subdominio.tu_dominio.com` veremos nuestra aplicación node ejecutándose y si entramos por `dominio.com` veremos un Hola Mundo, estando los dos proyectos en la misma máquina.
