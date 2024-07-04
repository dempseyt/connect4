import styled from 'styled-components'

type OverlayProps<T extends React.ComponentType<any>> = {
  handleClose?: () => void
  componentSpec?: ComponentSpec<T>
}

type ComponentSpec<T extends React.ComponentType<any>> = {
  Component: T
  props: React.ComponentProps<T>
}

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Overlay = <T extends React.ComponentType<any>>({
  handleClose = () => {},
  componentSpec: { Component, props } = { Component: () => <div></div>, props: {} },
}: OverlayProps<T> = {}) => {
  return (
    <StyledOverlay onClick={handleClose}>
      <Component {...props} />
    </StyledOverlay>
  )
}
