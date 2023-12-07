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

      return state;
    },
    removeChat: (state, action) => {
      // TODO
    },
  },
});

export const { sendMessage, removeChat } = chatsSlice.actions;

export default chatsSlice.reducer;
