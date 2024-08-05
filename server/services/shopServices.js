const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getDataShop = async (id) => {
  try {
    let queryFilter = ``;
    if (id == "5") {
      queryFilter =
        "select * from products where quantitySold >= 500 order by quantitySold desc";
    } else if (id == "6") {
      queryFilter =
        "SELECT * FROM products WHERE viewProduct >= 1000 order by viewProduct desc";
    } else {
      queryFilter = `select * from products where categoriesProduct = ${id}`;
    }
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [products, productsFields] = await connection.query(queryFilter);
    const data = {
      products: products,
    };
    connection.release();
    pool.end();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getDataProductSearch = async (keyword) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [products, productsFields] = await connection.query(
      `SELECT * FROM products WHERE nameProduct LIKE ?`,
      [`%${keyword}%`]
    );
    const data = {
      products: products,
    };
    connection.release();
    pool.end();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = { getDataShop, getDataProductSearch };
