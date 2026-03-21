async function checkAuth() {
    const { data } = await supabaseClient.auth.getSession();
    if (!data.session) {
        window.location.href = "./login.html";
    }
}
checkAuth();

let imgFrontFile = null;
let imgBackFile = null;

document.getElementById("btnImgFront").addEventListener("click", () => {
    document.getElementById("inputImgFront").click();
});
document.getElementById("btnImgBack").addEventListener("click", () => {
    document.getElementById("inputImgBack").click();
});
document.getElementById("inputImgFront").addEventListener("change", (e) => {
    imgFrontFile = e.target.files[0];
    document.getElementById("labelImgFront").textContent = imgFrontFile.name;
});
document.getElementById("inputImgBack").addEventListener("change", (e) => {
    imgBackFile = e.target.files[0];
    document.getElementById("labelImgBack").textContent = imgBackFile.name;
});

async function uploadImage(file) {
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabaseClient.storage
        .from("productos")
        .upload(fileName, file);
    if (error) throw error;
    const { data } = supabaseClient.storage
        .from("productos")
        .getPublicUrl(fileName);
    return data.publicUrl;
}

async function loadProductForEdit() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
        window.location.href = "./admin.html";
        return;
    }

    const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .eq("product_id", id)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    document.getElementById("producto").value = data.product_name || "";
    document.getElementById("descripcion").value = data.product_description || "";
    document.getElementById("sku").value = data.product_sku || "";
    document.getElementById("precio").value = data.product_price || "";
    document.getElementById("stock").value = data.stock || "";
    document.getElementById("categoria").value = data.category_id || "";
    document.getElementById("cuotas").value = data.dues || "";

    if (data.img_front) {
        document.getElementById("previewFront").src = data.img_front;
        document.getElementById("previewFront").style.display = "block";
    }
    if (data.img_back) {
        document.getElementById("previewBack").src = data.img_back;
        document.getElementById("previewBack").style.display = "block";
    }
}

loadProductForEdit();

document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const name = document.getElementById("producto").value;
    const description = document.getElementById("descripcion").value;
    const sku = document.getElementById("sku").value;
    const price = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;
    const category = parseInt(document.getElementById("categoria").value);
    const dues = parseInt(document.getElementById("cuotas").value);

    let updateData = {
        product_name: name,
        product_description: description,
        product_price: parseFloat(price),
        product_sku: sku,
        stock: parseInt(stock),
        category_id: category,
        dues: dues,
    };

    try {
        if (imgFrontFile) updateData.img_front = await uploadImage(imgFrontFile);
        if (imgBackFile) updateData.img_back = await uploadImage(imgBackFile);
    } catch (err) {
        console.error(err);
        alert("Error al subir imágenes");
        return;
    }

    const { error } = await supabaseClient
        .from("products")
        .update(updateData)
        .eq("product_id", id);

    if (error) {
        console.error(error);
        alert("Error al actualizar: " + error.message);
    } else {
        alert("Producto actualizado 🔥");
        window.location.href = "./admin.html";
    }
});