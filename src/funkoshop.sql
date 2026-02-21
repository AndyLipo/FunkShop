-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS funkoshop;
USE funkoshop;

-- Tabla de licencias (marcas/franquicias)
CREATE TABLE IF NOT EXISTS licence (
    licence_id INT AUTO_INCREMENT PRIMARY KEY,
    licence_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    product_price DECIMAL(10,2) NOT NULL,
    product_sku VARCHAR(50),
    img_front VARCHAR(255),
    img_back VARCHAR(255),
    dues INT DEFAULT 0,
    licence_id INT NOT NULL,
    category_id INT NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (licence_id) REFERENCES licence(licence_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
);

-- Tabla de usuarios (para login)
CREATE TABLE IF NOT EXISTS user_login (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar licencias de ejemplo
INSERT INTO licence (licence_name) VALUES 
('STAR WARS'),
('POKEMON'),
('HARRY POTTER'),
('DC COMICS'),
('MARVEL');

-- Insertar categorías de ejemplo
INSERT INTO category (category_name) VALUES 
('Figuras coleccionables'),
('Funkos'),
('Remeras'),
('Llaveros');

-- Insertar productos de ejemplo
INSERT INTO products (product_name, product_description, product_price, product_sku, img_front, img_back, dues, licence_id, category_id, stock) 
VALUES 
('BABY YODA BLUEBALL', 'Figura coleccionable Star Wars', 1799.99, 'STW001001', 'baby-yoda-1.webp', 'baby-yoda-box.webp', 10, 1, 1, 50),
('PIDGEOTTO', 'Figura coleccionable Pokemon', 1799.99, 'PKM001001', 'pidgeotto-1.webp', 'pidgeotto-box.webp', 8, 2, 1, 30),
('LUNA LOVEGOOD', 'Figura coleccionable Harry Potter', 1799.99, 'HP001001', 'luna-1.webp', 'luna-box.webp', 8, 3, 1, 25),
('DARTH VADER', 'Figura coleccionable Star Wars', 2199.99, 'STW001002', 'vader-1.webp', 'vader-box.webp', 12, 1, 1, 40),
('PIKACHU', 'Figura coleccionable Pokemon', 1599.99, 'PKM001002', 'pikachu-1.webp', 'pikachu-box.webp', 6, 2, 1, 60);

-- Insertar un usuario admin de ejemplo (password: admin123)
INSERT INTO user_login (name, email, password, is_admin) 
VALUES 
('Administrador', 'admin@funkoshop.com', 'admin123', TRUE),
('Usuario Test', 'user@test.com', '123456', FALSE);

-- Verificar que todo se creó correctamente
SELECT 'Licencias creadas:' as Info;
SELECT * FROM licence;

SELECT 'Categorías creadas:' as Info;
SELECT * FROM category;

SELECT 'Productos creados:' as Info;
SELECT * FROM products;

SELECT 'Usuarios creados:' as Info;
SELECT user_id, name, email, is_admin FROM user_login;
