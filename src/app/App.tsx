import Header from "common/components/Header/Header"
import LinearLoader from "common/components/LinearLoader/LinearLoader"
import MyAccount from "common/components/MyAccount/MyAccount"
import Navbar from "common/components/Navbar/Navbar"
import Page404 from "common/components/Page404/Page404"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { authThunks } from "features/auth/model/auth.slice"
import Login from "features/auth/ui/Login"
import Dialogs from "features/dialogs/ui/Dialogs"
import Profile from "features/profile/ui/Profile"
import Users from "features/users/ui/Users"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { AppRootStateType } from "./store"

function App() {
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
  const authUserId = useSelector((store: AppRootStateType) => store.auth.userData.id)
  const isInitialized = useSelector((store: AppRootStateType) => store.app.isInitialized)
	const isLoading = useSelector((store: AppRootStateType) => store.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [authUserId])

  return (
    <div className="App">
      <Header />
      <div className="navbar-content-wrapper">
        {isLoading === "loading" && <LinearLoader />}

        <div className="navbar-content">
          {isLoggedIn ? <Navbar /> : <></>}
          <div className="content-wrapper">
            <div className="content">
              <Routes>
                {isInitialized &&
                  (isLoggedIn ? (
                    <>
                      <Route path={"/"} element={<Login />} />
                      <Route path={"/profile"} element={<Login />} />
                      <Route path={"/profile/:id"} element={<Profile />} />
                      <Route path={"/users"} element={<Users />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/dialogs" element={<Dialogs />} />
                      <Route path="/dialogs/:id" element={<Dialogs />} />
                      <Route path="/account" element={<MyAccount />} />
                      <Route path="/*" element={<Page404 />} />
                    </>
                  ) : (
                    <>
                      <Route path="/login" element={<Login />} />
                      <Route path={"/profile/:id"} element={<Profile />} />
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
