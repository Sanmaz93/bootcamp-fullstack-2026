// =========================================================
// 1. DATOS: la información de los productos
// =========================================================
const productos = [
  {
    id: 1,
    nombre: "Leggin Alba",
    precio: 129900,
    imagen: "img/leggin-alba.jpg",
    alt: "Leggin Alba de tiro alto",
    resumen: "Tiro alto y compresión media para tu rutina diaria.",
    descripcion: "Nuestro modelo esencial. La pretina ancha se queda en su lugar en cada sentadilla y la compresión media sostiene sin apretar. Ideal para gimnasio, entrenamiento funcional y el día a día.",
    detalles: [
      "Pretina ancha de tiro alto",
      "Compresión media",
      "Tela opaca: no transparenta",
      "78% poliamida reciclada, 22% elastano"
    ]
  },
  {
    id: 2,
    nombre: "Leggin Cumbre",
    precio: 149900,
    imagen: "img/leggin-cumbre.jpg",
    alt: "Leggin Cumbre para correr con bolsillos",
    resumen: "Bolsillos laterales y tela que respira para correr.",
    descripcion: "Pensado para sumar kilómetros: tela liviana que saca el sudor, bolsillos laterales donde cabe tu celular y detalles reflectivos para salir temprano o al anochecer.",
    detalles: [
      "Bolsillos laterales para el celular",
      "Detalles reflectivos",
      "Secado rápido",
      "Costuras planas que no rozan"
    ]
  },
  {
    id: 3,
    nombre: "Leggin Raíz",
    precio: 139900,
    imagen: "img/leggin-raiz.jpg",
    alt: "Leggin Raíz sin costuras para yoga",
    resumen: "Tejido sin costuras, suave como una segunda piel.",
    descripcion: "Un tejido sin costuras que se estira en cuatro direcciones para acompañarte en yoga, pilates y estiramientos sin marcar ni incomodar.",
    detalles: [
      "Tejido sin costuras",
      "Elasticidad en cuatro direcciones",
      "Cintura plana que no presiona",
      "Tacto ultrasuave"
    ]
  }
];

const CANTIDAD_MINIMA = 1;
const CANTIDAD_MAXIMA = 10;

// Estado de la compra: qué producto está elegido y cuántas unidades
let productoActual = productos[0];
let cantidad = 1;
let productoEnModal = null;
let irACompraAlCerrar = false;

// =========================================================
// 2. ELEMENTOS DEL HTML que vamos a usar
// =========================================================
const modalProducto = document.getElementById("modalProducto");
const modalTitulo = document.getElementById("modalTitulo");
const modalImagen = document.getElementById("modalImagen");
const modalDescripcion = document.getElementById("modalDescripcion");
const modalDetalles = document.getElementById("modalDetalles");
const modalPrecio = document.getElementById("modalPrecio");
const modalComprar = document.getElementById("modalComprar");

const compraImagen = document.getElementById("compraImagen");
const compraNombre = document.getElementById("compraNombre");
const compraDescripcion = document.getElementById("compraDescripcion");
const compraPrecioUnidad = document.getElementById("compraPrecioUnidad");

const inputCantidad = document.getElementById("cantidad");
const botonMenos = document.getElementById("botonMenos");
const botonMas = document.getElementById("botonMas");
const textoTotal = document.getElementById("total");
const botonAgregar = document.getElementById("botonAgregar");
const mensaje = document.getElementById("mensaje");

// =========================================================
// 3. FUNCIONES DE AYUDA
// =========================================================

// Convierte 129900 en "$129.900"
function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CO");
}

// Busca en el arreglo el producto que tenga ese id
function buscarProducto(id) {
  return productos.find(function (producto) {
    return producto.id === id;
  });
}

// =========================================================
// 4. VENTANA DEL PRODUCTO (modal del catálogo)
// =========================================================
function mostrarEnModal(producto) {
  productoEnModal = producto;

  modalTitulo.textContent = producto.nombre;
  modalImagen.src = producto.imagen;
  modalImagen.alt = producto.alt;
  modalDescripcion.textContent = producto.descripcion;
  modalPrecio.textContent = formatearPrecio(producto.precio);

  // Vaciamos la lista y la llenamos con los detalles de este producto
  modalDetalles.innerHTML = "";
  producto.detalles.forEach(function (detalle) {
    modalDetalles.innerHTML += "<li>" + detalle + "</li>";
  });
}

// Cada foto del catálogo abre el modal con SU producto
const fotos = document.querySelectorAll(".producto-foto");
fotos.forEach(function (foto) {
  foto.addEventListener("click", function () {
    const id = Number(foto.dataset.id); // data-id llega como texto, lo pasamos a número
    mostrarEnModal(buscarProducto(id));
  });
});

// "Comprar este leggin" dentro del modal
modalComprar.addEventListener("click", function () {
  seleccionarProducto(productoEnModal);
  irACompraAlCerrar = true;
});

// Esperamos a que el modal termine de cerrarse para bajar a la sección de compra
modalProducto.addEventListener("hidden.bs.modal", function () {
  if (irACompraAlCerrar) {
    document.getElementById("compra").scrollIntoView();
    irACompraAlCerrar = false;
  }
});

// =========================================================
// 5. SECCIÓN DE COMPRA
// =========================================================
function seleccionarProducto(producto) {
  productoActual = producto;
  cantidad = 1;

  compraImagen.src = producto.imagen;
  compraImagen.alt = producto.alt;
  compraNombre.textContent = producto.nombre;
  compraDescripcion.textContent = producto.resumen;
  compraPrecioUnidad.textContent = formatearPrecio(producto.precio);

  mensaje.textContent = "";
  actualizarTotal();
}

// Recalcula el total y activa/desactiva los botones + y −
function actualizarTotal() {
  inputCantidad.value = cantidad;
  textoTotal.textContent = formatearPrecio(productoActual.precio * cantidad);

  botonMenos.disabled = cantidad === CANTIDAD_MINIMA;
  botonMas.disabled = cantidad === CANTIDAD_MAXIMA;
}

// Los botones "Comprar" del catálogo eligen el producto.
// El enlace href="#compra" se encarga solo de bajar a la sección.
const botonesComprar = document.querySelectorAll(".btn-comprar");
botonesComprar.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const id = Number(boton.dataset.id);
    seleccionarProducto(buscarProducto(id));
  });
});

botonMas.addEventListener("click", function () {
  if (cantidad < CANTIDAD_MAXIMA) {
    cantidad = cantidad + 1;
    actualizarTotal();
  }
});

botonMenos.addEventListener("click", function () {
  if (cantidad > CANTIDAD_MINIMA) {
    cantidad = cantidad - 1;
    actualizarTotal();
  }
});

// Al cambiar de talla borramos un mensaje de error anterior
const opcionesTalla = document.querySelectorAll('input[name="talla"]');
opcionesTalla.forEach(function (opcion) {
  opcion.addEventListener("change", function () {
    mensaje.textContent = "";
  });
});

botonAgregar.addEventListener("click", function () {
  // Buscamos el radio de talla que esté marcado (si no hay ninguno, da null)
  const tallaElegida = document.querySelector('input[name="talla"]:checked');

  if (tallaElegida === null) {
    mensaje.textContent = "Elige una talla para agregar el leggin al carrito.";
    mensaje.className = "mensaje mensaje-error";
    return; // detenemos la función aquí
  }

  const unidades = cantidad === 1 ? "unidad" : "unidades";
  mensaje.textContent =
    "Agregaste " + cantidad + " " + unidades + " de " + productoActual.nombre +
    " talla " + tallaElegida.value + ". Total: " +
    formatearPrecio(productoActual.precio * cantidad) + ".";
  mensaje.className = "mensaje mensaje-exito";
});

// =========================================================
// 6. EXTRAS
// =========================================================

// En celular, cerramos el menú hamburguesa al tocar un enlace
const menu = document.getElementById("menu");
const enlacesMenu = document.querySelectorAll(".navbar-nav .nav-link");
enlacesMenu.forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Año actual en el footer
document.getElementById("anio").textContent = new Date().getFullYear();

// Pintamos el estado inicial de la compra al cargar la página
actualizarTotal();