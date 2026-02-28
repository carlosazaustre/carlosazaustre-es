---
title: Cómo configurar tu servidor cloud en DigitalOcean
date: '2014-07-31'
url: >-
  https://carlosazaustre.es/blog/como-configurar-tu-servidor-cloud-en-digitalocean
tags:
  - web
  - herramientas
excerpt: >-
  Aprende a configurar tu primer servidor cloud en DigitalOcean paso a paso.
  Crea un droplet Linux desde 5$ al mes y despliega tus aplicaciones web
  fácilmente.
---

# Cómo configurar tu servidor cloud en DigitalOcean

> Publicado el 2014-07-31 — https://carlosazaustre.es/blog/como-configurar-tu-servidor-cloud-en-digitalocean

[**DigitalOcean**](https://www.digitalocean.com/?refcode=f716de9860aa) es un _IaaS_ (Infraestructura como Servicio) como pueden ser [los servidores EC2 de Amazon Web Services](/como-crear-un-servidor-web-con-amazon-web-services/), aunque a mi parecer son más sencillos de usar y la interfaz es mucho más limpia y clara.

También es mejor [el precio](https://www.digitalocean.com/pricing/), puedes tener un _droplet_ que es como llaman aquí a las maquinas virtuales, igual que la estancia micro que te da gratis un año Amazon (luego cuesta alrededor de 16$ al mes), por 5$ al mes, y por 10$ al mes un “pepino” ;) Además son discos SSD, es decir, miel de romero!

En este tutorial voy a explicar como [registrarse en DigitalOcean](https://www.digitalocean.com/?refcode=f716de9860aa) y configurar nuestro primer servidor Linux en el que poder desplegar nuestras aplicaciones Web.

Nos dirigimos a la página web de [DigitalOcean y nos registramos con un email y una contraseña](https://www.digitalocean.com/?refcode=f716de9860aa). En el siguiente paso nos pedirán nuestros datos (nombre, apellidos, dirección y un número de tarjeta de crédito/débito) los añadimos y ya tenemos nuestra cuenta en [DigitalOcean](https://www.digitalocean.com/?refcode=f716de9860aa). Nos llegará un correo de confirmación a nuestro email, pinchamos en el link para confirmar y listo.

[![Screen Shot 2014-07-27 at 23.34.55](/images/como-configurar-tu-servidor-cloud-en-digitalocean/Screen-Shot-2014-07-27-at-23_34_55_blcekh.png)](https://www.digitalocean.com/?refcode=f716de9860aa)

Ahora elegimos que máquina queremos, en mi caso elijo la más barata que para empezar nos sobra. 512 Mb de RAM, 1 CPU, 20GB de Disco SSD y 1TB de transferencia mensual (si lo superas, el GB adicional cuesta 0,02$)

![Screen Shot 2014-07-27 at 23.03.35](/images/como-configurar-tu-servidor-cloud-en-digitalocean/Screen-Shot-2014-07-27-at-23_03_35_rdcqjx.png)

La región, en mi caso elegí Londres por ser el más cercano a España, para la latencia.

![Screen Shot 2014-07-27 at 23.04.52](/images/como-configurar-tu-servidor-cloud-en-digitalocean/Screen-Shot-2014-07-27-at-23_04_52_bclwzc.png)

Ya podemos acceder a nuestro panel de control y en el tendremos que configurar que software queremos instalar. En mi caso elegí una distribución Ubuntu 14.04 x64.

![Screen Shot 2014-07-27 at 23.04.44](/images/como-configurar-tu-servidor-cloud-en-digitalocean/Screen-Shot-2014-07-27-at-23_04_44_fd9a3f.png)

Podemos instalar aplicaciones adicionales, como Ruby, Django, PHP, etc… En mi caso elijo instalar Node para ahorrarme instalarlo via terminal, pero si queremos podemos hacerlo más adelante por SSH.

![Screen Shot 2014-07-27 at 23.05.59](/images/como-configurar-tu-servidor-cloud-en-digitalocean/Screen-Shot-2014-07-27-at-23_05_59_vhxnbq.png)

Ya tenemos todo, lo único que nos queda es poder acceder via SSH por terminal para poder configurar nuestro servidor, realizar despliegues, etc… Para ello primero necesitamos importar nuestra clave RSA pública o crear una nueva. En Mac OS se realiza así:

```shell
ssh-keygen -t rsa -C "your_email@example.com"
# Creates a new ssh key, using the provided email as a label
# Generating public/private rsa key pair.
# Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
Enter passphrase (empty for no passphrase): [Type a passphrase]
# Enter same passphrase again: [Type passphrase again]
Your identification has been saved in /Users/you/.ssh/id_rsa.
# Your public key has been saved in /Users/you/.ssh/id_rsa.pub.
# The key fingerprint is:
# 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com
```

Ejecutamos `cat ~./.ssh/id_rsa.pub` para ver el contenido de nuestra clave pública, copiarla en el portapapeles e [ir a la sección _SSH Keys_ del panel de control](https://cloud.digitalocean.com/ssh_keys) y pegarla ahí. Con esto DigitalOcean nos permite acceder via SSH desde nuestra máquina local.

![Screen Shot 2014-07-28 at 00.03.02](/images/como-configurar-tu-servidor-cloud-en-digitalocean/Screen-Shot-2014-07-28-at-00_03_02_u05x6a-1.png)

¿Cómo accedemos vía SSH? En nuestro panel de control vemos[ nuestra lista de Droplets](https://cloud.digitalocean.com/droplets) y en ella podemos ver la IP de nuestro servidor, en este caso, por ejemplo, aquí sería la `178.140.2.2`
![Screen Shot 2014-07-28 at 00.08.04](/images/como-configurar-tu-servidor-cloud-en-digitalocean/Screen-Shot-2014-07-28-at-00_08_04_tuvmnj.png)

Con esos datos podemos acceder asi en nuestra máquina local

```shell
$ ssh root@178.140.2.2
root@178.140.2.2's password:
Welcome to Ubuntu 14.04 LTS (GNU/Linux 3.13.0-24-generic x86_64)

 * Documentation:  https://help.ubuntu.com/

  System information as of Sun Jul 27 17:16:56 EDT 2014

  System load:  0.0               Processes:           67
  Usage of /:   7.2% of 19.56GB   Users logged in:     0
  Memory usage: 10%               IP address for eth0: 178.62.36.77
  Swap usage:   0%

  Graph this data and manage this system at:

https://landscape.canonical.com/

Last login: Sun Jul 27 17:16:57 2014 from xxx.xxx.xxx.xxx
root@tudroplet:~#
```

La password que nos pide, nos la han enviado al email con el que nos hemos registrado, y la primera vez que nos logueemos via SSH nos permite cambiarla por una propia.

Con esto ya tenemos nuestro propio servidor en la nube y ahora ya solo queda instalar el software que necesitemos (Django, Nginx, MongoDB, Redis, etc…) y empezar a desplegar en producción

**Fuente**: [https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet-virtual-server](https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet-virtual-server)
