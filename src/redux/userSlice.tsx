import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "./state";

const initialState: UserType = {
  avatar: "",
  birthday: "",
  city: "",
  id: 1234,
  lastName: "",
  link: "",
  name: "",
  openedChatId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return state;
    },
  },
});

export const { addUser } = userSlice.actions;
export const selectUser = (state: { user: UserType }) => state.user;

export default userSlice.reducer;
