
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('✅ DOM cargado');

//     // Elementos del DOM
//     const buscarInput = document.querySelector('.Form__input_buscar');
//     const precioMin = document.querySelector('.form__placeholder-min');
//     const precioMax = document.querySelector('.form__placeholder-max');
//     const ordenarSelect = document.querySelector('.Form__placeholder-vector');

//     const checkNuevos = document.querySelector('input[name="nuevos"]');
//     const checkOfertas = document.querySelector('input[name="ofertas"]');
//     const checkEdicion = document.querySelector('input[name="EdiciNEspecial"]');
//     const checkFavoritos = document.querySelector('input[name="favoritos"]');

//     const productosContainer = document.querySelector('.sliders__items');

//     // Salir si falta algún elemento
//     if (!buscarInput) {
//         console.error('❌ No se encontró buscarInput');
//         return;
//     }
//     if (!precioMin) {
//         console.error('❌ No se encontró precioMin');
//         return;
//     }
//     if (!precioMax) {
//         console.error('❌ No se encontró precioMax');
//         return;
//     }
//     if (!ordenarSelect) {
//         console.error('❌ No se encontró ordenarSelect');
//         return;
//     }

//     console.log('✅ Todos los elementos encontrados, agregando listeners...');

//     const todosLosProductos = Array.from(document.querySelectorAll('.sliders__item'));
//     console.log('Productos encontrados:', todosLosProductos.length);

//     // Función de filtrado
//     function filtrarProductos() {
//         console.log('🔄 Filtrando productos...');

//         const textoBusqueda = buscarInput.value.toLowerCase();
//         const min = parseFloat(precioMin.value) || 0;
//         const max = parseFloat(precioMax.value) || Infinity;
//         const orden = ordenarSelect.value;

//         let productosFiltrados = todosLosProductos.filter(item => {
//             const nombre = item.querySelector('.card-item__name').textContent.toLowerCase();
//             const licencia = item.querySelector('.card-item__licence').textContent.toLowerCase();
//             const precioText = item.querySelector('.card-item__price').textContent.replace(/[^0-9.]/g, '');
//             const precio = parseFloat(precioText);

//             const coincideBusqueda = nombre.includes(textoBusqueda) || licencia.includes(textoBusqueda);
//             const coincidePrecio = precio >= min && precio <= max;

//             return coincideBusqueda && coincidePrecio;
//         });

//         // Ordenar
//         if (orden === 'Menor o mayor') {
//             productosFiltrados.sort((a, b) => {
//                 const precioA = parseFloat(a.querySelector('.card-item__price').textContent.replace(/[^0-9.]/g, ''));
//                 const precioB = parseFloat(b.querySelector('.card-item__price').textContent.replace(/[^0-9.]/g, ''));
//                 return precioA - precioB;
//             });
//         } else if (orden === 'Mayor o menor') {
//             productosFiltrados.sort((a, b) => {
//                 const precioA = parseFloat(a.querySelector('.card-item__price').textContent.replace(/[^0-9.]/g, ''));
//                 const precioB = parseFloat(b.querySelector('.card-item__price').textContent.replace(/[^0-9.]/g, ''));
//                 return precioB - precioA;
//             });
//         }

//         // Mostrar/ocultar
//         todosLosProductos.forEach(item => item.style.display = 'none');
//         productosFiltrados.forEach(item => item.style.display = 'block');

//         console.log('Productos mostrados:', productosFiltrados.length);
//     }

//     // Event listeners
//     buscarInput.addEventListener('input', filtrarProductos);
//     precioMin.addEventListener('input', filtrarProductos);
//     precioMax.addEventListener('input', filtrarProductos);
//     ordenarSelect.addEventListener('change', filtrarProductos);

//     if (checkNuevos) checkNuevos.addEventListener('change', filtrarProductos);
//     if (checkOfertas) checkOfertas.addEventListener('change', filtrarProductos);
//     if (checkEdicion) checkEdicion.addEventListener('change', filtrarProductos);
//     if (checkFavoritos) checkFavoritos.addEventListener('change', filtrarProductos);

//     console.log('✅ Listeners agregados correctamente');
// });

// async function loadShop() {
//     const { data, error } = await supabase
//         .from("products")
//         .select("*");

//     if (error) {
//         console.error(error);
//         return;
//     }

//     const container = document.querySelector(".shop-container");

//     container.innerHTML = "";

//     data.forEach(product => {
//         const card = `
//       <div class="card-item">
//         <img src="${product.img_front || '/img/default.webp'}" />
//         <h3>${product.product_name}</h3>
//         <p>$${product.product_price}</p>
//       </div>
//     `;
//         container.innerHTML += card;
//     });
// }

// loadShop();
let todosLosProductos = [];

async function loadShop() {
    const { data, error } = await supabaseClient
        .from("products")
        .select(`*, licence (licence_name)`);

    if (error) {
        console.error(error);
        return;
    }

    todosLosProductos = data;
    renderProductos(data);
}

function renderProductos(productos) {
    const container = document.querySelector(".sliders__items");
    container.innerHTML = "";

    if (productos.length === 0) {
        container.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    productos.forEach(product => {
        const card = `
            <li class="sliders__item">
                <div class="carteles">
                    <p class="nuevos">NUEVO</p>
                </div>
                <article class="card-item">
                    <a class="card-item__link" href="./item.html?id=${product.product_id}">
                        <picture class="card-item__cover">
                            <img class="cards-item__img--front" 
                                src="${product.img_front || '../../img/default.webp'}" 
                                alt="${product.product_name}">
                            <img class="cards-item__img--back" 
                                src="${product.img_back || '../../img/default.webp'}" 
                                alt="${product.product_name} - dorso">
                        </picture>
                        <div class="card-item__content">
                            <p class="card-item__licence">${product.licence?.licence_name || "-"}</p>
                            <h4 class="card-item__name">${product.product_name}</h4>
                            <p class="card-item__price">$ ${product.product_price}</p>
                            <p class="card-item__promo">${product.dues || 3} CUOTAS SIN INTERÉS</p>
                        </div>
                    </a>
                </article>
            </li>
        `;
        container.innerHTML += card;
    });

    // Reiniciar filtros después de cargar
    iniciarFiltros();
}

function iniciarFiltros() {
    const buscarInput = document.querySelector('.Form__input_buscar');
    const precioMin = document.querySelector('.form__placeholder-min');
    const precioMax = document.querySelector('.form__placeholder-max');
    const ordenarSelect = document.querySelector('.Form__placeholder-vector');

    function filtrar() {
        const texto = buscarInput.value.toLowerCase();
        const min = parseFloat(precioMin.value) || 0;
        const max = parseFloat(precioMax.value) || Infinity;
        const orden = ordenarSelect.value;

        let filtrados = todosLosProductos.filter(p => {
            const nombre = p.product_name.toLowerCase();
            const licencia = (p.licence?.licence_name || "").toLowerCase();
            const precio = parseFloat(p.product_price);

            return (nombre.includes(texto) || licencia.includes(texto))
                && precio >= min && precio <= max;
        });

        if (orden === 'Menor o mayor') {
            filtrados.sort((a, b) => a.product_price - b.product_price);
        } else if (orden === 'Mayor o menor') {
            filtrados.sort((a, b) => b.product_price - a.product_price);
        }

        renderProductos(filtrados);
    }

    buscarInput.addEventListener('input', filtrar);
    precioMin.addEventListener('input', filtrar);
    precioMax.addEventListener('input', filtrar);
    ordenarSelect.addEventListener('change', filtrar);
}

loadShop();