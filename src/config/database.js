// // backend/src/config/database.js
// import { config } from "dotenv";
// config();
// import { createPool } from 'mysql2/promise';

// const pool = createPool({
//     host: process.env.DB_HOST || "localhost",
//     user: process.env.DB_USER || "root",
//     password: process.env.DB_PASSWORD || "",
//     database: process.env.DB_DATABASE || "funkoshop",
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     port: process.env.DB_PORT || 3306
// });

// // Prueba de conexión
// pool.getConnection()
//     .then(connection => {
//         console.log('Connected to MySQL database');
//         connection.release();
//     })
//     .catch(err => {
//         console.error('Error connecting to MySQL:', err);
//     });

// export default pool;

// import { config } from "dotenv";
// config();

// import mysql from "mysql2/promise";

// let pool;

// if (process.env.MYSQL_URL) {
//     // Conexión para Railway
//     pool = mysql.createPool({
//         uri: process.env.MYSQL_URL,
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0
//     });
// } else {
//     // Conexión local
//     pool = mysql.createPool({
//         host: process.env.DB_HOST || "localhost",
//         user: process.env.DB_USER || "root",
//         password: process.env.DB_PASSWORD || "",
//         database: process.env.DB_DATABASE || "funkoshop",
//         port: process.env.DB_PORT || 3306,
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0
//     });
// }

// // Test de conexión
// (async () => {
//     try {
//         const connection = await pool.getConnection();
//         console.log("✅ Connected to MySQL database");
//         connection.release();
//     } catch (error) {
//         console.error("❌ Error connecting to MySQL:", error);
//     }
// })();

// export default pool;

import { config } from "dotenv";
config();
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false
});

// Test de conexión
(async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Connected to PostgreSQL database");
        client.release();
    } catch (error) {
        console.error("❌ Error connecting to PostgreSQL:", error);
    }
})();

export default pool;