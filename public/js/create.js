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

document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("producto").value;
    const description = document.getElementById("descripcion").value;
    const sku = document.getElementById("sku").value;
    const price = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;
    const dues = document.getElementById("cuotas").value;
    const category = parseInt(document.getElementById("categoria").value);
    const licence = parseInt(document.getElementById("licencia").value); // 👈 faltaba esto


    let imgFrontUrl = null;
    let imgBackUrl = null;

    try {
        if (imgFrontFile) imgFrontUrl = await uploadImage(imgFrontFile);
        if (imgBackFile) imgBackUrl = await uploadImage(imgBackFile);
    } catch (err) {
        console.error(err);
        alert("Error al subir las imágenes");
        return;
    }

    const { error } = await supabaseClient
        .from("products")
        .insert({
            product_name: name,
            product_description: description,
            product_price: parseFloat(price),
            product_sku: sku,
            stock: parseInt(stock),
            dues: parseInt(dues),
            category_id: category,
            img_front: imgFrontUrl,
            img_back: imgBackUrl,
            licence_id: licence, // 👈 faltaba esto

        });

    if (error) {
        console.error(error);
        alert("Error al crear producto: " + error.message);
    } else {
        alert("Producto creado 🔥");
        window.location.href = "./admin.html";
    }
});