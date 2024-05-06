import { Meta, StoryObj } from "@storybook/react"
import PlayerRoundOverviews from "@/connect-4-ui/PlayerRoundOverviews"
const meta: Meta<typeof PlayerRoundOverviews> = {
    component: PlayerRoundOverviews
}

export default meta;



type Story = StoryObj<typeof PlayerRoundOverviews>;

export const TheOneWherePlayerOneIsActive: Story = {
    render: () => <PlayerRoundOverviews 
        activePlayer={1}
        playerOne={{
            playerNumber: 1,
            isActive: true,
            remainingDisks: 10,
            playerColor: "red"
        }}
        playerTwo={{
            playerNumber: 2,
            isActive: false,
            remainingDisks: 10,
            playerColor: "blue"
        }}/>
}

export const TheOneWherePlayerTwoIsActive: Story = {
    render: () => <PlayerRoundOverviews 
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
        }}/>
}