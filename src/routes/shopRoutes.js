import { Router } from 'express';
const router = Router();
import { homeShop, getItemId, cart, addToCart, updateCartItem, removeFromCart, goToCheckout } from '../controllers/shopController.js';
import { createPreference, paymentSuccess, paymentFailure, paymentPending } from '../controllers/paymentController.js';

router.get('/', homeShop);
router.get('/item/:id', getItemId);
router.post('/item/:id/add', addToCart);
router.get('/cart', cart);
router.post('/cart/update/:id', updateCartItem);
router.delete('/cart/remove/:id', removeFromCart);
router.get('/checkout', goToCheckout);

// Rutas de MercadoPago
router.post('/create-preference', createPreference);
router.get('/payment/success', paymentSuccess);
router.get('/payment/failure', paymentFailure);
router.get('/payment/pending', paymentPending);

export default router;