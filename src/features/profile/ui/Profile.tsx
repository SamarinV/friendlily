import EditIcon from "@mui/icons-material/Edit"
import { Fab } from "@mui/material"
import { AppRootStateType } from "app/store"
import DefaultAvatar from "common/assets/defaultAvatar.png"
import Block from "common/components/Block/Block"
import ModalApp from "common/components/ModalApp/ModalApp"
import Posts from "common/components/Posts/Posts"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { profileThunks } from "../model/profile.slice"
import EditPhoto from "./EditPhoto"
import s from "./Profile.module.css"

const ProfilePage = () => {
  const user = useSelector((store: AppRootStateType) => store.profile.user)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const dispatch = useAppDispatch()
  const { id } = useParams()

  useEffect(() => {
			dispatch(profileThunks.setProfile(Number(id)))
  }, [id])

  if (!user) {
    return <></>
  }

  const contactsWithValue = Object.entries(user.contacts).filter((el) => {
    return el[1] !== null && el[1] !== ""
  })

  const contacts = contactsWithValue.map((el, index) => {
    return (
      <div key={index}>
        {el[0]}:{" "}
        <a className={s.link} href={`${el[1]}`}>
          {el[1]}
        </a>
      </div>
    )
  })

  const openModalHandler = () => {
    setIsOpenModal(true)
  }

  return (
    <div className={s.wrapper}>
      <Block>
        <div className={s.userPhotoWrapper}>
          <img
            className={s.img}
            src={user.photos.large ? `${user.photos.small}` : `${DefaultAvatar}`}
            alt="Фото пользователя"
          />
          <Fab
            onClick={openModalHandler}
            sx={{ position: "absolute", bottom: "5px", right: "5px" }}
            size="small"
            color="secondary"
            aria-label="edit"
          >
            <EditIcon />
          </Fab>
        </div>

        <div className={s.person}>
          <div className={s.fullName}>{user.fullName}</div>
          <div>Ищу работу: {user.lookingForAJob ? "да" : "нет"}</div>
          <div>
            Интересуемая вакансия:{" "}
            {user.lookingForAJobDescription === "" ? `${user.lookingForAJobDescription}` : "не указано"}
          </div>

          <div className={s.contacts}>Контакты: </div>
          {contactsWithValue.length ? contacts : <span>Контакты не указаны</span>}
        </div>
      </Block>
      <Posts />

      <ModalApp isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} modalHeaderText="Загрузка новой фотографии">
        <EditPhoto />
      </ModalApp>
    </div>
  )
}

export default React.memo(ProfilePage)
