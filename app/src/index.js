import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AccountProvider } from "./contexts/AccountContext";
import { Provider } from "react-redux";
import store from "./redux/configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AccountProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
