import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "abeb18c3-0a44-443c-b32c-87b09fba1678",
    Authorization: "Bearer 84a10472-b3e0-4db7-bf79-a6c641f45ea1",
  },
})
