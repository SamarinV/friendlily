import { NavLink } from "react-router-dom";
import Block from "../../components/Block/Block";
import s from "./MessagePage.module.css";
import { useState } from "react";
import { ReactComponent as IconChatWithoutUser } from "../../assets/chatWithoutUser.svg";
import { StateType } from "../../redux/state";
import { useSelector } from "react-redux";
import { sendMessage } from "../../redux/chatsSlice";
import { Avatar, Paper } from "@mui/material";
import React from "react";
import InputWithButton from "../../components/InputWithButton/InputWithButton";

const MessagePage = () => {
  const userDialogs = useSelector((store: StateType) => store.chats.users);
  const messages = useSelector((store: StateType) => store.chats.dialogs);
  const [idOpenedChat, setIdOpenedChat] = useState("");

  const openedChat = (id: string) => {
    setIdOpenedChat(id);
  };
  return (
    <div className={s.wrapper}>
      <Block>
        <div className={s.chatWrapper}>
          <h3 className={s.chatTitle}>Чаты</h3>
          {userDialogs &&
            userDialogs.map((chat) => {
              return (
                <NavLink
                  key={chat.id}
                  to={`${chat.id}`}
                  onClick={() => openedChat(chat.id)}
                  className={s.link}
                >
                  {chat.fullName}
                </NavLink>
              );
            })}
        </div>
      </Block>
      <Block>
        {idOpenedChat ? ( // Проверяем, выбран ли чат
          <div className={s.chatWrapper}>
            <h3 className={s.chatTitle}>Выбраный чат</h3>
            {messages &&
              messages[idOpenedChat].messages.map((item) => {
                return (
                  <Paper
                    elevation={3}
                    key={item.id}
                    className={`${s.messageBlock} ${item.isMe && s.myMessages}`}
                  >
                    <Avatar alt={item.fullName} src={item.avatar} />
                    <div className={s.margin}></div>
                    <div className={s.messageNameAndText}>
                      <span>{item.fullName}:</span>
                      <span className={s.text}>{item.message}</span>
                    </div>
                  </Paper>
                );
              })}
            <div className={s.blockWithInput}>
              <InputWithButton
                id={idOpenedChat}
                placeholder="Здесь можно написать сообщение..."
                buttonName="Отправить"
                actionCreator={sendMessage}
              />
            </div>
          </div>
        ) : (
          <span className={s.chatWithoutUser}>
            Выберите чат
            <IconChatWithoutUser className={s.iconWithoutUser} />
          </span>
        )}
      </Block>
    </div>
  );
};

export default React.memo(MessagePage);
