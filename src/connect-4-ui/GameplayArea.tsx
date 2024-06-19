import styled from 'styled-components'
import { Board, BoardProps } from './Board'
import { GameOverview, GameOverviewProps } from './GameOverview'

export type GameplayAreaProps = {
  activeGame?: {
    gameOverview: GameOverviewProps
    board: BoardProps
  }
}

const StyledGameplayArea = styled.div<GameplayAreaProps>`
  display: flex;
  flex-wrap: wrap;
  background-color: aquamarine;
  justify-content: ${({ activeGame }) => (activeGame === undefined ? 'center' : 'space-around')};
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

export const GameplayArea = ({ activeGame }: GameplayAreaProps) => {
  return (
    <StyledGameplayArea activeGame={activeGame}>
      {activeGame ? (
        <>
          <GameOverview {...activeGame.gameOverview} />
          <Board {...activeGame.board} />
        </>
      ) : (
        <StyledButton>Start Game</StyledButton>
      )}
    </StyledGameplayArea>
  )
}
