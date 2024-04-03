import { instance } from "../../../common/api/common.api"

export const usersAPI = {
  getUsers(page: number) {
    return instance.get<UsersResponseType>(`users?count=20&page=${page}`)
  },
  getFriends(currentPage = 1, pageSize = 20) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}&friend=true`).then((res) => res.data)
  },
  getUserProfile(userId: number) {
    return instance.get<GetUserProfileResponseType>(`profile/${userId}`)
  },
  followUser(userId: number) {
    return instance.post<followUnFollowResponseType>(`/follow/${userId}`, {})
  },
  unFollowUser(userId: number) {
    return instance.delete<followUnFollowResponseType>(`/follow/${userId}`, {})
  },
}

export type UserType = {
  followed: boolean
  id: number
  name: string
  photos: { small: string | null; large: string | null }
  status: string | null
  uniqueUrlName: string | null
}
export type UsersResponseType = {
  error: string | null
  items: UserType[]
  totalCount: number
}
type followUnFollowResponseType = {
  resultCode: number
  messages: string[]
  data: {}
}
export type GetUserProfileResponseType = {
  userId: number
	aboutMe: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
  }
  photos: {
    small: string
    large: string
  }
}
