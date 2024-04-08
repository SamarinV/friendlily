import { instance } from "../../../common/api/common.api"

export const usersAPI = {
  getUsers(params: { page: string; count: string; friend: string; term: string | null }) {
    return instance.get<UsersBaseResponse>(
      `users?count=${params.count}&page=${params.page}&friend=${params.friend}${params.term && params.term!=='' ? `&term=${params.term}` : ''}`
    )
  },
  getUserProfile(userId: number) {
    return instance.get<GetUserProfileResponse>(`profile/${userId}`)
  },
  followUser(userId: number) {
    return instance.post<followUnFollowResponse>(`/follow/${userId}`, {})
  },
  unFollowUser(userId: number) {
    return instance.delete<followUnFollowResponse>(`/follow/${userId}`, {})
  },
}

export type User = {
  followed: boolean
  id: number
  name: string
  photos: { small: string | null; large: string | null }
  status: string | null
  uniqueUrlName: string | null
}
export type UsersBaseResponse = {
  error: string | null
  items: User[]
  totalCount: number
}
type followUnFollowResponse = {
  resultCode: number
  messages: string[]
  data: {}
}
export type GetUserProfileResponse = {
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
