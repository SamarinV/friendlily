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

        // const copyDialogds = {
        //   // ...state.dialogs[chatIndex],
        //   // state.messages: [...state[chatIndex].messages, newMessage],
        //   dialogs: {
        //     ...state.dialogs,
        //     [id]: {
        //       inputValue: "AGA",
        //       messages: [...state.dialogs[id].messages, newMessage],
        //     },
        //   },
        // };

        // const updatedChats = {...state};
        // updatedChats[chatIndex] = updatedChat;
        // const users = { ...state.users, {} };

        // state.users?.sort(function (x) {
        //   return x.id === id ? -1 : 0;
        // });
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
    removeChat: (state, action) => {
      // return state.filter((chat) => chat.id !== action.payload.id);
    },
  },
});

export const { sendMessage, removeChat } = chatsSlice.actions;

export default chatsSlice.reducer;
