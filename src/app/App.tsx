import { useMediaQuery } from "@mui/material"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { Footer } from "common/components/Footer/Footer"
import Header from "common/components/Header/Header"
import LinearLoader from "common/components/LinearLoader/LinearLoader"
import MyAccount from "common/components/MyAccount/MyAccount"
import Navbar from "common/components/Navbar/Navbar"
import Page404 from "common/components/Page404/Page404"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { selectorAuthUserId, selectorIsLoggedIn } from "features/auth/model/auth.selectors"
import { authThunks } from "features/auth/model/auth.slice"
import Login from "features/auth/ui/Login"
import Dialogs from "features/dialogs/ui/Dialogs"
import Profile from "features/profile/ui/Profile"
import Users from "features/users/ui/Users"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { selectorAppIsInitialized, selectorAppIsLoading } from "./appSelectors"

function App() {
  const isLoggedIn = useSelector(selectorIsLoggedIn)
  const authUserId = useSelector(selectorAuthUserId)
  const isInitialized = useSelector(selectorAppIsInitialized)
  const isLoading = useSelector(selectorAppIsLoading)
  const dispatch = useAppDispatch()
  const isMediumScreen = useMediaQuery("(max-width: 760px)")

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [authUserId])

  return (
    <div className="App">
      <ErrorSnackbar />
      <Header />
      <div className="navbar-content-wrapper">
        {isLoading === "loading" && <LinearLoader />}
        {isInitialized ? (
          <div className="navbar-content">
            {isInitialized && isLoggedIn ? (
              <>
                {isLoggedIn && !isMediumScreen ? <Navbar /> : <></>}
                <div className="content-wrapper">
                  <div className="content">
                    <Routes>
                      <Route path={"#/"} element={<Login />} />
                      <Route path={"profile"} element={<Login />} />
                      <Route path={"profile/:id"} element={<Profile />} />
                      <Route path={"users"} element={<Users />} />
                      <Route path="login" element={<Login />} />
                      <Route path="dialogs" element={<Dialogs />} />
                      <Route path="dialogs/:id" element={<Dialogs />} />
                      <Route path="account" element={<MyAccount />} />
                      <Route path="*" element={<Page404 />} />
                    </Routes>
                  </div>
                </div>
              </>
            ) : (
              <div className="wrapper-login">
                <Routes>
                  <Route path="login" element={<Login />} />
                  <Route path="*" element={<Navigate to={"login"} />} />
                </Routes>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      {isInitialized && <Footer />}
    </div>
  )
}

export default App
