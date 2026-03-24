let todosLosProductos = [];

async function loadShop() {
    const { data, error } = await supabaseClient
        .from("products")
        .select("*");
    console.log("Productos:", data);
    console.log("Error:", error);

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
            <picture class="cards-item__cover">
                <img class="cards-item__img--front" 
                    src="${product.img_front || '../../img/default.webp'}" 
                    alt="${product.product_name}">
                <img class="cards-item__img--back" 
                    src="${product.img_back || '../../img/default.webp'}" 
                    alt="${product.product_name} - dorso">
            </picture>
            <div class="card-item__content">
                <p class="card-item__licence">${product.licence?.product.licence_name}</p>
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