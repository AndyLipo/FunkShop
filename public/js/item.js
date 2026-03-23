// Obtener ID de la URL (?id=X)
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {
    if (!productId) {
        document.querySelector('.item__content').innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    const { data, error } = await supabaseClient
        .from("products")
        .select(`*, licence (licence_name)`)
        .eq("product_id", productId)
        .single();

    if (error || !data) {
        console.error(error);
        document.querySelector('.item__content').innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    // Llenar el HTML con los datos del producto
    document.querySelector('.item__licence').textContent = data.licence?.licence_name || "-";
    document.querySelector('.item__name').textContent = data.product_name;
    document.querySelector('.item__text').textContent = data.product_description || "";
    document.querySelector('.item__price').textContent = `$ ${data.product_price}`;
    document.querySelector('.item__promo').innerHTML = `<span class="item__promo--underlined">Ver métodos de pago</span> - ${data.dues || 3} CUOTAS SIN INTERÉS`;
    document.querySelector('.item__cover img').src = data.img_front;
    document.querySelector('.item__cover img').alt = data.product_name;
}

loadProduct();

// Cantidad
const add = document.querySelector('#add');
const substract = document.querySelector('#substract');
const quantity = document.querySelector('#quantity');
const addToCartBtn = document.querySelector('.item__button');

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

// Agregar al carrito con localStorage
addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const cant = Number(quantity.value);
    if (cant <= 0) {
        alert('Por favor, seleccioná una cantidad válida');
        return;
    }

    // Leer carrito actual
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

    // Ver si el producto ya está
    const index = carrito.findIndex(p => p.id == productId);

    if (index >= 0) {
        carrito[index].cantidad += cant;
    } else {
        carrito.push({
            id: productId,
            nombre: document.querySelector('.item__name').textContent,
            precio: document.querySelector('.item__price').textContent,
            imagen: document.querySelector('.item__cover img').src,
            cantidad: cant
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('¡Producto agregado al carrito! 🛒');
    quantity.value = 0;
});