import { Meta, StoryObj } from "@storybook/react"
import { Board } from "@/Board"

const meta: Meta<typeof Board> = {
    component: Board
};
export default meta;

type Story = StoryObj<typeof Board>;

export const TheOneWithDefaults: Story = {
    render: () => <Board />
}