import GameFactory from '@/connect-4-domain/game'
import { BoardProps, GridCellProps } from '@/connect-4-ui/Board'
import { GameOverviewProps } from '@/connect-4-ui/GameOverview'
import { GameplayArea } from '@/connect-4-ui/GameplayArea'
import { GameApi, createGameApi } from '@/connect-4-ui/create-game-api'
import { MutableRefObject, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GameUuid, Status } from './connect-4-domain/game-types'
import { LoadGameDialog } from './connect-4-ui/LoadGameDialog'
import { Overlay } from './connect-4-ui/Overlay'
import { SavedGame } from './connect-4-ui/SavedGame'
import createColumnCells from './connect-4-ui/create-cells'

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
) {
  return function handleSaveGameClick() {
    const gameId = gameApi.saveGame()
    savedGames.current.push({
      gameId: gameId,
      date: new Date().toLocaleString(),
    })
    alert('Game Saved')
    console.log(gameId)
  }
}

function createHandleLoadGameClick(
  gameId: GameUuid,
  gameApi: GameApi,
  setActiveGame: (activeGame: { gameOverview: GameOverviewProps; board: BoardProps }) => void,
  setShowOverlay: (showOverlay: boolean) => void,
) {
  return function handleLoadGameClick() {
    gameApi.loadGame(gameId)
    updateGame(setActiveGame, gameApi)
    setShowOverlay(false)
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
) {
  return function handleRestartGameClick() {
    const numberOfDisksPerPlayer = (gameApi.getBoard().length * gameApi.getBoard()[0].length) / 2
    setActiveGame({
      gameOverview: {
        activePlayer: 1,
        playerOne: {
          playerNumber: 1,
          isActive: true,
          remainingDisks: numberOfDisksPerPlayer,
          playerColor: 'red',
        },
        playerTwo: {
          playerNumber: 2,
          isActive: false,
          remainingDisks: numberOfDisksPerPlayer,
          playerColor: 'yellow',
        },
        roundNumber: 1,
        gameStatus: Status.IN_PROGRESS,
      },
      board: {
        cells: createColumnCells(6, 7),
        onClick: createHandleBoardCellClick(setActiveGame, gameApi),
      },
    })
  }
}

const App = () => {
  const [activeGame, setActiveGame] = useState<{
    gameOverview: GameOverviewProps
    board: BoardProps
  }>()
  const [showOverlay, setShowOverlay] = useState(false)
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
        handleStartGameClick={createHandleStartGameClick(setActiveGame, gameApi.current)}
        handleSaveGameClick={createHandleSaveGameClick(gameApi.current, savedGames)}
        handleLoadGamesDialogClick={createHandleLoadGamesDialogClick(setShowOverlay)}
        handleRestartGameClick={createHandleRestartGameClick(setActiveGame, gameApi.current)}
      />
    </>
  )
}

export default App
