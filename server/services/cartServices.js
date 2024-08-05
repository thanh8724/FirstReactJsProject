const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getCartByIdUser = async (idUser) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [idCart, idCartFields] = await connection.query(
      `select id from cart where idUser = ${idUser}`
    );
    connection.release();
    pool.end();
    return idCart;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getCartItemsByCartId = async (cartIds) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [cartItems, cartItemsFields] = await connection.query(
      `select * from cartitem where idCart=${cartIds}`
    );
    connection.release();
    pool.end();
    return cartItems;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getDetailProductByIdCartItem = async (idProduct) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [cartItems, cartItemsFields] = await connection.query(
      `select * from products where id=${idProduct}`
    );
    connection.release();
    pool.end();
    return cartItems;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = {
  getCartByIdUser,
  getCartItemsByCartId,
  getDetailProductByIdCartItem,
};
