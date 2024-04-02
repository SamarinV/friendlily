import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BaseResponse, RequestEditProfile } from "common/types/types"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { GetUserProfileResponseType, usersAPI } from "../../users/api/users-api"
import { PhotoUpdateResponse, UserProfileRequest, profileAPI } from "../api/profile-api"
import { FormikValues } from "common/components/FormEditProfile/FormEditProfile"
import { FormikValuesContacts } from "common/components/FormEditContacts/FormEditContacts"

type InitialState = {
  user: GetUserProfileResponseType
  userStatus: string
  photoIsLoading: boolean
}

const initialState: InitialState = {
  user: {
    userId: 0,
    aboutMe: "",
    lookingForAJob: false,
    lookingForAJobDescription: "",
    fullName: "",
    contacts: {
      github: "",
      vk: "",
      facebook: "",
      instagram: "",
      twitter: "",
      website: "",
      youtube: "",
      mainLink: "",
    },
    photos: {
      large: "",
      small: "",
    },
  },
  userStatus: "default",
  photoIsLoading: false,
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
      .addCase(saveChangesProfile.fulfilled, (state, action) => {
        console.log("action.payload: ", action.payload)
      })
  },
})

const setProfile = createAppAsyncThunk<GetUserProfileResponseType, number>(
  `${slice.name}/setProfile`,
  async (userId, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getUserProfile(userId)
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



const saveChangesProfile = createAppAsyncThunk<BaseResponse<{}> | RequestEditProfile, FormikValues | FormikValuesContacts>(
  `${slice.name}/saveChangesProfile`,
  async (newDataUser, { rejectWithValue, dispatch, getState }) => {
		function isFormikValuesContacts(obj: any): obj is FormikValuesContacts {
      return (
        "facebook" in obj &&
        "github" in obj &&
        "instagram" in obj &&
        "website" in obj &&
        "vk" in obj &&
        "twitter" in obj &&
        "youtube" in obj &&
        "mainLink" in obj
      )
    }
    try {
      const state = getState().profile.user
			let user: UserProfileRequest
			 if (isFormikValuesContacts(newDataUser)) { //changes user contacts
         user = {...state, contacts: {...newDataUser} }
       }
			 else{
				 user = { ...state, ...newDataUser }
			 }
      const res = await profileAPI.saveChangesProfile(user)
      if (res.data.resultCode === 0) {
        return user
      } else {
        return rejectWithValue(res.data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      return rejectWithValue(null)
    }
  }
)

export const profileThunks = { setProfile, savePhoto, getStatus, saveStatus, saveChangesProfile }
export const profileReducer = slice.reducer
