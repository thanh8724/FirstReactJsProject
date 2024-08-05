const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productService = require("../services/productService");
const productModels = require("../models/productModels");
const unLinkImage = require("../config/unLinkImage");
/** */
const getProducts = async (req, res) => {
  try {
    const data = await productService.getProducts();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const createProduct = async (req, res) => {
  try {
    const { nameProduct, descriptionProduct, category, priceProduct } =
      req.body;
    const imageProduct = `/uploads/${req?.files?.imageProduct[0]?.filename}`;
    const listImageDetails = req.files.imageDetailProduct.map((item) => {
      return `/uploads/${item.filename}`;
    });
    productModels.createProduct({
      dataNewProduct: {
        nameProduct,
        descriptionProduct,
        categoriesProduct: category,
        imageProduct,
        priceProduct,
      },
      listImageDetails: {
        listImageDetails,
      },
    });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const urlImage = (await productService.getProductByID(id))[0]?.imageProduct;
    const listImageDetails = (
      await productService.getImageDetailProduct(id)
    ).map((imageDetailProduct) => {
      return imageDetailProduct.imageDetail;
    });
    if (urlImage) unLinkImage(urlImage);
    if (listImageDetails.length > 0) {
      listImageDetails.forEach((imageDetailProduct) => {
        unLinkImage(imageDetailProduct);
      });
    }
    await productModels.deleteProducts(id);
    res.status(200).json("success");
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};
const updateProduct = async (req, res) => {
  try {
    await productModels.updateProduct(req.body);
    res.status(200).json("success");
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};
module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
