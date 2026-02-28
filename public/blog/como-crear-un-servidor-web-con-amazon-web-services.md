---
title: Cómo configurar un servidor web con Amazon Web Services
date: '2013-07-23'
url: >-
  https://carlosazaustre.es/blog/como-crear-un-servidor-web-con-amazon-web-services
tags:
  - web
  - herramientas
excerpt: >-
  Aprende a configurar un servidor web en Amazon Web Services con una instancia
  EC2 gratis durante 1 año. Monta un entorno LAMP en la nube paso a paso
---

# Cómo configurar un servidor web con Amazon Web Services

> Publicado el 2013-07-23 — https://carlosazaustre.es/blog/como-crear-un-servidor-web-con-amazon-web-services

A veces necesitamos de un servidor web para _testing_ y no nos sirve con nuestro entorno de desarrollo local porque necesitamos enseñarle a alguien lo que estamos haciendo y por tanto es necesario que esté subido en algún sitio.

La forma antigua de hacer esto era tener un hosting web y subir los archivos por FTP al host y y con la URL del dominio que habíamos comprado ya teníamos un entorno que poder enseñar. Esto, hoy en día, se considera un poco “cutre”, pudiendo hacer uso de las tecnologías Cloud de las que disponemos. A continuación cuento como registrarse en Amazon Web Services y montar un servidor LAMP en una instancia.

La que más recomiendo para “trastear” es abrirse una cuenta en [Amazon Web Services (AWS)](http://aws.amazon.com/) y lanzar una instancia [Elastic Compute Cloud (EC2)](http://aws.amazon.com/ec2/) que básicamente consiste en una máquina virtual Linux con al que podemos hacer lo que queramos, y lo más importante, **Amazon te da 1 año gratis para usarlo**, después del año te cobrará por horas de uso y almacenamiento, pero la instancia puedes pararla y terminarla cuando desees. En caso de que quieras dejarla siempre corriendo, puedes llegar a pagar unos 16€ al mes.

![](/images/como-crear-un-servidor-web-con-amazon-web-services/amazon_com_web_services_qepgql.jpg)

El primer paso como digo es hacerse una cuenta en Amazon Web Services, si tienes cuenta en la tienda de Amazon te sirve la misma. Para ello vamos a [aws.amazon.com](http://aws.amazon.com) y pulsamos en **Get Started for free - Launch virtual machines and apps in minutes**

Nos pedirá nuestros datos para registrarnos, así como una tarjeta de crédito/débito para en caso de que hagamos uso de algún servicio no gratuito o para cuando finalice nuestro periodo de prueba. Durante el primer año de uso, **si no tenemos más que una instancia EC2 `t1.micro`, Amazon no nos cobrará nada**.

Para verificar que la cuenta es tuya tendremos que verificar nuestra identidad por teléfono, pero no hay nada que temer, simplemente nos llamará una grabación a la que debemos decir la clave que la web nos proporciona, incluso podemos darle los números pulsando el teclado del teléfono.

![Registrase en AWS](/images/como-crear-un-servidor-web-con-amazon-web-services/Screen-Shot-2013-07-25-at-16_48_30_l14vfb.png)

![Registrase en AWS](/images/como-crear-un-servidor-web-con-amazon-web-services/Screen-Shot-2013-07-25-at-16_48_42_b82pcm.png)

![Registrase en AWS](/images/como-crear-un-servidor-web-con-amazon-web-services/Screen-Shot-2013-07-25-at-16_48_52_lhkoua-1.png)

Una vez verificada la cuenta, te llegará un email de que la activación está completa y ya podrás acceder al dashboard de AWS.

![AWS Dashboard](/images/como-crear-un-servidor-web-con-amazon-web-services/Screen-Shot-2013-07-25-at-16_55_07_hdmpd1.png)

Ahí vamos a EC2 y en el panel de control damos a lanzar nueva instancia. Lanzamos el _Quick Launch Wizard_, elegimos crear un _New Key Pair_ y como maquina virtual elegiremos **Ubuntu Server 12.04.2 LTS** que es gratuita para el `t1.micro`. Nos descargamos el fichero `.pem` con la clave privada que hemos generado para poder acceder a la máquina virtual y damos a siguiente.

![Elige una mÃ¡quina virtual en AWS](/images/como-crear-un-servidor-web-con-amazon-web-services/Screen-Shot-2013-07-25-at-16_59_34_x0w3vu.png)

Una vez realizados los pasos anteriores ya tendremos nuestra instancia corriendo como vemos en el dashboard

![Instancia EC2 en AWS](/images/como-crear-un-servidor-web-con-amazon-web-services/Screen-Shot-2013-07-25-at-17_04_38_pdjo8h.png)

Ahora para poder acceder via terminal a nuestra máquina virtual tenemos la clave privada `.pem` que hemos descargado y una URL del tipo `ec2-50-19-140-229.compute-1.amazonaws.com` que apunta a la IP de nuestra instancia. Para poder acceder vía SSH de una manera más comoda haremos lo siguiente.

```shell
# Copiamos el fichero .pem a nuestro
# directorio ~/.ssh y le damos permisos
# de sólo lectura por nosotros

$ mkdir ~/.ssh
$ copy ~/Downloads/miclave.pem ~/.ssh
$ sudo chmod 400 miclave.pem

# creamos un fichero config dentro de .ssh
# con los siguientes datos

$ sudo nano .ssh/config
Host awshost1
Hostname ec2-50-19-140-229.compute-1.amazonaws.com (inserta el tuyo)
User ubuntu
IdentityFile "~/.ssh/miclave.pem"
```

De esta manera siempre que queramos acceder a nuestra máquina vía SSH sólo tenemos que escribir en el terminal

```shell
$ ssh awshost1
```

Ya estamos dentro de la instacia Linux de AWS, para tenerla actualizada es una buena opción hacer lo siguiente

```shell
$ sudo apt-get update
$ sudo apt-get upgrade
```

Y para poder instalar un entorno LAMP, ejecutamos lo siguiente:

```shell
$ sudo apt-get install tasksel
```

Esto nos abrirá un menú de opciones donde podremos elegir instalar un LAMP (Linux-Apache-MySQL-PHP) server en pocos minutos.

![Tasksel para instalar LAMP en Linux](/images/como-crear-un-servidor-web-con-amazon-web-services/Screen-Shot-2013-07-25-at-17_19_22_jhte9m.png)

Una vez finalice la instalación, tu servidor web estático estará ubicado en el directorio `/var/www/`.

Y si vamos a nuestro navegador y ponemos como URL la que nos proporciona la instancia de AWS, del tipo `ec2-50-19-140-229.compute-1.amazonaws.com` podremos ver el siguiente mensaje:

![Apache Web Server](/images/como-crear-un-servidor-web-con-amazon-web-services/Screen-Shot-2013-07-25-at-17_22_30_yfatt2.png)

Eso significa que hemos creado una máquina virtual de Linux en una instancia EC2 de AWS, hemos instalado un servidor LAMP y ya podemos servir ficheros estáticos y aplicaciones web basadas en PHP en él.

Y para ser más cool todavía, **olvídate de FTPs** eso es de la época en la que las webs estaban llenas de GIFs, lucecitas y Flash. **Instálate Git en tu máquina y haz pull de tu repositorio en GitHub**, Bitbucket o donde lo tengas. Si haces eso, Dios matará menos gatitos.

**Fuente**: [Startup Engineering – Coursera](https://class.coursera.org/startup-001)
