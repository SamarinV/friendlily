import { NavLink } from "react-router-dom";
import Block from "../../components/Block/Block";
import s from "./MessagePage.module.css";
import { ChangeEvent, useState } from "react";
import { ReactComponent as IconChatWithoutUser } from "../../assets/chatWithoutUser.svg";
import Button from "../../components/Button/Button";
import { StateType } from "../../redux/state";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../redux/chatsSlice";

const MessagePage = () => {
  const dispatch = useDispatch();

  const chats = useSelector((store: StateType) => store.chats);
  const user = useSelector((store: StateType) => store.user);
  const [idOpenedChat, setIdOpenedChat] = useState("");
  const [inputValue, setInputValue] = useState("");

  const openedChat = (id: string) => {
    setIdOpenedChat(id);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const sendMessageHandler = () => {
    if (idOpenedChat) {
      dispatch(
        sendMessage({
          id: idOpenedChat,
          text: inputValue,
          userName: user.name,
        })
      );
      setInputValue("");
    }
  };

  return (
    <div className={s.wrapper}>
      <Block>
        <div className={s.chatWrapper}>
          <h3 className={s.chatTitle}>Чаты</h3>
          {chats.map((chat) => {
            return (
              <NavLink
                key={chat.id}
                to={`${chat.id}`}
                onClick={() => openedChat(chat.id)}
                className={s.link}
              >
                {chat.chatName}
              </NavLink>
            );
          })}
        </div>
      </Block>
      <Block>
        {idOpenedChat ? ( // Проверяем, выбран ли чат
          <div className={s.chatWrapper}>
            <h3 className={s.chatTitle}>Выбранный чат</h3>
            {chats
              .find((chat) => chat.id === idOpenedChat)
              ?.messages.map((item) => {
                return (
                  <div key={item.id} className={s.message}>
                    {item.name}: {item.text}
                  </div>
                );
              })}
            <div className={s.blockWithInput}>
              <input
                className={s.input}
                value={inputValue}
                onChange={(e) => onChangeHandler(e)}
                placeholder="Здесь можно написать сообщение..."
              />
              <Button name="Отправить" func={sendMessageHandler} />
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

export default MessagePage;
