---
title: Cómo instalar un Servidor HTTPS en Nginx desde cero
date: '2014-06-16'
url: >-
  https://carlosazaustre.es/blog/como-instalar-un-servidor-https-en-nginx-desde-cero
tags:
  - web
  - tutorial
excerpt: >-
  Aprende a instalar un servidor HTTPS en Nginx con certificado SSL en Ubuntu y
  AWS. Guía paso a paso para proteger tu aplicación web con cifrado seguro.
---

# Cómo instalar un Servidor HTTPS en Nginx desde cero

> Publicado el 2014-06-16 — https://carlosazaustre.es/blog/como-instalar-un-servidor-https-en-nginx-desde-cero

Cuando en nuestra web o aplicación necesitamos tratar con datos sensibles como pueden ser tarjetas de crédito, cuentas de usuario, etc, **es recomendable disponer de un certificado SSL** en nuestro servidor para utilizar el protocolo HTTPS (Http Seguro) en lugar del HTTP normal. De esta manera, nuestros datos viajan encriptados en la aplicación y es mas difícil que sean “escuchados” por otros.

![nginx https ssl](/images/como-instalar-un-servidor-https-en-nginx-desde-cero/Screen-Shot-2014-07-15-at-18_39_52_xjqlkp.png)

Para el proyecto que estamos llevando a cabo mi compañera [Paola](http://twitter.com/ggarciapaola) y yo, **[Chefly](https://chefly.co "Encuentra gente que cocine para tí")** (Del que pronto empezaréis a oir) necesitamos disponer de HTTPS y tras pelearme un rato con su configuración conseguí ponerlo en marcha. Este tutorial espero que os ayude y os ahorre tiempo a la hora de implementarlo en vuestros servidores.

En nuestro caso, nuestro servidor es una instancia **EC2 en Amazon Web Services** con **Ubuntu 14.04 LTS**, y como servidor web/proxy utilizamos **Nginx**.

Lo primero que necesitamos es **crear una clave privada** en nuestro servidor:

```shell
$ cd /etc/ssl/
$ sudo openssl genrsa -des3 -out server.key 2048
```

Con nuestra clave privada generada, creamos un **Certificate Signing Request (CSR)** para solicitar nuestro certificado SSL a una entidad de autorización reconocida, en nuestro caso optamos por [RapidSSL](http://www.rapidssl.com/).

```shell
$ sudo openssl req -new -key server.key -out server.csr
```

Este proceso nos pedirá una serie de datos que son importantes para solicitar el certificado SSL:

- **Country Name (C):** Un código de dos letras para determinar el país, en nuestro caso ponemos US ya que la entidad que lo va a manejar (RapidSSL) es de Estados Unidos.
- **State or Province (S):** Estado o provincia, este campo puede quedar vacío
- **Locality or City (L):** Localidad o ciudad, tambiÃ©n se puede dejar vacio.
- **Organization (O):** Nombre de la organización que maneja tu certificado SSL, en nuestro caso RapidSSL opera a través de GeoTrust, Inc. y ponemos ese nombre.
- **Common Name (CN):** Nuestro nombre de dominio, `tudominio.com`. sin las www delante.

Esto nos generará un archivo `CSR` que debemos subir a RapidSSL cuando solicitemos y compremos un certificado SSL. Una vez comprado, RapidSSL nos enviará a nuestro email el certificado, que deberemos copiar y pegar en un fichero de texto con el nombre `SSL.crt` para seguir la nomenclatura de Nginx.

Desde la página de RapidSSL necesitamos también descargarnos un [certificado intermedio](https://knowledge.rapidssl.com/support/ssl-certificate-support/index?page=content&id=AR1549), lo guardamos como `intermediate.crt` y debemos concatenar al anterior

```shell
$ sudo cat SSL.crt intermediate.crt >> SSL.crt
```

Con esto ya tenemos lo necesario para que nuestro servidor web, acepte HTTPS, solo tenemos que **configurar Nginx para que escuche en el puerto 443** (el de HTTPS) indicándole los ficheros.

Editamos el fichero default de configuración con lo siguiente:

```shell
$ sudo nano /etc/nginx/sites-available/default
```

```shell
server {
  listen 443;
  server_name tudominio.com;

  root /usr/share/nginx/html; # Directorio donde están nuestros archivos estáticos
  index index.html index.htm

  ssl on;
  ssl_certificate /etc/ssl/SSL.crt
  ssl_certificate_key /etc/ssl/server.key

  access_log /var/log/nginx/nginx.vhost.access.log
  error_log /var/log/nginx/nginx.vhost.error.log
```

Reiniciamos nginx y nos aseguramos que en nuestro DNS, `tudominio.com` apunta a la IP o alias de nuestro servidor

```shell
sudo service nginx restart
```

Con todo esto si accedemos a `https://tudominio.com` funcionará, pero ¿Y si entramos desde `http://tudominio.com`? No nos redirije al HTTPS, ¿Y si escribimos `www.tudominio.com`? aunque lo tengamos definido en nuestro DNS, no nos redirije al HTTPS. ¿Cómo arreglamos esto? Añadiendo más reglas a nuestro archivo de configuración de Nginx:

```shell
# Redirige de http://tudominio.com a https://tudominio.com
server {
        listen 80;
        return 301 https://$host$request_uri;
}

# Redirige de http://www.tudominio.com a https://tudominio.com
server {
        listen 80;
        server_name www.tudominio.com;
        return 301 https://tudominio.com$request_uri;
}

# Redirige de https://www.tudominio.com a https://tudominio.com
server {
        listen 443;
        server_name www.tudominio.com;
        return 301 $scheme://tudominio.com$request_uri;
```

Con esto ya tendremos todas las opciones cubiertas y podremos hacer uso del protocolo seguro de HTTP en nuestro servidor.

**Fuentes:**

- [http://www.digitalvalley.com/blog/como-crear-un-certificado-ssl-en-nginx-para-ubuntu/](http://www.digitalvalley.com/blog/como-crear-un-certificado-ssl-en-nginx-para-ubuntu/)
- [http://www.digicert.com/ssl-certificate-installation-nginx.htm](http://www.digicert.com/ssl-certificate-installation-nginx.htm)
- [https://knowledge.rapidssl.com/support/ssl-certificate-support/index?page=content&actp=CROSSLINK&id=SO17664](https://knowledge.rapidssl.com/support/ssl-certificate-support/index?page=content&actp=CROSSLINK&id=SO17664)
