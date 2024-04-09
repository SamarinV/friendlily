import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "app/app.slice"
import { authReducer } from "features/auth/model/auth.slice"
import { dialogsReducer } from "features/dialogs/model/dialog.slice"
import postsReducer from "features/profile/model/posts.slice"
import { profileReducer } from "features/profile/model/profile.slice"
import { usersReducer } from "features/users/model/users.slice"

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    profile: profileReducer,
    users: usersReducer,
    app: appReducer,
    auth: authReducer,
    dialogs: dialogsReducer,
  },
})
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
