import { Board, BoardProps } from '@/connect-4-ui/Board'
import { GameOverview, GameOverviewProps } from '@/connect-4-ui/GameOverview'
import { useState } from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'
import { GamePlayAreaMenu } from './GamePlayAreaMenu'
import { MenuButton } from './MenuButton'

export type GameplayAreaProps = {
  activeGame?: {
    gameOverview: GameOverviewProps
    board: BoardProps
  }
  currentGameId?: string
  handleSaveGameClick?: (setIsSaveActiveGame: (isSaveGameClick: boolean) => void) => void
  handleLoadGamesDialogClick?: () => void
  handleRestartGameClick?: (setIsSaveActiveGame: (isSaveGameClick: boolean) => void) => void
  handleHomeClick?: () => void
}

const StyledGameplayArea = styled.div<{ $activeGame: GameplayAreaProps['activeGame'] }>`
  background-color: #34495e;
  align-items: ${({ $activeGame }) => ($activeGame === undefined ? 'center' : 'start')};
  height: fit-content;
`

const StyledGameInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
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
  height: 80vh;
`

const StyledTitle = styled.h1`
  font-family: 'BigBlueTerminal';
  font-size: 3.5rem;
  color: white;
  letter-spacing: 3px;
`

const StyledSmallTitle = styled.h4`
  font-family: 'BigBlueTerminal';
  font-size: 2rem;
  color: white;
  padding-left: 0.8rem;
  margin-bottom: 0;
  letter-spacing: 3px;
`

const StyledButton = styled.button`
  font-family: 'BigBlueTerminal';
  font-size: 1rem;
  padding: 0.5rem;
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
  flex-wrap: wrap;
`

const StyledGameId = styled.h3`
  font-family: 'BigBlueTerminal';
  color: aqua;
  font-size: 0.7rem;
  padding-left: 8px;
`

const StyledLink = styled.a`
  cursor: pointer;
`

const handleSourceCodeClick = () => {
  window.open('https://github.com/dempseyt/connect4', '_blank')
}

export const GameplayArea = ({
  activeGame,
  currentGameId,
  handleSaveGameClick = () => {},
  handleLoadGamesDialogClick = () => {},
  handleRestartGameClick = () => {},
  handleHomeClick = () => {},
}: GameplayAreaProps) => {
  const [isSaveGameActive, setIsSaveGameActive] = useState(true)
  return (
    <>
      <GamePlayAreaMenu>
        <StyledLink onClick={handleHomeClick}>
          <StyledSmallTitle>Connect4</StyledSmallTitle>
        </StyledLink>
        <StyledMenuButtons>
          <MenuButton
            text={'Save Game'}
            isActive={isSaveGameActive}
            onClick={() => handleSaveGameClick(setIsSaveGameActive)}
          />
          <MenuButton text={'Load Game'} isActive={true} onClick={handleLoadGamesDialogClick} />
          <MenuButton
            imageLink={'https://cdn-icons-png.flaticon.com/512/25/25231.png'}
            onClick={handleSourceCodeClick}
            isActive={true}
          />
        </StyledMenuButtons>
      </GamePlayAreaMenu>
      <StyledGameplayArea $activeGame={activeGame}>
        {activeGame ? (
          <StyledActiveGame>
            <StyledGameInformation>
              <StyledGameId>
                Game ID: {currentGameId === '' ? 'No Game ID for current game' : currentGameId}
              </StyledGameId>
              <GameOverview {...activeGame.gameOverview} />
              <StyledButton onClick={() => handleRestartGameClick(setIsSaveGameActive)}>
                New Game
              </StyledButton>
            </StyledGameInformation>
            <Board {...activeGame.board} key={v4()} />
          </StyledActiveGame>
        ) : (
          <StyledStartGameContainer>
            <StyledTitle>Connect4</StyledTitle>
            <StyledButton onClick={() => handleRestartGameClick(setIsSaveGameActive)}>
              Start Game...
            </StyledButton>
          </StyledStartGameContainer>
        )}
      </StyledGameplayArea>
    </>
  )
}
