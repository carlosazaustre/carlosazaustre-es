---
title: Programando en Node.js con RaspberryPi. Primeros pasos
date: '2014-07-15'
url: >-
  https://carlosazaustre.es/blog/programando-en-node-js-con-raspberrypi-primeros-pasos
tags:
  - nodejs
  - javascript
  - tutorial
related:
  - >-
    primera-aplicacion-web-en-raspberrypi-con-nodejs-cylonjs-controlando-leds-desde-el-movil
  - tessel-el-microcontrolador-programable-en-javascript
  - aplicacion-node-como-servicio-upstart
---

# Programando en Node.js con RaspberryPi. Primeros pasos

> Publicado el 2014-07-15 — https://carlosazaustre.es/blog/programando-en-node-js-con-raspberrypi-primeros-pasos

Hace unos días me llegó al fin el micro-controlador [Tessel.io](https://tessel.io/) en el que puedes programar en JavasScript de forma nativa y del que ya os hablará más adelante. Esto hizo que me entraran ganas de desempolvar la [Raspberry Pi](http://www.raspberrypi.org/) que tengo desde hace año y medio e investigar si podría hacer algo con **Node.js** en esta plataforma.

![cylonjs](/images/programando-en-node-js-con-raspberrypi-primeros-pasos/cylon_yjelca.png)

Navegando di con una fantástica librería OpenSource llamada [**CylonJS**](http://cylonjs.com) que está diseñada para prácticamente todas las placas y micro-controladores del mercado (_RaspberryPi_, el propio _Tessel_, _Arduino_, _BeagleBoard_, etc…) y nos permite programar en JavaScript en todas estas plataformas y utilizar diversos drivers (LEDs, Servomotores, etc…) de una forma sencilla.

Me propuse el reto de **crear una API** que permitiera encender/apagar 3 LEDs de colores conectados a los pines `GPIO` de la RaspberryPi, utilizando el framework **CylonJS** para acceder a esos puertos y **ExpressJS** para crear el servidor web y poder controlarlos desde una **webapp**.

A continuación muestro los pasos a seguir para configurar nuestras RaspberryPi para trabajar con Node.js y CylonJS desde la instalación del sistema operativo hasta las dependencias de Node.js via NPM. Vamos allá.

## RaspberryPi Model B.

![RaspberryPi](/images/programando-en-node-js-con-raspberrypi-primeros-pasos/RaspberryPi_c9oeks.jpg)

El modelo que yo tengo y el más popular es el **Modelo B de 512 Mb de RAM** y un **procesador ARMv6** que nos permite usar un sistema operativo (linux normalmente). Recientemente los fabricantes de Raspberry han lanzado una revisión de este modelo añadiéndole 2 puertos USB más y varios pines `GPIO` extra, pero la base es la misma.

Disponemos de una ranura para tarjetas de memoria SD. Eso será nuestro _disco duro_ y ahí instalaremos nuestro sistema operativo.

## Sistema Operativo: Raspbian (Debian Wheezy)

![100px-Raspberry_Pi_Logo.svg](/images/programando-en-node-js-con-raspberrypi-primeros-pasos/100px-Raspberry_Pi_Logo_svg__rir0fe.png)

La mejor distribución Linux que he probado para RaspberryPi es Raspbian, basada en la distibución original Debian. Para poder instalar el SO en la tarjeta, primero de todo necesitamos descargar la imagen desde [aquí](http://www.raspberrypi.org/downloads/). Y un programa para _flashear_ la tarjeta. En mi caso, en Mac OS X, utilizo [RPi-SD Card Builder](http://alltheware.wordpress.com/2012/12/11/easiest-way-sd-card-setup/), con el, sólo tienes que introducir la tarjeta SD formateada en el ordenador y elegir la imagen del SO recién descargada.

## Configuración de Red.

Introducimos la tarjeta SD en la Raspberry y le damos alimentación a través del puerto microUSB que incorpora. Si tenemos un monitor HDMI podemos ver el escritorio de la Raspberry, si no tenemos o nos da perece andar conectándola a la TV, etc, podemos hacer la configuración inicial a través de Ethernet.

Conectamos un cable Ethernet a la Raspberry y a un puerto que tengamos libre en nuestro Router. Desde la interfaz de administración de nuestro router podemos ver que IP de la red local está usando la Raspberry, cuando la sepamos podemos acceder a través de SSH de la siguiente manera:

```shell
$ ssh 192.168.1.13 -l pi
```

Siendo en mi caso la IP `192.168.1.13` la que corresponde a mi Raspberry. Despues nos pedirá la contraseña. Para el usuario `pi` su password es `rasbperry`. Fácil de recordar.

![tl-wn722n.454A5022a-1024](/images/programando-en-node-js-con-raspberrypi-primeros-pasos/tl-wn722n_454A5022a-1024_uu8jmw.jpg)

Ya estamos dentro!. Lo ideal sería podernos conectar inalámbricamente. Si dispones de un conector Wifi USB puedes conectarlo a uno de los puertos de la Raspberry y configurar la red inalámbrica. En mi caso el modelo que tengo es de un ordenador antiguo, pero me sirve perfectamente. Es el **TP-Link TL-WN722N**.

Ahora si editamos el fichero `/etc/network/interfaces` con lo siguiente:

```shell
auto lo

iface lo inet loopback
iface eth0 inet dhcp

allow-hotplug wlan0
auto wlan0

iface wlan0 inet dhcp
        wpa-ssid "ssid"
        wpa-psk "password"
```

Sustituyendo `ssid` por el nombre de nuestra red y `password` por la contraseña de nuestro Wifi, la próxima vez que arranquemos la Raspberry **se conectará por Wifi.**

## Instalación de Paquetes y Dependencias

Despues del primer reinicio ya podemos actualizar el SO con los siguientes comandos

```shell
$ sudo apt-get update
$ sudo apt-get upgrade
```

[Instalamos Node](http://joshondesign.com/2013/10/23/noderpi)

```shell
wget http://nodejs.org/dist/v0.10.2/node-v0.10.2-linux-arm-pi.tar.gz
tar -xvzf node-v0.10.2-linux-arm-pi.tar.gz
node-v0.10.2-linux-arm-pi/bin/node --version
```

Añadimos al PATH las rutas de node en un fichero, por ejemplo `.bash_profile`

```shell
export NODE_JS_HOME=/home/pi/node-v0.10.2-linux-arm-pi
export PATH=$PATH:$NODE_JS_HOME/bin
```

Y ya podemos instalar por NPM las dependencias que necesitamos

## Instalación de CylonJS y activando los GPIO

Para instalar la librería Cylon podemos hacerlo por NPM, también necesitaremos [la específica de Raspberry](http://cylonjs.com/documentation/platforms/raspberry-pi/) y es recomendable instalar 3 más, la firmdata, `GPIO` e `I2C`.

```shell
$ npm install cylon
$ npm install cylon-raspi
$ npm install cylon-firmata
$ npm install cylon-gpio
$ npm install cylon-i2c
```

Para que funcionen correctamente los pines GPIO e I2C en Raspbian necesitamos hacer lo siguiente. Añadimos lo siguiente al fichero `/etc/modules`

```shell
i2c-bcm2708
i2c-dev
```

Nos aseguramos que las siguientes entradas están comentadas en el fichero `/etc/modprobe.d/raspi-blacklist.conf`

```shell
#blacklist spi-bcm2708
#blacklist i2c-bcm2708
```

Y por último los activamos para usarlos como pines de salida con la libreria [Pi-Blaster](https://github.com/hybridgroup/pi-blaster), con los siguientes pasos:

```shell
$ git clone https://github.com/hybridgroup/pi-blaster.git
$ cd pi-blaster
$ make
$ sudo make install
$ sudo ./pi-blaster
```

Con todo esto ya tendríamos lista nuestra RaspberryPi para empezar a programar proyectos con Node.js y tecnologías web. En el próximo post publicará un tutorial de como crear la API para manejar los LEDs como prueba de concepto.
