const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const billServices = require("../services/billServices");
const billModels = require("../models/billModels");
/** */
const getBills = async (req, res) => {
  try {
    const data = await billServices.getBills();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateBill = async (req, res) => {
  try {
    const data = await billModels.updateBill(req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const createBill = async (req, res) => {
  try {
    await billModels.createBill(req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getBills,
  updateBill,
  createBill,
};
