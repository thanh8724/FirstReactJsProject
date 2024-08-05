const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const jwt = require("../services/JWT.js");
const getDataHome = require("../services/homeService");
const getDataHeader = require("../services/headerServices");
const productService = require("../services/productService");
const shopServices = require("../services/shopServices");
const authServices = require("../services/authServices");
const cartServices = require("../services/cartServices");
const categoriesServices = require("../services/categoriesServices");

/** models import */
const accountModels = require("../models/accountModels");
const cartModels = require("../models/cartModels");
/** */
const getHome = async (req, res) => {
  const data = await getDataHome();
  res.json(data);
};
const getProduct = async (req, res) => {
  const data = await productService.getDataProduct(
    req.params.idCate,
    req.params.id
  );
  res.json(data);
};
const getShop = async (req, res) => {
  const data = await shopServices.getDataShop(req.params.idCategory);
  res.json(data);
};
const getProductSearch = async (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  const data = await shopServices.getDataProductSearch(keyword);
  res.json(data);
};
const getCart = async (req, res) => {
  try {
    const idCart = await cartServices.getCartByIdUser(req.params.idUser);
    if (idCart.length > 0) {
      const dataCartItems = await cartServices.getCartItemsByCartId(
        idCart[0].id
      );
      const productPromises = dataCartItems.map(async (item) => {
        const product = await cartServices.getDetailProductByIdCartItem(
          item.idProduct
        );
        return {
          cartItem: item,
          product: product[0],
        };
      });
      const products = await Promise.all(productPromises);
      const dataReturn = products.map(({ cartItem, product }) => ({
        idCartItem: cartItem.id,
        idCart: cartItem.idCart,
        idProduct: cartItem.idProduct,
        nameProduct: product?.nameProduct,
        quantityProduct: cartItem?.quantity,
        imageProduct: product?.imageProduct,
        priceProduct: product?.priceProduct,
        sizeProduct: cartItem?.size,
      }));
      res.json(dataReturn);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getCategories = async (req, res) => {
  try {
    const data = await categoriesServices.getCategories();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/** POST */
const postLoginAccount = async (req, res) => {
  const data = await authServices.getAccountLogin(req.body);
  if (data.length !== 0) {
    const dataJwt = {
      id: data[0].id,
      name: data[0].nameAccount,
      role: data[0].roleAccount,
      avatar: data[0].avatarAccount,
    };
    const jwtToken = jwt.createJWT({ dataJwt });
    res.json({
      status: 201,
      data: jwtToken,
      role: dataJwt.role,
    });
  } else {
    res.json({
      status: 404,
      title: "Thất bại!",
      message: "Email hoặc mật khẩu không đúng!",
    });
  }
};
const postRegister = async (req, res) => {
  const emailIsExists = await authServices.checkEmailAcountExists(req.body);
  if (emailIsExists.length > 0) {
    res.json({ status: 409, title: "Thất bại!", message: "Email đã tồn tại!" });
  } else {
    await accountModels.createAccoutUser(req.body);
    res.json({
      status: 201,
      title: "Thành công!",
      message: "Tạo tài khoản thành công!",
    });
  }
};
const createCart = async (req, res) => {
  try {
    await cartModels.createCart(req.body);
    res.status(201).json({
      title: "Thành công!",
      message: "Thêm sản phẩm thành công!",
    });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};
const addToCart = async (req, res) => {
  try {
    /** trường hợp sản phẩm đã tồn tại nhưng thêm sản phẩm mới khác size thì thêm sản phẩm mới */
    if (!req.body.updateQuantityProduct) {
      await cartModels.addToCart(req.body);
    } else {
      /** trường hợp người dùng thêm sản phẩm mới đã tồn tại nhưng cùng size thì cập nhật lại số lượng sản phẩm đã có trong db */
      await cartModels.updateProductInCart(req.body);
    }
    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};
const deleteItemCart = async (req, res) => {
  try {
    cartModels.deleteItemCart(req.body.idItemCart);
    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};
const deleteCart = async (req, res) => {
  try {
    cartModels.deleteCart(req.body.idCart);
    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};
const changeQuantityItemCart = async (req, res) => {
  try {
    cartModels.changeQuantityItemCart(req.body);
    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};
const getHeaderData = async (req, res) => {
  const data = await getDataHeader();
  if (req.body.jwt) {
    const dataAccount = jwt.JWTverify(req.body?.jwt, "872004");
    res.json({ categories: data.categories, dataAccount: dataAccount.data });
  } else {
    res.json({ categories: data.categories });
  }
};
module.exports = {
  getHome,
  getProduct,
  getHeaderData,
  getShop,
  getProductSearch,
  getCart,
  getCategories,
  postLoginAccount,
  postRegister,
  createCart,
  addToCart,
  deleteItemCart,
  deleteCart,
  changeQuantityItemCart,
};
