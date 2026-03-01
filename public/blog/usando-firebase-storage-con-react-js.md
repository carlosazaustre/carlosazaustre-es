---
title: Usando Firebase Storage con React.js
date: '2016-10-13'
url: 'https://carlosazaustre.es/blog/usando-firebase-storage-con-react-js'
tags:
  - firebase
  - react
  - javascript
related:
  - conectando-firebase-a-react
  - que-son-las-firebase-cloud-functions
  - gatsby-deploy-firebase
excerpt: >-
  Descubre cómo usar Firebase Storage con React.js para subir y almacenar
  archivos en la nube, una alternativa a Amazon S3 para tus proyectos web.
---

# Usando Firebase Storage con React.js

> Publicado el 2016-10-13 — https://carlosazaustre.es/blog/usando-firebase-storage-con-react-js

En este artículo vamos a ver como utilizar la funcionalidad de Storage de Firebase para poder subir y almacenar archivos en la nube, y como integrarlo con React.

**Firebase Storage** es algo similar a lo que puedes conseguir con Amazon S3. Un espacio en la nube donde almacenar archivos binarios (imágenes, ficheros de audio, video, etc...)

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=GA7jYWk3BO8)
/>

A través de su API es muy sencillo subir archivos desde una SPA, y en particular con **React**. Vamos a ello.

## Configuración de Firebase.

Lo primero que necesitamos en entrar en [la consola de firebase](https://firebase.google.com) y crear un proyecto web nuevo, después copiar la configuración y añadirla a nuestro código. Esto es igual para todas las apps que hagamos con Firebase, por tanto para ésta parte puedes guiarte del [tutorial que escribí anteriormente y que puedes encontrar **aquí**](/conectando-firebase-a-react/)

### Componente FileUpload

Vamos a crear un componente llamado `FileUpload`, cuyo formato será el siguiente:

```javascript
class FileUpload extends React.Component {
  render() {
    return (
      <div>
        <progress value={this.state.uploadValue} max="100">
          {this.state.uploadValue} %
        </progress>
        <br />
        <input type="file" onChange={this.handleOnChange.bind(this)} />
        <br />
        <img width="90" src={this.state.picture} />
      </div>
    );
  }
}
```

Vamos a tener un elemento de tipo [`progress`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) para mostrar el porcentaje de progreso de la subida del archivo y un `input` de tipo `file` para cargar los archivos. Por último tendremos un `img` donde mostraremos el archivo una vez subido con su URL apuntando a firebase.

El valor de `progress` va a estar referenciado por el estado del componente, de esta manera, cada vez que cambie, el componente se re-renderizará con el nuevo valor.

De igual manera, el atributo `src` del elemento `img` también es una referencia al estado del componente, para que sólo se muestre cuando esté subido.

Por tanto, nuestro Componente `FileUpload` debe tener un constructor donde inicialicemos el estado:

```javascript
class FileUpload extends React.Component {
  constructor () {
    super()
    this.state = {
       uploadValue: 0
    }
  }

  render() {...}
}
```

### Gestión del evento

En el `input` de tipo `file` tenemos un evento `onChange` que se disparará cada vez que carguemos un fichero nuevo. Este evento va a llamar a la función `handleOnChange` que vamos a definir a continuación

En ésta función lo primero que vamos a hacer es tomar las referencias del fichero que estamos añadiendo en el input, una referencia al storage de nuestro proyecto en firebase donde tendremos un _bucket_ o carpeta que llamaremos `pictures` y el nombre del fichero que vamos a subir y la referencia a la tarea de subida:

```javascript
handleOnChange (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`pictures/${file.name}`)
    const task = storageRef.put(file)
}
```

La tarea que acabamos de crear, tiene una serie de listener que se dispararán en cuanto ocurra un evento. El que nos interesa es `state_changed` que nos avisa en todo momento de la subida del fichero y nos da un _snapshot_ con los bytes transferidos hasta el momento. Esto nos permite actualizar el estado y la barra de progreso.

Además de eso, nos proprociona un callback para gestionar los errores si los hubiese y una última función para indicarnos que la subida se ha realizado

```javascript
task.on(
  "state_changed",
  (snapshot) => {
    // Se lanza durante el progreso de subida
  },
  (error) => {
    // Si ha ocurrido un error aquí lo tratamos
  },
  () => {
    // Una vez se haya subido el archivo,
    // se invoca ésta función
  }
);
```

Para la primera función, simplemente vamos a hacer una operación que nos devuelva el porcentaje subido sobre el total del tamaño del archivo y actualice el estado y así la barra de progreso:

```javascript
task.on("state_changed", (snapshot) => {
  let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  this.setState({
    uploadValue: percentage,
  });
});
```

Y cuando el fichero se haya subido totalmente, vamos a actualizar nuevamente el estado con la URL de la imagen en firebase storage, que tomamos de la referencia a la tarea:

```javascript
task.on('state_changed', (snapshot) => {
  ...
}, (error) => {
  ...
}, () => {
  this.setState({
    picture: task.snapshot.downloadURL
  })
})
```

Y listo! ya tenemos nuestro cargador de ficheros :)

![Firebase Storage File Upload](https://firebasestorage.googleapis.com/v0/b/react-firebase-94af6.appspot.com/o/pictures%2Fezgif.com-resize.gif?alt=media&token=d62a1a19-2e24-47cf-9d1c-4c960f51c0d0)

El código completo de éste ejemplo lo tienes a continuación:

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaS*******************',
  authDomain: '*****',
  databaseURL: '******',
  storageBucket: '******',
  messagingSenderId: '**********'
})

class FileUpload extends Component {
  constructor () {
    super()
    this.state = {
      uploadValue: 0
    }
  }

  handleOnChange (e) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`pictures/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        uploadValue: percentage
      })
    }, (error) => {
      console.error(error.message)
    }, () => {
      // Upload complete
      this.setState({
        picture: task.snapshot.downloadURL
      })
    })
  }

  render () {
    return (
      <div>
        <progress value={this.state.uploadValue} max='100'>
          {this.state.uploadValue} %
        </progress>
        <br />
        <input type='file' onChange={this.handleOnChange.bind(this)}/>
        <br />
        <img width='90' src={this.state.picture} />
      </div>
    )
  }
}

ReactDOM.render(, document.getElementById('root))
```

¿Quieres aprender más sobre React? Te lo enseño en mi [**curso online** sobre fundamentos de **React.js**](http://cursos.carlosazaustre.es/p/react-js/)
