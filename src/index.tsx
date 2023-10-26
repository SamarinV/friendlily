import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter basename="vchate">
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
