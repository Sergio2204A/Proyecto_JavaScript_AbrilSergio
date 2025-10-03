import './components/room-card.js';

// Simulación de habitaciones (esto luego vendrá del localStorage o del admin)
const habitaciones = [
  {
    nombre: "Suite Deluxe",
    camas: 2,
    personas: 4,
    precio: 300,
    servicios: ["WiFi", "Minibar", "Jacuzzi"],
    imagen: "assets/img/suite1.jpg"
  },
  {
    nombre: "Habitación Doble",
    camas: 2,
    personas: 2,
    precio: 180,
    servicios: ["WiFi", "TV", "Aire acondicionado"],
    imagen: "assets/img/doble1.jpg"
  }
];

const container = document.getElementById('carousel-container');
habitaciones.forEach(hab => {
  const card = document.createElement('room-card');
  card.setAttribute('data', JSON.stringify(hab));
  container.appendChild(card);
});
