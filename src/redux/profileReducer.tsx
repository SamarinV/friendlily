import { Dispatch } from "redux";
import { GetUserProfileResponseType, usersAPI } from "../api/users-api";
import { setAppStatusAC } from "./app-reducer";

const SET_PROFILE = "SET-PROFILE";

type ActionsType = ReturnType<typeof setProfileAC>;

type StateType = {
  user: GetUserProfileResponseType | null;
};

const initialState: StateType = {
  user: null,
};

//REDUCER
export const profileReducer = (
  state: StateType = initialState,
  action: ActionsType
): StateType => {
  switch (action.type) {
    case SET_PROFILE: {
      return { ...state, user: { ...action.user } };
    }
    default:
      return state;
  }
};
// ACTION CREATOR

export const setProfileAC = (user: GetUserProfileResponseType) =>
  ({ type: SET_PROFILE, user } as const);

//THUNK
export const setProfileTC = (userId: number) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  usersAPI.getUserProfile(userId).then((res) => {
    dispatch(setProfileAC(res.data));
    dispatch(setAppStatusAC("succeeded"));
  });
};
