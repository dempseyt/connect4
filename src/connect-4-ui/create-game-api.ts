import { createMovePlayerCommand } from '@/connect-4-domain/commands'
import { EventTypes } from '@/connect-4-domain/events'
import GameFactory from '@/connect-4-domain/game'
import { GameUuid } from '@/connect-4-domain/game-types'
import { BoardCellProps } from './BoardCell'

export type Player = 1 | 2

export type MoveResult = {
  isSuccess: boolean
  error?: Array<string>
}

type BoardCell = {
  player?: Player
  handlePlayerMove: (player: Player) => MoveResult
}

enum Status {
  DRAW = 'DRAW',
  IN_PROGRESS = 'IN_PROGRESS',
  PLAYER_ONE_WIN = 'PLAYER_ONE_WIN',
  PLAYER_TWO_WIN = 'PLAYER_TWO_WIN',
}

export interface GameApi {
  getActivePlayer: () => Player
  getRemainingDisks: (player: Player) => number
  getGameStatus: () => Status
  getBoard: () => Array<Array<BoardCell>>
  saveGame: () => GameUuid
  loadGame: (gameId: GameUuid) => void
  restartGame: () => void
}

const createRowMapper =
  (game: GameFactory) =>
  (row: Array<BoardCellProps>, rowIndex: number): Array<BoardCell> => {
    const cellMapper = (cell: BoardCellProps, columnIndex: number): BoardCell => {
      return {
        player: cell.player,
        handlePlayerMove: (player: Player) => {
          const movePlayerCommand = createMovePlayerCommand({
            player,
            targetCell: {
              row: rowIndex,
              column: columnIndex,
            },
          })
          const moveEvent = game.move(movePlayerCommand)
          const isSuccess = moveEvent.type === EventTypes.PLAYER_MOVED
          return {
            isSuccess,
            error: isSuccess ? undefined : [moveEvent.payload.message],
          }
        },
      }
    }
    return row.map(cellMapper)
  }

export function createGameApi(game: GameFactory): GameApi {
  const rowMapper = createRowMapper(game)
  const gameApi: GameApi = {
    getActivePlayer: () => game.getActivePlayer(),
    getRemainingDisks: (player: Player) => game.getPlayerStats(player).remainingDisks,
    getGameStatus: () => game.getStatus(),
    getBoard: () => {
      const gameBoard = game.getBoard()
      const uiBoard: Array<Array<BoardCell>> = gameBoard.map(rowMapper)
      return uiBoard
    },
    saveGame: () => {
      const gameId = game.save()
      return gameId
    },
    loadGame: (gameId: GameUuid) => {
      game.load(gameId)
    },
    restartGame: () => {
      game.restartGame()
    },
  }
  return gameApi
}
