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

const messages = [
  {
    id: 1,
    chatName: "Mr. Propper",
    messages: [
      {
        id: 1,
        name: "Mr. Propper",
        text: "HGIHGI iuhiuhgi iughiuugi",
      },
      {
        id: 2,
        name: "Владимир",
        text: "ГНгнапгнаг шнпгнп ШГНШНЕГн",
      },
      {
        id: 3,
        name: "Mr. Propper",
        text: "орагнагн шгегнег паачв опа нв",
      },
      {
        id: 4,
        name: "Владимир",
        text: "опагаРОПО рпо РПОГН Рграрп",
      },
    ],
  },

  {
    id: 2,
    chatName: "Юля",
    messages: [
      {
        id: 1,
        name: "Юля",
        text: "HGIHGI iuhiuhgi iughiuugi",
      },
      {
        id: 2,
        name: "Владимир",
        text: "ГНгнапгнаг шнпгнп ШГНШНЕГн",
      },
      {
        id: 3,
        name: "Юля",
        text: "орагнагн шгегнег паачв опа нв",
      },
      {
        id: 4,
        name: "Владимир",
        text: "опагаРОПО рпо РПОГН Рграрп",
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <Header />
      <div className="navbar-content-wrapper">
        <div className="navbar-content">
          <Navbar />
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/message" element={<MessagePage />}>
              <Route path=":id" element={<MessagePage />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="music" element={<MusicPage />} />
            <Route path="setting" element={<SettingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
