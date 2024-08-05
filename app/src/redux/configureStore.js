import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import cartReducer from "./slices/cartSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productsReducer from "./slices/productsSlice";
import accountsReducer from "./slices/accountsSlice";
import billsReducer from "./slices/billSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
    accounts: accountsReducer,
    bills: billsReducer,
    form: formReducer,
  },
});

export default store;
