import { createSlice } from "@reduxjs/toolkit";
import { PostType } from "./state";
import { v1 } from "uuid";

const initialState: PostType[] = [];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const date = new Date();
      const newPost: PostType = {
        id: v1(),
        user: action.payload.name,
        userAvatar: action.payload.userAvatar,
        message: action.payload.text,
        date: `${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
      };
      return [...state, newPost];
    },
    removePost: (state, action) => {
      // return state.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, removePost } = postsSlice.actions;

export default postsSlice.reducer;
