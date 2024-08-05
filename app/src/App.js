import React, { useContext } from "react";
import { AccountContext } from "./contexts/AccountContext";
import "./App.css";
import "./assets/styles/index.css";
import "./assets/styles/cart-popup.css";
import "./assets/styles/slickListProducts.css";
import "./assets/js/lazy-load";
import "./assets/js/menu";
import AdminRoutes from "./routes/AdminRoutes";
import AppRoutes from "./routes/AppRoutes";
function App() {
  const { account, setAccount } = useContext(AccountContext);
  const isAdmin = account?.dataJwt?.role === "admin";
  const isLogin = account;
  if (isAdmin) {
    return <AdminRoutes></AdminRoutes>;
  } else if (!isAdmin) {
    return <AppRoutes account={account} isLogin={isLogin}></AppRoutes>;
  }
}

export default App;
