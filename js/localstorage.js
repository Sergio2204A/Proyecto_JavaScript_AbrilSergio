// usuarios: array de objetos
usuarios = [
    {
      id: "u_1",             // id único
      identificacion: "12345678",
      nombre: "Sergio Mendoza",
      nacionalidad: "Colombia",
      email: "sergio@example.com",
      telefono: "+57...",
      passwordHash: "..." ,  // o contraseña (si no manejas hashing)
      isAdmin: false
    },
    ...
]
  
  // habitaciones
  habitaciones = [
    {
      id: "h_1",
      nombre: "Suite Deluxe",
      camas: 2,
      capacidad: 4,
      precioNoche: 300000,      // en COP o la moneda que uses
      servicios: ["WiFi","Minibar","Jacuzzi"],
      imagen: "assets/img/suite1.jpg",
      reservas: [                // reservas asociadas a la habitación
        {
          id: "r_1",
          usuarioId: "u_1",
          inicio: "2025-10-01",  // ISO date YYYY-MM-DD
          fin: "2025-10-04",
          personas: 2,
          total: 900000,
          estado: "confirmada" // o "cancelada"
        }
      ]
    }
  ]
  