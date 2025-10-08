# 🏨 Hotel El Rincón del Carmen

El **Hotel El Rincón del Carmen** es un sitio web diseñado para ofrecer a los visitantes una experiencia digital moderna, visualmente atractiva y funcional.  
El sistema permite **consultar, reservar y administrar habitaciones**, simulando el funcionamiento real de un sistema de gestión hotelera.

Este proyecto fue desarrollado utilizando **HTML, CSS y JavaScript**, con **persistencia de datos en LocalStorage** y un enfoque en la usabilidad móvil.

---

## 🌐 Páginas del sitio

- **Inicio (`index.html`)**  
  Página principal con un diseño tipo *landing page*.  
  Contiene un carrusel de imágenes, descripción de los servicios del hotel (spa, piscina, restaurante) y un botón que dirige al módulo de reservas.

- **Reservas (`reservas.html`)**  
  Permite consultar la disponibilidad de habitaciones ingresando fechas, número de personas y tipo de habitación.  
  Muestra los resultados con sus precios y servicios incluidos.  
  Solo los usuarios **registrados e identificados** pueden realizar o cancelar una reserva.

- **Contacto (`contacto.html`)**  
  Contiene la dirección del hotel, un mapa de ubicación (Google Maps), y un formulario de contacto funcional para enviar mensajes o solicitudes.

- **Panel administrativo (`admin.html`)**  
  Sección exclusiva para el administrador del sistema.  
  Permite crear, modificar y eliminar habitaciones, así como visualizar y cancelar reservas existentes.

---

## ⚙️ Funcionalidades principales

- 🔐 Registro e inicio de sesión de usuarios.  
- 📅 Búsqueda de disponibilidad por fechas y cantidad de huéspedes.  
- 💾 Persistencia de información con LocalStorage.  
- 🛏️ Reserva y cancelación de habitaciones.  
- ⚙️ Panel de gestión para administración de habitaciones y reservas.  
- 📱 Diseño responsive optimizado para móviles.  
- 🖼️ Carrusel automático de imágenes en la página de inicio.  

---

## 💻 Tecnologías utilizadas

| Tecnología | Descripción |
|-------------|-------------|
| **HTML5** | Estructura del sitio |
| **CSS3 (Flexbox / Grid)** | Diseño adaptable y moderno |
| **JavaScript (ES6)** | Lógica del sistema y validaciones |
| **LocalStorage** | Almacenamiento de datos sin base de datos externa |
| **Google Maps Embed API** | Mapa interactivo en la página de contacto |
| **VS Code + Live Server** | Entorno de desarrollo y ejecución |

---

## 🧠 Estructura del proyecto

Proyecto_JavaScript_AbrilSergio-main/
│
├── index.html # Página principal (landing page)
├── reservas.html # Página para consultar y reservar habitaciones
├── contacto.html # Página de contacto con mapa y formulario
├── admin.html # Panel de administración del hotel
│
├── css/
│ ├── style.css # Estilos principales
│ ├── contacto.css # Estilos del formulario de contacto
│ └── admin.css # Estilos del panel admin
│
├── js/
│ ├── app.js # Carrusel y animaciones base
│ ├── auth.js # Registro e inicio de sesión
│ ├── availability.js # Control de disponibilidad y reservas
│ ├── admin.js # Gestión de habitaciones y reservas
│ └── contacto.js # Validación de formulario de contacto
│
└── images/ # Imágenes del hotel y servicios


---

## 🚀 Cómo ejecutar el proyecto

1. Descarga o clona el repositorio:
   ```bash
   git clone https://github.com/Sergio2204A/Proyecto_JavaScript_AbrilSergio.git