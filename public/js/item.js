const add = document.querySelector('#add');
const substract = document.querySelector('#substract');
const quantity = document.querySelector('#quantity');
const addToCartBtn = document.querySelector('.item__button');

// Obtener el ID del producto desde la URL
const productId = window.location.pathname.split('/').pop();

add.addEventListener('click', (e) => {
    e.preventDefault();
    quantity.value = Number(quantity.value) + 1;
});

substract.addEventListener('click', (e) => {
    e.preventDefault();
    if (Number(quantity.value) > 0) {
        quantity.value = Number(quantity.value) - 1;
    }
});

// Agregar al carrito
addToCartBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const cant = Number(quantity.value);

    if (cant <= 0) {
        alert('Por favor, selecciona una cantidad válida');
        return;
    }

    try {
        const response = await fetch(`/shop/item/${productId}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: cant })
        });

        const data = await response.json();

        if (data.success) {
            alert('¡Producto agregado al carrito!');
            quantity.value = 0;
            // Opcional: Actualizar contador del carrito en el navbar
        } else {
            alert('Error al agregar al carrito');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar al carrito');
    }
});