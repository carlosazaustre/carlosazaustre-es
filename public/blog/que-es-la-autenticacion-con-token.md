---
title: ¿Qué es la autenticación basada en Token?
date: '2015-02-19'
url: 'https://carlosazaustre.es/blog/que-es-la-autenticacion-con-token'
tags: []
related:
  - autenticacion-con-token-en-angularjs
  - autenticacion-con-token-en-node-js
  - registro-y-autorizacion-de-usuarios-en-node-js-con-twitter-y-facebook
---

# ¿Qué es la autenticación basada en Token?

> Publicado el 2015-02-19 — https://carlosazaustre.es/blog/que-es-la-autenticacion-con-token

Existen varios sistemas de autenticación en una aplicación web. A continuación veremos las 2 versiones más utilizadas junto con sus ventajas e inconvenientes.

## Autenticación en el servidor, almacenando la sesión

El más común hasta ahora era el que guardaba en una sesión la información del usuario. Para ello necesitábamos almacenar esa información en una base de datos, podía ser una colección de <b>MongoDB</b> o en <b>Redis</b>.

Sin embargo esto suponía una pérdida de escalabilidad en nuestra aplicación, ya que el servidor debe almacenar un registro por cada vez que el usuario se autentique en el sistema. Además hacemos que el Backend se encargue de ello y de esta manera si queremos desarrollar una aplicación móvil, necesitaríamos otro backend diferente, no pudiendo reutilizarlo.

## Autenticación sin estado con Tokens

Por ello una de las nuevas tendencias en cuanto al desarrollo web moderno se refiere, es la autenticación por medio de _Tokens_ y que [nuestro backend sea un API RESTful sin información de estado](/como-implementar-una-api-rest-con-mongodb-node-js-usando-express-v4/), _stateless_.

El funcionamiento es el siguiente. El usuario se autentica en nuestra aplicación, bien con un par usuario/contraseña, o a través de un proveedor como puede ser Twitter, Facebook o Google por ejemplo. A partir de entonces, cada petición HTTP que haga el usuario va acompañada de un _Token_ en la cabecera. Este Token no es más que una firma cifrada que permite a nuestro API identificar al usuario. Pero este Token no se almacena en el servidor, si no en el lado del cliente (por ejemplo en _localStorage_ o _sessionStorage_) y el API es el que se encarga de descrifrar ese Token y redirigir el flujo de la aplicación en un sentido u otro.

Como los **tokens son almacenados en el lado del cliente**, no hay información de estado y la aplicación se vuelve totalmente escalable. Podemos usar el mismo API para diferentes apliaciones (Web, Mobile, Android, iOS, ...) solo debemos preocuparnos de enviar los datos en formato JSON y generar y descrifrar tokens en la autenticación y posteriores peticiones HTTP a través de un middleware.

![autenticación basada en Token](/images/que-es-la-autenticacion-con-token/autenticacion-basada-en-token.png)

También nos **añade más seguridad**. Al no utilizar cookies para almacenar la información del usuario, podemos evitar ataques CSRF (_Cross-Site Request Forgery_) que manipulen la sesión que se envía al backend. Por supuesto podemos hacer que el token expire después de un tiempo lo que le añade una capa extra de seguridad.

## Autenticación con JSON Web Tokens

El estándar para este tipo de autenticación es utilizar [JSON Web Tokens (JWT)](http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html). Al igual que los APIs, el formato JSON es agnóstico del lenguaje, y podemos utilizar el que queramos (Node.js, Python, Ruby, PHP, .NET, Java,...)

El formato de un **JWT** está compuesto por 3 `strings` separados por un punto `.` algo así como:

```shell
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NGE4Y2U2MThlOTFiMGIxMzY2NWUyZjkiLCJpYXQiOiIxNDI0MTgwNDg0IiwiZXhwIjoiMTQyNTM5MDE0MiJ9.yk4nouUteW54F1HbWtgg1wJxeDjqDA_8AhUPyjE5K0U
```

Cada `string` significa una cosa:

- **Header**
  La primera parte es la cabecera del token, que a su vez tiene otras dos partes, el tipo, en este caso un JWT y la codificación utilizada. Comunmente es el algoritmo _HMAC SHA256_, El contenido sin codificar es el siguiente:

```js
{
	"typ": "JWT",
    "alg": "HS256
}
```

Codificado sería: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

- **Payload**
  EL _Payload_ está compuesto por los llamados [_JWT Claims_](http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#RegisteredClaimName) donde irán colocados la atributos que definen nuestro token. Exiten varios que puedes consultar aquí, los más comunes a utilizar son:
  _ `sub`: Identifica el sujeto del token, por ejemplo un identificador de usuario.
  _ `iat`: Identifica la fecha de creación del token, válido para si queremos ponerle una fecha de caducidad. En formato de tiempo UNIX \* `exp`: Identifica a la fecha de expiración del token. Podemos calcularla a partir del `iat`. También en formato de tiempo UNIX.

```js
{
	"sub": "54a8ce618e91b0b13665e2f9",
    "iat": "1424180484",
    "exp": "1425390142"
}
```

También podemos añadirle más campos, incluso personalizados, como pueden ser el rol del usuario, etc.

```js
{
	"sub": "54a8ce618e91b0b13665e2f9",
    "iat": "1424180484",
    "exp": "1425390142",
    "admin": true,
    "role": 1
}
```

Codificado sería: `eyJzdWIiOiI1NGE4Y2U2MThlOTFiMGIxMzY2NWUyZjkiLCJpYXQiOiIxNDI0MTgwNDg0IiwiZXhwIjoiMTQyNTM5MDE0MiJ9`

- **Signature**
  La firma es la tercera y última parte del JSON Web Token. Está formada por los anteriores componentes (Header y Payload) cifrados en _Base64_ con una clave secreta (almacenada en nuestro backend). Así sirve de _Hash_ para comprobar que todo está bien.

```js
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret);
```

Codificado sería: `yk4nouUteW54F1HbWtgg1wJxeDjqDA_8AhUPyjE5K0U`

Por tanto, todo nuestro JSON Web Token, una vez codificado tendrá esta pinta:

```shell
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NGE4Y2U2MThlOTFiMGIxMzY2NWUyZjkiLCJpYXQiOiIxNDI0MTgwNDg0IiwiZXhwIjoiMTQyNTM5MDE0MiJ9.yk4nouUteW54F1HbWtgg1wJxeDjqDA_8AhUPyjE5K0U
```

Que si lo comprobamos en la web [JWT.io](http://jwt.io/) vemos que nos lo traduce a los campos que hemos visto.

En la [siguiente entrada vemos como implementar **este tipo de autenticación en Node.js**](/autenticacion-con-token-en-node-js/) y más adelante [en el **lado cliente con AngularJS**](/autenticacion-con-token-en-angularjs/).
