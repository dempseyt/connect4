import GameFactory from '@/connect-4-domain/game'
import { BoardProps, GridCellProps } from '@/connect-4-ui/Board'
import { GameApi, createGameApi } from '@/connect-4-ui/create-game-api'
import { GameOverviewProps } from '@/connect-4-ui/GameOverview'
import { GameplayArea } from '@/connect-4-ui/GameplayArea'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GameUuid, Status } from './connect-4-domain/game-types'
import { LoadGameDialog } from './connect-4-ui/LoadGameDialog'
import { Overlay } from './connect-4-ui/Overlay'
import { SavedGame } from './connect-4-ui/SavedGame'
import { SaveGameOverlay } from './connect-4-ui/SaveGameOverlay'

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
    if (gameApi.getGameStatus() === Status.IN_PROGRESS) {
      gameApi.getBoard()[rowIndex][columnIndex].handlePlayerMove(gameApi.getActivePlayer())
      updateGame(setActiveGame, gameApi)
    }
  }
}

function createHandleSaveGameClick(
  gameApi: GameApi,
  savedGames: MutableRefObject<Array<{ gameId: GameUuid; date: string }>>,
  setCurrentGameId: (currentGameId: string) => void,
  currentGameId: string,
  setSaveGameOverlay: (saveGameOverlay: boolean) => void,
) {
  if (currentGameId === '') {
    return function handleSaveGameClick() {
      const gameId = gameApi.saveGame()
      setCurrentGameId(gameId)
      savedGames.current.push({
        gameId: gameId,
        date: new Date().toLocaleString(),
      })
      setSaveGameOverlay(true)
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
    setCurrentGameId(gameId)
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
    setCurrentGameId('')
  }
}

function createHandleDeleteClick(
  gameApi: GameApi,
  gameId: GameUuid,
  currentGameId: string,
  setCurrentGameId: (currentGameId: string) => void,
  savedGames: Array<{ gameId: GameUuid; date: string }>,
  setShowOverlay: (showOverlay: boolean) => void,
  setActiveGame: (activeGame: { gameOverview: GameOverviewProps; board: BoardProps }) => void,
) {
  return function handleDeleteClick() {
    gameApi.deleteGame(gameId)
    const isGameToDelete = ({ gameId: savedGameId }: { gameId: GameUuid; date: string }) =>
      savedGameId === gameId
    savedGames.splice(savedGames.findIndex(isGameToDelete), 1)
    if (currentGameId === gameId) {
      gameApi.restartGame()
      setCurrentGameId('')
    }
    updateGame(setActiveGame, gameApi)
    if (savedGames.length === 0) {
      setShowOverlay(false)
    }
  }
}

const App = () => {
  const [activeGame, setActiveGame] = useState<{
    gameOverview: GameOverviewProps
    board: BoardProps
  }>()
  const [showOverlay, setShowOverlay] = useState(false)
  const [saveGameOverlay, setSaveGameOverlay] = useState(false)
  const [currentGameId, setCurrentGameId] = useState('')
  const game = useRef(new GameFactory())
  const gameApi = useRef(createGameApi(game.current))
  const savedGames: MutableRefObject<Array<{ gameId: GameUuid; date: string }>> = useRef([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSaveGameOverlay(false)
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <>
      {showOverlay &&
        createPortal(
          <Overlay
            componentSpec={{
              Component: ({ handleCloseDialogClick }: { handleCloseDialogClick: () => void }) => (
                <LoadGameDialog handleCloseClick={handleCloseDialogClick}>
                  {savedGames.current.map(
                    ({ gameId, date }: { gameId: GameUuid; date: string }) => {
                      return (
                        <SavedGame
                          gameId={gameId}
                          dateSaved={date}
                          isCurrentGame={currentGameId === gameId}
                          key={gameId}
                          handleLoadClick={createHandleLoadGameClick(
                            gameId,
                            gameApi.current,
                            setActiveGame,
                            setShowOverlay,
                            setCurrentGameId,
                          )}
                          handleDeleteClick={createHandleDeleteClick(
                            gameApi.current,
                            gameId,
                            currentGameId,
                            setCurrentGameId,
                            savedGames.current,
                            setShowOverlay,
                            setActiveGame,
                          )}
                        ></SavedGame>
                      )
                    },
                  )}
                </LoadGameDialog>
              ),
              props: {
                handleCloseDialogClick: () => setShowOverlay(false),
              },
            }}
          />,
          document.body,
        )}
      {saveGameOverlay && <SaveGameOverlay />}
      <GameplayArea
        activeGame={activeGame}
        currentGameId={currentGameId}
        handleSaveGameClick={createHandleSaveGameClick(
          gameApi.current,
          savedGames,
          setCurrentGameId,
          currentGameId,
          setSaveGameOverlay,
        )}
        handleLoadGamesDialogClick={createHandleLoadGamesDialogClick(setShowOverlay)}
        handleRestartGameClick={createHandleRestartGameClick(
          setActiveGame,
          gameApi.current,
          setCurrentGameId,
        )}
        handleHomeClick={() => {
          setCurrentGameId('')
          setActiveGame(undefined)
        }}
      />
    </>
  )
}

export default App
