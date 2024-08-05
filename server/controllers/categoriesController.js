const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const categoriesServices = require("../services/categoriesServices");
const categoriesModels = require("../models/categoryModels");
const unLinkImage = require("../config/unLinkImage");
/** */
const getCategories = async (req, res) => {
  try {
    const data = await categoriesServices.getCategories();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const createCategory = async (req, res) => {
  try {
    const imageCategory = req.file
      ? "/uploads/" + req.file.filename
      : "https://cdn4.iconfinder.com/data/icons/picture-sharing-sites/32/No_Image-1024.png";
    const { nameCategory, descriptionCategory } = req.body;
    const newCategory = await categoriesModels.createCategory({
      imageCategory,
      descriptionCategory,
      nameCategory,
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const newCategory = await categoriesModels.deleteCategory(req.params.id);
    if (req.params.urlImage) unLinkImage(req.params.urlImage);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};
const updateCategory = async (req, res) => {
  try {
    await categoriesModels.updateCategory(req.body);
    res.status(200).json("success");
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};
module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
