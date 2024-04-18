import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import User from "features/users/ui/UsersList/User/User"
import { StoreProviderDecorator } from "./decorators/StoreProviderDecorator"

const meta: Meta<typeof User> = {
  title: "UsersList/User",
  component: User,
  parameters: {
    layout: "center",
  },
  tags: ["autodocs"],
  decorators: [StoreProviderDecorator],
  args: {
    user: {
      id: 1,
      followed: false,
      name: "My Name",
      status:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo dicta nulla unde. Praesentium est deleniti possimus! Architecto dolor labore totam, tempore odio dicta, neque molestiae asperiores cupiditate maxime necessitatibus laudantium.",
      uniqueUrlName: null,
      photos: {
        large: "",
        small: "",
      },
    },
    followHandler: action("onClick follow user"),
    unFollowHandler: action("onClick unFollow user"),
    openProfileHandler: action("onClick open profile user"),
    authUserId: 2,
    followInProgress: [5],
  },
}

export default meta
type Story = StoryObj<typeof User>

// export const UsersListIsNotDoneStory: Story = {}

export const UsersListIsDoneStory: Story = {}
