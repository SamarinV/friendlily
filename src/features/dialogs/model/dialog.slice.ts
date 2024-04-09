import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { appActions } from "app/app.slice"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { authThunks } from "features/auth/model/auth.slice"
import { Message, ResponseGetDialogs, ResponseGetMessages, dialogsApi } from "../api/dialog-api"

type InitialState = {
  dialogs: ResponseGetDialogs[]
  messages: Message[]
  isLoadingMessages: boolean
}

const initialState: InitialState = {
  dialogs: [],
  messages: [],
  isLoadingMessages: false,
}

const slice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDialogs.fulfilled, (state, action) => {
        state.dialogs = action.payload
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload.items
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload)
      })
      .addCase(authThunks.logout.fulfilled, (state, action) => {
        return initialState
      })
      .addMatcher(isPending, (state, action) => {
        if (action.type === dialogsThunks.getMessages.pending.type) {
          state.isLoadingMessages = true
        }
      })
      .addMatcher(isFulfilled, (state, action) => {
        if (action.type === dialogsThunks.getMessages.fulfilled.type) {
          state.isLoadingMessages = false
        }
      })
      .addMatcher(isRejected, (state, action) => {
        if (action.type === dialogsThunks.getMessages.rejected.type) {
          state.isLoadingMessages = false
        }
      })
  },
})

// thunks

const getDialogs = createAppAsyncThunk<any, undefined>(
  `${slice.name}/getDialogs`,
  async (_, { rejectWithValue, dispatch }) => {
    const res = await dialogsApi.getAllDialogs()
    if (res.status === 200) {
      return res.data
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const createNewChat = createAppAsyncThunk<any, number>(
  `${slice.name}/createNewChat`,
  async (userId, { rejectWithValue, dispatch }) => {
    const res = await dialogsApi.createNewChat(userId)
    if (res.data.resultCode === 0) {
      return {}
    } else {
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
      return rejectWithValue(res.data)
    }
  }
)

const sendMessage = createAppAsyncThunk<any, { userId: number; message: string }>(
  `${slice.name}/sendMessage`,
  async ({ userId, message }, { rejectWithValue, dispatch }) => {
    const res = await dialogsApi.sendMessage(userId, message)
    if (res.data.resultCode === 0) {
      console.log(res.data)
      return res.data.data.message
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const getMessages = createAppAsyncThunk<ResponseGetMessages, { userId: number; page?: number }>(
  `${slice.name}/getMessages`,
  async ({ userId, page }, { rejectWithValue, dispatch }) => {
    const res = await dialogsApi.getMessages(userId, page)
    if (res.data.error === null) {
      return res.data
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const dialogsReducer = slice.reducer
export const dialogsThunks = { getDialogs, createNewChat, sendMessage, getMessages }
