import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "abeb18c3-0a44-443c-b32c-87b09fba1678",
  },
})

instance.interceptors.request.use(function (config) {
  if (config.headers) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("sn-token")
  }

  return config
})