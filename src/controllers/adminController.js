import { unlink } from 'node:fs';
import path from 'node:path';
import { addNewProductToDB, getAllProductsFromDB, getProductByIdFromDB, editProductInDB, deleteProdFromDB } from '../model/model.js';

// Obtiene todos los productos de la BD y renderiza la pag Admin
export const getAllProducts = async (req, res) => {
    try {
        const usuario = req.session.usuario;
        const mensaje = req.query.mensaje;
        const err = false;
        const datos = await getAllProductsFromDB();
        res.render('./admin/admin', {
            mensaje,
            data: datos
        });
    } catch (error) {
        console.error("Error getting all products: ", error);
        res.status(500).send('Internal Server Error');
    }
}

// Renderiza la pagina que usamos para crear un nuevo producto
export const createItem = (req, res) => {
    res.render('./admin/createItem');
}

//Guarda en la BD el nuevo producto
export const saveNewProduct = async (req, res) => {

    console.log("req.files --> ", req.files);
    console.log("req.body --> ", req.body);

    const newProduct = req.body;

    // ✅ Agregar las imágenes subidas
    if (req.files.img_front) {
        newProduct.img_front = 'uploads/' + req.files.img_front[0].filename;
    }
    if (req.files.img_back) {
        newProduct.img_back = 'uploads/' + req.files.img_back[0].filename;
    }

    try {
        const nuevoProd = await addNewProductToDB(newProduct);
        const datos = await getAllProductsFromDB();
        res.render('./admin/admin', {
            data: datos,
            mensaje: "Nuevo item creado"
        });
    } catch (error) {
        console.error("Error adding a new product: ", error);
        res.status(500).send('Internal Server Error');
    }
}

// Obtiene un prod por su id de la BD y renderiza la pag UpdateItem
export const getProductById = async (req, res) => {
    try {
        const prod_id = parseInt(req.params.id);
        const prod = await getProductByIdFromDB(prod_id);
        res.render('./admin/updateItem', {
            producto: prod[0]
        })
    } catch (error) {
        console.error("Error getting product: ", error);
        res.status(500).send('Internal Server Error');
    }
}

//Guarda los cambios en la BD de un producto existente
export const updateProduct = async (req, res) => {

    console.log("req.files --> ", req.files);
    console.log("req.body --> ", req.body);

    const newProdData = req.body;

    // ✅ Solo actualiza las imágenes SI se subieron nuevas
    if (req.files) {
        if (req.files.img_front) {
            newProdData.img_front = 'uploads/' + req.files.img_front[0].filename;
        }
        if (req.files.img_back) {
            newProdData.img_back = 'uploads/' + req.files.img_back[0].filename;
        }
    }

    const prod_id = parseInt(req.params.id);
    try {
        const nuevoProd = await editProductInDB(prod_id, newProdData);
        const datos = await getAllProductsFromDB();
        res.render('./admin/admin', {
            data: datos,
            mensaje: "Item actualizado con éxito"
        });
    } catch (error) {
        console.error("Error saving changes to product: ", error);
        res.status(500).send('Internal Server Error');
    }
}

//Eliminar un producto de la BD
export const deleteProduct = async (req, res) => {

    const prod_id = parseInt(req.params.id);
    try {

        const deleteProd = await deleteProdFromDB(prod_id);

        if (deleteProd) {
            unlink('public/uploads/' + deleteProd[0].img_front, (err) => {
                if (err) res.send(`Ocurrió un error ${err.code}`);
                console.log('Imagen borrada');
            });
            const datos = await getAllProductsFromDB();
            res.render('./admin/admin', {
                data: datos,
                mensaje: "Item borrado exitosamente"
            });
        } else {
            res.status(404).send('usuario not found');
        }
    } catch (error) {
        console.error("Error deleting product: ", error);
        res.status(500).send('Internal Server Error');
    }
}


