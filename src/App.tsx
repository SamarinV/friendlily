import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MessagePage from "./pages/MessagePage/MessagePage";
import NewsPage from "./pages/NewsPage/NewsPage";
import MusicPage from "./pages/MusicPage/MusicPage";
import SettingPage from "./pages/Setting/Setting";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="navbar-content-wrapper">
        <div className="navbar-content">
          <Navbar />
          <Routes>
            <Route>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="message" element={<MessagePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="music" element={<MusicPage />} />
              <Route path="setting" element={<SettingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

// <Appheader />
// <main className={styles.main}>
//   <Routes>
//     <Route path="" element={<HomePage />} />
//     <Route path="login" element={<LoginPage />} />
//     <Route path="register" element={<RegisterPage />} />
//     <Route path="forgot-password" element={<ForgotPasswordPage />} />
//     <Route path="reset-password" element={<ResetPasswordPage />} />
//     <Route path="order-feed" element={<OrderFeed />} />
//     {/* <Route path="profile" element={<ProfilePage />} /> */}
//     {/* <Route path="ingredients/:id" element={<IngredientsPage />} /> */}
//     <Route path="*" element={<NotFoundPage />} />
//   </Routes>
// </main>
