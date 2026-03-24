function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const tabla = document.querySelector('.carrito__grid');
    const resumenCantidad = document.querySelector('.resumen_cant_nro');
    const resumenSubtotal = document.querySelector('.resumen_subtotal_nro');
    const resumenTotal = document.querySelector('.resumen_total_nro');

    // Limpiar filas anteriores (dejar solo el header)
    tabla.innerHTML = `
        <tr class="carrito__titulos">
            <td><h3 class="carrito__columna">DETALLE DEL PRODUCTO</h3></td>
            <td><h3 class="carrito__columna">CANTIDAD</h3></td>
            <td><h3 class="carrito__columna">TOTAL</h3></td>
            <td></td>
        </tr>
    `;

    if (carrito.length === 0) {
        tabla.innerHTML += `
            <tr><td colspan="4"><p style="padding:2rem">El carrito está vacío.</p></td></tr>
        `;
        resumenCantidad.textContent = '0';
        resumenSubtotal.textContent = '$ 0';
        resumenTotal.textContent = '$ 0';
        return;
    }

    let totalCantidad = 0;
    let totalPrecio = 0;

    carrito.forEach((item, index) => {
        const precioNumerico = parseFloat(String(item.precio).replace(/[^0-9.]/g, ''));
        const subtotalItem = precioNumerico * item.cantidad;
        totalCantidad += item.cantidad;
        totalPrecio += subtotalItem;

        tabla.innerHTML += `
            <tr class="carrito__item" data-index="${index}">
                <td>
                    <a href="../shop/item.html?id=${item.id}" class="carrito_detalle">
                        <picture>
                            <img class="item_imagen" src="${item.imagen}" alt="${item.nombre}">
                        </picture>
                        <div>
                            <h3 class="item_nombre">${item.nombre}</h3>
                            <h5 class="item_precio">Precio unitario: ${item.precio}</h5>
                        </div>
                    </a>
                </td>
                <td>
                    <div class="cantidad__items">
                        <input type="text" value="${item.cantidad}" class="cantidad__nro" readonly>
                        <div class="cantidad__botones">
                            <button class="cantidad__mas" onclick="cambiarCantidad(${index}, 1)">+</button>
                            <button class="cantidad__menos" onclick="cambiarCantidad(${index}, -1)">-</button>
                        </div>
                    </div>
                </td>
                <td>
                    <h3 class="item_precioTotal">$ ${subtotalItem.toFixed(2)}</h3>
                </td>
                <td>
                    <iconify-icon icon="zondicons:close-outline" class="eliminar_icono" 
                        onclick="eliminarProducto(${index})"></iconify-icon>
                </td>
            </tr>
        `;
    });

    resumenCantidad.textContent = totalCantidad;
    resumenSubtotal.textContent = `$ ${totalPrecio.toFixed(2)}`;
    resumenTotal.textContent = `$ ${totalPrecio.toFixed(2)}`;
}

function cambiarCantidad(index, delta) {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    carrito[index].cantidad += delta;

    if (carrito[index].cantidad <= 0) {
        if (confirm('¿Eliminar este producto del carrito?')) {
            carrito.splice(index, 1);
        } else {
            carrito[index].cantidad = 1;
        }
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

function eliminarProducto(index) {
    if (confirm('¿Eliminar este producto del carrito?')) {
        const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
    }
}

renderCarrito();