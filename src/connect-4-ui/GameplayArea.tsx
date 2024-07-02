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

const StyledButton = styled.button`
  padding: 20px 15px;
  font-family: 'BigBlueTerminal';
  font-size: 2rem;
  background-color: inherit;
  background-color: lightgrey;
  color: blue;
`

export const GameplayArea = ({ activeGame, onStartGameClick }: GameplayAreaProps) => {
  return (
    <StyledGameplayArea $activeGame={activeGame}>
      {activeGame ? (
        <>
          <GameOverview {...activeGame.gameOverview} />
          <Board {...activeGame.board} key={crypto.randomUUID()} />
        </>
      ) : (
        <StyledButton onClick={onStartGameClick}>Start Game...</StyledButton>
      )}
    </StyledGameplayArea>
  )
}
