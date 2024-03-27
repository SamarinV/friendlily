import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GetUserProfileResponseType, usersAPI } from "../../users/api/users-api"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { BaseResponse } from "common/types/types"
import { PhotoUpdateResponse, profileAPI } from "../api/profile-api"

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
      const res = await usersAPI.getUserProfile(userId)
			console.log(res.data)
      if (res.data.userId) {
        return res.data
      } else {
        return rejectWithValue(res.data)
      }
    } catch (error) {
      return rejectWithValue(null)
    }
  }
)

const savePhoto = createAppAsyncThunk<BaseResponse<PhotoUpdateResponse>, File>(
  `${slice.name}/savePhoto`,
  async (file, { rejectWithValue }) => {
    try {
      const res = await profileAPI.savePhoto(file)
      if (res.data.resultCode === 0) {
        return res.data
      } else {
        console.log(res.data)
        return rejectWithValue(res.data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      return rejectWithValue(null)
    }
  }
)

export const profileThunks = { setProfile, savePhoto }
export const profileReducer = slice.reducer
