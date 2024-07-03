import { Meta, StoryObj } from '@storybook/react'
import { GamePlayAreaMenu } from './GamePlayAreaMenu'
import { MenuButton } from './MenuButton'

const meta: Meta<typeof GamePlayAreaMenu> = {
  component: GamePlayAreaMenu,
}
export default meta

type Story = StoryObj<typeof GamePlayAreaMenu>

export const TheOneWithButton: Story = {
  render: () => (
    <GamePlayAreaMenu>
      <MenuButton text={'Home'} />
    </GamePlayAreaMenu>
  ),
}

export const TheOneWithMultipleButtons: Story = {
  render: () => (
    <GamePlayAreaMenu>
      <MenuButton text={'Home'} />
      <MenuButton text={'Leaderboard'} />
      <MenuButton text={'Connect4 Docs'} />
    </GamePlayAreaMenu>
  ),
}
