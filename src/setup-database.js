import 'dotenv/config';
import pool from './config/database.js';

const setupDatabase = async () => {
    try {
        console.log('🔧 Creando tablas...');

        await pool.query(`
      CREATE TABLE IF NOT EXISTS category (
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR(100) NOT NULL
      );
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS licence (
        licence_id SERIAL PRIMARY KEY,
        licence_name VARCHAR(100) NOT NULL
      );
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        product_id SERIAL PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        product_description TEXT,
        product_price DECIMAL(10, 2) NOT NULL,
        product_sku VARCHAR(50) UNIQUE NOT NULL,
        stock INT DEFAULT 0,
        dues INT DEFAULT 3,
        img_front VARCHAR(255),
        img_back VARCHAR(255),
        category_id INT REFERENCES category(category_id),
        licence_id INT REFERENCES licence(licence_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS user_login (
        user_id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        console.log('✅ Tablas creadas');

        // Insertar datos iniciales
        await pool.query(`INSERT INTO category (category_name) VALUES ('Figuras coleccionables') ON CONFLICT DO NOTHING;`);

        await pool.query(`
      INSERT INTO licence (licence_name) VALUES 
        ('STAR WARS'),
        ('POKEMON'),
        ('HARRY POTTER')
      ON CONFLICT DO NOTHING;
    `);

        await pool.query(`
      INSERT INTO user_login (email, password, name) VALUES 
        ('admin@funkoshop.com', 'admin123', 'Administrador')
      ON CONFLICT (email) DO NOTHING;
    `);

        console.log('✅ Datos iniciales insertados');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

setupDatabase();