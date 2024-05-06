import { Meta, StoryObj } from "@storybook/react";
import { Round } from "@/connect-4-ui/Round"

const meta: Meta<typeof Round> = {
    component: Round
}

export default meta;

type Story = StoryObj<typeof Round>;

export const TheOneWithRoundOne: Story = {
    render: () => <Round roundNumber={1}/>
}

export const TheOneWithRoundSix: Story = {
    render: () => <Round roundNumber={6} />
}