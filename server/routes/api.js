const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const categoriesController = require("../controllers/categoriesController");
const productsController = require("../controllers/productsController");
const billController = require("../controllers/billController");
const upload = require("../config/multer");

const initWebRoute = (app) => {
  /** GET */
  router.get("/", homeController.getHome);
  router.get("/product/:idCate/:id", homeController.getProduct);
  router.get("/shop/:idCategory", homeController.getShop);
  router.get("/search", homeController.getProductSearch);
  router.get("/cart/:idUser", homeController.getCart);
  router.get("/categories", categoriesController.getCategories);
  router.get("/products", productsController.getProducts);
  router.get("/bills", billController.getBills);
  /** JWT AUTH */

  /** POST */
  router.post("/headerData", homeController.getHeaderData);
  router.post("/login", homeController.postLoginAccount);
  router.post("/register", homeController.postRegister);
  router.post("/addToCart", homeController.addToCart);
  router.post("/createCart", homeController.createCart);
  router.post("/createBill", billController.createBill);
  router.post("/deleteItemCart", homeController.deleteItemCart);
  router.post("/deleteCart", homeController.deleteCart);

  /** categories */
  router.post(
    "/createCategory",
    upload.single("imageCategory"),
    categoriesController.createCategory
  );
  /** categories */

  /** products */
  router.post(
    "/createProduct",
    upload.fields([
      { name: "imageProduct", maxCount: 1 },
      { name: "imageDetailProduct", maxCount: 4 },
    ]),
    productsController.createProduct
  );
  /** products */
  /** path */
  router.patch(
    "/changeQuantityItemCart",
    homeController.changeQuantityItemCart
  );
  router.patch("/updateProduct", productsController.updateProduct);
  router.patch("/updateCategory", categoriesController.updateCategory);
  router.patch("/updateBill", billController.updateBill);

  /** delete */
  router.post("/deleteItemCart", homeController.deleteItemCart);
  router.post("/deleteCart", homeController.deleteCart);
  router.delete(
    "/deleteCategories/:id/:urlImage",
    categoriesController.deleteCategory
  );
  router.delete("/deleteProduct/:id", productsController.deleteProduct);
  return app.use("/", router);
};

module.exports = initWebRoute;
