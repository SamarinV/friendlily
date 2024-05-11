import { AppRootStateType } from "app/store";

export const selectorDialogs = (state: AppRootStateType) => state.dialogs.dialogs
export const selectorMessages = (state: AppRootStateType) => state.dialogs.messages
export const selectorMessagesIsLoading = (state: AppRootStateType) => state.dialogs.isLoadingMessages
export const selectorDialogsIsLoading = (state: AppRootStateType) => state.dialogs.isLoadingDialogs