const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getCategories = async () => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [categories, categoriesFields] = await connection.query(
      "select * from categories"
    );
    connection.release();
    pool.end();
    return categories;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = { getCategories };
