import { Status } from '@/connect-4-domain/game-types'
import { GameStatus } from '@/connect-4-ui/GameStatus'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof GameStatus> = {
  component: GameStatus,
}

export default meta

type Story = StoryObj<typeof GameStatus>

export const TheOneWithGameInProgress: Story = {
  render: () => <GameStatus gameStatus={Status.IN_PROGRESS} />,
}

export const TheOneWhenPlayerOneWins: Story = {
  render: () => <GameStatus gameStatus={Status.PLAYER_ONE_WIN} />,
}

export const TheOneWhenPlayerTwoWins: Story = {
  render: () => <GameStatus gameStatus={Status.PLAYER_TWO_WIN} />,
}

export const TheOneWithATie: Story = {
  render: () => <GameStatus gameStatus={Status.DRAW} />,
}
