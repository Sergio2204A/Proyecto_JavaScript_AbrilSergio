class RoomCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const data = JSON.parse(this.getAttribute('data'));
      this.render(data);
    }
  
    render(data) {
      this.shadowRoot.innerHTML = `
        <style>
          .card {
            border: 1px solid #ddd;
            padding: 16px;
            margin: 8px;
            border-radius: 8px;
            background: white;
            max-width: 300px;
          }
          .card img {
            width: 100%;
            border-radius: 8px;
          }
          .card h4 {
            margin: 0.5em 0;
          }
        </style>
        <div class="card">
          <img src="${data.imagen}" alt="Imagen de habitación">
          <h4>${data.nombre}</h4>
          <p>Camas: ${data.camas} | Capacidad: ${data.personas} personas</p>
          <p>Servicios: ${data.servicios.join(', ')}</p>
          <p><strong>$${data.precio}/noche</strong></p>
        </div>
      `;
    }
  }
  
  customElements.define('room-card', RoomCard);
  class RoomCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const data = JSON.parse(this.getAttribute('data'));
      this.render(data);
    }
  
    render(data) {
      this.shadowRoot.innerHTML = `
        <style>
          .card {
            border: 1px solid #ddd;
            padding: 16px;
            margin: 8px;
            border-radius: 8px;
            background: white;
            max-width: 300px;
          }
          .card img {
            width: 100%;
            border-radius: 8px;
          }
          .card h4 {
            margin: 0.5em 0;
          }
          button {
            margin-top: 1em;
            padding: 0.5em;
            background: #005c57;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
        </style>
        <div class="card">
          <img src="${data.imagen}" alt="Imagen de habitación">
          <h4>${data.nombre}</h4>
          <p>Camas: ${data.camas} | Capacidad: ${data.personas} personas</p>
          <p>Servicios: ${data.servicios.join(', ')}</p>
          <p><strong>${data.precio}</strong></p>
          <button class="btn-reservar">Reservar</button>
        </div>
      `;
  
      this.shadowRoot.querySelector('.btn-reservar').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('reservar', {
          detail: JSON.parse(this.getAttribute('data')),
          bubbles: true
        }));
      });
    }
  }
  
  customElements.define('room-card', RoomCard);
    