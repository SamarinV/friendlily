import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GetUserProfileResponseType, usersAPI } from "../../users/api/users-api"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"

type InitialState = {
  user: GetUserProfileResponseType | null
}

const initialState: InitialState = {
  user: null,
}

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setProfile.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

const setProfile = createAppAsyncThunk<GetUserProfileResponseType, number>(
  `${slice.name}/setProfile`,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getUserProfile(userId)
      return response.data
    } catch (error) {
      console.error("Error fetching profile:", error)
      rejectWithValue(null)
    }
  }
)

export const profileThunks = { setProfile }
export const profileReducer = slice.reducer
