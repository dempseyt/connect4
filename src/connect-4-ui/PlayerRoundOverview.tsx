import styled from 'styled-components'

export type PlayerRoundOverviewProps = {
  playerNumber: 1 | 2
  isActive: boolean
  remainingDisks?: number
  playerColor: string
}

const Wrapper = styled.div`
  margin: 5px;
  display: flex;
  justify-content: end;
  flex-direction: column;
  background-color: lightblue;
  color: darkblue;
  padding: 10px 20px 35px 20px;
  font-family: 'BigBlueTerminal';
  flex: 1;
  border-radius: 10px;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  height: 2.4rem;
`
const Token = styled.div<{
  $isActive: PlayerRoundOverviewProps['isActive']
  $playerColor: PlayerRoundOverviewProps['playerColor']
}>`
  background-color: ${({ $isActive, $playerColor }) => ($isActive ? $playerColor : 'initial')};
  border-radius: 50%;
  position: absolute;
  height: 30px;
  width: 30px;
  border: ${({ $isActive }) => ($isActive ? '2px dashed white' : 'none')};
`

const TokenDiv = styled.div`
  padding: 10px 0;
`

const StyledText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 500;
`

export const PlayerRoundOverview = ({
  playerNumber,
  isActive,
  remainingDisks,
  playerColor,
}: PlayerRoundOverviewProps) => {
  return (
    <Wrapper>
      <Row>
        <StyledText>{`Player: ${playerNumber} `}</StyledText>
      </Row>
      <StyledText>{`Turns Left: ${remainingDisks}`}</StyledText>
      <TokenDiv>
        <Token $isActive={isActive} $playerColor={playerColor} />
      </TokenDiv>
    </Wrapper>
  )
}
