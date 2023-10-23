import { NavLink, useParams } from "react-router-dom";
import Block from "../../components/Block/Block";
import s from "./MessagePage.module.css";
import { useState } from "react";

const messages = [
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
];

const MessagePage = () => {
  // const { id } = useParams();
  const [viewMessages, setViewMessages] = useState<any[]>([]);
  const findMessages = (id: number) => {
    const elem = messages.find((el) => el.id === id);
    elem && setViewMessages(elem.messages);
  };

  return (
    <div className={s.wrapper}>
      <Block>
        <div className={s.chatWrapper}>
          <h3 className={s.chatTitle}>Выберите чат</h3>
          {messages.map((chat) => {
            return (
              <NavLink
                key={chat.id}
                to={`${chat.id}`}
                onClick={() => findMessages(chat.id)}
                className={s.link}
              >
                {chat.id}. {chat.chatName}
              </NavLink>
            );
          })}
        </div>
      </Block>
      <Block>
        <div className={s.chatWrapper}>
          <h3 className={s.chatTitle}>Выбранный чат</h3>
          {viewMessages.map((item) => {
            return (
              <div key={item.id} className={s.message}>
                {item.name}: {item.text}
                <br></br>
              </div>
            );
          })}
        </div>
      </Block>
    </div>
  );
};

export default MessagePage;
