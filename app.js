import 'dotenv/config'; // ✅ AGREGAR ESTA LÍNEA AL PRINCIPIO
import express from 'express';
import session from 'express-session';
const app = express();

import mainRoutes from './src/routes/mainRoutes.js';
import shopRoutes from './src/routes/shopRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

app.use(session({
    secret: process.env.SESSION_SECRET,
    name: "sesion",
    cookie: { maxAge: 60000 * 5 }, // 5 minutos
    resave: false,
    saveUninitialized: false,
}))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* Motor de Plantillas EJS */
app.set('view engine', 'ejs');
app.set('views', './src/views');

// ✅ RUTAS PRIMERO (ANTES DE EXPRESS.STATIC)
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/', authRoutes);
app.use('/', mainRoutes);

// ✅ EXPRESS.STATIC AL FINAL (Y SOLO UNA VEZ)
app.use(express.static('public'));

// ✅ USAR PROCESS.ENV.PORT PARA RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));