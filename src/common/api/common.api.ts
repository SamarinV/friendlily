import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "045ea086-f26a-486a-bbf3-0e3b3c7753e8",
  },
})

instance.interceptors.request.use(function (config) {
  if (config.headers) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("sn-token")
  }
  return config
})
