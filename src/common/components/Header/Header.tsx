import Logout from "@mui/icons-material/Logout"
import { Avatar, Button, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { AppRootStateType } from "app/store"
import DefaultAvatar from "common/assets/defaultAvatar.png"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { authThunks } from "features/auth/model/auth.slice"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import BorderLoader from "../BorderLoader/BorderLoader"
import s from "./Header.module.css"
import { useMediaQuery } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Navbar from "../Navbar/Navbar"

const Header = () => {
  const isAuth = useSelector<AppRootStateType>((state) => state.auth.isLoggedIn)
  const userPhotoSmall = useSelector<AppRootStateType>((state) => state.auth.userData.smallPhoto)
  const dispatch = useAppDispatch()
  const photoIsLoading = useSelector((store: AppRootStateType) => store.profile.photoIsLoading)
  const navigate = useNavigate()
  const location = useLocation()
	const isSmallScreen = useMediaQuery("(max-width: 760px)")
	const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const logoutHandler = () => {
    setAnchorEl(null)
    dispatch(authThunks.logout()).then(() => {
      navigate("/login")
    })
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const openProfileInfo = () => {
    handleClose()
    navigate("/account")
  }

	const openMenuHandler = () => {
		setIsOpenBurgerMenu(!isOpenBurgerMenu)
	}

  return (
    <div>
      <header className={s.header}>
        {isSmallScreen && (
          <>
            <div className={s.burgerMenuIcon} onClick={openMenuHandler}>
              <MenuIcon sx={{ width: "45px", height: "45px" }} />
            </div>
            <div className={`${s.menu} ${isOpenBurgerMenu ? s.openedMenu : ""}`}>
              <Navbar openMenuHandler={openMenuHandler} />
            </div>
            {isOpenBurgerMenu && <div className={s.overlay} onClick={openMenuHandler}></div>}
          </>
        )}

        <div className={s.iconTitleWrapper}>
          <div className={s.icon}>
            <span>SN</span>
          </div>
          <span className={s.title}>Social Network</span>
        </div>
        {isAuth ? (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <div className={s.avatarWrapper}>
                <BorderLoader loaderIsVisable={photoIsLoading}>
                  <Avatar
                    alt="Remy Sharp"
                    src={userPhotoSmall ? `${userPhotoSmall}` : `${DefaultAvatar}`}
                    sx={{ width: 56, height: 56 }}
                  />
                </BorderLoader>
              </div>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={openProfileInfo}>Мой аккаунт</MenuItem>
              <Divider />
              <MenuItem onClick={logoutHandler}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Выход
              </MenuItem>
            </Menu>
          </div>
        ) : location.pathname !== "/login" ? (
          <Button onClick={() => navigate("/login")}>Войти</Button>
        ) : null}
      </header>
    </div>
  )
}

export default Header
