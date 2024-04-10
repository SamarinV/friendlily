import { AppRootStateType } from "app/store";

export const selectorProfilePhotoLoading = (state: AppRootStateType) => state.profile.photoIsLoading
export const selectorProfilePhotoLarge = (state: AppRootStateType) => state.profile.user.photos.large
export const selectorProfileUserId = (state: AppRootStateType) => state.profile.user.userId
export const selectorProfileUserData = (state: AppRootStateType) => state.profile.user
export const selectorProfileUserStatus = (state: AppRootStateType) => state.profile.userStatus
export const selectorProfileUserContacts = (state: AppRootStateType) => state.profile.user.contacts
