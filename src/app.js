const contenedorRecetas = document.getElementById('recetas-container');
let recetas = [];
let recetasFiltradas = [];
let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;

// Guardar recetas en localStorage
function guardarRecetasLocal() {
  localStorage.setItem('recetas', JSON.stringify(recetas));
}

// Cargar recetas desde localStorage si existen, sino desde archivo JSON
async function cargarRecetas() {
  const recetasGuardadas = localStorage.getItem('recetas');
  if (recetasGuardadas) {
    recetas = JSON.parse(recetasGuardadas);
  } else {
    const res = await fetch('./src/data/recetas.json');
    recetas = await res.json();
  }
  recetasFiltradas = recetas;
  mostrarRecetas(recetasFiltradas);
}

// Mostrar recetas en el contenedor
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

// Filtrar recetas según texto
function filtrarRecetas(texto) {
  const textoLower = texto.toLowerCase();
  recetasFiltradas = recetas.filter(receta =>
    receta.title.toLowerCase().includes(textoLower) ||
    receta.description.toLowerCase().includes(textoLower)
  );
  mostrarRecetas(recetasFiltradas);
}

function bloquearScroll() {
  document.body.style.overflow = 'hidden';
}

function desbloquearScroll() {
  document.body.style.overflow = '';
}

// Mostrar formulario modal
const ShowModalPost = () => {
  MODAL_POST.classList.add("open");
  bloquearScroll();
};

// Cerrar formulario modal
const ClosePostModal = () => {
  MODAL_POST.classList.remove("open");
  desbloquearScroll();
  setTimeout(() => {
    MAIN.style.display = "block";
  }, 500);
};

// Al cargar el DOM
window.addEventListener("load", async () => {
  MAIN = document.querySelector("main");
  MODAL_POST = document.querySelector("#modal-post-section");
  BTN_SHOW_POST = document.querySelector("#btn-upload-post");
  BTN_CANCEL_POST = document.querySelector("#btn-post-cancel");

  BTN_SHOW_POST.addEventListener("click", ShowModalPost);
  BTN_CANCEL_POST.addEventListener("click", ClosePostModal);

  await cargarRecetas();

  // Buscar input dentro del header-component (shadow DOM)
  const header = document.querySelector('header-component');
  const inputBusqueda = header.shadowRoot.querySelector('.search-bar input');
  inputBusqueda.addEventListener('input', e => {
    filtrarRecetas(e.target.value);
  });

  // Manejar envío del formulario para nueva receta
  const formReceta = document.querySelector("#form-receta");
  formReceta.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevaReceta = {
      title: document.querySelector("#title").value,
      description: document.querySelector("#description").value,
      imageUrl: document.querySelector("#imageUrl").value,
      price: "",  
      status: "Disponible",
      buttonTheme: "green"
    };


    recetas.push(nuevaReceta);
    mostrarRecetas(recetas);
    guardarRecetasLocal();
    ClosePostModal();
    formReceta.reset();
  });
});
