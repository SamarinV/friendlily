import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import MessagePage from "../pages/MessagePage/MessagePage";
import MusicPage from "../pages/MusicPage/MusicPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Setting from "../pages/Setting/Setting";
import UsersPage from "../pages/UsersPage/UsersPage";

export const router = createBrowserRouter([
  {
    path: "/vchate",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "message/*",
        element: <MessagePage />,
      },
      {
        path: "music",
        element: <MusicPage />,
      },
      {
        path: "profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
]);
