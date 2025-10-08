document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContacto");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();
  
      if (!nombre || !email || !mensaje) {
        alert("Por favor, completa todos los campos.");
        return;
      }
  
      alert(`Gracias, ${nombre}. Tu mensaje ha sido enviado correctamente.`);
      form.reset();
    });
  });
  