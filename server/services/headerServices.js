const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getDataHeader = async () => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [categories, categoriesFields] = await connection.query(
      "select * from categories"
    );
    const data = {
      categories: categories,
    };
    connection.release();
    pool.end();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = getDataHeader;
