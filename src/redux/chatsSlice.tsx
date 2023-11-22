import { createSlice } from "@reduxjs/toolkit";
import { ChatsType } from "./state";
import { v1 } from "uuid";

const initialState: ChatsType = {};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    sendMessage: (state, action): ChatsType => {
      const { id, text, user } = action.payload;
      const findedChat = state.users?.find((user) => user.id === id);

      if (findedChat && state.dialogs) {
        const newMessage = {
          id: v1(),
          isMe: true,
          fullName: user.name + " " + user.lastName,
          link: "",
          avatar: user.avatar,
          message: text,
        };
        return {
          ...state,
          dialogs: {
            ...state.dialogs,
            [id]: {
              inputValue: "",
              messages: [...state.dialogs[id].messages, newMessage],
            },
          },
        };
      }

      return state; // Если чат не найден, возвращаем неизмененное состояние
    },
    changeInputValue: (state, action) => {
      const { id, value } = action.payload;
      const findedChat = state.users?.find((user) => user.id === id);
      if (findedChat && state.dialogs) {
        return {
          ...state,
          dialogs: {
            ...state.dialogs,
            [id]: {
              inputValue: value,
              messages: [...state.dialogs[id].messages],
            },
          },
        };
      }
    },
    removeChat: (state, action) => {
      // return state.filter((chat) => chat.id !== action.payload.id);
    },
  },
});

export const { sendMessage, changeInputValue, removeChat } = chatsSlice.actions;

export default chatsSlice.reducer;
