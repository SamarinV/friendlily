import { NavLink } from "react-router-dom";
import Block from "../../components/Block/Block";
import s from "./MessagePage.module.css";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { ReactComponent as IconChatWithoutUser } from "../../assets/chatWithoutUser.svg";
import { StateType } from "../../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { changeInputValue, sendMessage } from "../../redux/chatsSlice";
import { Avatar, Button, Paper } from "@mui/material";
import React from "react";

type InputWithButtonType = {
  id: string;
};

const Input: React.FC<InputWithButtonType> = ({ id }) => {
  const dialogs = useSelector((store: StateType) => store.chats.dialogs);
  const user = useSelector((store: StateType) => store.user);
  const dispatch = useDispatch();

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeInputValue({ id, value: event.target.value }));
  };
  const sendHandler = () => {
    dispatch(
      sendMessage({
        id: id,
        text: dialogs && dialogs[id].inputValue,
        user: user,
      })
    );
    dispatch(changeInputValue({ id, value: "" }));
  };
  useEffect(() => {
    if (dialogs) {
      dispatch(changeInputValue({ id, value: dialogs[id].inputValue }));
    }
  }, [id]);
  return (
    <>
      <input
        className={s.input}
        type="text"
        value={dialogs && dialogs[id] ? dialogs[id].inputValue : ""}
        onChange={inputChange}
        placeholder="Здесь можно написать сообщение..."
      />
      <Button size="small" variant="contained" onClick={sendHandler}>
        Отправить
      </Button>
    </>
  );
};

const MessagePage = () => {
  const userDialogs = useSelector((store: StateType) => store.chats.users);
  const messages = useSelector((store: StateType) => store.chats.dialogs);
  const [idOpenedChat, setIdOpenedChat] = useState("");

  const openedChat = (id: string) => {
    setIdOpenedChat(id);
  };

  const selectedMessages = useMemo(() => {
    if (messages && messages[idOpenedChat] && messages[idOpenedChat].messages) {
      return messages[idOpenedChat].messages.map((item) => (
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
      ));
    }
    return null;
  }, [idOpenedChat, messages]);

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
            {selectedMessages}
            <div className={s.blockWithInput}>
              <Input id={idOpenedChat} />
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
