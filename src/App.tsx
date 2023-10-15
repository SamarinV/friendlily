import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="navbar-content-wrapper">
        <div className="navbar-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/message" element={<div>Сообщения</div>} />
            <Route path="/login" element={<div>Логин</div>} />
            <Route path="/news" element={<div>Новости</div>} />
            <Route path="/music" element={<div>Музыка</div>} />
            <Route path="/setting" element={<div>Настройки</div>} />
            <Route path="*" element={<Profile />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
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
