import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import postsReducer from "./postsSlice";
import chatsReducer from "./chatsSlice";
import { profileReducer } from "./profileReducer";
import { usersReducer } from "./users-reducer";
import { appReducer } from "./app-reducer";
import { authReducer } from "./auth-reducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  chats: chatsReducer,
  profile: profileReducer,
  users: usersReducer,
  app: appReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export default store;
