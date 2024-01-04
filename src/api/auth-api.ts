import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
});

export const authAPI = {
  getAuth() {
    return instance.get<ResponseType>(`/auth/me`);
  },
};

type ResponseType = {
  data: AuthUserType;
  fieldsErrors: [];
  messages: string[];
  resultCode: number;
};
export type AuthUserType = {
  id: number;
  login: string;
  email: string;
};
