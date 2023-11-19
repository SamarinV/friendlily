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
  message: string;
  date: string;
};

export type UserInChatsType = {
  id: string;
  fullName: string;
  avatar: string;
}[];

export type DialogType = {
  inputValue: string;
  messages: MessageType[];
};

export type MessageType = {
  id: string;
  isMe: boolean;
  fullName: string;
  link: string;
  avatar: string;
  message: string;
};

export type ChatsType = {
  users?: UserInChatsType;
  dialogs?: Record<string, DialogType>;
};

const idForMessages1 = v1();
const idForMessages2 = v1();

const mainUser = {
  id: 1,
  link: "",
  avatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
  name: "Владимир",
  lastName: "Самарин",
  city: "Геленджик",
  birthday: "18.08.1992",
  openedChatId: "",
};

export const state: StateType = {
  user: mainUser,

  posts: [
    {
      id: v1(),
      user: "Владимир",
      userAvatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
      message: "Что сделать",
      date: "17.06.2023",
    },
    {
      id: v1(),
      user: "Владимир",
      userAvatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
      message: "чтобы все заработало?",
      date: "17.06.2023",
    },
  ],

  chats: {
    users: [
      { id: idForMessages1, fullName: "Mr.Propper", avatar: "" },
      { id: idForMessages2, fullName: "Юра Славянов", avatar: "" },
    ],
    dialogs: {
      [idForMessages1]: {
        inputValue: "",
        messages: [
          {
            id: v1(),
            isMe: false,
            fullName: "Mr.Propper",
            link: "",
            avatar: "",
            message: "Уборку заказывали?",
          },
          {
            id: v1(),
            isMe: true,
            fullName: mainUser.name + " " + mainUser.lastName,
            link: "",
            avatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
            message: "Да, сегодня можете прийти?",
          },
          {
            id: v1(),
            isMe: false,
            fullName: "Mr. Propper",
            link: "",
            avatar: "",
            message: "Могу прийти сегодня к 18 часам",
          },
          {
            id: v1(),
            isMe: true,
            fullName: mainUser.name + " " + mainUser.lastName,
            link: "",
            avatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
            message: "Хорошо, буду ждать",
          },
        ],
      },
      [idForMessages2]: {
        inputValue: "",
        messages: [
          {
            id: v1(),
            isMe: false,
            fullName: "Юра Славянов",
            link: "",
            avatar: "",
            message: "Может сегодня по пивку?",
          },
          {
            id: v1(),
            isMe: true,
            fullName: mainUser.name + " " + mainUser.lastName,
            link: "",
            avatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
            message: "Не, я бросил",
          },
          {
            id: v1(),
            isMe: false,
            fullName: "Юра Славянов",
            link: "",
            avatar: "",
            message: "Не может быть...",
          },
          {
            id: v1(),
            isMe: true,
            fullName: mainUser.name + " " + mainUser.lastName,
            link: "",
            avatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
            message: "Да я шучу, уже еду",
          },
        ],
      },
    },
  },
};
