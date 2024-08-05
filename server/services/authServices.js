const connectionDataBase = require("../config/database.js");
const fs = require("fs").promises;
const getAccountLogin = async (data) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [account, accountFields] = await connection.query(
      `select * from accounts where emailAccount = '${data.email}' and passwordAccount = '${data.password}'`
    );
    connection.release();
    pool.end();
    return account;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const checkEmailAcountExists = async (data) => {
  try {
    const pool = await connectionDataBase();
    const connection = await pool.getConnection();
    const [account, accountFields] = await connection.query(
      `select * from accounts where emailAccount = '${data.email}'`
    );
    connection.release();
    pool.end();
    return account;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = { getAccountLogin, checkEmailAcountExists };
