import { Router } from 'express';
const router = Router();
import { shopControllers, getItemId, homeShop } from '../controllers/shopController.js';

router.get('/', homeShop);
router.get('/item/:id', getItemId);
router.post('/item/:id/add', shopControllers.addItemId);
router.get('/cart', shopControllers.cart);
router.post('/cart', shopControllers.addCart);

export default router;