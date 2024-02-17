//External Lib Import
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "regenerator-runtime/runtime";

//Internal Lib Import

// import i18n (needs to be bundled ;))
import "./locales/i18n";

import App from "./App";
import "./App.css";
import ApiLoad from "./components/common/ApiLoad";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ApiLoad />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
