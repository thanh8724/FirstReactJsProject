const connectionDataBase = require("../config/database.js");
async function createAccoutUser(data) {
  const pool = await connectionDataBase();
  const query = `INSERT INTO accounts (nameAccount, emailAccount, passwordAccount, roleAccount)
                    VALUES (?, ?, ?, ?)`;
  const values = [data.name, data.email, data.password, "user"];
  pool.query(query, values);
}
async function updatePersonnel(data, id) {
  const pool = await connectionDataBase();
  const query = `UPDATE personnel SET name = ?, email = ?, role = ?, phone = ? WHERE id = ?`;
  const values = [data.nameUp, data.emailUp, data.roleUp, data.phoneUp, id];
  await pool.query(query, values);
}
async function deletePersonnel(id) {
  const pool = await connectionDataBase();
  const query = `DELETE FROM personnel WHERE id = ?`;
  const values = [id];
  pool.query(query, values);
}
module.exports = { createAccoutUser, updatePersonnel, deletePersonnel };
