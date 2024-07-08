import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'
import { LoadGameDialog } from './LoadGameDialog'

const meta: Meta<typeof LoadGameDialog> = {
  component: LoadGameDialog,
}
export default meta

type Story = StoryObj<typeof LoadGameDialog>

export const TheOneWithNoSavedGames: Story = {
  render: () => <LoadGameDialog />,
}

export const TheOneWithACloseDialogClickHandler: Story = {
  render: () => <LoadGameDialog handleCloseClick={action('Clicked')} />,
}
