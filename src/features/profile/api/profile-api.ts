import { instance } from "common/api/common.api"
import { BaseResponse } from "common/types/types"

export const profileAPI = {
  savePhoto(file: File) {
    const formData = new FormData()
    formData.append("image", file)
    return instance.put<BaseResponse<PhotoUpdateResponse>>(`/profile/photo`, formData)
  },
}

export type PhotoUpdateResponse = {
	photos: any
  small: string
  large: string
}
