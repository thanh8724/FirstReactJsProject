require("dotenv").config();
const mysql = require("mysql2/promise");

async function connectionDataBase() {
  const pool = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "ananas",
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return pool;
}
module.exports = connectionDataBase;
