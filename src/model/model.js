import pool from '../config/database.js';

//Obtener todos los productos de la base de datos
export const getAllProductsFromDB = async () => {
    try {
        const [datos] = await pool.query('SELECT * FROM products JOIN licence ON products.licence_id = licence.licence_id JOIN category ON products.category_id = category.category_id ORDER BY product_id')
        return datos
    }
    catch (error) {
        console.error('Error querying MySQL: ', error);
        throw error;
    }
}

//Obtener un producto utilizando como filtro el product id
export const getProductByIdFromDB = async (id) => {
    try {
        const [datos] = await pool.query('SELECT * FROM products JOIN licence ON products.licence_id = licence.licence_id JOIN category ON products.category_id = category.category_id WHERE product_id = ?', [id])
        return datos
    }
    catch (error) {
        console.error('Error querying MySQL: ', error);
        throw error;
    }
}

//Agregar un nuevo producto a la base de datos
export const addNewProductToDB = async (prodData) => {
    try {
        const [categoryId] = await pool.query('SELECT category_id FROM category WHERE category_name =?',prodData.category_id);
        prodData.category_id = categoryId[0].category_id;
        const [licenceId] = await pool.query('SELECT licence_id FROM licence WHERE licence_name =?',prodData.licence_id);
        prodData.licence_id = licenceId[0].licence_id;
        const [result] = await pool.query('INSERT INTO products SET ?', [prodData]);
        const nuevoProdID = result.insertId;
        const nuevoProd = await getProductByIdFromDB(nuevoProdID);
        return nuevoProd;
    } catch (error) {
        console.error('Error inserting into MySQL:', error);
        throw error;
    }
};

//Actualizar un producto existente en la base de datos con nuevos datos
export const editProductInDB = async (id, newProdData) => {
    try {
        const [categoryId] = await pool.query('SELECT category_id FROM category WHERE category_name =?',newProdData.category_id);
        newProdData.category_id = categoryId[0].category_id;
        const [licenceId] = await pool.query('SELECT licence_id FROM licence WHERE licence_name =?',newProdData.licence_id);
        newProdData.licence_id = licenceId[0].licence_id;
        await pool.query('UPDATE products SET ? WHERE product_id = ?', [newProdData, id]);
        const updatedProd = await getProductByIdFromDB(id);
        return updatedProd;
    } catch (error) {
        console.error('Error updating MySQL:', error);
        throw error;
    }
};

// Borrar un producto por ID de la base de datos
export const deleteProdFromDB = async (prodId) => {
    try {
        const deletedProd = await getProductByIdFromDB(prodId);
        await pool.query('DELETE FROM products WHERE product_id = ?', [prodId]);
        return deletedProd;
    } catch (error) {
        console.error('Error deleting from MySQL:', error);
        throw error;
    }
};

//Obtener user y password de la BD
export const getUserByUsernameFromDB = async (user) => {
    try {
        const [usuario] = await pool.query('SELECT * FROM user_login WHERE email = ?', user);
        return usuario[0]
    }
    catch (error) {
        console.error('Error querying MySQL: ', error);
        throw error;
    }
}