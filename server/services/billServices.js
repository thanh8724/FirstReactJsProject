const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getBills = async () => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [bills, billsFields] = await connection.query(`select * from bills`);
    const [productBill, productBillFields] = await connection.query(
      `select * from productBill`
    );
    connection.release();
    pool.end();
    return { bills, productBill };
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = {
  getBills,
};
