import { Status } from '@/connect-4-domain/game-types'
import { GameOverview } from '@/connect-4-ui/GameOverview'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof GameOverview> = {
  component: GameOverview,
}

export default meta

type Story = StoryObj<typeof GameOverview>

export const TheOneInProgressWithPlayerOneActive: Story = {
  render: () => (
    <GameOverview
      activePlayer={1}
      playerOne={{
        playerNumber: 1,
        isActive: false,
        remainingDisks: 10,
        playerColor: 'red',
      }}
      playerTwo={{
        playerNumber: 2,
        isActive: false,
        remainingDisks: 10,
        playerColor: 'yellow',
      }}
      roundNumber={1}
      gameStatus={Status.IN_PROGRESS}
    />
  ),
}

export const TheOneInProgressWithPlayerTwoActive: Story = {
  render: () => (
    <GameOverview
      activePlayer={2}
      playerOne={{
        playerNumber: 1,
        isActive: false,
        remainingDisks: 10,
        playerColor: 'red',
      }}
      playerTwo={{
        playerNumber: 2,
        isActive: false,
        remainingDisks: 10,
        playerColor: 'yellow',
      }}
      roundNumber={1}
      gameStatus={Status.IN_PROGRESS}
    />
  ),
}

export const TheOneWherePlayerOneWins: Story = {
  render: () => (
    <GameOverview
      activePlayer={1}
      playerOne={{
        playerNumber: 1,
        isActive: false,
        remainingDisks: 10,
        playerColor: 'red',
      }}
      playerTwo={{
        playerNumber: 2,
        isActive: false,
        remainingDisks: 10,
        playerColor: 'yellow',
      }}
      gameStatus={Status.PLAYER_ONE_WIN}
      roundNumber={5}
    />
  ),
}

export const TheOneWherePlayerTwoWins: Story = {
  render: () => (
    <GameOverview
      activePlayer={2}
      playerOne={{
        playerNumber: 1,
        isActive: false,
        remainingDisks: 10,
        playerColor: 'red',
      }}
      playerTwo={{
        playerNumber: 2,
        isActive: false,
        remainingDisks: 10,
        playerColor: 'yellow',
      }}
      roundNumber={100}
      gameStatus={Status.PLAYER_TWO_WIN}
    />
  ),
}

export const TheOneWithATie: Story = {
  render: () => (
    <GameOverview
      activePlayer={2}
      playerOne={{
        playerNumber: 1,
        isActive: false,
        remainingDisks: 0,
        playerColor: 'red',
      }}
      playerTwo={{
        playerNumber: 2,
        isActive: false,
        remainingDisks: 0,
        playerColor: 'yellow',
      }}
      gameStatus={Status.DRAW}
      roundNumber={12}
    />
  ),
}
