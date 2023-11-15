import { v1 } from "uuid";

export type StateType = {
  user: UserType;
  posts: PostType[];
  chats: ChatsType;
};

export type UserType = {
  id: number;
  link: string;
  avatar: string;
  name: string;
  lastName: string;
  city: string;
  birthday: string;
  openedChatId: string;
};
export type PostType = {
  id: string;
  user: string;
  userAvatar: string;
  content: string;
  date: string;
};

export type ChatsType = {
  id: string;
  chatName: string;
  messages: MessageType[];
}[];

export type MessageType = {
  id: string;
  name: string;
  text: string;
};

export const state: StateType = {
  user: {
    id: 1,
    link: "",
    avatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
    name: "Владимир",
    lastName: "Самарин",
    city: "Геленджик",
    birthday: "18.08.1992",
    openedChatId: "",
  },

  posts: [
    {
      id: v1(),
      user: "Владимир",
      userAvatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
      content: "Что сделать",
      date: "17.06.2023",
    },
    {
      id: v1(),
      user: "Владимир",
      userAvatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
      content: "чтобы все заработало?",
      date: "17.06.2023",
    },
  ],
  chats: [
    {
      id: v1(),
      chatName: "Mr. Propper",
      messages: [
        {
          id: v1(),
          name: "Mr. Propper",
          text: "Уборку заказывали?",
        },
        {
          id: v1(),
          name: "Владимир",
          text: "Да!",
        },
        {
          id: v1(),
          name: "Mr. Propper",
          text: "Когда прийти?",
        },
        {
          id: v1(),
          name: "Владимир",
          text: "Завтра в 12:00",
        },
      ],
    },
    {
      id: v1(),
      chatName: "Юра",
      messages: [
        {
          id: v1(),
          name: "Юра",
          text: "Привет",
        },
        {
          id: v1(),
          name: "Владимир",
          text: "Привет!",
        },
        {
          id: v1(),
          name: "Юра",
          text: "Что, может по пивку?",
        },
        {
          id: v1(),
          name: "Владимир",
          text: "Давай по пивку",
        },
      ],
    },
  ],
};

const a = {
  [v1()]: {},
};
