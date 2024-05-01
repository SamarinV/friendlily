import EditIcon from "@mui/icons-material/Edit"
import { Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import { styled } from "@mui/material/styles"
import { selectorAppStatus } from "app/appSelectors"
import DefaultAvatar from "common/assets/defaultAvatar.png"
import BorderLoader from "common/components/BorderLoader/BorderLoader"
import ModalApp from "common/components/ModalApp/ModalApp"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { selectorAuthUserId } from "features/auth/model/auth.selectors"
import { dialogsThunks } from "features/dialogs/model/dialog.slice"
import FormEditProfile from "features/profile/ui/FormEditProfile/FormEditProfile"
import UserContacts from "features/profile/ui/UserContacts/UserContacts"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { selectorProfilePhotoLoading, selectorProfileUserData } from "../model/profile.selectors"
import { profileThunks } from "../model/profile.slice"
import FormEditContacts from "./FormEditContacts/FormEditContacts"
import s from "./Profile.module.scss"
import Status from "./Status/Status"

const ProfilePage = () => {
  const user = useSelector(selectorProfileUserData)
  const photoIsLoading = useSelector(selectorProfilePhotoLoading)
  const authUserId = useSelector(selectorAuthUserId)
  const appStatus = useSelector(selectorAppStatus)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const dispatch = useAppDispatch()
  const { id } = useParams()
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

  const openDialogHandler = () => {
    dispatch(dialogsThunks.createNewChat(Number(id))).then(() => {
      navigate(`/dialogs/${id}`)
    })
  }
  const openPhotoHandler = (photoUrl: string) => {
    if (photoUrl) {
      setIsOpenModal(true)
    }
  }

  const openDownloadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(profileThunks.savePhoto(e.target.files[0]))
    }
  }

  //Menu edit profile
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [isOpenModalProfile, setIsOpenModalProfile] = useState<boolean>(false)
  const [isOpenModalContacts, setIsOpenModalContacts] = useState<boolean>(false)
  const handleOpenTooltip = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseToltip = () => {
    setAnchorEl(null)
  }
  const openModalEditProfile = () => {
    handleCloseToltip()
    setIsOpenModalProfile(true)
  }
  const openModalEditContacts = () => {
    handleCloseToltip()
    setIsOpenModalContacts(true)
  }

  if (appStatus === "loading") {
    return <></>
  }
  return (
    <div className={s.wrapper}>
      <div className={s.profileWrapper}>
        <div className={s.person}>
          <div className={`${s.fullName} ${s.paddingLeft}`}>
            {user.fullName}{" "}
            {isMyProfile && (
              <>
                <button className={`${s.buttonEdit} ${s.buttonEditProfile}`} onClick={handleOpenTooltip}>
                  <Tooltip title="Редактировать профиль" placement="top">
                    <EditIcon />
                  </Tooltip>
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseToltip}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={openModalEditProfile}>Изменить профиль</MenuItem>
                  <MenuItem onClick={openModalEditContacts}>Изменить контакты</MenuItem>
                </Menu>
              </>
            )}
          </div>
          <div className={s.paddingLeft}>
            <Status />
          </div>
          <div className={`${s.contacts} ${s.paddingLeft}`}>
            <UserContacts />
            {!isMyProfile && (
              <Button onClick={openDialogHandler} variant="contained">
                Написать сообщение
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className={s.blockWidthPhoto}>
        {" "}
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
                  top: "5px",
                  right: "5px",
                  opacity: "0",
                  transition: "0.5s",
                  color: "black",
                }}
                aria-label="edit"
                color="primary"
                component="label"
              >
                <EditIcon />
                <VisuallyHiddenInput type="file" accept="image/*" onChange={openDownloadPhoto} />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
      <div className={s.aboutMe}>
        <div className={s.aboutUser}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADF0lEQVR4nO2awW7TMBjHDQeeYhP4axESJ7ii8QSMZ+qRxc4BxFugajfGvRNnQOKEuDV2d9gk2AsUuWvRKG2TOln82f7/JB9qqc5n/+IvdmIhAAAAAAAAAAAAAAAAAAAAwN4MyuqQtBlLba5J23mIIrW5ltqePiqqJ1krXMhQ9iqUCFovyl4NT6YHIlfczFjeoR9DDsTwZHoglTm7EWM+iFxZpSkOd+VgkTrtXCrzW+TKKlX8/R0gfUltf2yLJzv+ExJ4MAhCIIQVHGaIRMriJYTWrh86bQYFQpgLuZ0++oxBbImnKVLZzzs2m+ciFjikCOpASN3SWsRCakJEw3q2xJay5K7UlKIQ7qss2jM1QUhPQtrWsyXWGSJa1rMFQpgBIfxXWZd9vHKnf1+/X26Lpy5e33q2cAuYIARCWNF3eqKGpS7etvVs4RYw5S6E4yEH0uZXxkLs6WKlo8yZG5BQcQzK6lBq82kpZJytEHdSkNtBOSqmj7MV4nDpyh1Oc+ehQomQi2ub8S4Z2QjZh307SB0PCIQIIZ6Ovj+Q2hakjPUVQtoaqeyJa6srIYtvI8vPs03qk8EN5FqKmTT9Lyl7vvbfN21iuT3Ay7YnTeuTwd3drlODsnrh3UZpjlYzpWUseIaQMheLgSjNke9AysK8vFlFmQsI2eObdFZFMTgeFHwQNK8S2keaD7mYx4FNIIFhMw5sAgkMm3EInbOJWQntY9NGLecyEdzYdKf0cffQHV4jVJ86AUKYwV7IaH6flH0vtfkplX3nfvu0jRlSQ9MBkrp6Tdp+eaiqZ6TsV1nMjn3ahpCuhBSzYydiWFbPSdtvpGevfNqGkA5TlktVy5T1Vszn93zahpAasMqK9aHuAWaIB31s/DZdT3AHM4QZEMIM9kJG2BiyEiKxMez3Fb2oE4KNIS8hAhtDXinLByx7PYAQpjOEsDFkIkTd/afkvvvUCVEHn2Kfog4+xT5FHXyKfYo6+BT7FHXwKfYp6uBT7FPUwafYp1bvmZgSdZ92bND4nXvNuE8AAAAAAAAAAAAAAAAAAAAiEH8A+Z6SMRvID38AAAAASUVORK5CYII="></img>
          <div className={s.aboutJob}>
            {user.lookingForAJob ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <h4>Ищу работу</h4>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACZklEQVR4nO2Wz2sTQRTHF/Qv0PoveKk/8KT2kpuYzmzmrXapTVEPQlVsizFtURHjyb/Aa22s4CElM5uQVqQtsdDYQgMFQRStP8CDBxX0KCSOvKVV2szszJrc9MGDhd15n30z33nvOc5/i7BENbG7V7AeUvQGaZDKoIfPHI7jO6fTRoreYcrhARXsKxUgVU4E+4LfuCX3UNtAWqZdhMM0EaypAyp+oEkFywOHvX+b5QHC4Z0tsNXZW4wRG0o5fNcFzcym5cvauLz75LwJ/s0tud1WUNwiKthGVMCZ6mUp63fkx5Ub5q3n8P5kwd9nBFPBHkYFgsCTn1ZvhuAPK9dttz0fCUVFmoRUrg6HUPTV5Yy14FJB6og+2/DK6ANML178DUW/N3/BWmyEw5QSigUgvIuahY8WL22DNuo5+bw2Jtdr2W1eqQ5LJjzlPU+oigxWJB10Ym5Q/lz7AzX51dm0Mo5b9I61gMPSZ3GuJm/Wc7KvdEoN5jCgUvOYDrywNGoNRh+q9OtElm3NWLBsJ8B4JOfKvlpkHK6pMk53Ary+nI26z/2xxBUH/PjpiBbsqsTlF/xdhMNn1YL5pRG7ba7n5GhFrWiiu06b251XLZpcGLIC/1i7HVVA7js6Swp2kAjW2LmoLzgtX9TGjeDXzyZ02TaMLVKXtRuAvFI5I2/NnVU6FhlsIBpRTTomO1Hw9xAOb2xrsMnDYaJMuxwbw+aNTbx9cIxBYMuSHPYTDq/agG7Ehu6YRvIxh70GKhiPzGnXkqh2DlNRbRNrQPhN3AHPxrDIYPXBLrM10ONzb5A6iu+sgjj/qv0CXrQb4vgbW0AAAAAASUVORK5CYII="></img>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <h4>Работу не ищу</h4>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC+UlEQVR4nK2XW0iUQRTHP6iX6qkbUUjO7GXm202FStLKCxZqanbRLi8SZSWKl1B6SMWISAuhInrsqaeotx7D0NZeJbo4s+uV0tYiwhLKIBcmzrf1ra7f7M7YDhx22W/O/PbM/Oec8xmGxhj1eDYzl7ecYVrLEbkKBt/htxAhm4xUjtdbstYxRC9xRAcZphGOqXCyv88CDNGWoa27164YOFBYuJql03qGyYwMJv8TJBxEZh2soQUdTvNv4Ig+1wU6WACORwnKsUk4ouMpgEYNkVHm8nkVIiVjKYPGzn9SKj7rTDHpTzU0FjntE4axahmYuUiDzGl0104xdbJEhM9WinBtpfU5daJETJbki/GcbBH0+Oy5b9w+8coTtXcuMw7uvbj8ykjU++HoAbHQ3y0ig7ektjDQI+Yft4vvdxpEZ0WxqKkqt+xuwf54tc8AKxYt3FNJtN966xJC463j2CEbfLsgb9l6w4g2x5SM6EsnKGzl777ulIIZJi8sKKhNlpFmuy9oQdXANGIpHPKsbJtBSKkG8+h2HzEYJucdwS7TEowuuFMBzDFpM6wqI4n458PL+uDjycEM0+sA7pKB5+43KQPnn3SIL+01orfsoGiuKLbswd5cOZhJtjrkzxSRwE016KMrImT6NTIZaTNYOimTTZjtUVP19OlSrfQZxLTS4NvMjRyRBdmkibwcMVG0z7b3FUVLoL+edomgOy41JjD27zpFSyENqDpOnypdAv5UX6UVLcOkf3HKbFF1/LFI6V+vnRPcHSsQamY22eCptLQ1DNHpZE6TxXk2dO5eo1hJSzQU349Bj5TM8XNjtQ2GsqgPprWOjQAU60SO4TOHbfDYnmzdaJ85NgIw3m7PXA89ksx5ZEeWpWIAh3wZ6lBERmBtR2isE/F5E8IzMsV4fq4WdNjt9ySELo088barbm/SSOMHnAf0SKDEFYjoI6Ri6ZkaCgPkD+0KdA7JXmEYJgNwT//rFcZpQHqFIs4xaeWI3LAMk1bIvfBMZ7E/A3Ncd9X4+LIAAAAASUVORK5CYII="></img>
              </div>
            )}
            <h4>
              Рассматриваю вакансии: <span className={s.aboutUserText}>{user.lookingForAJobDescription}</span>
            </h4>
          </div>
        </div>
        <div className={s.aboutUser}>
          <img src="data:image/png;base64,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"></img>
          <h4>
            Обо мне: <span className={s.aboutUserText}>{user.aboutMe}</span>
          </h4>
        </div>
      </div>

      <ModalApp isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <img src={user.photos.large} alt="Фото пользователя" />
      </ModalApp>
      <ModalApp isOpenModal={isOpenModalProfile} setIsOpenModal={setIsOpenModalProfile}>
        <FormEditProfile setIsOpenModal={setIsOpenModalProfile} />
      </ModalApp>
      <ModalApp isOpenModal={isOpenModalContacts} setIsOpenModal={setIsOpenModalContacts}>
        <FormEditContacts setIsOpenModal={setIsOpenModalContacts} />
      </ModalApp>
    </div>
  )
}

export default React.memo(ProfilePage)
