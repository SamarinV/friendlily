import Logout from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import { Avatar, Button, Divider, ListItemIcon, Menu, MenuItem, useMediaQuery } from "@mui/material"
import DefaultAvatar from "common/assets/defaultAvatar.png"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { selectorAuthUserPhotoSmall, selectorIsLoggedIn } from "features/auth/model/auth.selectors"
import { authThunks } from "features/auth/model/auth.slice"
import { selectorProfilePhotoLoading } from "features/profile/model/profile.selectors"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import BorderLoader from "../BorderLoader/BorderLoader"
import Navbar from "../Navbar/Navbar"
import s from "./Header.module.scss"

const Header = () => {
  const userPhotoSmall = useSelector(selectorAuthUserPhotoSmall)
  const isLoggedIn = useSelector(selectorIsLoggedIn)
  const photoIsLoading = useSelector(selectorProfilePhotoLoading)
  const dispatch = useAppDispatch()
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
        {isSmallScreen && isLoggedIn && (
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
        {isLoggedIn ? (
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
function selectorPhotoIsLoading(state: unknown): unknown {
  throw new Error("Function not implemented.")
}
