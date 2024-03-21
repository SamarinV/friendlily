import { PayloadAction, createSlice, isFulfilled } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { AuthUserType, LoginParams, authAPI } from "../api/auth-api"
import { appActions } from "app/app.slice"

type InitialState = {
  userData: AuthUserType
	isLoggedIn: boolean
	captcha: string
}

const initialState: InitialState = {
  userData: {
		id: 0,
		login: '',
		email: ''
	},
  isLoggedIn: false,
  captcha: "",
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
		.addCase(initializeApp.fulfilled, (state, action)=>{
			state.userData = action.payload.data
		})
		.addMatcher(
      isFulfilled(authThunks.login, authThunks.logout, authThunks.initializeApp),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
				console.log(action.payload)
        state.isLoggedIn = action.payload.isLoggedIn
      }
    )
  },
})

// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(
  `${slice.name}/login`,
  async (arg, { rejectWithValue }) => {
    const res = await authAPI.login(arg)
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean, data: AuthUserType }, undefined>(
  `${slice.name}/initializeApp`,
  async (_, { rejectWithValue, dispatch }) => {
    const res = await authAPI.me().finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
    })
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true, data: res.data.data }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const authReducer = slice.reducer
export const authThunks = { login, logout, initializeApp }
