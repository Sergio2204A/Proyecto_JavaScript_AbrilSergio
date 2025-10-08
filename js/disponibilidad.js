function rangesOverlap(aStart, aEnd, bStart, bEnd) {
    const aS = new Date(aStart), aE = new Date(aEnd);
    const bS = new Date(bStart), bE = new Date(bEnd);
    return (aS < bE) && (bS < aE);
  }
  
  function isHabitacionDisponible(habitacion, inicio, fin) {
    for (const r of habitacion.reservas || []) {
      if (r.estado === 'confirmada' && rangesOverlap(inicio, fin, r.inicio, r.fin)) {
        return false; 
      }
    }
    return true;
  }

  function calcularNoches(inicio, fin) {
    const a = new Date(inicio);
    const b = new Date(fin);
    return Math.round((b - a) / (1000 * 60 * 60 * 24));
  }

  function reservarHabitacion(habitacionId, usuarioId, inicio, fin, personas) {
    const habitaciones = load('habitaciones') || [];
    const idx = habitaciones.findIndex(h => h.id === habitacionId);
    if (idx === -1) throw new Error('Habitación no encontrada.');
  
    const hab = habitaciones[idx];
  
    if (personas > hab.capacidad) throw new Error('El número de personas excede la capacidad de la habitación.');
  
    if (!isHabitacionDisponible(hab, inicio, fin)) {
      throw new Error('La habitación no está disponible para esas fechas.');
    }
  
    const noches = calcularNoches(inicio, fin);
    if (noches <= 0) throw new Error('El rango de fechas no es válido.');
  
    const total = noches * hab.precioNoche;
  
    const reserva = {
      id: uid('r'),
      usuarioId,
      inicio,
      fin,
      personas,
      total,
      estado: 'confirmada',
      createdAt: new Date().toISOString()
    };
  
    hab.reservas.push(reserva);
    habitaciones[idx] = hab;
    save('habitaciones', habitaciones);
    return reserva;
  }

  function cancelarReserva(reservaId, usuarioId) {
    const habitaciones = load('habitaciones') || [];
  
    for (let h of habitaciones) {
      const rIdx = (h.reservas || []).findIndex(
        r => r.id === reservaId && r.usuarioId === usuarioId && r.estado === 'confirmada'
      );
  
      if (rIdx !== -1) {
        h.reservas[rIdx].estado = 'cancelada';
        save('habitaciones', habitaciones);
        return h.reservas[rIdx];
      }
    }
  
    throw new Error('Reserva no encontrada o ya cancelada.');
  }
  
  function buscarHabitacionesDisponibles(inicio, fin, personas) {
    const habitaciones = load('habitaciones') || [];
    return habitaciones.filter(h =>
      h.capacidad >= personas && isHabitacionDisponible(h, inicio, fin)
    );
  }
  
  function obtenerReservasUsuario(usuarioId) {
    const habitaciones = load('habitaciones') || [];
    let reservas = [];
    for (let h of habitaciones) {
      for (let r of h.reservas || []) {
        if (r.usuarioId === usuarioId) {
          reservas.push({
            ...r,
            habitacionNombre: h.nombre,
            precioNoche: h.precioNoche
          });
        }
      }
    }
    return reservas;
  }

  function obtenerTodasLasReservas() {
    const habitaciones = load('habitaciones') || [];
    let todas = [];
    for (let h of habitaciones) {
      for (let r of h.reservas || []) {
        todas.push({
          ...r,
          habitacionNombre: h.nombre
        });
      }
    }
    return todas;
  }

  window.isHabitacionDisponible = isHabitacionDisponible;
  window.reservarHabitacion = reservarHabitacion;
  window.cancelarReserva = cancelarReserva;
  window.buscarHabitacionesDisponibles = buscarHabitacionesDisponibles;
  window.obtenerReservasUsuario = obtenerReservasUsuario;
  window.obtenerTodasLasReservas = obtenerTodasLasReservas;
  