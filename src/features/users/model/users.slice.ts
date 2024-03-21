import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit"
import { UserType, usersAPI } from "../api/users-api"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
// import { setAppStatus } from "app/app.slice"

type UsersState = {
  users: UserType[]
  folloInProgress: number[]
  loading: boolean
}

const initialState: UsersState = {
  users: [],
  folloInProgress: [],
  loading: true,
}

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // toggleFollowingProgress(state, action: PayloadAction<number>) {
    //   const index = state.folloInProgress.findIndex((id) => id === action.payload)
    //   if (index === -1) {
    //     state.folloInProgress.push(action.payload)
    //   } else {
    //     state.folloInProgress.splice(index, 1)
    //   }
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users
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
  },
})

const fetchUsers = createAppAsyncThunk<{ users: UserType[] }, number>(
  `${slice.name}/fetchUsers`,
  async (page, { rejectWithValue }) => {
    const res = await usersAPI.getUsers(page)
    if (res.data.error === null) {
      return { users: res.data.items }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

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
