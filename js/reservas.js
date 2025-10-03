import './components/room-card.js';

const form = document.getElementById('search-form');
const resultados = document.getElementById('resultados');

// Buscar habitaciones disponibles
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const entrada = new Date(document.getElementById('fecha-entrada').value);
  const salida = new Date(document.getElementById('fecha-salida').value);
  const personas = parseInt(document.getElementById('personas').value);

  if (entrada >= salida) {
    alert("La fecha de salida debe ser posterior a la de entrada.");
    return;
  }

  const dias = Math.ceil((salida - entrada) / (1000 * 60 * 60 * 24));
  const habitaciones = JSON.parse(localStorage.getItem('habitaciones')) || [];

  const disponibles = habitaciones.filter(hab => {
    if (personas > hab.personas) return false;
    return !hab.reservas.some(res => {
      const resInicio = new Date(res.inicio);
      const resFin = new Date(res.fin);
      return entrada < resFin && salida > resInicio;
    });
  });

  resultados.innerHTML = "";
  if (disponibles.length === 0) {
    resultados.innerHTML = "<p>No hay habitaciones disponibles para esos criterios.</p>";
    return;
  }

  disponibles.forEach(hab => {
    const total = dias * hab.precio;
    const data = {
      ...hab,
      precio: `${hab.precio} x ${dias} noches = $${total}`
    };
    const card = document.createElement('room-card');
    card.setAttribute('data', JSON.stringify(data));
    resultados.appendChild(card);
  });
});

// Reservar habitación
document.addEventListener('reservar', (e) => {
  const habitacion = e.detail;

  const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
  if (!usuario) {
    alert("Debes iniciar sesión para hacer una reserva.");
    return;
  }

  const entrada = new Date(document.getElementById('fecha-entrada').value);
  const salida = new Date(document.getElementById('fecha-salida').value);
  const dias = Math.ceil((salida - entrada) / (1000 * 60 * 60 * 24));
  const personas = parseInt(document.getElementById('personas').value);

  const reserva = {
    id: Date.now(),
    habitacionId: habitacion.id,
    habitacionNombre: habitacion.nombre,
    inicio: entrada.toISOString(),
    fin: salida.toISOString(),
    personas,
    total: dias * parseFloat(habitacion.precio)
  };

  // Guardar reserva en habitación
  const habitaciones = JSON.parse(localStorage.getItem('habitaciones'));
  const index = habitaciones.findIndex(h => h.id === habitacion.id);
  habitaciones[index].reservas.push({
    inicio: reserva.inicio,
    fin: reserva.fin,
    usuarioId: usuario.id
  });
  localStorage.setItem('habitaciones', JSON.stringify(habitaciones));

  // Guardar reserva en usuario
  const reservasUsuario = JSON.parse(localStorage.getItem(`reservas_${usuario.id}`)) || [];
  reservasUsuario.push(reserva);
  localStorage.setItem(`reservas_${usuario.id}`, JSON.stringify(reservasUsuario));

  alert("✅ Reserva realizada exitosamente.");
  mostrarReservasUsuario();
});

// Mostrar reservas activas
function mostrarReservasUsuario() {
  const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
  const contenedor = document.getElementById('mis-reservas');
  if (!usuario) {
    contenedor.innerHTML = "<p>Inicia sesión para ver tus reservas.</p>";
    return;
  }

  const reservas = JSON.parse(localStorage.getItem(`reservas_${usuario.id}`)) || [];
  if (reservas.length === 0) {
    contenedor.innerHTML = "<p>No tienes reservas activas.</p>";
    return;
  }

  contenedor.innerHTML = "";
  reservas.forEach(res => {
    const div = document.createElement('div');
    div.classList.add('reserva-item');
    div.innerHTML = `
      <hr>
      <p><strong>${res.habitacionNombre}</strong></p>
      <p>Desde: ${new Date(res.inicio).toLocaleDateString()}</p>
      <p>Hasta: ${new Date(res.fin).toLocaleDateString()}</p>
      <p>Personas: ${res.personas}</p>
      <p>Total: $${res.total}</p>
      <button data-id="${res.id}">Cancelar reserva</button>
    `;
    contenedor.appendChild(div);
  });
}

// Cancelar reserva
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.innerText.includes('Cancelar')) {
    const idReserva = parseInt(e.target.dataset.id);
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    let reservas = JSON.parse(localStorage.getItem(`reservas_${usuario.id}`)) || [];

    const reserva = reservas.find(r => r.id === idReserva);
    if (!reserva) return;

    // Quitar reserva del usuario
    reservas = reservas.filter(r => r.id !== idReserva);
    localStorage.setItem(`reservas_${usuario.id}`, JSON.stringify(reservas));

    // Quitar reserva de la habitación
    const habitaciones = JSON.parse(localStorage.getItem('habitaciones'));
    const indexHab = habitaciones.findIndex(h => h.id === reserva.habitacionId);
    habitaciones[indexHab].reservas = habitaciones[indexHab].reservas.filter(r =>
      !(r.usuarioId === usuario.id && r.inicio === reserva.inicio && r.fin === reserva.fin)
    );
    localStorage.setItem('habitaciones', JSON.stringify(habitaciones));

    alert("❌ Reserva cancelada correctamente.");
    mostrarReservasUsuario();
  }
});

// Mostrar reservas al cargar
mostrarReservasUsuario();
