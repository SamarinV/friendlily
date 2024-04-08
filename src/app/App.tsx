import Header from "common/components/Header/Header"
import LinearLoader from "common/components/LinearLoader/LinearLoader"
import Navbar from "common/components/Navbar/Navbar"
import Page404 from "common/components/Page404/Page404"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { authThunks } from "features/auth/model/auth.slice"
import Login from "features/auth/ui/Login"
import Profile from "features/profile/ui/Profile"
import Users from "features/users/ui/Users"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { AppRootStateType } from "./store"
import MyAccount from "common/components/MyAccount/MyAccount"

function App() {
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
  const authUserId = useSelector((store: AppRootStateType) => store.auth.userData.id)
  const isInitialized = useSelector((store: AppRootStateType) => store.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [authUserId])

  return (
    <div className="App">
      <Header />
      <div className="navbar-content-wrapper">
        {!isInitialized && <LinearLoader />}

        <div className="navbar-content">
          {isLoggedIn ? <Navbar /> : <></>}
          <div className="content-wrapper">
            <div className="content">
              <Routes>
                {isInitialized &&
                  (isLoggedIn ? (
                    <>
                      <Route path={"/profile/:id"} element={<Profile />} />
                      <Route path={"/users"} element={<Users />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/account" element={<MyAccount />} />
                      <Route path="/*" element={<Page404 />} />
                    </>
                  ) : (
                    <>
                      <Route path="/login" element={<Login />} />
                      <Route path={"/profile/:id"} element={<Profile />} />
                      {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
                    </>
                  ))}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
