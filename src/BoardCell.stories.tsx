import { Meta, StoryObj } from "@storybook/react";
import { BoardCell } from "@/BoardCell";

const meta: Meta<typeof BoardCell> = {
    component: BoardCell
};

export default meta;

type Story = StoryObj<typeof BoardCell>;

export const TheOneWithDefaults: Story = { 
    render: () => <BoardCell />
}; 

export const TheOneWithPlayer1: Story = {
    render: () => <BoardCell player={1} />
}

export const TheOneWithPlayer2: Story = {
    render: () => <BoardCell player={2} />
}