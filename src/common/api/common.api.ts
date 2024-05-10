import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
})

instance.interceptors.request.use(function (config) {
  if (config.headers) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("sn-token")
  }

  return config
})