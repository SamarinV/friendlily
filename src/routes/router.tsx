import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import MessagePage from "../pages/MessagePage/MessagePage";
import MusicPage from "../pages/MusicPage/MusicPage";
import NewsPage from "../pages/NewsPage/NewsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Setting from "../pages/Setting/Setting";

const router = createBrowserRouter([
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
        path: "news",
        element: <NewsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
]);

export default router;
