import { Avatar, Button, Menu, MenuItem, TextField } from "@mui/material"
import { AppRootStateType } from "app/store"
import DefaultAvatar from "common/assets/defaultAvatar.png"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { authThunks } from "features/auth/model/auth.slice"
import { useFormik } from "formik"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import BorderLoader from "../BorderLoader/BorderLoader"
import ModalApp from "../ModalApp/ModalApp"
import s from "./Header.module.css"
import { UserProfileRequest } from "features/profile/api/profile-api"
import { profileThunks } from "features/profile/model/profile.slice"
import { useEffect } from "react"
import FormEditProfile from "../FormEditProfile/FormEditProfile"
import FormEditContacts from "../FormEditContacts/FormEditContacts"

const Header = () => {
  const isAuth = useSelector<AppRootStateType>((state) => state.auth.isLoggedIn)
  const userPhotoSmall = useSelector<AppRootStateType>((state) => state.auth.userData.smallPhoto)
  const dispatch = useAppDispatch()
  const userId = useSelector<AppRootStateType, number>((state) => state.auth.userData.id)
  const photoIsLoading = useSelector((store: AppRootStateType) => store.profile.photoIsLoading)

  const [isModalProfile, setIsModalProfile] = useState<boolean>(false)
	const [isModalContacts, setIsModalContacts] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutHandler = () => {
    setAnchorEl(null)
    dispatch(authThunks.logout())
  }

  const openModalEditProfile = () => {
    handleClose()
    setIsModalProfile(true)
  }

	  const openModalEditContacts = () => {
      handleClose()
      setIsModalContacts(true)
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
              <MenuItem onClick={openModalEditProfile}>Редактировать профиль</MenuItem>
              <MenuItem onClick={openModalEditContacts}>Мои контакты</MenuItem>
              <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
            </Menu>
          </div>
        )}
      </header>
      <ModalApp isOpenModal={isModalProfile} setIsOpenModal={setIsModalProfile}>
        <FormEditProfile setIsOpenModal={setIsModalProfile} />
      </ModalApp>
      <ModalApp isOpenModal={isModalContacts} setIsOpenModal={setIsModalContacts}>
        <FormEditContacts setIsOpenModal={setIsModalContacts} />
      </ModalApp>
    </div>
  )
}

export default Header
