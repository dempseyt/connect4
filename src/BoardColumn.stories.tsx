import { Meta, StoryObj } from "@storybook/react"
import { BoardColumn } from "@/BoardColumn"
import createColumnCells from "./create-column-cells";

const meta: Meta<typeof BoardColumn> = {
    component: BoardColumn
}
export default meta; 

type Story = StoryObj<typeof BoardColumn>;

export const TheOneWithDefaults: Story = {
    render: () => <BoardColumn />
}

export const TheOneWithAllPlayerOneTokens: Story = {
    render : () => <BoardColumn columnCells={createColumnCells(6, () => 1)}/>
}

export const TheOneWithAllPlayerTwoTokens: Story = {
    render : () => <BoardColumn columnCells={createColumnCells(6, () => 2)}/>
}