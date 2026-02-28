---
title: Cómo configurar Husky y Lint-Staged en un proyecto
date: '2022-11-09'
url: 'https://carlosazaustre.es/blog/husky-lintstaged'
tags:
  - git
  - herramientas
  - tutorial
excerpt: >-
  Configura Husky y Lint-Staged en tu proyecto Node.js para ejecutar Git Hooks
  antes de cada commit, verificar el linter y asegurar la calidad del código.
---

# Cómo configurar Husky y Lint-Staged en un proyecto

> Publicado el 2022-11-09 — https://carlosazaustre.es/blog/husky-lintstaged

Mejora tu flujo de desarrollo como programador, utilizando Git Hooks que se ejecuten antes de un commit,
push, etc... y que comprueben si el Linter
pasa correctamente, los test dan OK,...
y así asegures que el código que subes a
tu repositorio cumple un mínimo de calidad.

Para ello tenemos herramientas como Husky y
Lint-Staged que nos ayudan a configurarlo.

En este tutorial vemos como hacerlo, pero si quieres verlo en video, aquí abajo te lo dejo en YouTube.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=YWBrzwSDpo8)
/>

## Iniciando proyecto de ejemplo

Usaremos node y npm para este ejemplo, pero puedes usar cualquier otro lenguaje y gestor de paquetes.

```bash
mkdir husky-lint-staged
cd husky-lint-staged
npm init -y
```

Ahora iniciamos un nuevo repositorio, ya que [Husky](https://typicode.github.io/husky/#/) utiliza [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).
Si no tienes un repositorio, no vas a poder instalar Husky.

```bash
git init
```

Instalamos las depencencias de desarrollo que vamos a usar.

```bash
npm i -D husky lint-staged
```

## ¿Por qué usar Husky y Lint-Staged?

Husky en lo que se basa es en los [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks),
que son scripts que se ejecutan en momentos determinados, como antes de un commit, push, etc...

Por ejemplo el script de `pre-commit` nos permite que antes de finalizar un commit, se ejecute un script que corra el Linter
y nos diga si hay errores o no y asegurarnos que el código que se sube al repositorio sigue las reglas de estilo.

Por otro lado, Lint-Staged nos permite ejecutar scripts en los archivos que se van a subir al repositorio, es decir,
solo en los archivos que hemos modificado, no en todos los archivos del proyecto. Se entiende que el resto de archivos que no
hemos tocado ya están bien y no necesitan ser revisados.

## Configurando Husky y Lint-staged

Creamos un fichero `.lintstagedrc` en la raíz de nuestro proyecto, con el siguiente contenido:

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"]
}
```

Aqui le estamos diciendo que para los ficheros con extensión `js`, `jsx`, `ts` y `tsx`, ejecute el comando `eslint --fix` y
después añada los cambios al commit.

Ahora en nuestro `package.json` añadimos un script que podemos llamar `prepare`. Puedes añadirlo en la sección `scripts` o
ejecutar el siguiente comando:

```bash
npm set-script prepare "husky install"
```

Esto nos permite configurar Husky de una forma más rápida corriendo:

```bash
npm run prepare
```

Esto instala los git hooks dentro de la carpeta `.husky` que se acaba de crear.

## Añadir el pre-commit hook

Ahora vamos a añadir el pre-commit hook, para que antes de hacer un commit, se ejecute el script de Lint-Staged. Esto lo hacemos
con el siguiente comando:

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

Esto crea el fichero `.husky/pre-commit` con el siguiente contenido:

```bash
#!/usr/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

## Configurar el Linter

Tenemos el hook pero no tenemos un linter configurado. Solucionemos eso. Ejecutamos el siguiente comando para que se instale
y configure ESlint de una forma rápida:

```bash
npx eslint --init
```

Elige las opciones de configuración que prefieras.

Ahora si realizas un commit y modificas un fichero con extensión `js`, `jsx`, `ts` o `tsx`, se ejecutará el script de Lint-Staged
y se ejecutará el comando `eslint --fix` y se añadirán los cambios al commit.

## Añadir el pre-push hook

Ahora vamos a añadir el pre-push hook, para que antes de hacer un push, se ejecuten los scripts que determinemos, como por ejemplo que
se lancen los Tests y sólo si pasan, el código se suba finalmente al repositorio.Esto lo hacemos
con el siguiente comando:

```bash
npx husky add .husky/pre-push "npm run test"
```

Si no tienes tests o estos no pasan, el push no se realizará hasta que lo soluciones.

Para que puedas probar este ejemplo, vamos a crear un fichero y un pequeño test, además de la configuración de ESLint necesaria para que no
te de errores:

Primero de todo, instalaré Jest como runner de tests:

```bash
npm i -D jest
```

Seguidamente, para no complicarnos mucho con este ejemplo, en un fichero `.eslintignore` vamos a añadir la carpeta de `tests` y ya que estamos
también `node_modules` por curarnos en salud.

```json
//.eslintignore
node_modules
__test__
```

Tendremos un fichero de ejemplo, `index.js` que simplemente exporta una función que devuelve la suma de dos valores:

```js
// index.js
const sum = (a, b) => a + b;

module.exports = { sum };
```

Y en la carpeta `__test__` tendremos un fichero `index.test.js` que importará la función `sum` y hará un test para comprobar que
funciona correctamente:

```js
// index.test.js
const { sum } = require("./index");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

Puedes jugar con esto para ver como el test falla y no te deja realizar el push.

## Conclusión

Esto es solo una de las muchas cosas que podemos hacer con Husky y Lint-Staged. Puedes ver más en la [documentación de Husky](https://typicode.github.io/husky/#/).

En un próximo artículo tutorial, veremos como configurar todo esto para que el propio mensaje de commit siga unas normas de estilo, conocidas
como 'Conventional Commits'.

**Déjame en los comentarios si te interesa.**

```

```
