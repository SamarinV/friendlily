import { UsersBaseResponse } from "features/users/api/users-api"
import { UsersState, usersReducer, usersThunks } from "../users.slice"

describe("usersReducer", () => {
  let initialState: UsersState

  beforeEach(() => {
    initialState = {
      users: [],
      folloInProgress: [],
      loading: true,
      totalCount: 0,
    }
  })

  it("should update state after fetch users", () => {
    const data: UsersBaseResponse = {
      error: null,
      totalCount: 1,
      items: [
        {
          id: 1,
          followed: true,
          name: "testName",
          photos: {
            large: "testLarge.jpg",
            small: "testSmall.jpg",
          },
          status: "testStatus",
          uniqueUrlName: "testUniqueUrl",
        },
      ],
    }
    const action = {
      type: `${usersThunks.fetchUsers.fulfilled.type}`,
      payload: data,
    }
    const newState = usersReducer(initialState, action)
    expect(newState.users[0]).toEqual(data.items[0])
    expect(newState.totalCount).toBe(1)
  })

  it("should update follow status after follow or onfollow", () => {
    initialState.users[0] = {
      id: 1,
      followed: true,
      name: "testName",
      photos: {
        large: "testLarge.jpg",
        small: "testSmall.jpg",
      },
      status: "testStatus",
      uniqueUrlName: "testUniqueUrl",
    }

    const actionUnfollow = {
      type: `${usersThunks.unFollowUser.fulfilled.type}`,
      payload: { followId: 1 },
    }
    const actionFollow = {
      type: `${usersThunks.followUser.fulfilled.type}`,
      payload: { followId: 1 },
    }
    const newStateUnfollow = usersReducer(initialState, actionUnfollow)
    expect(newStateUnfollow.users[0].followed).toBe(false)
    const newStateFollow = usersReducer(initialState, actionFollow)
    expect(newStateFollow.users[0].followed).toBe(true)
  })
})
