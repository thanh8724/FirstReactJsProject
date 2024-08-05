const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getDataProduct = async (idCate, id) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [product, productFields] = await connection.query(
      `select * from products where id = ${id}`
    );
    const [imagesProduct, imagesProductFields] = await connection.query(
      `select * from imageproducts where idProduct = ${id}`
    );
    const [productRelate, productRelateFields] = await connection.query(
      `SELECT * FROM products WHERE categoriesProduct = ${idCate} AND id != ${id} ORDER BY quantitySold DESC`
    );
    const dataHome = {
      product: product,
      imagesProduct,
      productRelate,
    };
    connection.release();
    pool.end();
    return dataHome;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getProducts = async () => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [products, productsFields] = await connection.query(
      `select * from products`
    );
    connection.release();
    pool.end();
    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getProductByID = async (id) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [products, productsFields] = await connection.query(
      `select * from products where id = ${id}`
    );
    connection.release();
    pool.end();
    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getImageDetailProduct = async (id) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [imageproducts, imageproductsFields] = await connection.query(
      `select imageDetail from imageproducts where idProduct = ${id}`
    );
    connection.release();
    pool.end();
    return imageproducts;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = {
  getDataProduct,
  getProducts,
  getProductByID,
  getImageDetailProduct,
};
