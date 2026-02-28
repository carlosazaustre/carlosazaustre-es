---
title: Cómo conectarte remótamente a tu base de datos MongoDB
date: '2014-12-19'
url: >-
  https://carlosazaustre.es/blog/como-conectarte-remotamente-a-tu-base-de-datos-mongodb
tags:
  - web
  - programacion
---

# Cómo conectarte remótamente a tu base de datos MongoDB

> Publicado el 2014-12-19 — https://carlosazaustre.es/blog/como-conectarte-remotamente-a-tu-base-de-datos-mongodb

En este artículo vamos a ver como dar seguridad a nuestra base de datos remota de producción y a su vez como conectarnos de manera remota desde nuestro entorno local.

Primero de todo inicia una instancia de MongoDB en tu servidor, sin el flag de autenticación:

```
mongod --port 27017 --dbpath /data/db1
```

Creamos un usuario administrador que será el root que administre todas las bases de datos y será con el que nos conectemos por terminal (MongoShell) desde el servidor:

```javascript
use admin
db.createUser(
  {
    user: "myServerAdmin",
    pwd: "password",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
);
```

Reinicia la instancia de MongoDB, esta vez con la autorización activada:

```shell
mongod --auth --config /etc/mongodb/mongodb.conf
```

Ahora para conectarnos al MongoShell necesitamos hacerlo mediante el usuario administrador:

```shell
mongo --port 27017 -u myServerAdmin -p password --authenticationDatabase admin
```

Una vez conectados, vamos a crear un usuario adicional que gestione la base de datos que utilizará tu aplicación. Que solo pueda acceder a esa base de datos y con permisos de Lectura/Escritura. Este será el que utilicemos para conectarnos desde nuestra aplicación backend.

Es importante que sea un usuario “no-root” el que se conecte desde nuestra app para evitar “disgustos” y es una capa importante de seguridad para nuestro backend.

```javascript
use myDatabase
db.createUser(
    {
      user: "myUser",
      pwd: "12345678",
      roles: [
         "roles" : [ { "role" : "readWrite", "db" : "myDatabase" }
      ]
    }
);
```

Para poder conectarnos remotamente, edita el fichero `/etc/mongod.conf`

Cambia el campo `bind_ip = 127.0.0.1`, por la IP de tu servidor, y aprovecha a cambiar el campo `port = 27017` por otro diferente, para mayor seguridad

Reinicia mongo para aplicar los cambios.

```shell
sudo service mongod restart
```

Ahora si queremos conectarnos por el MongoShell a nuestra instancia de mongo, deberemos escribir el siguiente comando desde la terminal:

```shell
mongo --host x.x.x.x --port xxxxx -u myServerAdmin -p password --authenticationDatabase admin
```

siendo `x.x.x.x` la IP de tu servidor y `xxxxx` el puerto que configuraste en el fichero mongod.conf

Y para conectarnos mediante una URI String desde nuestra aplicación backend, la URI será:

```shell
mongodb://myUser:12345678@x.x.x.x:xxxxx/myDatabase
```

### Configuración de Robomongo.

[Robomongo](http://robomongo.org/) es una aplicación para Mac, Windows y Linux para conectarse a bases de datos Mongo, de una manera visual, sustituyendo o complementando a la terminal y al MongoShell.

La configuración en Robomongo para conectarse remotamente a una base de datos por SSH es diferente a la conexión a tu base de datos local. Estas son las pestañas que debes configurar

En la **pestaña Conexión**, además de un nombre para identificar a la conexión, necesitas incluir la dirección IP de tu servidor (x.x.x.x) y el puerto que configuraste en el fichero mongod.conf (xxxxx)

![robomongo_conexion](/images/como-conectarte-remotamente-a-tu-base-de-datos-mongodb/robomongo_conexion_dwewwc.jpg)

En la **pestaña Autenticación**, indica la base de datos “_admin_” para poder entrar con el nombre de usuario y la contraseña del usuario administrador que creamos (myServerAdmin)

![robomongo_auth](/images/como-conectarte-remotamente-a-tu-base-de-datos-mongodb/robomongo_auth_carbs8.jpg)

Por último en la **pestaña SSH**, indica la dirección IP de tu servidor, el puerto de SSH (el 22 es el por defecto si no lo has cambiado), el nombre de usuario con el que puedes entrar en tu servidor por SSH y la contraseña

![robomongo_ssh](/images/como-conectarte-remotamente-a-tu-base-de-datos-mongodb/robomongo_ssh_zwmk7z.jpg)

Con esto podrás acceder con Robomongo a la base de datos remota de tu aplicación.

**Fuentes**:

- [http://docs.mongodb.org/manual/tutorial/add-admin-user/](http://docs.mongodb.org/manual/tutorial/add-admin-user/)
- [http://docs.mongodb.org/manual/tutorial/add-user-to-database/](http://docs.mongodb.org/manual/tutorial/add-user-to-database/)
- [https://www.digitalocean.com/community/tutorials/how-to-securely-configure-a-production-mongodb-server](https://www.digitalocean.com/community/tutorials/how-to-securely-configure-a-production-mongodb-server)
