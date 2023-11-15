import { combineReducers } from "redux";
import postsReducer from "./postsSlice";
import chatsReducer from "./chatsSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  posts: postsReducer,
  chats: chatsReducer,
});

export default rootReducer;
