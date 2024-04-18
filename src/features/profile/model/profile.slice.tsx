import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BaseResponse, RequestEditProfile } from "common/types/types"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { authThunks } from "features/auth/model/auth.slice"
import { FormikValuesContacts } from "features/profile/ui/FormEditContacts/FormEditContacts"
import { FormikValues } from "features/profile/ui/FormEditProfile/FormEditProfile"
import { GetUserProfileResponse, usersAPI } from "../../users/api/users-api"
import { PhotoUpdateResponse, UserProfileRequest, profileAPI } from "../api/profile-api"

export type ProfileState = {
  user: GetUserProfileResponse
  userStatus: string
  photoIsLoading: boolean
}

const initialState: ProfileState = {
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
      state.photoIsLoading = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.userStatus = action.payload
      })
      .addCase(saveStatus.fulfilled, (state, action) => {
        state.userStatus = action.payload
      })
      .addCase(savePhoto.fulfilled, (state, action) => {
          state.user.photos = action.payload.photos
      })
      .addCase(authThunks.logout.fulfilled, (state, action) => {
        return initialState
      })
      .addCase(saveChangesProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }
      })
  },
})

const fetchProfile = createAppAsyncThunk<GetUserProfileResponse, number>(
  `${slice.name}/setProfile`,
  async (userId, { rejectWithValue }) => {
    const res = await usersAPI.getUserProfile(userId)
    if (res.data.userId) {
      return res.data
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const savePhoto = createAppAsyncThunk<PhotoUpdateResponse, File>(
  `${slice.name}/savePhoto`,
  async (file, { rejectWithValue, dispatch }) => {
    dispatch(slice.actions.loadingPhoto(true))
    const res = await profileAPI.savePhoto(file)
    if (res.data.resultCode === 0) {
      dispatch(slice.actions.loadingPhoto(false))
      return res.data.data
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const getStatus = createAppAsyncThunk<string, number>(
  `${slice.name}/getStatus`,
  async (userId, { rejectWithValue }) => {
    const res = await profileAPI.getStatus(userId)
    if (res.status === 200) {
      return res.data
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const saveStatus = createAppAsyncThunk<string, string>(
  `${slice.name}/saveStatus`,
  async (status, { rejectWithValue }) => {
    const res = await profileAPI.saveStatus(status)
    if (res.data.resultCode === 0) {
      return status
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const saveChangesProfile = createAppAsyncThunk<
  BaseResponse<{}> | RequestEditProfile,
  FormikValues | FormikValuesContacts
>(`${slice.name}/saveChangesProfile`, async (newDataUser, { rejectWithValue, dispatch, getState }) => {
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
  const state = getState().profile.user
  let user: UserProfileRequest
  if (isFormikValuesContacts(newDataUser)) {
    //when changed user coontact
    user = { ...state, contacts: { ...newDataUser } }
  } else {
    user = { ...state, ...newDataUser }
  }
  const res = await profileAPI.saveChangesProfile(user)
  if (res.data.resultCode === 0) {
    return user
  } else {
    return rejectWithValue(res.data)
  }
})

export const profileThunks = { fetchProfile, savePhoto, getStatus, saveStatus, saveChangesProfile }
export const profileReducer = slice.reducer
