import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AppRootStateType } from "../../redux/store";
import LinearLoader from "../../components/LinearLoader/LinearLoader";

const LoginPage = () => {
  const isAuthenticated = useSelector<AppRootStateType>(
    (state) => state.auth.id
  );
  const isLoading = useSelector<AppRootStateType>((state) => state.app.status);

  const navigate = useNavigate();

  //если загружается информация залогинен пользователь или нет
  if (isLoading === "loading") {
    return <LinearLoader />;
  }

  if (isAuthenticated) {
    // Перенаправление на страницу профиля авторизованного пользователя
    navigate(`/vchate/profile/${isAuthenticated}`);
  }
  return (
    <h1>
      <Navigate to="/vchate/login" />
      Login
    </h1>
  );
};

export default LoginPage;
function useEffecct(arg0: () => void) {
  throw new Error("Function not implemented.");
}
