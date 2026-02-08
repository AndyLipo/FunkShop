import { Router } from 'express';
const router = Router();
import { mainControllers } from '../controllers/mainController.js';

router.get('/home', mainControllers.home);
router.get('/contact', mainControllers.contact);
router.get('/about', mainControllers.about);
router.get('/faqs', mainControllers.faqs);

export default router;