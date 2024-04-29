import { Meta, StoryObj } from "@storybook/react";
import { PlayerRoundOverview  } from "@/PlayerRoundOverview";

const meta: Meta<typeof PlayerRoundOverview> = {
    component: PlayerRoundOverview
}

export default meta;

type Story = StoryObj<typeof PlayerRoundOverview>

export const TheOneWithAPlayerNumber: Story = {
    render: () => <PlayerRoundOverview playerNumber={1} isActive={true} remainingDisks={10} playerColor={'red'}/>
};

export const TheOneWithAnActivePlayer: Story = {
    render: () => <PlayerRoundOverview playerNumber={1} isActive={true} remainingDisks={10} playerColor={'red'} />
}

export const TheOneWithFiveRemainingDisks: Story = {
    render: () => <PlayerRoundOverview playerNumber={1} isActive={true} remainingDisks={5} playerColor={'red'} />
}

export const TheOneWithPinkDiskColor: Story = {
    render: () => <PlayerRoundOverview playerNumber={1} isActive={true} remainingDisks={10} playerColor={'pink'} />
}

export const TheOneWithInactivePlayer: Story = {
    render: () => <PlayerRoundOverview playerNumber={1} isActive={false} remainingDisks={10} playerColor={'red'}/>
}