import React from "react";
import { Routes, Route } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import Home from "../pages/client/Home";
import Product from "../pages/client/Product";
import Shop from "../pages/client/Shop.js";
import Cart from "../pages/client/Cart";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CheckOut from "../pages/client/CheckOut.js";
import FooterComponent from "../components/FooterComponent";

const AppRoutes = (probs) => {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/product/:idCate/:id" element={<Product></Product>} />
        <Route path="/shop" element={<Shop></Shop>} />
        <Route path="/cart" element={<Cart></Cart>} />
        <Route path="/checkOut" element={<CheckOut></CheckOut>} />
        <Route
          path="/login"
          element={
            <PrivateRoutes isLogin={probs.isLogin}>
              <Login></Login>
            </PrivateRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoutes isLogin={probs.isLogin}>
              <Register></Register>
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<Home></Home>} />
      </Routes>
      <FooterComponent></FooterComponent>
    </>
  );
};

export default AppRoutes;
