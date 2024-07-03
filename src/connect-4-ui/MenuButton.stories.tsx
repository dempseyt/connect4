import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'
import { MenuButton } from './MenuButton'

const meta: Meta<typeof MenuButton> = {
  component: MenuButton,
}

export default meta

type Story = StoryObj<typeof MenuButton>

export const TheOneWithDefaults: Story = {
  render: () => <MenuButton text={"I'm a button"} />,
}

export const TheOneWithClickHandler: Story = {
  render: () => <MenuButton text={'Click me!'} onClick={action('Clicked')} />,
}
