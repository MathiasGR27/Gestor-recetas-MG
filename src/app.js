const contenedorRecetas = document.getElementById('recetas-container');
let recetas = [];
let recetasFiltradas = [];

async function cargarRecetas() {
  const res = await fetch('./src/data/recetas.json');
  recetas = await res.json();
  recetasFiltradas = recetas;
  mostrarRecetas(recetasFiltradas);
}

function mostrarRecetas(lista) {
  contenedorRecetas.innerHTML = '';
  lista.forEach(receta => {
    const card = document.createElement('espe-product-card');
    card.title = receta.title;
    card.description = receta.description;
    card.imageUrl = receta.imageUrl;
    card.price = receta.price;
    card.status = receta.status;
    card.buttonTheme = receta.buttonTheme;
    contenedorRecetas.appendChild(card);
  });
}

// Función para filtrar recetas según texto de búsqueda
function filtrarRecetas(texto) {
  const textoLower = texto.toLowerCase();
  recetasFiltradas = recetas.filter(receta =>
    receta.title.toLowerCase().includes(textoLower) ||
    receta.description.toLowerCase().includes(textoLower)
  );
  mostrarRecetas(recetasFiltradas);
}

// Esperamos a que el DOM cargue para iniciar
window.addEventListener('DOMContentLoaded', async () => {
  await cargarRecetas();

  const header = document.querySelector('header-component');
  // Esperamos que el componente termine de renderizar
  await header.updateComplete;

  const inputBusqueda = header.shadowRoot.querySelector('.search-bar input');
  
  inputBusqueda.addEventListener('input', e => {
    filtrarRecetas(e.target.value);
  });
});