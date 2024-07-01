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
  background-color: #24deff;
  justify-content: ${({ $activeGame }) => ($activeGame === undefined ? 'center' : 'space-around')};
  align-items: center;
  height: 100vh;
`

const StyledButton = styled.button`
  padding: 20px 15px;
  font-family: monospace;
  font-size: 2rem;
  background-color: lightblue;
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
        <StyledButton onClick={onStartGameClick}>Start Game</StyledButton>
      )}
    </StyledGameplayArea>
  )
}
