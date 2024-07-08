import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { Overlay } from './Overlay'

const StyledText = styled.p`
  font-family: 'BigBlueTerminal';
  font-size: 3rem;
  color: white;
`

export const SaveGameOverlay = () => {
  return createPortal(
    <Overlay
      componentSpec={{
        Component: () => {
          return <StyledText>Game Saved</StyledText>
        },
        props: {},
      }}
    />,
    document.body,
  )
}
