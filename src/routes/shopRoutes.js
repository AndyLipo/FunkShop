import { Router } from 'express';
const router = Router();
import { homeShop, getItemId, cart, addToCart, updateCartItem, removeFromCart, addCart } from '../controllers/shopController.js';

router.get('/', homeShop);
router.get('/item/:id', getItemId);
router.post('/item/:id/add', addToCart);
router.get('/cart', cart);
router.post('/cart/update/:id', updateCartItem);
router.delete('/cart/remove/:id', removeFromCart);
router.post('/cart', addCart);

export default router;