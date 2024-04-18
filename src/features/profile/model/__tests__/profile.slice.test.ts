import { GetUserProfileResponse } from "features/users/api/users-api"
import { ProfileState, profileReducer, profileThunks } from "../profile.slice"
import { authReducer, authThunks } from "features/auth/model/auth.slice"

describe("profileReducer", () => {
  let initialState: ProfileState

  beforeEach(() => {
    initialState = {
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
  })

  it("should update profile after fetch profile", () => {
    const user: GetUserProfileResponse = {
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
    }
    const action = {
      type: `${profileThunks.fetchProfile.fulfilled.type}`,
      payload: user,
    }
    const newState = profileReducer(initialState, action)
    expect(newState.user).toEqual(user)
  })

  it("should update userStatus after get status or save status", () => {
    const actionGetStatus = {
      type: `${profileThunks.getStatus.fulfilled.type}`,
      payload: "testGetStatus",
    }
    const actionSaveStatus = {
      type: `${profileThunks.saveStatus.fulfilled.type}`,
      payload: "testSaveStatus",
    }
    const newStateGet = profileReducer(initialState, actionGetStatus)
    const newStateSave = profileReducer(initialState, actionSaveStatus)
    expect(newStateGet.userStatus).toBe("testGetStatus")
    expect(newStateSave.userStatus).toBe("testSaveStatus")
  })

  it("should update user photo after save photo", () => {
    const photos = {
      large: "testLarge.jpg",
      small: "testSmall.jpg",
    }
    const actionGetStatus = {
      type: `${profileThunks.savePhoto.fulfilled.type}`,
      payload: { photos },
    }
    const newStateGet = profileReducer(initialState, actionGetStatus)
    expect(newStateGet.user.photos).toEqual(photos)
  })

	 it("should reset state after logout", () => {
		const userState = {
      user: {
        userId: 1,
        aboutMe: "test",
        lookingForAJob: true,
        lookingForAJobDescription: "test",
        fullName: "test",
        contacts: {
          github: "test",
          vk: "test",
          facebook: "test",
          instagram: "test",
          twitter: "test",
          website: "test",
          youtube: "test",
          mainLink: "test",
        },
        photos: {
          large: "test",
          small: "test",
        },
      },
      userStatus: "default",
      photoIsLoading: false,
    }
     const action = {
       type: `${authThunks.logout.fulfilled.type}`,
     }
     const newState = profileReducer(userState, action)
     expect(newState).toEqual(initialState)
   })

	 it("should update user data after save change profile", () => {
		const newUserData = {
        userId: 1,
        aboutMe: "test",
        lookingForAJob: true,
        lookingForAJobDescription: "test",
        fullName: "test",
        contacts: {
          github: "test",
          vk: "test",
          facebook: "test",
          instagram: "test",
          twitter: "test",
          website: "test",
          youtube: "test",
          mainLink: "test",
        },
				 photos: {
          large: "test",
          small: "test",
        },
			}
     
     const action = {
       type: `${profileThunks.saveChangesProfile.fulfilled.type}`,
       payload: newUserData,
     }
     const newState = profileReducer(initialState, action)
     expect(newState.user).toEqual(newUserData)
   })
})
