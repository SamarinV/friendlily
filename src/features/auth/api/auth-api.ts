import { instance } from "../../../common/api/common.api"
import { BaseResponse } from "common/types/types"

export const authAPI = {
  me() {
    return instance.get<BaseResponse<AuthUser>>(`/auth/me`)
  },
  login(arg: LoginParams) {
    return instance.post<BaseResponse<{ userId: number, token: string }>>(`/auth/login`, arg)
  },
  logout() {
    return instance.delete<BaseResponse<AuthUser>>(`/auth/login`)
  },
}

export type LoginParams = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string | undefined
}
export type AuthUser = {
  id: number
  login: string
  email: string
}
