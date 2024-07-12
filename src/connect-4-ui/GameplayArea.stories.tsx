import { Status } from '@/connect-4-domain/game-types'
import createCells from '@/connect-4-ui/create-cells'
import { Meta, StoryObj } from '@storybook/react'
import { GameplayArea } from './GameplayArea'

const meta: Meta<typeof GameplayArea> = {
  component: GameplayArea,
}

export default meta

type Story = StoryObj<typeof GameplayArea>

export const TheOneWithDefaults: Story = {
  render: () => <GameplayArea />,
}

export const TheOneWithAGameInProgress: Story = {
  render: () => (
    <GameplayArea
      activeGame={{
        gameOverview: {
          activePlayer: 1,
          playerOne: {
            playerNumber: 1,
            isActive: true,
            remainingDisks: 10,
            playerColor: 'red',
          },
          playerTwo: {
            playerNumber: 2,
            isActive: false,
            remainingDisks: 10,
            playerColor: 'yellow',
          },
          roundNumber: 1,
          gameStatus: Status.IN_PROGRESS,
        },
        board: { cells: createCells(6, 7) },
      }}
    />
  ),
}
