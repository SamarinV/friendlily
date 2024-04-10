import { AppRootStateType } from "app/store";

export const selectorUsersFollowInProgress = (state: AppRootStateType) => state.users.folloInProgress
export const selectorUsers = (state: AppRootStateType) => state.users.users
export const selectorUsersCount = (state: AppRootStateType) => state.users.totalCount