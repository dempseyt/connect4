import { Meta, StoryObj } from '@storybook/react'
import { SavedGame } from './SavedGame'

const meta: Meta<typeof SavedGame> = {
  component: SavedGame,
}
export default meta

type Story = StoryObj<typeof SavedGame>

export const TheOneWithGameIdAndDateSaved: Story = {
  render: () => <SavedGame gameId={crypto.randomUUID()} dateSaved={new Date().toLocaleString()} />,
}
