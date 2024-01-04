import s from "./ProfilePage.module.css";
import Posts from "../../components/Posts/Posts";
import Block from "../../components/Block/Block";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AppRootStateType } from "../../redux/store";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfileTC } from "../../redux/profileReducer";
import UserLogo from "../../assets/user.png";

const ProfilePage = () => {
  const user = useSelector((store: AppRootStateType) => store.profile.user);
  const dispatch = useDispatch<any>();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setProfileTC(Number(id)));
  }, [id]);

  if (!user) {
    //ошибка если пользователь не найден
    return null;
  }
  //убираем соцсети и контакты пользователя с пустыми значениями
  const contactsWithValue = Object.entries(user.contacts).filter((el) => {
    return el[1] !== null && el[1] !== "";
  });
  //делаем из них массив JSX элементов
  const contacts = contactsWithValue.map((el, index) => {
    return (
      <div key={index}>
        {el[0]}:{" "}
        <a className={s.link} href={`${el[1]}`}>
          {el[1]}
        </a>
      </div>
    );
  });
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
            {user.lookingForAJobDescription === ""
              ? `${user.lookingForAJobDescription}`
              : "не указано"}
          </div>

          <div className={s.contacts}>Контакты: </div>
          {contactsWithValue.length ? (
            contacts
          ) : (
            <span>Контакты не указаны</span>
          )}
        </div>
      </Block>
      <Posts />
    </div>
  );
};

export default React.memo(ProfilePage);
