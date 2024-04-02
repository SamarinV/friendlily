import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { authThunks } from "features/auth/model/auth.slice"
import { profileAPI } from "features/profile/api/profile-api"
import { profileThunks } from "features/profile/model/profile.slice"

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
}

export type AppInitialStateType = typeof initialState
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
  extraReducers(builder) {
    builder.addMatcher(isPending, (state, action) => {
      if (
        action.type === profileThunks.savePhoto.pending.type ||
        action.type === profileThunks.saveStatus.pending.type
      ) {
        return
      } else {
        state.status = "loading"
      }
    })
    builder.addMatcher(isFulfilled, (state, action) => {
      state.status = "succeeded"
    })
    builder.addMatcher(isRejected, (state, action: any) => {
      state.status = "failed"
      if (action.payload) {
        if (action.type === authThunks.initializeApp.rejected.type) {
          return
        }
        state.error = action.payload.messages[0]
      } else {
        state.error = action.error.message ? action.error.message : "Some error occured"
      }
    })
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions