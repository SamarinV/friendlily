import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GetUserProfileResponseType, usersAPI } from "../../users/api/users-api"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { BaseResponse } from "common/types/types"
import { PhotoUpdateResponse, profileAPI } from "../api/profile-api"
import { isNullOrUndefined } from "util"

type InitialState = {
  user: GetUserProfileResponseType | null
  userStatus: string
	photoIsLoading: boolean
}

const initialState: InitialState = {
  user: null,
  userStatus: "default",
	photoIsLoading: false
}

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    loadingPhoto(state, action: PayloadAction<boolean>) {
			console.log(action.payload)
      state.photoIsLoading = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setProfile.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.userStatus = action.payload
      })
      .addCase(saveStatus.fulfilled, (state, action) => {
        state.userStatus = action.payload
      })
      .addCase(savePhoto.fulfilled, (state, action) => {
        if (state.user) {
          state.user.photos = action.payload.data.photos
        }
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
  async (file, { rejectWithValue, dispatch }) => {
    try {
			dispatch(slice.actions.loadingPhoto(true))
      const res = await profileAPI.savePhoto(file)
      if (res.data.resultCode === 0) {
				dispatch(slice.actions.loadingPhoto(false))
        return res.data
      } else {
        return rejectWithValue(res.data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      return rejectWithValue(null)
    }
  }
)

const getStatus = createAppAsyncThunk<string, number>(
  `${slice.name}/getStatus`,
  async (userId, { rejectWithValue }) => {
    try {
      const res = await profileAPI.getStatus(userId)
      if (res.status === 200) {
        return res.data
      } else {
        return rejectWithValue(res.data)
      }
    } catch (error) {
      return rejectWithValue(null)
    }
  }
)

const saveStatus = createAppAsyncThunk<string, string>(
  `${slice.name}/saveStatus`,
  async (status, { rejectWithValue }) => {
    try {
      const res = await profileAPI.saveStatus(status)
      if (res.data.resultCode === 0) {
        return status
      } else {
        return rejectWithValue(res.data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      return rejectWithValue(null)
    }
  }
)

export const profileThunks = { setProfile, savePhoto, getStatus, saveStatus }
export const profileReducer = slice.reducer
