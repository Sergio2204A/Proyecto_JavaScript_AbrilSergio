function verificarAdmin() {
    const user = getCurrentUser();
    if (!user || !user.isAdmin) {
      alert('Acceso denegado. Solo el administrador puede acceder al panel.');
      window.location.href = 'index.html';
    }
  }

  function renderHabitacionesAdmin() {
    const cont = document.getElementById('adminHabitaciones');
    if (!cont) return;
  
    const habitaciones = load('habitaciones') || [];
    cont.innerHTML = '';
  
    if (habitaciones.length === 0) {
      cont.innerHTML = '<p>No hay habitaciones registradas.</p>';
      return;
    }
  
    habitaciones.forEach(h => {
      const div = document.createElement('div');
      div.className = 'habitacion-card';
      div.innerHTML = `
        <h3>${h.nombre}</h3>
        <p><strong>Capacidad:</strong> ${h.capacidad} personas</p>
        <p><strong>Precio por noche:</strong> $${h.precioNoche}</p>
        <p><strong>Descripción:</strong> ${h.descripcion || 'Sin descripción'}</p>
        <div class="acciones">
          <button onclick="editarHabitacion('${h.id}')">✏️ Editar</button>
          <button onclick="eliminarHabitacion('${h.id}')">🗑️ Eliminar</button>
        </div>
      `;
      cont.appendChild(div);
    });
  }
  
  function guardarHabitacion() {
    const idEditando = document.getElementById('idHabitacionEditando').value;
    const nombre = document.getElementById('nombreHabitacion').value.trim();
    const capacidad = parseInt(document.getElementById('capacidadHabitacion').value);
    const precio = parseFloat(document.getElementById('precioHabitacion').value);
    const descripcion = document.getElementById('descripcionHabitacion').value.trim();
  
    if (!nombre || capacidad <= 0 || precio <= 0) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
  
    const habitaciones = load('habitaciones') || [];
  
    if (idEditando) {

      const idx = habitaciones.findIndex(h => h.id === idEditando);
      if (idx !== -1) {
        habitaciones[idx].nombre = nombre;
        habitaciones[idx].capacidad = capacidad;
        habitaciones[idx].precioNoche = precio;
        habitaciones[idx].descripcion = descripcion;
      }
      alert('Habitación actualizada correctamente.');
    } else {

      const nueva = {
        id: uid('h'),
        nombre,
        capacidad,
        precioNoche: precio,
        descripcion,
        servicios: [],
        reservas: []
      };
      habitaciones.push(nueva);
      alert('Habitación creada correctamente.');
    }
  
    save('habitaciones', habitaciones);
    limpiarFormularioHabitacion();
    renderHabitacionesAdmin();
  }
  

  function editarHabitacion(id) {
    const habitaciones = load('habitaciones') || [];
    const h = habitaciones.find(x => x.id === id);
    if (!h) return;
  
    document.getElementById('idHabitacionEditando').value = h.id;
    document.getElementById('nombreHabitacion').value = h.nombre;
    document.getElementById('capacidadHabitacion').value = h.capacidad;
    document.getElementById('precioHabitacion').value = h.precioNoche;
    document.getElementById('descripcionHabitacion').value = h.descripcion;
  }

  function eliminarHabitacion(id) {
    if (!confirm('¿Deseas eliminar esta habitación?')) return;
  
    const habitaciones = load('habitaciones') || [];
    const nuevas = habitaciones.filter(h => h.id !== id);
    save('habitaciones', nuevas);
  
    alert('Habitación eliminada.');
    renderHabitacionesAdmin();
  }
  
  function limpiarFormularioHabitacion() {
    document.getElementById('idHabitacionEditando').value = '';
    document.getElementById('nombreHabitacion').value = '';
    document.getElementById('capacidadHabitacion').value = '';
    document.getElementById('precioHabitacion').value = '';
    document.getElementById('descripcionHabitacion').value = '';
  }

  function renderReservasAdmin() {
    const cont = document.getElementById('adminReservas');
    if (!cont) return;
  
    const reservas = load('reservas') || [];
    cont.innerHTML = '';
  
    if (reservas.length === 0) {
      cont.innerHTML = '<p>No hay reservas registradas.</p>';
      return;
    }
  
    reservas.forEach(r => {
      const div = document.createElement('div');
      div.className = 'reserva-card';
      div.innerHTML = `
        <h4>Reserva ID: ${r.id}</h4>
        <p><strong>Usuario:</strong> ${r.usuarioNombre}</p>
        <p><strong>Habitación:</strong> ${r.habitacionNombre}</p>
        <p><strong>Fechas:</strong> ${r.inicio} → ${r.fin}</p>
        <p><strong>Personas:</strong> ${r.personas}</p>
        <p><strong>Total:</strong> $${r.total}</p>
        <p><strong>Estado:</strong> ${r.estado}</p>
        <button onclick="cancelarReservaAdmin('${r.id}')">❌ Cancelar</button>
      `;
      cont.appendChild(div);
    });
  }

  function cancelarReservaAdmin(id) {
    const reservas = load('reservas') || [];
    const idx = reservas.findIndex(r => r.id === id);
    if (idx === -1) return;
  
    reservas[idx].estado = 'cancelada';
    save('reservas', reservas);
  
    alert('Reserva cancelada.');
    renderReservasAdmin();
  }

  document.addEventListener('DOMContentLoaded', () => {
    console.log('admin.js cargado correctamente');
    verificarAdmin();
    renderHabitacionesAdmin();
    renderReservasAdmin();
  });

  window.guardarHabitacion = guardarHabitacion;
  window.editarHabitacion = editarHabitacion;
  window.eliminarHabitacion = eliminarHabitacion;
  window.limpiarFormularioHabitacion = limpiarFormularioHabitacion;
  window.cancelarReservaAdmin = cancelarReservaAdmin;
  