function registerUsuario({ identificacion, nombre, nacionalidad, email, telefono, password }) {
    const usuarios = load('usuarios') || [];

    if (usuarios.find(u => u.identificacion === identificacion || u.email === email)) {
      throw new Error('Ya existe un usuario con esa identificación o correo.');
    }

    const nuevoUsuario = {
      id: uid('u'),
      identificacion,
      nombre,
      nacionalidad,
      email,
      telefono,
      passwordHash: btoa(password), 
      isAdmin: false
    };
  
    usuarios.push(nuevoUsuario);
    save('usuarios', usuarios);
    save('session', { userId: nuevoUsuario.id, loggedAt: new Date().toISOString() });
  
    return nuevoUsuario;
  }

  function loginUsuario(email, password) {
    const usuarios = load('usuarios') || [];
    const user = usuarios.find(u => u.email === email && u.passwordHash === btoa(password));
  
    if (!user) throw new Error('Credenciales incorrectas.');
  
    save('session', { userId: user.id, loggedAt: new Date().toISOString() });
    return user;
  }
  
  function logoutUsuario() {
    localStorage.removeItem('session');
  }
  
  function getCurrentUser() {
    const session = load('session');
    if (!session) return null;
    const usuarios = load('usuarios') || [];
    return usuarios.find(u => u.id === session.userId) || null;
  }
  
  function isLoggedIn() {
    return !!getCurrentUser();
  }

  function mostrarUsuarioEnUI() {
    const user = getCurrentUser();
    const userLabel = document.getElementById('user-info');
    if (userLabel) {
      if (user) {
        userLabel.textContent = `👤 ${user.nombre}`;
      } else {
        userLabel.textContent = 'Invitado';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', mostrarUsuarioEnUI);

  window.registerUsuario = registerUsuario;
  window.loginUsuario = loginUsuario;
  window.logoutUsuario = logoutUsuario;
  window.getCurrentUser = getCurrentUser;
  window.isLoggedIn = isLoggedIn;
  
  