import { getProductByIdFromDB, getAllProductsFromDB } from '../model/model.js';

// Mostrar todos los productos en la tienda
export const homeShop = async (req, res) => {
    try {
        const datos = await getAllProductsFromDB();
        res.render('./shop/shop', {
            data: datos
        });
    } catch (error) {
        console.error("Error getting all products: ", error);
        res.status(500).send('Internal Server Error');
    }
}

// Mostrar un producto individual
export const getItemId = async (req, res) => {
    try {
        const prod_id = parseInt(req.params.id);
        const prod = await getProductByIdFromDB(prod_id);
        res.render('./shop/item', {
            producto: prod[0]
        });
    } catch (error) {
        console.error("Error getting product: ", error);
        res.status(500).send('Internal Server Error');
    }
}

// Mostrar el carrito
export const cart = (req, res) => {
    // Obtener productos del carrito desde la sesión
    const carritoItems = req.session.carrito || [];

    res.render('./shop/cart', {
        data: carritoItems
    });
};

// Agregar producto al carrito
export const addToCart = async (req, res) => {
    const prod_id = parseInt(req.params.id);
    const quantity = parseInt(req.body.quantity) || 1;

    try {
        // Obtener datos del producto de la BD
        const producto = await getProductByIdFromDB(prod_id);

        if (!producto || producto.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Inicializar carrito si no existe
        if (!req.session.carrito) {
            req.session.carrito = [];
        }

        // Verificar si el producto ya está en el carrito
        const itemExistente = req.session.carrito.find(item => item.product_id === prod_id);

        if (itemExistente) {
            // Si ya existe, aumentar la cantidad
            itemExistente.units_in_cart += quantity;
        } else {
            // Si no existe, agregarlo con units_in_cart
            const nuevoItem = {
                ...producto[0],
                units_in_cart: quantity
            };
            req.session.carrito.push(nuevoItem);
        }

        // Calcular total de items en el carrito
        const cartCount = req.session.carrito.reduce((sum, item) => sum + item.units_in_cart, 0);

        // Responder con éxito
        res.json({
            success: true,
            message: 'Producto agregado al carrito',
            cartCount: cartCount
        });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: 'Error al agregar al carrito' });
    }
};

// Actualizar cantidad en el carrito
export const updateCartItem = (req, res) => {
    const prod_id = parseInt(req.params.id);
    const quantity = parseInt(req.body.quantity);

    if (!req.session.carrito) {
        return res.status(400).json({ error: 'Carrito vacío' });
    }

    const item = req.session.carrito.find(item => item.product_id === prod_id);

    if (item) {
        if (quantity <= 0) {
            // Si la cantidad es 0, eliminar del carrito
            req.session.carrito = req.session.carrito.filter(item => item.product_id !== prod_id);
        } else {
            item.units_in_cart = quantity;
        }
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }
};

// Eliminar producto del carrito
export const removeFromCart = (req, res) => {
    const prod_id = parseInt(req.params.id);

    if (!req.session.carrito) {
        return res.status(400).json({ error: 'Carrito vacío' });
    }

    req.session.carrito = req.session.carrito.filter(item => item.product_id !== prod_id);

    res.json({ success: true });
};

// Ruta para ir a checkout (por implementar)
export const addCart = (req, res) => {
    res.send('Route for Go to Checkout page');
};