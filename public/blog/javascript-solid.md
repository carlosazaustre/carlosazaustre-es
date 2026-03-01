---
title: Principios SOLID en JavaScript
date: '2023-10-16'
url: 'https://carlosazaustre.es/blog/javascript-solid'
tags:
  - javascript
  - arquitectura
related:
  - el-camino-para-ser-un-pro-en-javascript
  - ecmascript6
  - manejando-la-asincronia-en-javascript
excerpt: >-
  Descubre los 5 principios SOLID aplicados a JavaScript para escribir código
  limpio, escalable y mantenible. Aprende con ejemplos y vídeo en YouTube.
---

# Principios SOLID en JavaScript

> Publicado el 2023-10-16 — https://carlosazaustre.es/blog/javascript-solid

## TL;DR:

¿Eres más de contenido en vídeo? Aquí tienes explicados los 5 principios SOLID de la programación, aplicado a JavaScript.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=6PdAOfsPh48)
/>

En este artículo discutiremos los principios SOLID, una serie de pautas muy útiles para mejorar tu código en programación orientada a
objetos. Estos principios fueron popularizados por Robert C. Martin, conocido como el "tío Bob", autor de libros como *Clean Code*.

## Introducción a SOLID - Qué son y Por Qué Importan

Los principios SOLID son un acrónimo de cinco valores de diseño:

1. **Single Responsibility Principle** (S) - Principio de Responsabilidad Única
2. **Open-Closed Principle** (O) - Principio de Abierto/Cerrado
3. **Liskov Substitution Principle** (L) - Principio de Sustitución de Liskov
4. **Interface Segregation Principle** (I) - Principio de Segregación de la Interfaz
5. **Dependency Inversion Principle** (D) - Principio de Inversión de Dependencias

A continuación vamos a profundizar en cada uno de estos principios aplicándolos a nuestro lenguaje de programación favorito: JavaScript.
Empezamos con el primer principio.

## Principio de responsabilidad única (S)

Según este principio, una clase debe tener una sola razón para cambiar, es decir, debe tener sólo una tarea o responsabilidad.

Para ilustrar este principio, pensemos en una orquesta. Cada músico tiene un instrumento que sabe tocar perfectamente. El violinista
sabe tocar el violín, pero si lo pusiéramos a tocar también el tambor, seguramente algo no funcionaría bien.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=HQAjtNPgfss)
/>

Aplicando este ejemplo a la programación, cada clase o función debe tener una única responsabilidad.
Esto simplifica la comprensión, el mantenimiento y la modificación del código en el futuro.

Vamos a ilustrar esto con un ejemplo de un caso que puedes encontrarte en tu día a día como desarrollador.

Considera una función `calculateSalary()`. Esta función recibe un objeto que simula a un empleado y calcula su salario.
Pero además de calcular el salario, esta función también genera un reporte del empleado.

```javascript
function calculateSalary(employee) {
    let salary = employee.hoursWorked * employee.hourlyRate;
    let report = /*...*/;
    console.log(report);
    return salary;
}
```

En esta función hay dos responsabilidades: calcular el salario y generar el informe. Esto viola el principio de responsabilidad única.

Una alternativa sería refactorizar esta función en dos funciones separadas: una para calcular el salario y otra para generar el informe.

```javascript
function calculateSalary(employee) {
    return employee.hoursWorked * employee.hourlyRate;
}

function generateReport(employee, salary) {
    let report = /*...*/;
    console.log(report);
}
```

En esta refactorización, cada función tiene una sola responsabilidad, lo que facilita su comprensión y mantenimiento.

## Principio de abierto-cerrado (O)

El segundo principio SOLID es el principio de abierto-cerrado. Su definición oficial sostiene que las entidades de software (clases, módulos, funciones, etc.) deben estar abiertas para su extensión, pero cerradas para su modificación.

Para entender este principio, imaginemos un coche de juguete que se carga con baterías. El diseño del coche está cerrado para modificaciones, no puedes cambiar la forma en que se carga. Sin embargo, está abierto para su extensión, puedes cargarlo con diferentes tipos de baterías o pilas.

En el código, debemos poder agregar nuevas funcionalidades sin modificar el código que ya existe.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=_-O0KOrISKk)
/>

Imagina, por ejemplo, que tienes una aplicación de comercio electrónico con una función `processPayment()`, que recibe un monto y los detalles de una tarjeta de crédito. En un principio, este sistema permitía sólo pagos con tarjeta de crédito.

```javascript
function processPayment(price, cardDetails) {
    /*...*/
    console.log('Pagado con tarjeta.');
}
```

Pero más adelante, decides que tu aplicación también debería aceptar pagos con PayPal. Podrías estar tentado a añadir lógica extra a la función `processPayment()``, con una condición para verificar si el pago se está haciendo con tarjeta o con PayPal. Pero esto violaría el principio de abierto-cerrado, ya que estás modificando la función en lugar de extenderla.

Una mejor solución sería agregar una nueva función processPaymentWithPayPal(). De esta manera, puedes manejar los pagos con PayPal sin alterar el código existente.

```javascript
function processPaymentWithPayPal(price, accountDetails) {
    /*...*/
    console.log('Pagado con PayPal.');
}
```

Al aplicar el principio abierto/cerrado, nos aseguramos de que cada vez que queremos agregar una nueva funcionalidad, como aceptar pagos con Bitcoin, sólo necesitamos añadir una nueva subclase.

## Principio de Sustitución de Liskov (L)

El principio de sustitución de Liskov establece que "los objetos de una superclase deben ser reemplazables por objetos de una subclase sin afectar la corrección del programa".

Al aplicar este principio, podemos crear diferentes objetos "manejador de errores" que se pueden utilizar en el mismo lugar sin causar errores en el programa.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=3raQSxeOflg)
/>

```javascript
// Función de ejemplo que realizac una petición HTTP
function makeRequest(url, errorHandler) {
    fetch(url)
        .then(response => response.json())
        .catch(error => errorHandler.handle(error))
    }

// Podemos tener varias funciones para manejar errores
const consoleErrorHandler = function handle(error){
    console.log(error)
}

const externalErrorHandler = function handle(error){
    sendErrorToExternalService(error)
}
// Usando el principio de sustitución de Liskov, 
// podríamos pasar cualquier función manejadora de
// errores durante una request.
makeRequest(url, consoleErrorHandler);
makeRequest(url, externalErrorHandler);
```

## principio de segregación de la interfaz (I)

El cuarto principio SOLID, la "I", se refiere al principio de segregación de la interfaz. Con base en este principio, ninguna clase debería ser forzada a implementar interfaces o métodos que no va a utilizar.

Es mejor tener interfaces específicas, en lugar de una sola interfaz general. Y esto aplica también a las funciones en JavaScript.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=N6TxeHzum_g)
/>

```javascript
class Product {
    constructor() { /* */ }

    getDetails() { /* */ }
    saveToDb() {/* */ }
    displayInFrontEnd() { /* */ }
}

// DigitalProduct no necesita el método saveToDb(),
// sin embargo, lo hereda sin poder evitarlo
// Se viola el principio de segregación de la interfaz

class DigitalProduct extends Product{
    // Se hereda el método innecesario saveToDb()}
}

// ---- //
// Refactorizando siguiendo este principio

class Product {
    constructor() { /* */ }

    getDetails() { /* */ }
    displayInFrontEnd() { /* */ }
}

class PhysicalProduct extends Product {
    constructor() {
        super()
    }
    saveToDb() { /* */ }
}

class DigitalProduct extends Product{
    // No se hereda el método innecesario saveToDb()
}
```

## Principio de inversión de dependencia (D)

El último principio, "D", es el principio de inversión de dependencia. Este principio sostiene que los módulos de alto nivel, es decir, los módulos que contienen las decisiones estratégicas y las directivas de alto nivel, no deben depender de los módulos de bajo nivel, que son los módulos que contienen la lógica detallada y de bajo nivel.

Ambos, los módulos de alto nivel y de bajo nivel, deberían depender de abstracciones.

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=U4yVna0ZH80)
/>

Siguiendo el principio de inversión de dependencias, una clase `PasswordReminder` no debe depende directamente de `MySQLConnection`, sino que debe recibir una instancia de una clase que implemente una interfaz común de "conexión de base de datos".

```javascript
class MySqlConnection {
    connect() { /* */ }
}

class PasswordReminder {
    constructor() {
        this.dbConnection = new MySQLConnection();
    }
}

// Refactorizando de acuerdo al principio de inversión de dependencia
class MySqlConnection {
    connect() { /* */ }
}
class PostgreSqlConnection {
    connect() { /* */ }
}

class PasswordReminder {
    constructor(connection) {
        this.dbConnection = connection
    }
}
```

## Reflexiones Finales

Las reglas SOLID son una herramienta muy útil para la programación. Pero, al igual que cualquier herramienta, no deben ser aplicadas ciegamente en todos los casos. Mi consejo es que sigas estos principios donde tenga sentido y pueda ayudarte a mantener y mejorar tu código en el largo plazo.

> "El software es un ciclo en el que tú vas desarrollando código, se van necesitando nuevas características o funcionalidades, van apareciendo bugs sin querer o queriendo, y vas a necesitar refactorizar. No necesariamente siempre tienes que estar escribiendo código nuevo. La mayor parte de tu tiempo vas a estar leyendo código de otros o incluso tuyo y vas a poder ver que hay partes que puedes refactorizar para mejorar el mantenimiento e incluso el rendimiento de tu aplicación."

Como siempre, si tienes alguna pregunta o comentario, no dudes en escribirlo abajo. 

¡Hasta la próxima!
