import { Router } from 'express'
import multer from 'multer'
const router = Router()
import { getAllProducts, createItem, saveNewProduct, getProductById, updateProduct, deleteProduct} from '../controllers/adminController.js';

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
// fin MULTER

// session
const requiereAdmin = (req, res, next) => {
    if (!req.session.esAdmin) {
      return res.redirect("/auth/login");
    }
    next();
};

/*router.get('/', (req, res) => {
  res.render('./admin/admin', {
      usuario: req.session.usuario,
      mensaje: req.query.mensaje || "",
      error: false,
  });
});*/

router.get('/', requiereAdmin, getAllProducts);
router.get('/create',requiereAdmin, createItem);
router.post('/create',requiereAdmin, upload.single('img_front'), saveNewProduct); 
router.get('/edit/:id',requiereAdmin, getProductById);
router.post('/edit/:id',requiereAdmin, upload.single('img_front'), updateProduct);
router.get('/delete/:id',requiereAdmin, deleteProduct);

export default router;