const addButtons = document.querySelectorAll("#add");
const substractButtons = document.querySelectorAll("#substract");
const deleteButtons = document.querySelectorAll(".eliminar_icono");

// Event listeners para cada fila
addButtons.forEach((add) => {
    add.addEventListener('click', async (e) => {
        e.preventDefault();
        const itemRow = add.closest('.carrito__item');
        const quantity = itemRow.querySelector("#quantity");
        const productId = itemRow.querySelector('.carrito_detalle').href.split('/').pop();

        quantity.value = Number(quantity.value) + 1;

        await actualizarCantidad(productId, quantity.value);
    });
});

substractButtons.forEach((substract) => {
    substract.addEventListener('click', async (e) => {
        e.preventDefault();
        const itemRow = substract.closest('.carrito__item');
        const quantity = itemRow.querySelector("#quantity");
        const productId = itemRow.querySelector('.carrito_detalle').href.split('/').pop();

        if (Number(quantity.value) > 1) {
            quantity.value = Number(quantity.value) - 1;
            await actualizarCantidad(productId, quantity.value);
        } else {
            if (confirm('¿Eliminar este producto del carrito?')) {
                await eliminarProducto(productId);
                itemRow.remove();
            }
        }
    });
});

deleteButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        const itemRow = btn.closest('.carrito__item');
        const productId = itemRow.querySelector('.carrito_detalle').href.split('/').pop();

        if (confirm('¿Eliminar este producto del carrito?')) {
            await eliminarProducto(productId);
            itemRow.remove();
            location.reload();
        }
    });
});

async function actualizarCantidad(productId, quantity) {
    try {
        const response = await fetch(`/shop/cart/update/${productId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity })
        });

        if (response.ok) {
            location.reload(); // Recargar para actualizar totales
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function eliminarProducto(productId) {
    try {
        await fetch(`/shop/cart/remove/${productId}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error:', error);
    }
}