const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || process.env.DB_PASS || "",
    database: process.env.DB_DATABASE || process.env.DB_NAME || "tc_manager",
    port: process.env.DB_PORT || 3306,
    ssl: process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com') ? {
        rejectUnauthorized: false
    } : false
});

conn.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL: ", err);
        return;
    }
    console.log("✅ Conectado ao MySQL!");
});

module.exports = conn;