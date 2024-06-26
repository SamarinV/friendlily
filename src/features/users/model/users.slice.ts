import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { authThunks } from "features/auth/model/auth.slice"
import { UserResponse, UsersBaseResponse, usersAPI } from "../api/users-api"

export type UsersState = {
  users: UserResponse[]
  folloInProgress: number[]
  loading: boolean
  totalCount: number
}

const initialState: UsersState = {
  users: [],
  folloInProgress: [],
  loading: true,
  totalCount: 0,
}

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.items
        state.totalCount = action.payload.totalCount
        state.loading = false
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.followId ? { ...user, followed: true } : user
        )
      })
      .addCase(unFollowUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.followId ? { ...user, followed: false } : user
        )
      })
      .addCase(authThunks.logout.fulfilled, (state, action) => {
        return initialState
      })
  },
})

const fetchUsers = createAppAsyncThunk<
  UsersBaseResponse,
  { page: string; count: string; friend: string; term: string | null }
>(`${slice.name}/fetchUsers`, async (params, { rejectWithValue }) => {
  const res = await usersAPI.getUsers(params)
  if (res.data.error === null) {
    return res.data
  } else {
    return rejectWithValue(res.data)
  }
})

const followUser = createAppAsyncThunk<{ followId: number }, number>(
  `${slice.name}/followUser`,
  async (id, { dispatch, rejectWithValue }) => {
    const res = await usersAPI.followUser(id)
    if (res.data.resultCode === 0) {
      return { followId: id }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const unFollowUser = createAppAsyncThunk<{ followId: number }, number>(
  `${slice.name}/unFollowUser`,
  async (id, { rejectWithValue }) => {
    const res = await usersAPI.unFollowUser(id)
    if (res.data.resultCode === 0) {
      return { followId: id }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const usersReducer = slice.reducer
export const usersThunks = { fetchUsers, followUser, unFollowUser }
