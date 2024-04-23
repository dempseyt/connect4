import { Meta, StoryObj } from "@storybook/react";
import { Round } from "@/Round"

const meta: Meta<typeof Round> = {
    component: Round
}

export default meta;

type Story = StoryObj<typeof Round>;

export const TheOneWithDefaults: Story = {
    render: () => <Round />
}

export const TheOneWithRoundNumber: Story = {
    render: () => <Round roundNumber={6} />
}