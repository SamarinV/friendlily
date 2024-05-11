import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "8cc83697-394a-4ab4-8f4e-22adcca1b634",
  },
})

instance.interceptors.request.use(function (config) {
  if (config.headers) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("sn-token")
  }
  return config
})
