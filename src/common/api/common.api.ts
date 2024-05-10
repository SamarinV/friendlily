import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "694190b5-cb17-4c18-9737-7ae3ad072ed8",
    Authorization: "Bearer 84a10472-b3e0-4db7-bf79-a6c641f45ea1",
  },
})
