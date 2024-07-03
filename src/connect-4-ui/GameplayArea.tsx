import { Board, BoardProps } from '@/connect-4-ui/Board'
import { GameOverview, GameOverviewProps } from '@/connect-4-ui/GameOverview'
import styled from 'styled-components'
import { GamePlayAreaMenu } from './GamePlayAreaMenu'
import { MenuButton } from './MenuButton'

export type GameplayAreaProps = {
  activeGame?: {
    gameOverview: GameOverviewProps
    board: BoardProps
  }
  onStartGameClick?: () => void
}

const StyledGameplayArea = styled.div<{ $activeGame: GameplayAreaProps['activeGame'] }>`
  background-color: #34495e;
  align-items: ${({ $activeGame }) => ($activeGame === undefined ? 'center' : 'start')};
  height: 100vh;
`

const StyledGameInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 50px;
`

const StyledActiveGame = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`

const StyledStartGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const StyledTitle = styled.h1`
  font-family: 'BigBlueTerminal';
  font-size: 6rem;
  color: white;
  letter-spacing: 3px;
`

const StyledSmallTitle = styled.h4`
  font-family: 'BigBlueTerminal';
  font-size: 2rem;
  color: white;
  padding-left: 15px;
  margin-bottom: 0;
  letter-spacing: 3px;
`

const StyledButton = styled.button`
  font-family: 'BigBlueTerminal';
  font-size: 1.5rem;
  padding: 15px;
  color: white;
  background-color: darkblue;
  border: 3px solid lightblue;

  &:active {
    transform: scale(0.96);
  }

  &:hover {
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`

const StyledMenuButtons = styled.div`
  display: flex;
  gap: 10px;
`

export const GameplayArea = ({ activeGame, onStartGameClick = () => {} }: GameplayAreaProps) => {
  return (
    <>
      <GamePlayAreaMenu>
        <StyledSmallTitle>Connect4</StyledSmallTitle>
        <StyledMenuButtons>
          <MenuButton text={'Home'} />
          <MenuButton text={'Saved Games'} />
          <MenuButton text={'Source Code'} />
        </StyledMenuButtons>
      </GamePlayAreaMenu>
      <StyledGameplayArea $activeGame={activeGame}>
        {activeGame ? (
          <StyledActiveGame>
            <StyledGameInformation>
              <GameOverview {...activeGame.gameOverview} />
              <StyledButton onClick={onStartGameClick}>Start Again</StyledButton>
            </StyledGameInformation>
            <Board {...activeGame.board} key={crypto.randomUUID()} />
          </StyledActiveGame>
        ) : (
          <StyledStartGameContainer>
            <StyledTitle>Connect4</StyledTitle>
            <StyledButton onClick={onStartGameClick}>Start Game...</StyledButton>
          </StyledStartGameContainer>
        )}
      </StyledGameplayArea>
    </>
  )
}
