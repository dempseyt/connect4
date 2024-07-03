import GameFactory from '@/connect-4-domain/game'
import { BoardProps, GridCellProps } from '@/connect-4-ui/Board'
import { GameOverviewProps } from '@/connect-4-ui/GameOverview'
import { GameplayArea } from '@/connect-4-ui/GameplayArea'
import { GameApi, createGameApi } from '@/connect-4-ui/create-game-api'
import { useState } from 'react'

function createHandleBoardCellClick(
  setActiveGame: (activeGame: { gameOverview: GameOverviewProps; board: BoardProps }) => void,
  gameApi: GameApi,
) {
  return function handleBoardCellClick({ rowIndex, columnIndex }: GridCellProps): void {
    gameApi.getBoard()[rowIndex][columnIndex].handlePlayerMove(gameApi.getActivePlayer())
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
}

function createHandleStartGameClick(
  setActiveGame: (activeGame: { gameOverview: GameOverviewProps; board: BoardProps }) => void,
): () => void {
  return function handleStartGameClick(): void {
    const gameApi = createGameApi(new GameFactory())
    setActiveGame({
      gameOverview: {
        roundNumber: 1,
        playerOne: {
          playerNumber: 1,
          remainingDisks: gameApi.getRemainingDisks(1),
          isActive: gameApi.getActivePlayer() === 1,
          playerColor: 'red',
        },
        playerTwo: {
          playerNumber: 2,
          remainingDisks: gameApi.getRemainingDisks(2),
          isActive: gameApi.getActivePlayer() === 2,
          playerColor: 'yellow',
        },
        activePlayer: gameApi.getActivePlayer(),
        gameStatus: gameApi.getGameStatus(),
      },
      board: {
        cells: gameApi.getBoard(),
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
  // const gameApiRef = useRef(createGameApi(new GameFactory()))

  return (
    <GameplayArea
      activeGame={activeGame}
      onStartGameClick={createHandleStartGameClick(setActiveGame)}
    />
  )
}

export default App
