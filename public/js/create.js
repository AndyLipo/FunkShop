async function checkAuth() {
    const { data } = await supabaseClient.auth.getSession();
    if (!data.session) {
        window.location.href = "./login.html";
    }
}

checkAuth();

// Cargar categorías y licencias desde Supabase dinámicamente
async function loadSelects() {
    const { data: categories } = await supabaseClient
        .from("category")
        .select("*");

    const { data: licences } = await supabaseClient
        .from("licence")
        .select("*");

    const catSelect = document.getElementById("categoria");
    const licSelect = document.getElementById("licencia");

    catSelect.innerHTML = '<option value="">Seleccionar</option>';
    licSelect.innerHTML = '<option value="">Seleccionar</option>';

    categories.forEach(cat => {
        catSelect.innerHTML += `<option value="${cat.category_id}">${cat.category_name}</option>`;
    });

    licences.forEach(lic => {
        licSelect.innerHTML += `<option value="${lic.licence_id}">${lic.licence_name}</option>`;
    });
}

loadSelects();

document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("producto").value;
    const description = document.getElementById("descripcion").value;
    const sku = document.getElementById("sku").value;
    const price = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;
    const category_id = document.getElementById("categoria").value;
    const licence_id = document.getElementById("licencia").value;
    const dues = document.getElementById("cuotas").value;

    if (!name || !sku || !price) {
        alert("Nombre, SKU y precio son obligatorios");
        return;
    }

    const { error } = await supabaseClient
        .from("products")
        .insert({
            product_name: name,
            product_description: description,
            product_price: parseFloat(price),
            product_sku: sku,
            stock: parseInt(stock) || 0,
            category_id: parseInt(category_id) || null,
            licence_id: parseInt(licence_id) || null,
            dues: parseInt(dues) || 3,
        });

    if (error) {
        console.error(error);
        alert("Error al crear producto: " + error.message);
    } else {
        alert("Producto creado 🔥");
        window.location.href = "./admin.html";
    }
});