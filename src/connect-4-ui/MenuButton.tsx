import styled from 'styled-components'

export type MenuButtonProps = {
  text?: string
  imageLink?: string
  isActive?: boolean
  onClick?: React.MouseEventHandler
}

const StyledImg = styled.img`
  width: 40px;
  height: 40px;
`

const StyledMenuButton = styled.button<{ $isActive: MenuButtonProps['isActive'] }>`
  font-family: 'BigBlueTerminal';
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 50px;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};

  &:hover {
    cursor: pointer;
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.97);
  }
`
export const MenuButton = ({ text, imageLink, onClick, isActive }: MenuButtonProps) => {
  return (
    <StyledMenuButton $isActive={isActive} onClick={onClick}>
      {text === undefined ? <StyledImg alt="GitHub" src={imageLink} /> : text}
    </StyledMenuButton>
  )
}
