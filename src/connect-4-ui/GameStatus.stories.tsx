import { Meta, StoryObj } from "@storybook/react";
import { GameStatus } from "@/connect-4-ui/GameStatus";

const meta: Meta<typeof GameStatus> = {
    component: GameStatus
}

export default meta;

type Story = StoryObj<typeof GameStatus>

export const TheOneWithGameInProgress: Story = {
    render: () => <GameStatus gameStatus={0}/>
}

export const TheOneWhenPlayerOneWins: Story = {
    render: () => <GameStatus gameStatus={1}/>
}

export const TheOneWhenPlayerTwoWins: Story = {
    render: () => <GameStatus gameStatus={2}/>
}

export const TheOneWithATie: Story = {
    render: () => <GameStatus gameStatus={3}/>
}