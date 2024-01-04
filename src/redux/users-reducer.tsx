import { Dispatch } from "redux";
import { UserType, usersAPI } from "../api/users-api";
import { setAppStatusAC } from "./app-reducer";

const GET_USERS = "GET-USERS";
const FOLLOW_USER = "FOLLOW-USER";
const UNFOLLOW_USER = "UNFOLLOW-USER";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE-FOLLOWING-PROGRESS";

type ActionsType =
  | ReturnType<typeof getUsersAC>
  | ReturnType<typeof followUserAC>
  | ReturnType<typeof unFollowUserAC>
  | ReturnType<typeof toggleFollowingProgressAC>;

type StateType = {
  users: UserType[];
  folloInProgress: number[];
  loading: boolean;
};
const initialState: StateType = {
  users: [],
  folloInProgress: [],
  loading: true,
};

//REDUCER
export const usersReducer = (
  state: StateType = initialState,
  action: ActionsType
): StateType => {
  switch (action.type) {
    case GET_USERS: {
      return { ...state, users: [...action.users] };
    }
    case FOLLOW_USER: {
      const copyState = state.users.map((user) => {
        if (user.id === action.id) {
          user.followed = true;
        }
        return user;
      });
      return { ...state, users: copyState };
    }
    case UNFOLLOW_USER: {
      const copyState = state.users.map((user) => {
        if (user.id === action.id) {
          user.followed = false;
        }
        return user;
      });
      return { ...state, users: copyState };
    }
    case TOGGLE_FOLLOWING_PROGRESS: {
      const isFind = state.folloInProgress.some((el) => el === action.id);
      const newArr = isFind
        ? [...state.folloInProgress].filter((el) => el !== action.id)
        : [...state.folloInProgress, action.id];
      return {
        ...state,
        folloInProgress: newArr,
      };
    }
    default:
      return state;
  }
};

//ACTIONS
export const getUsersAC = (users: UserType[]) =>
  ({ type: GET_USERS, users } as const);

export const followUserAC = (id: number) =>
  ({ type: FOLLOW_USER, id } as const);

export const unFollowUserAC = (id: number) =>
  ({ type: UNFOLLOW_USER, id } as const);
export const toggleFollowingProgressAC = (id: number) =>
  ({ type: TOGGLE_FOLLOWING_PROGRESS, id } as const);

// THUNK
export const fetchUsersTC = (page: number) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  console.log("fetchUsers");
  usersAPI
    .getUsers(page)
    .then((res) => {
      dispatch(getUsersAC(res.data.items));
      dispatch(setAppStatusAC("succeeded"));
    })
    .catch((error) => {
      dispatch(setAppStatusAC("failed"));
    });
};

export const followUserTC = (id: number) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  dispatch(toggleFollowingProgressAC(id));
  usersAPI
    .followUser(id)
    .then((res) => {
      dispatch(followUserAC(id));

      dispatch(setAppStatusAC("succeeded"));
    })
    .catch((error) => {
      dispatch(setAppStatusAC("failed"));
    })
    .finally(() => {
      dispatch(toggleFollowingProgressAC(id));
    });
};

export const unFollowUserTC = (id: number) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  dispatch(toggleFollowingProgressAC(id));
  usersAPI
    .unFollowUser(id)
    .then((res) => {
      dispatch(unFollowUserAC(id));
      dispatch(setAppStatusAC("succeeded"));
    })
    .catch((error) => {
      dispatch(setAppStatusAC("failed"));
    })
    .finally(() => {
      dispatch(toggleFollowingProgressAC(id));
    });
};
