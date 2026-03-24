exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { MercadoPagoConfig, Preference } = require('mercadopago');

    const client = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN
    });

    const body = JSON.parse(event.body);
    const carrito = body.carrito;

    const items = carrito.map(item => ({
        title: item.nombre,
        quantity: item.cantidad,
        unit_price: parseFloat(String(item.precio).replace(/[^0-9.]/g, '')),
        currency_id: 'ARS'
    }));

    try {
        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items,
                back_urls: {
                    success: `${process.env.URL}/pages/shop/carrito.html`,
                    failure: `${process.env.URL}/pages/shop/carrito.html`,
                    pending: `${process.env.URL}/pages/shop/carrito.html`
                },
                auto_return: 'approved'
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ init_point: result.sandbox_init_point })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};