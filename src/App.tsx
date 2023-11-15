import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="navbar-content-wrapper">
        <div className="navbar-content">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
