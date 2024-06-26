import { Board } from '@/connect-4-ui/Board'
import createCells from '@/connect-4-ui/create-cells'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Board> = {
  component: Board,
}
export default meta

type Story = StoryObj<typeof Board>

export const TheOneWithDefaults: Story = {
  render: () => <Board />,
}

export const TheOneWithPlayerOne: Story = {
  render: () => <Board cells={createCells(6, 7, () => 1)} />,
}

export const TheOneWithPlayerTwo: Story = {
  render: () => <Board cells={createCells(6, 7, () => 2)} />,
}

export const TheOneWithRandomCells: Story = {
  render: () => (
    <Board
      cells={createCells(6, 7, () => {
        let playerOptions: Array<1 | 2 | undefined> = [1, 2, undefined]
        return playerOptions[Math.floor(Math.random() * playerOptions.length - 1)]
      })}
    />
  ),
}

export const TheOneWithAClickHandler: Story = {
  render: () => <Board onClick={action('Clicked')} />,
}
