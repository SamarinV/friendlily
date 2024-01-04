import { setAppStatusAC } from "./app-reducer";
import { Dispatch } from "redux";
import { UserType, usersAPI } from "../api/users-api";
import { AuthUserType, authAPI } from "../api/auth-api";

const GET_AUTH_USER = "GET-AUTH-USER";

type ActionsType = ReturnType<typeof getAuthUserAC>;

const initialState: AuthUserType = {
  id: 0,
  email: "",
  login: "",
};

//REDUCER
export const authReducer = (
  state: AuthUserType = initialState,
  action: ActionsType
): AuthUserType => {
  switch (action.type) {
    case GET_AUTH_USER: {
      return {
        ...state,
        id: action.authUser.id,
        email: action.authUser.email,
        login: action.authUser.login,
      };
    }
    default:
      return state;
  }
};

//ACTIONS
export const getAuthUserAC = (authUser: AuthUserType) =>
  ({ type: GET_AUTH_USER, authUser } as const);

// THUNK
export const fetchAuthUserTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI.getAuth().then((res) => {
    dispatch(getAuthUserAC(res.data.data));
    dispatch(setAppStatusAC("succeeded"));
  });
};
