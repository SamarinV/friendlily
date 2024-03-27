import Header from "common/components/Header/Header"
import LinearLoader from "common/components/LinearLoader/LinearLoader"
import Navbar from "common/components/Navbar/Navbar"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { authThunks } from "features/auth/model/auth.slice"
import Login from "features/auth/ui/Login"
import Profile from "features/profile/ui/Profile"
import Users from "features/users/ui/Users"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"
import "./App.css"
import { AppRootStateType } from "./store"

function App() {
  const isLoading = useSelector<AppRootStateType, string>((state) => state.app.status)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [])

  return (
    <div className="App">
      <Header />
      <div className="navbar-content-wrapper">
        {isLoading === "loading" && <LinearLoader />}

        <div className="navbar-content">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="*" element={<Login />} />
              <Route path={"/profile/:id"} element={<Profile />} />
              <Route path={"/users"} element={<Users />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
