import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/router";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);
