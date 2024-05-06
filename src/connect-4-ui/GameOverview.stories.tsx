import { Meta, StoryObj } from "@storybook/react";
import { GameOverview  } from "@/connect-4-ui/GameOverview";
import createCells from "@/connect-4-ui/create-cells"

const meta: Meta<typeof GameOverview> = {
    component: GameOverview
}

export default meta;

type Story = StoryObj<typeof GameOverview>

export const TheOneInProgressWithPlayerOneActive: Story = {
    render: () => 
        <GameOverview 
            activePlayer={1}
            playerOne={{
                playerNumber: 1,
                isActive: false,
                remainingDisks: 10,
                playerColor: "red"
            }}
            playerTwo={{
                playerNumber: 2,
                isActive: false,
                remainingDisks: 10,
                playerColor: "yellow"
            }}
            cells={createCells(6, 7)}
            gameStatus={0}
        />
}

export const TheOneInProgressWithPlayerTwoActive: Story = {
    render: () => 
        <GameOverview 
            activePlayer={2}
            playerOne={{
                playerNumber: 1,
                isActive: false,
                remainingDisks: 10,
                playerColor: "red"
            }}
            playerTwo={{
                playerNumber: 2,
                isActive: false,
                remainingDisks: 10,
                playerColor: "yellow"
            }}
            cells={createCells(6, 7)}
            gameStatus={0}
        />
}


export const TheOneWherePlayerOneWins: Story = {
    render: () => 
        <GameOverview 
            activePlayer={1}
            playerOne={{
                playerNumber: 1,
                isActive: false,
                remainingDisks: 10,
                playerColor: "red"
            }}
            playerTwo={{
                playerNumber: 2,
                isActive: false,
                remainingDisks: 10,
                playerColor: "yellow"
            }}
            cells={createCells(6, 7)}
            gameStatus={1}
            roundNumber={5}
        />
}

export const TheOneWherePlayerTwoWins: Story = {
    render: () => 
        <GameOverview 
            activePlayer={2}
            playerOne={{
                playerNumber: 1,
                isActive: false,
                remainingDisks: 10,
                playerColor: "red"
            }}
            playerTwo={{
                playerNumber: 2,
                isActive: false,
                remainingDisks: 10,
                playerColor: "yellow"
            }}
            cells={createCells(6, 7)}
            roundNumber={100}
            gameStatus={2}
        />
}

export const TheOneWithATie: Story = {
    render: () => 
        <GameOverview 
            activePlayer={2}
            playerOne={{
                playerNumber: 1,
                isActive: false,
                remainingDisks: 0,
                playerColor: "red"
            }}
            playerTwo={{
                playerNumber: 2,
                isActive: false,
                remainingDisks: 0,
                playerColor: "yellow"
            }}
            cells={createCells(6, 7, () => {
                let playerOptions: Array<1 | 2 | undefined> = [1,2,undefined]
                return playerOptions[Math.floor(Math.random() * playerOptions.length - 1)]
            })}
            gameStatus={3}
            roundNumber={12}
        />
}