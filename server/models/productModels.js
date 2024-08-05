const connectionDataBase = require("../config/database.js");
async function createProduct({ dataNewProduct, listImageDetails }) {
  try {
    const pool = await connectionDataBase();
    const [productResult] = await pool.query(
      `INSERT INTO products (imageProduct, nameProduct, priceProduct, categoriesProduct, descriptionProduct)
       VALUES (?, ?, ?, ?, ?)`,
      [
        dataNewProduct.imageProduct,
        dataNewProduct.nameProduct,
        dataNewProduct.priceProduct,
        dataNewProduct.categoriesProduct,
        dataNewProduct.descriptionProduct,
      ]
    );
    const newIdProduct = productResult.insertId;
    const imageInsertPromises = listImageDetails.listImageDetails.map((image) =>
      pool.query(
        `INSERT INTO imageProducts (idProduct, imageDetail) VALUES (?, ?)`,
        [newIdProduct, image]
      )
    );
    await Promise.all(imageInsertPromises);
    return;
  } catch (err) {
    console.error("Error creating product:", err);
    throw err;
  }
}

async function updateProduct(data) {
  const pool = await connectionDataBase();
  const query = `UPDATE products SET nameProduct = ?, priceProduct = ?, descriptionProduct = ?, categoriesProduct = ? WHERE id = ?`;
  const values = [
    data.nameProductUpdate,
    data.priceProductUpdate,
    data.descriptionProductUpdate,
    data.categoriesProduct,
    data.id,
  ];
  await pool.query(query, values);
}
async function deleteProducts(id) {
  const pool = await connectionDataBase();
  const query = `DELETE FROM products WHERE id = ?`;
  const values = [id];
  pool.query(query, values);
}
module.exports = {
  createProduct,
  updateProduct,
  deleteProducts,
};
