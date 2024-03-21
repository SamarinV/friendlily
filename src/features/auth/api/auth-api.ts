import { instance } from "common/api/common.api"

export const authAPI = {
  me() {
    return instance.get<ResponseType>(`/auth/me`)
  },
  login(arg: LoginParams) {
		return instance.post<ResponseType>(`/auth/login`)
	},
  logout() {
		return instance.delete<ResponseType>(`/auth/login`)
	},
}

export type LoginParams = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string | undefined
}

type ResponseType = {
  data: AuthUserType
  fieldsErrors?: []
  messages: string[]
  resultCode: number
}
export type AuthUserType = {
  id: number
  login: string
  email: string
}
