// document.addEventListener('DOMContentLoaded', () => {
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
//     const todosLosProductos = Array.from(document.querySelectorAll('.sliders__item'));


//     // Función principal de filtrado
//     function filtrarProductos() {
//         const textoBusqueda = buscarInput.value.toLowerCase();
//         const min = parseFloat(precioMin.value) || 0;
//         const max = parseFloat(precioMax.value) || Infinity;
//         const orden = ordenarSelect.value;

//         let productosFiltrados = todosLosProductos.filter(item => {
//             // Obtener datos del producto
//             const nombre = item.querySelector('.card-item__name').textContent.toLowerCase();
//             const licencia = item.querySelector('.card-item__licence').textContent.toLowerCase();
//             const precioText = item.querySelector('.card-item__price').textContent.replace(/[^0-9.]/g, '');
//             const precio = parseFloat(precioText);

//             // Filtro de búsqueda
//             const coincideBusqueda = nombre.includes(textoBusqueda) || licencia.includes(textoBusqueda);

//             // Filtro de precio
//             const coincidePrecio = precio >= min && precio <= max;

//             // Filtros de checkboxes (por ahora solo muestra todos)
//             // TODO: Agregar lógica para nuevos, ofertas, etc. cuando tengas esos datos en la BD

//             return coincideBusqueda && coincidePrecio;
//         });

//         // Ordenar productos
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
//         // 'Mas recientes' mantiene el orden original

//         // Mostrar/ocultar productos
//         todosLosProductos.forEach(item => item.style.display = 'none');
//         productosFiltrados.forEach(item => item.style.display = 'block');

//         // Mostrar mensaje si no hay resultados
//         if (productosFiltrados.length === 0) {
//             mostrarMensajeNoResultados();
//         } else {
//             ocultarMensajeNoResultados();
//         }
//     }

//     // Mensaje de "no se encontraron productos"
//     function mostrarMensajeNoResultados() {
//         let mensaje = document.querySelector('.no-resultados');
//         if (!mensaje) {
//             mensaje = document.createElement('p');
//             mensaje.className = 'no-resultados';
//             mensaje.textContent = 'No se encontraron productos con esos filtros.';
//             mensaje.style.textAlign = 'center';
//             mensaje.style.fontSize = '1.2rem';
//             mensaje.style.margin = '2rem';
//             productosContainer.after(mensaje);
//         }
//     }

//     function ocultarMensajeNoResultados() {
//         const mensaje = document.querySelector('.no-resultados');
//         if (mensaje) mensaje.remove();
//     }

//     // Event listeners
//     buscarInput.addEventListener('input', filtrarProductos);
//     precioMin.addEventListener('input', filtrarProductos);
//     precioMax.addEventListener('input', filtrarProductos);
//     ordenarSelect.addEventListener('change', filtrarProductos);

//     checkNuevos.addEventListener('change', filtrarProductos);
//     checkOfertas.addEventListener('change', filtrarProductos);
//     checkEdicion.addEventListener('change', filtrarProductos);
//     checkFavoritos.addEventListener('change', filtrarProductos);
// });

console.log('🔍 Script shop.js cargado');

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM cargado');

    // Elementos del DOM
    const buscarInput = document.querySelector('.Form__input_buscar');
    const precioMin = document.querySelector('.form__placeholder-min');
    const precioMax = document.querySelector('.form__placeholder-max');
    const ordenarSelect = document.querySelector('.Form__placeholder-vector');

    const checkNuevos = document.querySelector('input[name="nuevos"]');
    const checkOfertas = document.querySelector('input[name="ofertas"]');
    const checkEdicion = document.querySelector('input[name="EdiciNEspecial"]');
    const checkFavoritos = document.querySelector('input[name="favoritos"]');

    const productosContainer = document.querySelector('.sliders__items');

    // DEBUG
    console.log('buscarInput:', buscarInput);
    console.log('precioMin:', precioMin);
    console.log('precioMax:', precioMax);
    console.log('ordenarSelect:', ordenarSelect);
    console.log('checkNuevos:', checkNuevos);
    console.log('checkOfertas:', checkOfertas);
    console.log('checkEdicion:', checkEdicion);
    console.log('checkFavoritos:', checkFavoritos);

    // Salir si falta algún elemento
    if (!buscarInput) {
        console.error('❌ No se encontró buscarInput');
        return;
    }
    if (!precioMin) {
        console.error('❌ No se encontró precioMin');
        return;
    }
    if (!precioMax) {
        console.error('❌ No se encontró precioMax');
        return;
    }
    if (!ordenarSelect) {
        console.error('❌ No se encontró ordenarSelect');
        return;
    }

    console.log('✅ Todos los elementos encontrados, agregando listeners...');

    const todosLosProductos = Array.from(document.querySelectorAll('.sliders__item'));
    console.log('Productos encontrados:', todosLosProductos.length);

    // Función de filtrado
    function filtrarProductos() {
        console.log('🔄 Filtrando productos...');

        const textoBusqueda = buscarInput.value.toLowerCase();
        const min = parseFloat(precioMin.value) || 0;
        const max = parseFloat(precioMax.value) || Infinity;
        const orden = ordenarSelect.value;

        let productosFiltrados = todosLosProductos.filter(item => {
            const nombre = item.querySelector('.card-item__name').textContent.toLowerCase();
            const licencia = item.querySelector('.card-item__licence').textContent.toLowerCase();
            const precioText = item.querySelector('.card-item__price').textContent.replace(/[^0-9.]/g, '');
            const precio = parseFloat(precioText);

            const coincideBusqueda = nombre.includes(textoBusqueda) || licencia.includes(textoBusqueda);
            const coincidePrecio = precio >= min && precio <= max;

            return coincideBusqueda && coincidePrecio;
        });

        // Ordenar
        if (orden === 'Menor o mayor') {
            productosFiltrados.sort((a, b) => {
                const precioA = parseFloat(a.querySelector('.card-item__price').textContent.replace(/[^0-9.]/g, ''));
                const precioB = parseFloat(b.querySelector('.card-item__price').textContent.replace(/[^0-9.]/g, ''));
                return precioA - precioB;
            });
        } else if (orden === 'Mayor o menor') {
            productosFiltrados.sort((a, b) => {
                const precioA = parseFloat(a.querySelector('.card-item__price').textContent.replace(/[^0-9.]/g, ''));
                const precioB = parseFloat(b.querySelector('.card-item__price').textContent.replace(/[^0-9.]/g, ''));
                return precioB - precioA;
            });
        }

        // Mostrar/ocultar
        todosLosProductos.forEach(item => item.style.display = 'none');
        productosFiltrados.forEach(item => item.style.display = 'block');

        console.log('Productos mostrados:', productosFiltrados.length);
    }

    // Event listeners
    buscarInput.addEventListener('input', filtrarProductos);
    precioMin.addEventListener('input', filtrarProductos);
    precioMax.addEventListener('input', filtrarProductos);
    ordenarSelect.addEventListener('change', filtrarProductos);

    if (checkNuevos) checkNuevos.addEventListener('change', filtrarProductos);
    if (checkOfertas) checkOfertas.addEventListener('change', filtrarProductos);
    if (checkEdicion) checkEdicion.addEventListener('change', filtrarProductos);
    if (checkFavoritos) checkFavoritos.addEventListener('change', filtrarProductos);

    console.log('✅ Listeners agregados correctamente');
});