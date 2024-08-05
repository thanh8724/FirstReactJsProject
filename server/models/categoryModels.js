const connectionDataBase = require("../config/database.js");
async function createCategory({
  nameCategory,
  imageCategory,
  descriptionCategory,
}) {
  const pool = await connectionDataBase();
  const query = `INSERT INTO categories (nameCategory, imageCategory, descriptionCategory)
                    VALUES (?, ?, ?)`;
  const values = [nameCategory, imageCategory, descriptionCategory];
  pool.query(query, values);
}
async function updateCategory(data) {
  const pool = await connectionDataBase();
  const query = `UPDATE categories SET nameCategory = ?, descriptionCategory = ? WHERE id = ?`;
  const values = [data.nameCategoryUpdate, data.description, data.id];
  await pool.query(query, values);
}
async function deleteCategory(id) {
  const pool = await connectionDataBase();
  const query = `DELETE FROM categories WHERE id = ?`;
  const values = [id];
  pool.query(query, values);
}
module.exports = { createCategory, deleteCategory, updateCategory };
