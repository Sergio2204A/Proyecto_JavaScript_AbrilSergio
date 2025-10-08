function uid(prefix = 'id') {
    return prefix + '_' + Math.random().toString(36).slice(2, 9);
  }
  
  function load(key) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }
  function save(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  
  function initData() {
 
    if (!load('usuarios')) {
      const admin = {
        id: uid('u'),
        identificacion: '99999999',
        nombre: 'Administrador del Hotel',
        nacionalidad: 'COL',
        email: 'admin@hotel.local',
        telefono: '0000000',
        passwordHash: btoa('admin123'), // contraseña por defecto
        isAdmin: true
      };
      save('usuarios', [admin]);
    }
  
    if (!load('habitaciones')) {
      const habitaciones = [
        {
          id: uid('h'),
          nombre: 'Suite Deluxe',
          camas: 2,
          capacidad: 4,
          precioNoche: 350000,
          servicios: ['WiFi', 'Minibar', 'Jacuzzi', 'TV HD'],
          imagen: 'assets/img/habitacion1.jpg',
          reservas: []
        },
        {
          id: uid('h'),
          nombre: 'Habitación Doble',
          camas: 2,
          capacidad: 2,
          precioNoche: 220000,
          servicios: ['WiFi', 'TV', 'Aire acondicionado'],
          imagen: 'assets/img/habitacion2.jpg',
          reservas: []
        },
        {
          id: uid('h'),
          nombre: 'Habitación Sencilla',
          camas: 1,
          capacidad: 1,
          precioNoche: 150000,
          servicios: ['WiFi', 'Escritorio'],
          imagen: 'assets/img/habitacion3.jpg',
          reservas: []
        }
      ];
      save('habitaciones', habitaciones);
    }
  }
  
  initData();
  
  window.uid = uid;
  window.load = load;
  window.save = save;
  
  