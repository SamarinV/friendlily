import s from "./ProfilePage.module.css";
import Posts from "../../components/Posts/Posts";
import Block from "../../components/Block/Block";
import { useSelector } from "react-redux";
import { StateType } from "../../redux/state";
import { useEffect } from "react";
import React from "react";

const ProfilePage = () => {
  const user = useSelector((store: StateType) => store.user);
  return (
    <div className={s.wrapper}>
      <Block>
        <img className={s.img} src={user.avatar} alt="Фото пользователя" />
        <div className={s.person}>
          <div className={s.description}>
            <span>
              {user.name} {user.lastName}
            </span>
          </div>
          <div className={s.description}>
            <span>Город: {user.city}</span>
          </div>
          <div className={s.description}>
            <span>Дата рождения: {user.birthday}</span>
          </div>
        </div>
      </Block>
      <Posts />
    </div>
  );
};

export default React.memo(ProfilePage);
