//URL base de la API
const URL_API = "https://fakestoreapi.com/products";

//Elementos del HTML que se van a usar
const contenedor = document.getElementById("contenedor-productos");
const mensaje = document.getElementById("mensaje");
const modal = document.getElementById("modal");
const detalle = document.getElementById("detalle-producto");
const botonCerrar = document.getElementById("cerrar-modal");

// GET all products -> GET/products
async function obtenerProductos() {
  try {
    const respuesta = await fetch(URL_API);
    if (!respuesta.ok) {
      throw new Error("Error del servidor: " + respuesta.status);
    }
    const productos = await respuesta.json();
    mensaje.textContent = "";
    pintarCards(productos);
  } catch (error) {
mensaje.textContent = "No se pudieron cargar los productos. Revisa tu conexión y recarga la página.";
console.error(error);
  }
}

// Pintar una card por cada producto
function pintarCards(productos) {
  contenedor.innerHTML = "";
  productos.forEach(function (producto) {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}">
      <h2>${producto.title}</h2>
      <p class="precio">$${producto.price}</p>
      <button class="boton-ver">Ver detalle</button>
    `;
    card.addEventListener("click", function () {
        obtenerProducto(producto.id);
    });
    contenedor.appendChild(card);
  });
}

// GET a single product -> GET/products/:id
async function obtenerProducto(id) {
    detalle.innerHTML = "<p>Cargando producto...</p>";
    modal.showModal();
    try {
        const respuesta = await fetch(`${URL_API}/${id}`);
        if (!respuesta.ok) {
            throw new Error("Error del servidor: " + respuesta.status);
        }

        const producto = await respuesta.json();
        mostrarDetalle(producto);
    } catch (error) {
        detalle.innerHTML = "<p>No se pudo cargar el producto. Intenta nuevamente.</p>";
        console.error(error);
    }
}

// Mostrar el detalle del producto en el modal
function mostrarDetalle(producto) {
    detalle.innerHTML = `
    <img src="${producto.image}" alt="${producto.title}">
    <div>
     <p class="precio">$${producto.price}</p>
        <h2>${producto.title}</h2>
        <p class="precio">$${producto.price}</p>
        <p>${producto.description}</p>
        <p class="rating">⭐ ${producto.rating.rate} de 5 (${producto.rating.count} opiniones)</p>
    </div>
    `;
}   

// Cerrar el modal
botonCerrar.addEventListener("click", function () {
    modal.close();
});

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.close();
    }   
});

obtenerProductos();