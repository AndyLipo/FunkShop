import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configuración del cliente de MercadoPago
const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

export const createPreference = async (req, res) => {
    const carritoItems = req.session.carrito || [];

    if (carritoItems.length === 0) {
        return res.status(400).json({ error: 'Carrito vacío' });
    }

    try {
        // Crear los items para MercadoPago
        const items = carritoItems.map(producto => ({
            id: producto.product_id.toString(),
            title: producto.product_name,
            description: producto.product_description || 'Producto Funkoshop',
            quantity: producto.units_in_cart,
            unit_price: Number(producto.product_price),
            currency_id: 'ARS'
        }));

        // URL base
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        // Crear el body de la preferencia
        const body = {
            items: items,
            back_urls: {
                success: `${baseUrl}/shop/payment/success`,
                failure: `${baseUrl}/shop/payment/failure`,
                pending: `${baseUrl}/shop/payment/pending`
            },
            statement_descriptor: 'FUNKOSHOP',
            external_reference: `ORDER_${Date.now()}`
        };

        console.log('Creating preference with body:', JSON.stringify(body, null, 2));

        // Crear la preferencia
        const preference = new Preference(client);
        const result = await preference.create({ body });

        console.log('Preference created:', result.id);

        // Devolver el preference_id
        res.json({
            id: result.id,
            init_point: result.init_point
        });

    } catch (error) {
        console.error('Error al crear preferencia de MercadoPago:', error);

        res.status(500).json({
            error: 'Error al procesar el pago',
            details: error.message
        });
    }
};

// Página de éxito
export const paymentSuccess = (req, res) => {
    // Limpiar el carrito
    req.session.carrito = [];

    res.render('./shop/payment-success', {
        message: '¡Pago exitoso! Gracias por tu compra.'
    });
};

// Página de error
export const paymentFailure = (req, res) => {
    res.render('./shop/payment-failure', {
        message: 'Hubo un problema con tu pago. Intenta nuevamente.'
    });
};

// Página de pendiente
export const paymentPending = (req, res) => {
    res.render('./shop/payment-pending', {
        message: 'Tu pago está siendo procesado.'
    });
};