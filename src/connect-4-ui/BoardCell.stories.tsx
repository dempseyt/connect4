import { BoardCell } from '@/connect-4-ui/BoardCell'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'
import { v4 } from 'uuid'

const meta: Meta<typeof BoardCell> = {
  component: BoardCell,
  args: { onClick: action('on-click') },
}

export default meta

type Story = StoryObj<typeof BoardCell>

export const TheOneWithDefaults: Story = {
  render: () => <BoardCell id={v4()} />,
}

export const TheOneWithPlayer1: Story = {
  render: () => <BoardCell id={v4()} player={1} />,
}

export const TheOneWithPlayer2: Story = {
  render: () => <BoardCell id={v4()} player={2} />,
}

export const TheOneWithAClickHandler: Story = {
  render: () => <BoardCell player={1} onClick={action('Clicked Cell')} />,
}
