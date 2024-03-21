import { AppRootStateType } from "app/store"
import Block from "common/components/Block/Block"
import Posts from "common/components/Posts/Posts"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { profileThunks } from "../model/profile.slice"
import s from "./Profile.module.css"
import UserLogo from "./assets/user.png"

const ProfilePage = () => {
  const user = useSelector((store: AppRootStateType) => store.profile.user)
  const dispatch = useAppDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(profileThunks.setProfile(Number(id)))
  }, [id])

  if (!user) {
    return <h1>ASS</h1>
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
  return (
    <div className={s.wrapper}>
      <Block>
        <img
          className={s.img}
          src={user.photos.large ? `${user.photos.large}` : `${UserLogo}`}
          alt="Фото пользователя"
        />
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
    </div>
  )
}

export default React.memo(ProfilePage)
