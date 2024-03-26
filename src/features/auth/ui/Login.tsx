import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { AppRootStateType } from "app/store"

const Login = () => {
  const userId = useSelector<AppRootStateType>((state) => state.auth.userData.id)
  const isInitialized = useSelector<AppRootStateType>((state) => state.app.isInitialized)
  const navigate = useNavigate()
  if (userId) {
    navigate(`/profile/${userId}`)
  }
if (!isInitialized) {
  return <></>
}
  return (
    <h1>
      <Navigate to="/login" />
      Login
    </h1>
  )
}

export default Login

