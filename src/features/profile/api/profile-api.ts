import { instance } from "common/api/common.api"
import { BaseResponse } from "common/types/types"

export const profileAPI = {
  savePhoto(file: File) {
    const formData = new FormData()
    formData.append("image", file)
    return instance.put<BaseResponse<PhotoUpdateResponse>>(`/profile/photo`, formData)
  },
  getStatus(userId: number) {
    return instance.get(`/profile/status/${userId}`)
  },
  saveStatus(status: string) {
    return instance.put(`/profile/status`, { status })
  },
}

export type PhotoUpdateResponse = {
  photos: {
    small: string
    large: string
  }
}
