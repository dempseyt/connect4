import GameFactory from '@/connect-4-domain/game'
import { BoardProps, GridCellProps } from '@/connect-4-ui/Board'
import { GameOverviewProps } from '@/connect-4-ui/GameOverview'
import { GameplayArea } from '@/connect-4-ui/GameplayArea'
import { GameApi, createGameApi } from '@/connect-4-ui/create-game-api'
import { MutableRefObject, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GameUuid } from './connect-4-domain/game-types'
import { LoadGameDialog } from './connect-4-ui/LoadGameDialog'
import { Overlay } from './connect-4-ui/Overlay'
import { SavedGame } from './connect-4-ui/SavedGame'

function updateGame(
  setActiveGame: (activeGame: { gameOverview: GameOverviewProps; board: BoardProps }) => void,
  gameApi: GameApi,
) {
  setActiveGame({
    gameOverview: {
      activePlayer: gameApi.getActivePlayer(),
      playerOne: {
        playerNumber: 1,
        isActive: gameApi.getActivePlayer() === 1,
        remainingDisks: gameApi.getRemainingDisks(1),
        playerColor: 'red',
      },
      playerTwo: {
        playerNumber: 2,
        isActive: gameApi.getActivePlayer() === 2,
        remainingDisks: gameApi.getRemainingDisks(2),
        playerColor: 'yellow',
      },
      roundNumber: 1,
      gameStatus: gameApi.getGameStatus(),
    },
    board: {
      cells: gameApi.getBoard(),
      onClick: createHandleBoardCellClick(setActiveGame, gameApi),
    },
  })
}

function createHandleBoardCellClick(
  setActiveGame: (activeGame: { gameOverview: GameOverviewProps; board: BoardProps }) => void,
  gameApi: GameApi,
) {
  return function handleBoardCellClick({ rowIndex, columnIndex }: GridCellProps): void {
    gameApi.getBoard()[rowIndex][columnIndex].handlePlayerMove(gameApi.getActivePlayer())
    updateGame(setActiveGame, gameApi)
  }
}

function createHandleStartGameClick(
  setActiveGame: (activeGame: { gameOverview: GameOverviewProps; board: BoardProps }) => void,
  gameApi: GameApi,
): () => void {
  return function handleStartGameClick(): void {
    updateGame(setActiveGame, gameApi)
  }
}

function createHandleSaveGameClick(
  gameApi: GameApi,
  savedGames: MutableRefObject<Array<{ gameId: GameUuid; date: string }>>,
  setCurrentGameId: (currentGameId: string) => void,
  currentGameId: string,
) {
  return function handleSaveGameClick() {
    if (currentGameId.length <= 32) {
      const gameId = gameApi.saveGame()
      setCurrentGameId(`Game ID: ${gameId}`)
      savedGames.current.push({
        gameId: gameId,
        date: new Date().toLocaleString(),
      })
    }
  }
}

function createHandleLoadGameClick(
  gameId: GameUuid,
  gameApi: GameApi,
  setActiveGame: (activeGame: { gameOverview: GameOverviewProps; board: BoardProps }) => void,
  setShowOverlay: (showOverlay: boolean) => void,
  setCurrentGameId: (currentGameId: string) => void,
) {
  return function handleLoadGameClick() {
    gameApi.loadGame(gameId)
    updateGame(setActiveGame, gameApi)
    setShowOverlay(false)
    setCurrentGameId(`Current GameID: ${gameId}`)
  }
}

function createHandleLoadGamesDialogClick(setShowOverlay: (showOverlay: boolean) => void) {
  return function handleLoadGamesDialogClick() {
    setShowOverlay(true)
  }
}

function createHandleRestartGameClick(
  setActiveGame: (activeGame: { gameOverview: GameOverviewProps; board: BoardProps }) => void,
  gameApi: GameApi,
  setCurrentGameId: (currentGameId: string) => void,
) {
  return function handleRestartGameClick() {
    gameApi.restartGame()
    updateGame(setActiveGame, gameApi)
    setCurrentGameId('Game ID: No ID for current game.')
  }
}

const App = () => {
  const [activeGame, setActiveGame] = useState<{
    gameOverview: GameOverviewProps
    board: BoardProps
  }>()
  const [showOverlay, setShowOverlay] = useState(false)
  const [currentGameId, setCurrentGameId] = useState('Game ID: No ID for current game.')
  const game = useRef(new GameFactory())
  const gameApi = useRef(createGameApi(game.current))
  const savedGames: MutableRefObject<Array<{ gameId: GameUuid; date: string }>> = useRef([])
  return (
    <>
      {showOverlay &&
        createPortal(
          <Overlay
            componentSpec={{
              Component: ({ onCloseDialogClick }: { onCloseDialogClick: () => void }) => (
                <LoadGameDialog onCloseClick={onCloseDialogClick}>
                  {savedGames.current.map(
                    ({ gameId, date }: { gameId: GameUuid; date: string }) => {
                      return (
                        <SavedGame
                          gameId={gameId}
                          dateSaved={date}
                          handleLoadClick={createHandleLoadGameClick(
                            gameId,
                            gameApi.current,
                            setActiveGame,
                            setShowOverlay,
                            setCurrentGameId,
                          )}
                        ></SavedGame>
                      )
                    },
                  )}
                </LoadGameDialog>
              ),
              props: {
                onCloseDialogClick: () => setShowOverlay(false),
              },
            }}
          />,
          document.body,
        )}
      <GameplayArea
        activeGame={activeGame}
        currentGameId={currentGameId}
        handleStartGameClick={createHandleStartGameClick(setActiveGame, gameApi.current)}
        handleSaveGameClick={createHandleSaveGameClick(
          gameApi.current,
          savedGames,
          setCurrentGameId,
          currentGameId,
        )}
        handleLoadGamesDialogClick={createHandleLoadGamesDialogClick(setShowOverlay)}
        handleRestartGameClick={createHandleRestartGameClick(
          setActiveGame,
          gameApi.current,
          setCurrentGameId,
        )}
      />
    </>
  )
}

export default App
