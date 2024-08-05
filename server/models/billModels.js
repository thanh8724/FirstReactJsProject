const connectionDataBase = require("../config/database.js");
async function updateBill(data) {
  const pool = await connectionDataBase();
  const query = `UPDATE bills SET status = ? WHERE id = ?`;
  const values = [data.status, data.id];
  await pool.query(query, values);
}
async function createBill(data) {
  const pool = await connectionDataBase();
  const [billResult] = await pool.query(
    `INSERT INTO bills (idAccount, receiver, emailReceiver, phoneReceiver, address, adderssSpecific, totalAmount, shipping, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.idAccount,
      data.receiver,
      data.emailReceiver,
      data.phoneReceiver,
      data.address,
      data.addressSpecific,
      data.total,
      data.shipping,
      1,
    ]
  );
  const idNewBill = billResult.insertId;
  const productInsertPromises = data.listNameProduct.map((nameProduct) => {
    return pool.query(
      `INSERT INTO productbill (nameProduct, idBill) VALUES (?, ?)`,
      [nameProduct, idNewBill]
    );
  });
  await Promise.all(productInsertPromises);
  return;
}

module.exports = {
  createBill,
  updateBill,
};
