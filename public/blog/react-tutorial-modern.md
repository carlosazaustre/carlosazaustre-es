---
title: >-
  Tutorial React: Cómo crear una aplicación web con React desde cero con
  librerías modernas
date: '2023-09-29'
url: 'https://carlosazaustre.es/blog/react-tutorial-modern'
tags: []
related:
  - empezando-con-react-js-y-ecmascript-6
  - react-vite
  - ejemplo-de-aplicacion-con-react-js-en-ecmascript-6
---

# Tutorial React: Cómo crear una aplicación web con React desde cero con librerías modernas

> Publicado el 2023-09-29 — https://carlosazaustre.es/blog/react-tutorial-modern

# Cómo desarrollar una aplicación React desde cero con Zustand, React Query, React Hook Form, React Router y React Hot Toast - Tutorial paso a paso

## Introducción

En este tutorial paso a paso, vamos a aprender cómo desarrollar una aplicación web React desde cero utilizando algunas de las herramientas más populares del ecosistema React.

Específicamente, utilizaremos:

- Zustand para la gestión del estado global
- React Query para la obtención y almacenamiento en caché de datos
- React Hook Form para el manejo de formularios
- React Router para la navegación
- React Hot Toast para mostrar notificaciones

La aplicación que construiremos simulará un sistema de reservas de hotel, con una página para listar hoteles y una página de detalles para reservar habitaciones en un hotel específico.

Aquí hay algunas de las características que implementaremos:

- Obtener y mostrar una lista de hoteles desde una API
- Navegar a la página de detalles de un hotel específico
- Formulario para seleccionar fechas y reservar una habitación
- Gestión del estado global para reservas
- Notificaciones sobre errores o reservas exitosas
- Validaciones de formulario

Así que sin más preámbulos, ¡empecemos!

Este tutorial, lo tienes en formato vídeo aquí 👇

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=KRrzBkxxMbc)
/>

## Preparando el proyecto

Lo primero que necesitamos hacer es preparar nuestro proyecto React. Para ello, utilizaremos `create-react-app`, que nos permitirá iniciar rápidamente:

```
npx create-react-app hotel-reservations
```

Esto generará la estructura básica del proyecto React en una carpeta llamada `hotel-reservations`.

A continuación, instalamos las dependencias ejecutando `npm install` dentro de esa carpeta.

Las dependencias que utilizaremos en este proyecto son:

- zustand
- react-query
- react-hook-form
- react-router-dom
- react-hot-toast

Así que las instalamos ejecutando:

```
npm install zustand react-query react-hook-form react-router-dom react-hot-toast
```

¡Nuestro proyecto ya está configurado y listo! Ahora podemos empezar a programar.

## Estado global con Zustand

Primero vamos a configurar nuestro estado global utilizando Zustand.

Zustand es una biblioteca ligera para gestionar el estado global en React. Nos permite tener un almacén centralizado al que se puede acceder desde cualquier componente para leer y actualizar el estado.

Para ello, creamos un archivo `store.js` y añadimos lo siguiente:

```js
import { create } from "zustand";

const useStore = create(() => ({
	reservations: [],
	addReservation: (hotel, dates) => {
		set((state) => ({
			reservations: [...state.reservations, { hotel, dates }],
		}));
	},
}));

export default useStore;
```

Básicamente estamos creando un hook `useStore` que nos da acceso al estado global `reservations` y una acción `addReservation` para añadir nuevas reservas.

Podemos importar y utilizar este hook desde cualquier componente de nuestra aplicación.

## Obtención de datos con React Query

Ahora vamos a encargarnos de obtener datos desde una API. Para ello utilizaremos React Query.

React Query nos permite realizar la obtención de datos, almacenamiento en caché y actualización. También maneja los estados de carga, error y revalidación automática.

Primero, creamos un archivo `db.json` con datos simulados:

```json
{
	"hotels": [
		{
			"id": 1,
			"name": "Hotel Sunshine",
			"description": "Hotel en primera línea de playa con piscina",
			"image": "hotel-1.jpg"
		},
		{
			"id": 2,
			"name": "Hotel Mountain Spa",
			"description": "Hotel de lujo en la montaña",
			"image": "hotel-2.jpg"
		}
	]
}
```

Luego, creamos un script en `package.json` para iniciar un servidor de desarrollo con esos datos:

```json
"server": "json-server --watch db.json --port 3001"
```

Ahora podemos crear nuestra función de obtención de datos:

```js
// hotels.js
const fetchHotels = async () => {
	const response = await fetch("http://localhost:3001/hotels");
	if (!response.ok) {
		throw new Error("Error de red");
	}
	return response.json();
};

export { fetchHotels };
```

Y utilizarla en nuestro componente `HotelsList`:

```jsx
// HotelsList.js
import { fetchHotels } from './hotels';
import { useQuery } from 'react-query';

export default function HotelsList() {
  const { data, error, isLoading } = useQuery('hotels', fetchHotels);
  // mostrar datos o estado de carga/error
  return (
    // JSX para mostrar hoteles
  );
}
```

¡Eso es todo lo que necesitamos para implementar la obtención de datos con React Query!

## Formularios con React Hook Form

Ahora vamos a implementar el formulario de reservas con React Hook Form.

React Hook Form nos permite construir formularios fácilmente en React, con validaciones, manejo de errores y gestión del estado.

Primero creamos nuestro componente `BookingForm`:

```js
// BookingForm.js
import { useForm } from "react-hook-form";

function BookingForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		// enviar formulario
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("checkinDate", { required: true })} />
			{errors.checkinDate && <p>Fecha de entrada requerida</p>}
			// ...más entradas y validaciones
		</form>
	);
}
```

Estamos registrando las entradas para que React Hook Form las controle, manejando el envío y mostrando cualquier error de validación.

¡Y eso es todo lo que necesitamos para un potente manejo de formularios con React Hook Form!

## Navegación con React Router

Ahora vamos a configurar la navegación entre diferentes vistas utilizando React Router.

Primero, envolvemos nuestra aplicación con un `<BrowserRouter>` en `index.js`.

Luego, creamos las rutas en `App.js`:

```jsx
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<h1>Hoteles</h1>} />
			} />
		
	);
}
```

Finalmente, utilizamos el hook `useNavigate` dentro de nuestro `HotelsList` para navegar a la vista de detalles de un hotel cuando se haga clic en él.

¡Y eso es todo lo que necesitamos para la navegación con React Router!

## Notificaciones con React Hot Toast

Por último, vamos a añadir notificaciones utilizando React Hot Toast.

React Hot Toast

nos permite mostrar mensajes emergentes muy fácilmente.

Lo importamos en nuestro componente `BookingForm`:

```js
import { toast } from "react-hot-toast";
```

Y mostramos una notificación de éxito al reservar:

```js
// dentro de onSubmit
toast.success("¡Reserva exitosa!");
```

También lo envolvemos en `<Toaster>` para que funcione en toda la aplicación.

¡Y eso es todo lo que necesitamos para mostrar notificaciones! React Hot Toast se encarga de la interfaz de usuario.

## Resumen

En este artículo hemos visto cómo desarrollar una aplicación web React desde cero utilizando:

- Zustand para el estado global
- React Query para la obtención de datos
- React Hook Form para formularios
- React Router para la navegación
- React Hot Toast para notificaciones

Hemos aprendido cómo:

- Configurar un almacén global con Zustand
- Obtener datos desde una API con React Query
- Crear un formulario con validaciones utilizando React Hook Form
- Añadir navegación entre vistas con React Router
- Mostrar notificaciones al usuario con React Hot Toast

Estas herramientas nos han permitido construir rápidamente una aplicación React de una manera sencilla y declarativa con buenas prácticas.

Tienes el código de todo este tutorial, en [éste repositorio de GitHub](https://github.com/carlosazaustre/hotel-reservation-app).

Y de nuevo, te comparto el vídeo para que veas el paso a paso y como funciona la aplicación 👇

> 📺 [Ver vídeo en YouTube](https://www.youtube.com/watch?v=KRrzBkxxMbc)
/>

¡Espero que hayas encontrado útil este tutorial! No olvides compartirlo y seguirme para más contenido sobre desarrollo web. ¡Hasta la próxima!
