import { AppRootStateType } from "./store";

export const selectorAppStatus = (store: AppRootStateType) => store.app.status

export const selectorAppIsInitialized = (store: AppRootStateType) => store.app.isInitialized
export const selectorAppIsLoading = (store: AppRootStateType) => store.app.status