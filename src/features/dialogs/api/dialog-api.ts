import { instance } from "common/api/common.api"
import { BaseResponse } from "common/types/types"

export const dialogsApi = {
  getAllDialogs() {
    return instance.get<ResponseGetDialogs[]>("dialogs")
  },
  createNewChat(userId: number) {
    return instance.put<BaseResponse<{}>>(`dialogs/${userId}`)
  },
  getMessages(userId: number, page = 1) {
    return instance.get<ResponseGetMessages>(`dialogs/${userId}/messages?page=${page}`)
  },
  sendMessage(userId: number, message: string) {
    return instance.post<BaseResponse<ResponseSendMessage>>(`dialogs/${userId}/messages`, { body: `${message}` })
  },
}

export type Message = {
  id: string
  body: string
  translatedBody: null
  addedAt: string
  senderId: number
  senderName: string
  recipientId: number
  viewed: boolean
}

export type ResponseGetMessages = {
  items: Message[]
  totalCount: number
  error: null | any
}

export type ResponseGetDialogs = {
  id: number
  userName: string
  hasNewMessages: boolean
  lastDialogActivityDate: string
  lastUserActivityDate: string
  newMessagesCount: number
  photos: {
    small: string | null
    large: string | null
  }
}

export type ResponseSendMessage = {
  message: {
    id: string
    body: string
    translatedBody: null | any
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    recipientName: string
    viewed: boolean
    deletedBySender: boolean
    deletedByRecipient: boolean
    isSpam: boolean
    distributionId: null | any
  }
}
