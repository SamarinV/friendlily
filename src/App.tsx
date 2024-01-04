import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./redux/store";
import LinearLoader from "./components/LinearLoader/LinearLoader";
import { fetchAuthUserTC } from "./redux/auth-reducer";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  const isLoading = useSelector<AppRootStateType, string>(
    (state) => state.app.status
  );

  const isAuthenticated = useSelector<AppRootStateType>(
    (state) => state.auth.id
  );

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchAuthUserTC());
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="navbar-content-wrapper">
        {isLoading === "loading" && <LinearLoader />}
        {!isAuthenticated ? (
          <Routes>
            <Route path="*" element={<LoginPage />} />
          </Routes>
        ) : (
          <div className="navbar-content">
            <Navbar />
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
