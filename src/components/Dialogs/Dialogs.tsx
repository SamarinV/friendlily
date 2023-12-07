import React, { Dispatch, SetStateAction } from "react";
import Block from "../Block/Block";
import { NavLink } from "react-router-dom";
import { StateType } from "../../redux/state";
import s from "./Dialogs.module.css";
import { useSelector } from "react-redux";

type PropsType = {
  setIdOpenedChat: Dispatch<SetStateAction<string>>;
};
const Dialogs = (props: PropsType) => {
  const dialogs = useSelector((store: StateType) => store.chats.users);
  return (
    <Block>
      <div className={s.chatWrapper}>
        <h3 className={s.chatTitle}>Чаты</h3>
        {dialogs &&
          dialogs.map((dialog) => {
            return (
              <NavLink
                key={dialog.id}
                to={`${dialog.id}`}
                onClick={() => props.setIdOpenedChat(dialog.id)}
                className={s.link}
              >
                {dialog.fullName}
              </NavLink>
            );
          })}
      </div>
    </Block>
  );
};

export default React.memo(Dialogs);
