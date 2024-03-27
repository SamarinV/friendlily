import { useSelector } from "react-redux"
import s from "./Header.module.css"
import { AppRootStateType } from "app/store"
import LogoutIcon from "@mui/icons-material/Logout"
import Fab from "@mui/material/Fab"
import { Avatar, Button, Menu, MenuItem } from "@mui/material"
import { MouseEventHandler, useState } from "react"
import DefaultAvatar from "common/assets/defaultAvatar.png"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { authThunks } from "features/auth/model/auth.slice"
import { useEffect } from "react"
import { profileThunks } from "features/profile/model/profile.slice"
import BorderLoader from "../BorderLoader/BorderLoader"

const Header = () => {
  const isAuth = useSelector<AppRootStateType>((state) => state.auth.isLoggedIn)
  const userPhotoSmall = useSelector<AppRootStateType>((state) => state.auth.userData.smallPhoto)
	const dispatch = useAppDispatch()
	const userId = useSelector<AppRootStateType, number>((state) => state.auth.userData.id)
	const photoIsLoading = useSelector((store: AppRootStateType) => store.profile.photoIsLoading)


	
	

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

	const logoutHandler = () => {
		setAnchorEl(null)
		dispatch(authThunks.logout())
	}


	
  return (
    <div>
      <header className={s.header}>
        <div className={s.iconTitleWrapper}>
          <div className={s.icon}>
            <span>SN</span>
          </div>
          <span className={s.title}>Social Network</span>
        </div>
        {isAuth && (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ><div className={s.avatarWrapper}>

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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </header>
    </div>
  )
}

export default Header
