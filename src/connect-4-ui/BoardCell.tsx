import styled from 'styled-components'

export type BoardCellProps = {
  player?: 1 | 2
  id?: string
  className?: string
  onClick?: () => void
}

const StyledBoardCell = styled.div`
  background: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const AspectRatioBox = styled.div`
  width: 70%;
  position: relative;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const StyledBoardCellDisc = styled.div<{ $player: BoardCellProps['player'] }>`
  border-radius: 50%;
  border: 5px solid darkblue;
  width: 100%;
  height: 100%;
  background: ${({ $player }) => {
    switch ($player) {
      case 1:
        return 'red'
      case 2:
        return 'yellow'
      default:
        return 'white'
    }
  }};
`

export const BoardCell = ({
  player,
  className,
  id = crypto.randomUUID(),
  onClick,
}: BoardCellProps) => {
  return (
    <StyledBoardCell className={className} id={id} onClick={onClick}>
      <AspectRatioBox>
        <ContentWrapper>
          <StyledBoardCellDisc $player={player} />
        </ContentWrapper>
      </AspectRatioBox>
    </StyledBoardCell>
  )
}
