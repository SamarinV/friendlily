import { AppRootStateType } from "app/store"

export const selectorIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const selectorAuthUserId = (state: AppRootStateType) => state.auth.userData.id
export const selectorAuthUserPhotoSmall = (state: AppRootStateType) => state.auth.userData.smallPhoto
export const selectorAuthUserData = (state: AppRootStateType) => state.auth.userData
