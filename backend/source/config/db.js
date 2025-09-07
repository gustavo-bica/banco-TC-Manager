// Sempre carregar dotenv primeiro - especificar caminho explícito
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

console.log(`Ambiente atual (NODE_ENV): ${process.env.NODE_ENV}`);

const mysql = require('mysql2/promise');

console.log(`Tentando conectar ao host: ${process.env.DB_HOST}`);
console.log(`Usando a porta: ${process.env.DB_PORT}`);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || process.env.DB_PASS,
  database: process.env.DB_DATABASE || process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com') ? {
    rejectUnauthorized: false
  } : false
});

module.exports = pool;