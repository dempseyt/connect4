import styled from 'styled-components'
import { MenuButton } from './MenuButton'

const StyledMenu = styled.menu`
  display: flex;
  justify-content: space-between;
  margin: 0;
  gap: 15px;
  background-color: #2e3d4d;
  position: sticky;
  top: 0;
  min-height: 70px;
  width: 100%;
  padding: 10px;
  flex-wrap: wrap;
  z-index: 99;
`

export const GamePlayAreaMenu = ({
  children,
}: {
  children: Array<React.ReactElement<typeof MenuButton>> | React.ReactElement<typeof MenuButton>
}) => {
  return <StyledMenu>{children}</StyledMenu>
}
