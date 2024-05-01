import type { Meta, StoryObj } from "@storybook/react"
import { Tabs } from "./tabs"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const TextInput: Story = {
  args: {
		friend: 'true'
	},
}
