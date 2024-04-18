import { Message, ResponseGetDialogs, ResponseSendMessage } from "features/dialogs/api/dialog-api"
import { DialogsState, dialogsReducer, dialogsThunks } from "../dialog.slice"
import { authThunks } from "features/auth/model/auth.slice"

describe("dialogsReducer", () => {
  let initialState: DialogsState

  beforeEach(() => {
    initialState = {
      dialogs: [],
      messages: [],
      isLoadingMessages: false,
    }
  })

  it("should update state after fetching dialogs", () => {
    const dialogs: ResponseGetDialogs[] = [
      {
        hasNewMessages: true,
        id: 1,
        lastDialogActivityDate: "test1",
        lastUserActivityDate: "test1",
        newMessagesCount: 1,
        photos: {
          small: "testSmall1.jpg",
          large: "testLarge1.jpg",
        },
        userName: "testName1",
      },
    ]
    const action = {
      type: `${dialogsThunks.getDialogs.fulfilled.type}`,
      payload: dialogs,
    }

    const newState = dialogsReducer(initialState, action)
    expect(newState.dialogs.length).toBe(1)
    expect(newState.dialogs[0]).toEqual(dialogs[0])
  })

  it("should update state after fetching messages", () => {
    const items: Message[] = [
      {
        addedAt: "test",
        body: "test",
        id: "test",
        recipientId: 1,
        senderId: 2,
        senderName: "test",
        translatedBody: null,
        viewed: true,
      },
    ]

    const action = {
      type: `${dialogsThunks.getMessages.fulfilled.type}`,
      payload: { items },
    }
    const newState = dialogsReducer(initialState, action)
    expect(newState.messages.length).toBe(1)
    expect(newState.messages[0]).toEqual(items[0])
  })

  it("should add message after sendMessage", () => {
    const mocMessage: ResponseSendMessage = {
      message: {
        id: "test",
        body: "test",
        translatedBody: null,
        addedAt: "test",
        senderId: 1,
        senderName: "test",
        recipientId: 2,
        recipientName: "test",
        viewed: false,
        deletedBySender: false,
        deletedByRecipient: false,
        isSpam: false,
        distributionId: null,
      },
    }

    const action = {
      type: `${dialogsThunks.sendMessage.fulfilled.type}`,
      payload: mocMessage.message,
    }
    const newState = dialogsReducer(initialState, action)
    expect(newState.messages.length).toBe(1)
    expect(newState.messages[0]).toEqual(mocMessage.message)
  })
  it("should reset state after logout", () => {
    initialState = {
      dialogs: [
        {
          hasNewMessages: true,
          id: 1,
          lastDialogActivityDate: "test1",
          lastUserActivityDate: "test1",
          newMessagesCount: 1,
          photos: {
            small: "testSmall1.jpg",
            large: "testLarge1.jpg",
          },
          userName: "testName1",
        },
      ],
      messages: [
        {
          id: "test",
          body: "test",
          translatedBody: null,
          addedAt: "test",
          senderId: 1,
          senderName: "test",
          recipientId: 2,
          viewed: false,
        },
      ],
      isLoadingMessages: true,
    }

    const action = {
      type: `${authThunks.logout.fulfilled.type}`,
    }
    const newState = dialogsReducer(initialState, action)
    expect(newState.dialogs.length).toBe(0)
    expect(newState.messages.length).toBe(0)
    expect(newState.isLoadingMessages).toBe(false)
  })
})
