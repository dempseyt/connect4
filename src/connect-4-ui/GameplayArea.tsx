import styled from 'styled-components'
import { Board, BoardProps } from './Board'
import { GameOverview, GameOverviewProps } from './GameOverview'

export type GameplayAreaProps = {
  activeGame?: {
    gameOverview: GameOverviewProps
    board: BoardProps
  }
  onStartGameClick?: () => void
}

const StyledGameplayArea = styled.div<{ $activeGame: GameplayAreaProps['activeGame'] }>`
  display: flex;
  flex-wrap: wrap;
  background-color: #34495e;
  gap: 20px;
  justify-content: ${({ $activeGame }) => ($activeGame === undefined ? 'center' : 'center')};
  align-items: ${({ $activeGame }) => ($activeGame === undefined ? 'center' : 'start')};
  height: 100vh;
`

const StyledGameInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledButton = styled.button`
  font-family: 'BigBlueTerminal';
  font-size: 1.5rem;
  padding: 20px;
  color: white;
  background-color: darkblue;
  border: 3px solid lightblue;

  &:active {
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }

  &:hover {
    cursor: pointer;
  }
`

export const GameplayArea = ({ activeGame, onStartGameClick }: GameplayAreaProps) => {
  return (
    <StyledGameplayArea $activeGame={activeGame}>
      {activeGame ? (
        <>
          <StyledGameInformation>
            <GameOverview {...activeGame.gameOverview} />
            <StyledButton onClick={onStartGameClick}>Start Again</StyledButton>
          </StyledGameInformation>
          <Board {...activeGame.board} key={crypto.randomUUID()} />
        </>
      ) : (
        <StyledButton onClick={onStartGameClick}>Start Game...</StyledButton>
      )}
    </StyledGameplayArea>
  )
}
