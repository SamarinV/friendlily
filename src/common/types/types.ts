import { v1 } from "uuid";

export type StateType = {
  user: UserType
  posts: PostType[]
  chats: ChatsType
}

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

export type BaseResponse<T> = {
  data: T
  fieldsErrors?: []
  messages: string[]
  resultCode: number
}
