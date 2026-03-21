// function confirmDeletion(product_id) {
//     // Aparece un cuadro de diálogo de confirmación
//     const confirmDeletion = confirm('Está seguro de que desea eliminar este producto?');

//     // Si el usuario hace clic en "Aceptar"
//     if (confirmDeletion) {
//         // Redirigir al usuario a la página de eliminación
//         window.location.href = `/admin/delete/${product_id}`;
//     } else {
//         // Si el usuario hace clic en "Cancelar", no hace nada
//     }
// }
async function checkAuth() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
        window.location.href = "/pages/admin/login.html";
    }
}

checkAuth();
const supabase = window.supabase.createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON
);


async function confirmDeletion(product_id) {
    const confirmDelete = confirm(
        "¿Está seguro de que desea eliminar este producto?"
    );

    if (confirmDelete) {
        const { error } = await supabase
            .from("products")
            .delete()
            .eq("product_id", product_id);

        if (error) {
            console.error(error);
            alert("Error al eliminar");
        } else {
            alert("Producto eliminado 🔥");
            location.reload();
        }
    }
}
async function loadProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    const table = document.querySelector(".listado__table");

    data.forEach(product => {
        const row = `
      <tr class="listado__item">
        <td><p>${product.product_id}</p></td>
        <td><p>${product.product_sku}</p></td>
        <td><p>${product.product_name}</p></td>
        <td><p>${product.category_id}</p></td>
        <td>
          <a href="./edit.html">
            ✏️
          </a>
        </td>
        <td>
          <a href="#" onclick="confirmDeletion(${product.product_id})">
            🗑️
          </a>
        </td>
      </tr>
    `;

        table.innerHTML += row;
    });
}

loadProducts();

document
    .getElementById("productForm")
    ?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        const name = document.getElementById("producto").value;
        const description = document.getElementById("descripcion").value;
        const sku = document.getElementById("sku").value;
        const price = document.getElementById("precio").value;
        const stock = document.getElementById("stock").value;

        if (id) {
            // UPDATE
            const { error } = await supabase
                .from("products")
                .update({
                    product_name: name,
                    product_description: description,
                    product_price: parseFloat(price),
                    product_sku: sku,
                    stock: parseInt(stock),
                })
                .eq("product_id", id);

            if (error) {
                console.error(error);
                alert("Error al actualizar");
            } else {
                alert("Producto actualizado 🔥");
                window.location.href = "./admin.html";
            }
        }
    });

async function loadProducts() {
    const { data, error } = await supabase
        .from("products")
        .select(`
      *,
      category (category_name),
      licence (licence_name)
    `);

    if (error) {
        console.error(error);
        return;
    }

    const table = document.querySelector(".listado__table");

    // limpiar tabla (dejamos solo header)
    table.innerHTML = `
    <tr class="listado__titulos">
      <td>ID</td>
      <td>SKU</td>
      <td>Nombre</td>
      <td>Categoría</td>
      <td></td>
      <td></td>
    </tr>
  `;

    data.forEach(product => {
        const row = `
      <tr class="listado__item">
        <td>${product.product_id}</td>
        <td>${product.product_sku}</td>
        <td>${product.product_name}</td>
        <td>${product.category?.category_name || "-"}</td>
        <td>
          <a href="./edit.html?id=${product.product_id}">✏️</a>
        </td>
        <td>
          <a href="#" onclick="confirmDeletion(${product.product_id})">🗑️</a>
        </td>
      </tr>
    `;
        table.innerHTML += row;
    });
}

loadProducts();

async function loadProductForEdit() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_id", id)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    document.getElementById("producto").value = data.product_name;
    document.getElementById("descripcion").value = data.product_description;
    document.getElementById("sku").value = data.product_sku;
    document.getElementById("precio").value = data.product_price;
    document.getElementById("stock").value = data.stock;
}
loadProductForEdit();