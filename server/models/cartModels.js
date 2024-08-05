const e = require("express");
const connectionDataBase = require("../config/database.js");
async function createCart(data) {
  try {
    const pool = await connectionDataBase();
    const [cartResult] = await pool.query(
      `INSERT INTO cart (idUser) VALUES (?)`,
      [data.idUser]
    );
    const newCartId = cartResult.insertId;
    await pool.query(
      `INSERT INTO cartItem (idCart, idProduct, quantity, size) VALUES (?, ?, ?, ?)`,
      [newCartId, data.idProduct, data.quantity, data.size]
    );
    return;
  } catch (err) {
    throw err;
  }
}
async function addToCart(data) {
  try {
    const pool = await connectionDataBase();
    await pool.query(
      `INSERT INTO cartItem (idCart, idProduct, quantity, size) VALUES (?, ?, ?, ?)`,
      [data.idCart, data.idProduct, data.quantity, data.size]
    );
    return;
  } catch (err) {
    throw err;
  }
}

async function updateProductInCart(data) {
  const pool = await connectionDataBase();
  const query = `UPDATE cartitem SET quantity = ? WHERE id = ?`;
  const values = [data.quantity, data.idCartItem];
  await pool.query(query, values);
}

async function deleteCart(idCart) {
  const pool = await connectionDataBase();
  const query = `DELETE FROM cart WHERE id = ?`;
  const values = [idCart];
  pool.query(query, values);
}
async function deleteItemCart(id) {
  const pool = await connectionDataBase();
  const query = `DELETE FROM cartitem WHERE id = ?`;
  const values = [id];
  pool.query(query, values);
}
async function changeQuantityItemCart(data) {
  const pool = await connectionDataBase();
  const query = `UPDATE cartitem SET quantity = ? WHERE id = ?`;
  const values = [data.newQuantity, data.idCartItem];
  pool.query(query, values);
}
module.exports = {
  createCart,
  addToCart,
  updateProductInCart,
  deleteItemCart,
  deleteCart,
  changeQuantityItemCart,
};
