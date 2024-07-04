import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'
import { LoadGameDialog } from './LoadGameDialog'
import { Overlay } from './Overlay'
import { SavedGame } from './SavedGame'

const StyledContainer = styled.div`
  background-image: url('/spongebob.jpeg');
`

const meta: Meta<typeof Overlay> = {
  component: Overlay,
  decorators: [
    (Story) => (
      <StyledContainer>
        <Story />
      </StyledContainer>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Overlay>

export const TheOneWithDefaults: Story = {
  render: () => <Overlay />,
}

export const TheOneWithAnOnCloseHandler: Story = {
  render: () => <Overlay handleClose={action('Clicked')} />,
}

export const TheOneWithAComponent: Story = {
  render: () => (
    <Overlay
      componentSpec={{
        Component: ({ name }: { name: string }) => <div>{name}</div>,
        props: {
          name: 'Rami',
        },
      }}
    />
  ),
}

export const TheOneWithLoadGamesDialogComponent: Story = {
  render: () => (
    <Overlay
      componentSpec={{
        Component: ({ closeDialog }: { closeDialog: () => void }) => (
          <LoadGameDialog onCloseClick={closeDialog}></LoadGameDialog>
        ),
        props: {
          closeDialog: () => action('Clicked'),
        },
      }}
    />
  ),
}

export const TheOneWithLoadGamesDialogComponentWithSavedGames: Story = {
  render: () => (
    <Overlay
      componentSpec={{
        Component: ({ closeDialog }: { closeDialog: () => void }) => (
          <LoadGameDialog onCloseClick={closeDialog}>
            <SavedGame gameId={crypto.randomUUID()} dateSaved={new Date().toLocaleDateString()} />
            <SavedGame gameId={crypto.randomUUID()} dateSaved={new Date().toLocaleDateString()} />
            <SavedGame gameId={crypto.randomUUID()} dateSaved={new Date().toLocaleDateString()} />
            <SavedGame gameId={crypto.randomUUID()} dateSaved={new Date().toLocaleDateString()} />
          </LoadGameDialog>
        ),
        props: {
          closeDialog: () => action('Clicked'),
        },
      }}
    />
  ),
}
