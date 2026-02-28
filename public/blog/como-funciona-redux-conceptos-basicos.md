---
title: ¿Cómo funciona Redux? Conceptos básicos
date: '2017-03-09'
url: 'https://carlosazaustre.es/blog/como-funciona-redux-conceptos-basicos'
tags:
  - javascript
  - react
  - arquitectura
related:
  - como-funciona-flux
  - empezando-con-react-js-y-ecmascript-6
  - ejemplo-de-aplicacion-con-react-js-en-ecmascript-6
---

# ¿Cómo funciona Redux? Conceptos básicos

> Publicado el 2017-03-09 — https://carlosazaustre.es/blog/como-funciona-redux-conceptos-basicos

En el [anterior post vimos que era y cómo funcionaba la arquitectura Flux](/como-funciona-flux/). Siendo de alguna manera, un sustituto o evolución del patrón Modelo-Vista-Controlador.

Al igual que existe la programación orientada a objetos y existen lenguajes que lo implementan (Como Java por ejemplo), o el patrón MVC y existen frameworks o librerías que lo implementan (como AngularJS o Backbone por ejemplo), **[Redux](http://redux.js.org) es una librería que implementa el patrón de diseño Flux**, con algunas variaciones que veremos a lo largo del artículo.

Redux es una librería JavaScript muy pequeña (Apenas 2KB en total), con muy poco código. Su API apenas son 5 funciones y lo más importante es que es JavaScript puro, por lo que es agnóstica al framework y puede utilizarse con cualquier librería framework (Angular, Polymer, React, etc...)

![Redux Logo](/images/como-funciona-redux-conceptos-basicos/logo_redux.png)

## ¿Qué hace Redux?

Redux se encarga en cierta manera de desacoplar el estado global de una aplicación web (en Front-End) de la parte visual, es decir los componentes.

Seguramente te preguntes ¿Qué es el estado de la aplicación?

### El estado de la aplicación

El estado en una web o aplicación pueden ser varias cosas, normalmente se trata **los datos que puedes recibir a través de un API REST o WebService** (por ejemplo un listado de productos), también se refiere al **estado de la UI** en un determinado momento, por ejemplo: un panel está desplegado o no, tiene que aparecer la información del usuario o no, un mensaje de error, etc...

Para llevar a cabo esta gestión del estado, Redux implementa Flux pero con algunas modificaciones:

## Los 3 conceptos clave de Redux

Redux se base en tres conceptos principales:

### 1. Una única "fuente de la verdad"

Flux propone que haya varios _Stores_ para almacenar el estado. Sin embargo Redux simplifica esto utilizando un único _Store_. Todo el estado queda almacenado en un árbol. En JavaScript esto se conseguiría con un objeto JavaScript como el siguiente:

```javascript
const initialState = {
  user: {
    error: null,
    isLoading: true,
    avatar: null,
    email: null,
  },
  products: {
    list: [],
    error: null,
    isLoading: true,
  },
};
```

### 2. El estado es de sólo lectura.

No podemos modificar el estado directamente, sólo podemos leer de él para representarlo en la vista y si queremos modificarlo, lo tenemos que hacer a través de **acciones**.

Una acción es simplemente un objeto JavaScript que incluye al menos un atributo `type` que indica el tipo de acción que estamos emitiendo y en caso de que haya datos asociados al cambio o modificación, un atributo `payload` con esos datos:

```javascript
{
   type: 'LOAD_PRODUCTS',
   products: products
}
```

Estas acciones suelen devolverse a través de un _Action Creator_ que sería de este tipo:

```javascript
function loadProducts(products) {
  return {
    type: "LOAD_PRODUCTS",
    products,
  };
}
```

### 3. Cambios con funciones puras.

Ya que no podemos modificar el estado directamente (tiene que ser a través de acciones) y el estado está almacenado en un único _Store_, para especificar como realizar los cambios en el árbol del estado utilizamos funciones puras llamadas **reducers**.

Una función pura es simplemente una función que ante los mismos datos de entrada devuelve el mismo resultado. Es decir, la siguiente función sería una función pura de ejemplo:

```javascript
function suma(a, b) {
  return a + b;
}
```

Esta función para los mismos parámetros, devuelve siempre lo mismo. Si llamamos a `suma(1,2)` siempre devolverá 3. De ésta manera es más sencillo depurar y encontrar errores, y es más fácil testear.

El **reducer** es simplemente eso, una función que recibe dos parámetros, el estado inicial y una acción y dependiendo del tipo de acción realizará una operación u otra en el estado. Siempre de manera inmutable, no podemos modificar el estado, si no crear una copia a partir del anterior. De esta forma es más fácil rastrear posibles errores.

Un _reducer_ tiene esta pinta:

```javascript
function reducer (state, action) {
   switch(action.type) {
     case 'ADD_ITEM':
       return state.concat(action.item);
     case 'REMOVE_ITEM':
     ...
     default:
       return state;
   }
}
```

## API de Redux

Como comentaba anteriormente, el API o funciones que exporta Redux son muy pocas. Vamos a explicar aquí las más utilizadas cuando creas una aplicación con Redux:

### createStore

Esta función, como su nombre indica, crea la _store_ central donde se almacenará el estado global de la aplicación.

La función recibe como parámetro un _reducer_ y opcionalmente un estado inicial y un _enhancer_ que nos sirve para más adelante añadir _Middlewares_. Y devuelve la _store_ creada.

```javascript
const store = redux.createStore(reducer, [initialState], [enhancer]);
```

Con la _Store_ creada tenemos [varios métodos](https://redux.js.org/api/store#store-methods) que podemos utilizar:

- `store.getState()`: Nos devuelve el estado actual de la _store_.
- `store.dispatch(action)`: Emite una acción, es la única forma de intentar cambiar el estado.
- `store.subscribe(listener)`: Permite suscribirse a los cambios que ocurran. El `listener` es llamado cada vez que una acción sea emitida y una parte del estado pueda haber sido cambiada.

Hay otros más pero estos son los más utilizados.

### combineReducers

Como en Redux tenemos un único _store_ para almacenar todo el estado de la aplicación. Es una buena práctica tener varios _reducers_ (uno por cada parte desglosada del estado) y con esta función podemos combinarlos en un único _reducer_ que pasar como parámetro a la función `createStore`.

**¿Por qué hay que hacer varios _reducers_?** Porque de esta forma dividimos nuestro problema en varias partes y es más sencillo modularizar nuestra aplicación.

Por ejemplo si tenemos un estado como el siguiente:

```javascript
const initialState = {
  user: {
    error: null,
    email: null,
  },
  products: {
    list: [],
    loading: true,
    error: null,
  },
  currentProduct: {
    product: null,
    loading: true,
    error: null,
  },
  cart: {
    items: [],
    total: 0,
  },
};
```

Sería interesante tener un _reducer_ que controle la parte del estado dedicada al `user`, otro reducer para todas las acciones asociadas a la manipulación de los `products`. Otro más para el producto actual y otro para la gestión del carrito, de tal manera que podamos hacer lo siguiente:

```javascript
function userReducer (state = initialState.user, action) {...}
function productsReducer (state = initialState.products, action) {...}
function currentProductReducer (state = initialState.currentProduct, action) {...}
function cartReducer (state = initialState.cart, action) {...}

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  currentProduct: currentProductReducer,
  cart: cartReducer
});
```

### applyMiddleware

Esta función nos permite añadir _Middlewares_ a Redux. Los _middlewares_ son funciones que se ejecutan entre que se emite una acción y cambia el estado. Podemos añadir multitud de ellos, y uno de los más usados sería **Redux-Thunk** que veremos en otro post ;)

### bindActionCreators

Esta función nos permite enlazar la función `dispatch` de la _store_ con los creadores de acción (esto son funciones que devuelven el objeto acción) de manera que no tengamos que estar importando la _store_ en todas las partes que necesitemos emitir una acción.

Es muy utilizada con React y sobre todo con la librería `react-redux` que nos permite escribir menos código si utilizamos Redux con React.

### compose

Dependiendo del tipo o tipos de _middlewares_ que estemos incluyendo en la creación del nuestra _store_, será necesario unirlos para que funcione correctamente (por ejemplo la extensión de Chrome Redux Developer Tools hay que incluirla en la _store_ con ésta función).

En resumen, lo que necesitas para utilizar Redux es:

- Definir tu **estado inicial**.
- Trocear ese estado inicial para crear **varios reducers** (o uno solo si tu estado no es muy complejo)
- Definir las acciones (tipos y datos a recibir) y también crear las funciones creadoras de acción (_Actions Creators_).
- Component los reducers si tienes varios, en uno solo.
- Crear la store

Luego ya dependiendo de si te ayudas de librerías específicas para cada framework o librería que utilices, ya funciona de una forma u otra.

Y básicamente esto es Redux. Resulta un tanto lioso y abrumante al principio, pero en un próximo tutorial crearé una aplicación de ejemplo, explicada paso a paso para entender como se conecta todo esto.
