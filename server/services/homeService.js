const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getDataHome = async () => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [bestSaleProducts, bestSaleProductsFields] = await connection.query(
      "select * from products where quantitySold >= 500 order by quantitySold desc"
    );
    const [concernedProducts, concernedProductsFields] = await connection.query(
      "SELECT * FROM products WHERE viewProduct >= 1000 order by viewProduct desc"
    );
    const dataHome = {
      bestSaleProducts: bestSaleProducts,
      concernedProducts: concernedProducts,
    };
    connection.release();
    pool.end();
    return dataHome;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = getDataHome;
