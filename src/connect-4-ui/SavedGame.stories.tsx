import { Meta, StoryObj } from '@storybook/react'
import { v4 } from 'uuid'
import { SavedGame } from './SavedGame'

const meta: Meta<typeof SavedGame> = {
  component: SavedGame,
}
export default meta

type Story = StoryObj<typeof SavedGame>

export const TheOneWithGameIdAndDateSaved: Story = {
  render: () => <SavedGame gameId={v4()} dateSaved={new Date().toLocaleString()} />,
}
