import { instance } from "common/api/common.api"
import { BaseResponse } from "common/types/types"

export const profileAPI = {
  updatePhoto(file: File) {
		const formData = new FormData()
		formData.append('image', file)
    return instance.put<BaseResponse<PhotoUpdateResponse>>(`/profile/photo`, formData)
  },
}

export type PhotoUpdateResponse = {
  small: string
  large: string
}
