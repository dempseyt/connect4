import { SaveGameOverlay } from '@/connect-4-ui/SaveGameOverlay'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SaveGameOverlay> = {
  component: SaveGameOverlay,
}

export default meta

type Story = StoryObj<typeof SaveGameOverlay>

export const TheSaveGameOverlay: Story = {
  render: () => <SaveGameOverlay />,
}
