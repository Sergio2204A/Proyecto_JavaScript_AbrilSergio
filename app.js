document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel-habitaciones');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
  
    const scrollAmount = 320; // Tamaño del scroll por paso
    const autoScrollDelay = 3000; // Tiempo en milisegundos (3000 = 3s)
  
    // Botones manuales
    btnNext.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  
    btnPrev.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  
    // Movimiento automático
    setInterval(() => {
      // Si estamos cerca del final, vuelve al inicio
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 5) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, autoScrollDelay);
  });
  