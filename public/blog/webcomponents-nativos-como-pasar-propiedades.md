---
title: 'WebComponents Nativos: Cómo pasar propiedades'
date: '2018-08-31'
url: 'https://carlosazaustre.es/blog/webcomponents-nativos-como-pasar-propiedades'
tags:
  - javascript
  - web
related:
  - como-crear-webcomponent-de-forma-nativa
  - novedades-en-el-ecosistema-de-webcomponents-gracias-a-polymer-3-0
  - como-pasar-variables-como-atributos-en-directivas-de-angularjs
---

# WebComponents Nativos: Cómo pasar propiedades

> Publicado el 2018-08-31 — https://carlosazaustre.es/blog/webcomponents-nativos-como-pasar-propiedades

En un [post anterior vimos como crear un webcomponent de forma nativa](/como-crear-webcomponent-de-forma-nativa/), sin librerías. Utilizando puro JavaScript y las APIS del navegador (**CustomElements v1** y **ShadowDOM v1**)

Este artículo extiende el anterior para ver como podríamos pasar propiedades a un **WebComponent**.

## Añadiendo una propiedad al Web Component

Voy a tomar el [ejemplo anterior](/como-crear-webcomponent-de-forma-nativa/) para añadir una propiedad al elemento.

Antes teníamos `<sell-button></sell-button>` ahora quiero añadir el texto del botón como propiedad tal que así: `<sell-button text="Lo quiero!"></sell-button>`

Así que tomando el código de `sell-button.html` que teníamos:

```javascript
class SellButton extends HTMLElement {
  constructor() {
    super();
    this.importDocument = document.currentScript.ownerDocument;
  }

  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: "open" });
    const t = this.importDocument.querySelector("#sellBtn");
    const instance = t.content.cloneNode(true);
    shadowRoot.appendChild(instance);
  }
}

window.customElements.define("sell-button", SellButton);
```

Vamos a realizar algunos cambios para que acepte propiedades. Modificamos un poco el `<template>` eliminando el texto del `button` y colocando un tag `slot` que nos permite añadir texto desde el exterior:

```markup
<div class="btn-container">
  <button class="btn"><slot></slot></button>
</div>
```

Los elementos pueden reaccionar ante cambios en sus atributos, si estos han sido definidos en otra de las funciones del ciclo de vida de un `customElement` en concreto en la función `attributeChangedCallback` que recibe como parámetros el nombre del atributo o propiedad, el valor que tenía anteriormente y el nuevo valor.

Aqui lo que vamos a hacer es cambiar el contenido textual del componente (gracias al tag `<slot>` que hemos añadido al `template`) por el nuevo valor

### Observando cambios

```javascript
attributeChangedCallback(name, oldValue, newValue) {
  this.textContent = newValue;
}
```

Éste método sólo se disparará si hemos declarado el atributo o propiedad `attrName` en la función `observedAttributes` de la clase del elemento.

```javascript
static get observedAttributes () {
   return ['text'];
}
```

Es una función `get` de ECMAScript6, lo que significa que va a ser invocada automáticamente, en este caso cuando se dispare `attributeChangedCallback` y se ejecutará por cada uno de los atributos que tengamos en el array que devuelve la función. En este caso solo el atributo `text`.

Resumiendo, el contenido actualizado del **Web Component** `sell-button` será el siguiente:

```javascript
<html>
  <template id="sellBtn">
    <style>
      :host {
        --orange: #e67e22;
        --space: 1.5em;
      }
      .btn-container {
        border: 2px dashed var(--orange);
        padding: var(--space);
        text-align: center;
      }
      .btn {
        background-color: var(--orange);
        border: 0;
        border-radius: 5px;
        color: white;
        padding: var(--space);
        text-transform: uppercase;
      }
    </style>

    <div class="btn-container">
     <button class="btn"><slot></slot></button>
   </div>
  </template>

  <script>
    class SellButton extends HTMLElement {
      constructor() {
        super();
        this.importDocument = document.currentScript.ownerDocument;
      }

      static get observedAttributes () {
        return ['text'];
      }

      attributeChangedCallback (name, oldValue, newValue) {
        this.textContent = newValue;
      }

      connectedCallback () {
        let shadowRoot = this.attachShadow({mode: 'open'});
        const t = this.importDocument.querySelector('#sellBtn');
        const instance = t.content.cloneNode(true);

        shadowRoot.appendChild(instance);
      }

    }

    customElements.define('sell-button', SellButton);
  </script>

</html>

```

Y para verificar que si se cambia el atributo, se refleja en el interior del `template` del componente, vamos a crear una función de `setTimeout` que pasados 3 segundos, modifique el valor de la propiedad `text`:

```javascript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>WebComponents</title>
    <link rel="import" href="components/sell-button.html">
  </head>
  <body>
    <sell-button text="Comprar Ahora"></sell-button>

    <script type="text/javascript">
      setTimeout(() => {
        let anotherEl = document.querySelector('sell-button');
        anotherEl.setAttribute('text', 'Lo quiero ahora!');
      }, 3000);
    </script>
  </body>
</html>
```

De esta forma, al cargar la página tendremos esto:
![](/images/webcomponents-nativos-como-pasar-propiedades/Screen-Shot-2017-03-22-at-13.15.40.png)

Y después, tras cambiar el valor de `text` por el texto: "Lo quiero ahora!" tendríamos esto:

![](/images/webcomponents-nativos-como-pasar-propiedades/Screen-Shot-2017-03-22-at-13.15.44.png)

Puedes ver esto en funcionamiento en el siguiente **[CodePen](https://codepen.io/carlosazaustre/project/editor/ArjknA/)**

> **RECUERDA**:

> Prueba este ejemplo en una versión reciente de Chrome o en su defecto en Chrome Canary, ya que los `HTMLImports` no están soportados en Safari, Firefox ni Edge. Para eso necesitas usar el Polyfill de `webcomponents`

## Añadiendo más de una propiedad

¿Y qué pasa si queremos utilizar más de una propiedad?
En ese caso hay que hacer algo más de "fontanería". Imaginemos que ahora nuestro _custom-element_ queremos que tenga ésta pinta y que ademas sus propiedades sean _observables_:

```html
<sell-button intro="Oferta" text="Comprar Ahora"></sell-button>
```

Bien, primero vamos a modificar el `<template>` ya que ahora con un único elemento `<slot>` no nos sirve, ya que tendremos dos propiedades. Vamos a añadir otro y los vamos a distinguir por la propiedad `name`:

```html
<div class="btn-container">
  <h1><slot name="intro"></slot></h1>
  <button class="btn"><slot name="text"></slot></button>
</div>
```

Después añadimos la nueva propiedad `intro` a la función `observedAttributtes`:

```javascript
static get observedAttributes () {
  return ['intro', 'text'];
}
```

También vamos a actualizar el constructor, añadiendo un par de variables "privadas" que guarden el valor de estos atributos para uso interno:

```javascript
constructor() {
  super();
  this._text = null;
  this._intro = null;
  this.importDocument = document.currentScript.ownerDocument;
}
```

Después vamos a implementar dos funciones _getter_ y _setter_ de ECMAScript 6 que se invocarán cada vez que vayamos a acceder a la propiedad en cuestión. Es decir, si queremos acceder a `this.intro` o cambiar el valor de `this.intro`, se llamará automáticamente a la función `get intro()` en el primer caso y a la función `set intro(val)` en el segundo:

```javascript
get text () {
  return this.getAttribute('text');
}
set text (val) {
  this._text = val;
}

get intro () {
  return this.getAttribute('intro');
}
set intro (val) {
  this._intro = val;
}
```

Lo único que hacemos aquí es que cuando queramos leer el valor de `text` o `intro` devolvemos el valor que tiene el atributo con `this.getAttribute`. Y cuando lo queramos modificar le pasamos el valor a la variable "privada" que habiamos declarado en el constructor.

Después modificamos la función `attributeChangedCallback` para que ante los cambios (si se producen) sea capaz de reflejarlos en el ShadowDOM:

```javascript
attributeChangedCallback (name, oldValue, newValue) {
  if (this.shadowRoot) {

  this.shadowRoot.querySelector(`[name="${name}"]`).innerHTML = this[name];
  }
}
```

Como `name` cambia según los atributos que se devuelven en el array de `observedAttributes`, `name` será `text` o `intro` según lo que se actualice.

Aquí hacemos una comprobación si existe el `shadowRoot` ya que en un primer momento, cuando declaramos el componente con propiedades, este método se invoca pero el ShadowDOM no está listo, entonces hay que hacer esta pequeña comprobación, para cuando lo esté poder hacer una llamada a `querySelector` buscar el `<slot>` con el nombre que hayamos definidos y pasarle el valor de `this.intro` o `this.text` según el atributo que se haya cambiado.

Y por último, actualizamos el método `connectedCallback` para que añada los valores de las propiedades al ShadowDOM en su creación:

```javascript
connectedCallback () {
  let shadowRoot = this.attachShadow({mode: 'open'});
  const t = this.importDocument.querySelector('#sellBtn');
  const instance = t.content.cloneNode(true);

  instance.querySelector('[name="text"]').innerHTML = this.text;
  instance.querySelector('[name="intro"]').innerHTML = this.intro;

  shadowRoot.appendChild(instance);
}
```

Resumiendo, el componente completo sería así:

```javascript
<html>
  <template id="sellBtn">
    <style>
      :host {
        --orange: #e67e22;
        --space: 1.5em;
      }
      .btn-container {
        border: 2px dashed var(--orange);
        padding: var(--space);
        text-align: center;
      }
      .btn {
        background-color: var(--orange);
        border: 0;
        border-radius: 5px;
        color: white;
        padding: var(--space);
        text-transform: uppercase;
      }
    </style>

    <div class="btn-container">
      <h1><slot name="intro"></slot></h1>
     <button class="btn"><slot name="text"></slot></button>
   </div>
  </template>

  <script>
    'use strict';

    class SellButton extends HTMLElement {
      constructor() {
        super();
        this._text = null;
        this._intro = null;
        this.importDocument = document.currentScript.ownerDocument;
      }

      static get observedAttributes () {
        return ['intro', 'text'];
      }

      attributeChangedCallback (name, oldValue, newValue) {
        if (this.shadowRoot) {
          this.shadowRoot.querySelector(`[name="${name}"]`).innerHTML = this[name];
        }
      }

      connectedCallback () {
        let shadowRoot = this.attachShadow({mode: 'open'});
        const t = this.importDocument.querySelector('#sellBtn');
        const instance = t.content.cloneNode(true);

        instance.querySelector('[name="text"]').innerHTML = this.text;
        instance.querySelector('[name="intro"]').innerHTML = this.intro;

        shadowRoot.appendChild(instance);
      }

      get text () {
        console.log('get text()')
        return this.getAttribute('text');
      }
      set text (val) {
        console.log(`set text(${val})`);
        this._text = val;
      }

      get intro () {
        console.log('get intro()');
        return this.getAttribute('intro');
      }
      set intro (val) {
        console.log(`set intro(${val})`);
        this._intro = val;
      }
    }

    customElements.define('sell-button', SellButton);
  </script>

</html>
```

Si en nuestro `index.html` modificamos el componente con el nuevo atributo, tendríamos este resultado:

```markup
<sell-button intro="Oferta" text="Comprar Ahora"></sell-button>
```

![](/images/webcomponents-nativos-como-pasar-propiedades/Screen-Shot-2017-03-22-at-17.41.05.png)

Y si hacemos como con el ejemplo anterior, una función de _timeout_ que cambie las propiedades pasados 2 segundos, tendremos el nuevo resultado:

![](/images/webcomponents-nativos-como-pasar-propiedades/Screen-Shot-2017-03-23-at-09.18.08.png)

En el mismo [CodePen](https://codepen.io/carlosazaustre/project/editor/ArjknA/) tienes el código y demo de este ejemplo (En este caso en el archivo `sell-button-copy.html`.

## Conclusión

Con esto hemos visto como funciona el estándar de _Web Components_ de la W3C. Usando las APIs nativas que provee el navegador. Como has podido ver, hay bastante código que puede ser algo repetitivo si por ejemplo tenemos varias propiedades a observar.

Este tipo de cosas son las que implementan librerías como [Polymer](https://www.polymer-project.org/) que sobre todo en su versión 2.0 han eliminado muchas cosas para dar mayor protagonismo al soporte nativo del navegador.

---

## Referencias

Si quieres profundizar más sobre ésta nueva tecnología te dejo los siguientes enlaces:

- [Especificación de la W3C sobre CustomElements](https://www.w3.org/TR/custom-elements/)
- [_Observing Changes to Attributes_: Custom Elements v1 Reusable Web Components por Google Developers](https://developers.google.com/web/fundamentals/getting-started/primers/customelements#upgrades)
- [Custom Elements, by Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements)
