import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { AppRootStateType } from "app/store"
import LinearLoader from "common/components/LinearLoader/LinearLoader"

const Login = () => {
  const isAuthenticated = useSelector<AppRootStateType>((state) => state.auth.userData.id)
  const isLoading = useSelector<AppRootStateType>((state) => state.app.status)

  const navigate = useNavigate()

  if (isLoading === "loading") {
    return <LinearLoader />
  }

  if (isAuthenticated) {
    navigate(`/profile/${isAuthenticated}`)
  }
  return (
    <h1>
      <Navigate to="/login" />
      Login
    </h1>
  )
}

export default Login
