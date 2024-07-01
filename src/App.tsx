import { useState } from 'react'
import { CommandTypes } from './connect-4-domain/commands'
import GameFactory from './connect-4-domain/game'
import { BoardProps } from './connect-4-ui/Board'
import { GameOverviewProps } from './connect-4-ui/GameOverview'
import { GameplayArea } from './connect-4-ui/GameplayArea'

function createHandleBoardCellClick(
  game: GameFactory,
  setActiveGame: (activeGame: { gameOverview: GameOverviewProps; board: BoardProps }) => void,
) {
  return function handleBoardCellClick(row: number, column: number): void {
    game.move({
      type: CommandTypes.MOVE_PLAYER,
      payload: {
        player: game.getActivePlayer(),
        targetCell: {
          row: row,
          column: column,
        },
      },
    })
    setActiveGame({
      gameOverview: {
        activePlayer: game.getActivePlayer(),
        playerOne: {
          playerNumber: 1,
          isActive: game.getActivePlayer() === 1,
          remainingDisks: game.getPlayerStats(1).remainingDisks,
          playerColor: 'red',
        },
        playerTwo: {
          playerNumber: 2,
          isActive: game.getActivePlayer() === 2,
          remainingDisks: game.getPlayerStats(2).remainingDisks,
          playerColor: 'yellow',
        },
        roundNumber: 1,
        gameStatus: game.getStatus(),
      },
      board: { cells: game.getBoard(), onClick: createHandleBoardCellClick(game, setActiveGame) },
    })
  }
}

function createHandleStartGameClick(
  setGame: (game: GameFactory) => void,
  setActiveGame: (activeGame: { gameOverview: GameOverviewProps; board: BoardProps }) => void,
): () => void {
  return function handleStartGameClick(): void {
    const game = new GameFactory()
    setGame(game)
    setActiveGame({
      gameOverview: {
        roundNumber: 1,
        playerOne: {
          playerNumber: 1,
          remainingDisks: game.getPlayerStats(1).remainingDisks,
          isActive: game.getActivePlayer() === 1,
          playerColor: 'red',
        },
        playerTwo: {
          playerNumber: 2,
          remainingDisks: game.getPlayerStats(2).remainingDisks,
          isActive: game.getActivePlayer() === 2,
          playerColor: 'yellow',
        },
        activePlayer: game.getActivePlayer(),
        gameStatus: game.getStatus(),
      },
      board: { cells: game.getBoard(), onClick: createHandleBoardCellClick(game, setActiveGame) },
    })
  }
}

const App = () => {
  const [game, setGame] = useState<GameFactory>()
  const [activeGame, setActiveGame] = useState<{
    gameOverview: GameOverviewProps
    board: BoardProps
  }>()

  return (
    <GameplayArea
      activeGame={activeGame}
      onStartGameClick={createHandleStartGameClick(setGame, setActiveGame)}
    />
  )
}

export default App
