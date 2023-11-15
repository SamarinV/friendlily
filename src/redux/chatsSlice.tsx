import { createSlice } from "@reduxjs/toolkit";
import { ChatsType } from "./state";
import { v1 } from "uuid";

const initialState: ChatsType = [];

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const { id, userName, text } = action.payload;
      const chatIndex = state.findIndex((chat) => chat.id === id);

      if (chatIndex !== -1) {
        const newMessage = {
          id: v1(),
          name: userName,
          text: text,
        };

        const updatedChat = {
          ...state[chatIndex],
          messages: [...state[chatIndex].messages, newMessage],
        };

        const updatedChats = [...state];
        updatedChats[chatIndex] = updatedChat;
        return updatedChats; // Возвращаем новый массив чатов
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
