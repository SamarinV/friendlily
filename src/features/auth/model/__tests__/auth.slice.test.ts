import { profileThunks } from "features/profile/model/profile.slice"
import { AuthState, authReducer, authThunks } from "../auth.slice"

describe("authReducer", () => {
  let initialState: AuthState

  beforeEach(() => {
    initialState = {
      userData: {
        id: 0,
        login: "",
        email: "",
        smallPhoto: "",
      },
      isLoggedIn: false,
      captcha: "",
      isLoading: false,
    }
  })

  it("should update state after initializeApp", () => {
    const data = { id: 1, login: "test", email: "test@test.com", smallPhoto: "test.jpg" }
    const action = {
      type: `${authThunks.initializeApp.fulfilled.type}`,
      payload: { isLoggedIn: true, data },
    }
    const newState = authReducer(initialState, action)
    expect(newState.isLoggedIn).toBe(true)
    expect(newState.userData).toEqual({ id: 1, login: "test", email: "test@test.com", smallPhoto: "test.jpg" })
  })

  it("should update photo after savePhoto", () => {
    const action = {
      type: `${profileThunks.savePhoto.fulfilled.type}`,
      payload: { photos: { small: "newphoto.jpg" } },
    }
    const newState = authReducer(initialState, action)
    expect(newState.userData.smallPhoto).toBe("newphoto.jpg")
  })

  it("should update userId after login", () => {
    const userId = 1000
    const action = {
      type: `${authThunks.login.fulfilled.type}`,
      payload: { userId },
    }
    const newState = authReducer(initialState, action)
    expect(newState.userData.id).toEqual(userId)
  })

  it("should reset state after logout", () => {
    initialState = {
      userData: {
        id: 1000,
        login: "test",
        email: "test@test.com",
        smallPhoto: "test.jpg",
      },
      isLoggedIn: true,
      captcha: "",
      isLoading: false,
    }
    const action = {
      type: `${authThunks.logout.fulfilled.type}`,
    }
    const newState = authReducer(initialState, action)
    expect(newState.isLoggedIn).toBe(false)
    expect(newState.userData).toEqual({ id: 0, login: "", email: "", smallPhoto: "" })
  })
})
