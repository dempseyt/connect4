import styled from 'styled-components'

export type MenuButtonProps = {
  text: string
  onClick?: React.MouseEventHandler
}

const StyledMenuButton = styled.button`
  font-family: 'BigBlueTerminal';
  font-size: 1.5rem;
  padding: 10px 20px;
  border-radius: 50px;

  &:hover {
    cursor: pointer;
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.97);
  }
`
export const MenuButton = ({ text, onClick }: MenuButtonProps) => (
  <StyledMenuButton onClick={onClick}>{text}</StyledMenuButton>
)
