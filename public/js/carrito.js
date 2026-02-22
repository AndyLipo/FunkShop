// Obtenemos los botones y el input
const addButtons = document.querySelectorAll("#add");
const substractButtons = document.querySelectorAll("#substract");

// Función para armar el número desde el array de precios
function armarNro(precio) {
    if (precio.length > 1) {
        return (Number(precio[0]) + (0.01 * Number(precio[1])));
    }
    else return (Number(precio[0]));
}

// Función para actualizar el total de un item
function actualizarTotal(itemRow) {
    const quantity = itemRow.querySelector("#quantity");
    const precioUnitario = itemRow.querySelector("#precio_unitario").textContent;
    const precioNro = precioUnitario.match(/\d+/g);
    const precioTotal = itemRow.querySelector("#item_precioTotal");

    const precioTotalTemp = armarNro(precioNro) * Number(quantity.value);
    precioTotal.textContent = "$ " + precioTotalTemp.toFixed(2);

    // Actualizar el resumen
    actualizarResumen();
}

// Función para actualizar el resumen completo
function actualizarResumen() {
    const rows = document.querySelectorAll(".carrito__item");
    let cantidadTotal = 0;
    let subtotalGeneral = 0;

    rows.forEach(row => {
        const quantity = row.querySelector("#quantity");
        const precioUnitario = row.querySelector("#precio_unitario").textContent;
        const precioNro = precioUnitario.match(/\d+/g);

        const cantidad = Number(quantity.value);
        const precioUnit = armarNro(precioNro);

        cantidadTotal += cantidad;
        subtotalGeneral += (precioUnit * cantidad);
    });

    // Actualizar el DOM del resumen
    document.querySelector(".resumen_cant_nro").textContent = cantidadTotal;
    document.querySelector(".resumen_subtotal_nro").textContent = "$ " + subtotalGeneral.toFixed(2);
    document.querySelector(".resumen_total_nro").textContent = "$ " + subtotalGeneral.toFixed(2);
}

// Event listeners para cada fila del carrito
addButtons.forEach((add, index) => {
    add.addEventListener('click', (e) => {
        e.preventDefault();
        const itemRow = add.closest('.carrito__item');
        const quantity = itemRow.querySelector("#quantity");

        quantity.value = Number(quantity.value) + 1;
        actualizarTotal(itemRow);
    });
});

substractButtons.forEach((substract, index) => {
    substract.addEventListener('click', (e) => {
        e.preventDefault();
        const itemRow = substract.closest('.carrito__item');
        const quantity = itemRow.querySelector("#quantity");

        if (Number(quantity.value) > 0) {
            quantity.value = Number(quantity.value) - 1;
            actualizarTotal(itemRow);
        } else {
            window.alert("Cantidad de items = 0\nDesea eliminar este item del carrito? Por favor utilice el botón eliminar del artículo que desea remover.");
        }
    });
});