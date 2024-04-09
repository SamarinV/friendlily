import EditIcon from "@mui/icons-material/Edit"
import { Button, ButtonGroup, IconButton, Tooltip } from "@mui/material"
import { styled } from "@mui/material/styles"
import { AppRootStateType } from "app/store"
import DefaultAvatar from "common/assets/defaultAvatar.png"
import Block from "common/components/Block/Block"
import BorderLoader from "common/components/BorderLoader/BorderLoader"
import FormEditProfile from "features/profile/ui/FormEditProfile/FormEditProfile"
import ModalApp from "common/components/ModalApp/ModalApp"
import UserContacts from "features/profile/ui/UserContacts/UserContacts"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { profileThunks } from "../model/profile.slice"
import s from "./Profile.module.css"
import Status from "./Status/Status"
import { dialogsThunks } from "features/dialogs/model/dialog.slice"

const ProfilePage = () => {
  const user = useSelector((store: AppRootStateType) => store.profile.user)
  const photoIsLoading = useSelector((store: AppRootStateType) => store.profile.photoIsLoading)
  const authUserId = useSelector((store: AppRootStateType) => store.auth.userData.id)
  const appStatus = useSelector((store: AppRootStateType) => store.app.status)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [isModalProfile, setIsModalProfile] = useState<boolean>(false)
  const navigate = useNavigate()
  const isMyProfile = authUserId == Number(id) ? true : false

  useEffect(() => {
    if (!id) {
      navigate(`/profile/${authUserId}`)
    }
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(profileThunks.fetchProfile(Number(id)))
      dispatch(profileThunks.getStatus(Number(id)))
    }
  }, [id])

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(profileThunks.savePhoto(e.target.files[0]))
    }
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  })

  const openPhotoHandler = (photoUrl: string) => {
    if (photoUrl) {
      setIsOpenModal(true)
    }
  }

  const openModalEditProfile = () => {
    setIsModalProfile(true)
  }

  const openDialogHandler = () => {
    dispatch(dialogsThunks.createNewChat(Number(id))).then(() => {
      navigate(`/dialogs/${id}`)
    })
  }

  if (appStatus === "loading") {
    return <></>
  }
  return (
    <div className={s.wrapper}>
      <Block withImage={true}>
        <div className={s.profileWrapper}>
          <div className={s.userPhotoWrapper}>
            <BorderLoader loaderIsVisable={photoIsLoading}>
              <img
                className={`${s.img} ${s.imgIsloading}`}
                src={user.photos.large ? `${user.photos.large}` : `${DefaultAvatar}`}
                alt="Фото пользователя"
                onClick={() => openPhotoHandler(user.photos.large)}
              />
            </BorderLoader>

            {isMyProfile && !photoIsLoading && (
              <Tooltip title="Загрузить новое фото" placement="top">
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    opacity: "0",
                    transition: "0.6s",
                    border: "1px solid blue",
                  }}
                  aria-label="edit"
                  color="primary"
                  component="label"
                >
                  <EditIcon />
                  <VisuallyHiddenInput type="file" accept="image/*" onChange={onImageChange} />
                </IconButton>
              </Tooltip>
            )}
            {!isMyProfile && (
              <Button onClick={openDialogHandler} sx={{ marginTop: "20px" }} fullWidth variant="contained">
                Написать сообщение
              </Button>
            )}
          </div>

          <div className={s.person}>
            <div className={s.fullName}>
              {user.fullName}{" "}
              {isMyProfile ? (
                <Tooltip title="Редактировать профиль" placement="top">
                  <IconButton
                    onClick={openModalEditProfile}
                    sx={{ border: "1px solid grey" }}
                    aria-label="edit"
                    color="primary"
                    component="label"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
            </div>
            <div>
              <Status />
            </div>

            <div className={s.aboutUser}>{user.lookingForAJob ? "Ищу работу" : "Работу не ищу"}</div>

            <div className={s.aboutUser}>
              Рассматриваю вакансии: <span className={s.aboutUserText}>{user.lookingForAJobDescription}</span>
            </div>
            <div className={s.aboutUser}>
              Обо мне: <span className={s.aboutUserText}>{user.aboutMe}</span>
            </div>

            <div className={s.contacts}>Контакты: </div>
            <UserContacts />
          </div>
        </div>
      </Block>

      <ModalApp isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <img src={user.photos.large} alt="Фото пользователя" />
      </ModalApp>
      <ModalApp isOpenModal={isModalProfile} setIsOpenModal={setIsModalProfile}>
        <FormEditProfile setIsOpenModal={setIsModalProfile} />
      </ModalApp>
    </div>
  )
}

export default React.memo(ProfilePage)
