import { NavLink } from "react-router-dom";
import Block from "../../components/Block/Block";
import s from "./MessagePage.module.css";
import { ChangeEvent, useState } from "react";
import { ReactComponent as IconChatWithoutUser } from "../../assets/chatWithoutUser.svg";
import Button from "../../components/Button/Button";

const user = {
  userId: 1,
  userName: "Владимир Самарин",
  openedChatId: "",
  chats: [
    {
      id: 1,
      chatName: "Mr. Propper",
      messages: [
        {
          id: 1,
          name: "Mr. Propper",
          text: "Уборку заказывали?",
        },
        {
          id: 2,
          name: "Владимир",
          text: "Да!",
        },
        {
          id: 3,
          name: "Mr. Propper",
          text: "Когда прийти?",
        },
        {
          id: 4,
          name: "Владимир",
          text: "Завтра в 12:00",
        },
      ],
    },

    {
      id: 2,
      chatName: "Юля",
      messages: [
        {
          id: 1,
          name: "Юля",
          text: "Привет",
        },
        {
          id: 2,
          name: "Владимир",
          text: "Привет",
        },
        {
          id: 3,
          name: "Юля",
          text: "Как дела?",
        },
        {
          id: 4,
          name: "Владимир",
          text: "Супер, а у тебя?",
        },
      ],
    },
    {
      id: 3,
      chatName: "Юра",
      messages: [
        {
          id: 1,
          name: "Юра",
          text: "Привет",
        },
        {
          id: 2,
          name: "Владимир",
          text: "Привет",
        },
        {
          id: 3,
          name: "Юря",
          text: "Что, бухаем сегодня?",
        },
        {
          id: 4,
          name: "Владимир",
          text: "Да, давай по пивку!",
        },
      ],
    },
  ],
};

const MessagePage = () => {
  const [userState, setUserState] = useState(user);
  const [viewMessages, setViewMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

  const openedChat = (id: any) => {
    const elem = userState.chats.find((el) => el.id === id);
    elem && setViewMessages(elem.messages);
    setUserState({ ...userState, openedChatId: id });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const sendMessage = () => {
    setUserState({ ...userState });
  };
  return (
    <div className={s.wrapper}>
      <Block>
        <div className={s.chatWrapper}>
          <h3 className={s.chatTitle}>Чаты</h3>
          {user.chats.map((chat) => {
            return (
              <NavLink
                key={chat.id}
                to={`${chat.id}`}
                onClick={() => openedChat(chat.id)}
                className={s.link}
              >
                {chat.id}. {chat.chatName}
              </NavLink>
            );
          })}
        </div>
      </Block>
      <Block>
        {viewMessages.length ? (
          <div className={s.chatWrapper}>
            <h3 className={s.chatTitle}>Выбранный чат</h3>
            {viewMessages.map((item) => {
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
              <Button name="Отправить" func={sendMessage} />
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
