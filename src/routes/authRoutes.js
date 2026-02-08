import { Router } from 'express';
const router = Router();
import { authControllers, loginPOST } from '../controllers/authController.js';

router.get('/login', (req, res) => {
    res.render('./auth/login', {
        usuario: req.session.usuario,
        mensaje: req.query.mensaje || "",
        error: false
    });
});
router.post('/login', loginPOST);
router.get('/register', authControllers.getRegister);
router.post('/register', authControllers.saveRegister);
router.get('/logout', authControllers.logout);

export default router;