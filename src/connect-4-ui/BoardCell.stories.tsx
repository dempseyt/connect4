import { Meta, StoryObj } from "@storybook/react";
import { BoardCell } from "@/connect-4-ui/BoardCell";

const meta: Meta<typeof BoardCell> = {
    component: BoardCell
};

export default meta;

type Story = StoryObj<typeof BoardCell>;

export const TheOneWithDefaults: Story = { 
    render: () => <BoardCell id={crypto.randomUUID()}/>
}; 

export const TheOneWithPlayer1: Story = {
    render: () => <BoardCell id={crypto.randomUUID()} player={1} />
}

export const TheOneWithPlayer2: Story = {
    render: () => <BoardCell id={crypto.randomUUID()} player={2} />
}