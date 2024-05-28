import { BoardCell } from '@/connect-4-ui/BoardCell'
import deepClone from './deep-clone'

export type BoardCell = {
  player: 1 | 2 | undefined
}

type GameParameters = {
  boardDimensions: BoardDimensions
}

type BoardDimensions = {
  rows: number
  columns: number
}

type Board = Array<Array<BoardCell>>

interface PlayerStats {
  playerNumber: 1 | 2
  remainingDiscs: number
}

type PlayerNumber = 1 | 2

export class InvalidBoardDimensions extends RangeError {}

interface Game {
  getBoard: () => ReadonlyArray<Array<BoardCell>>
}

class GameFactory implements Game {
  private board: Board
  private players: Record<PlayerNumber, PlayerStats>

  constructor({ boardDimensions }: GameParameters = { boardDimensions: { rows: 6, columns: 7 } }) {
    if (boardDimensions.rows < 1) {
      throw new InvalidBoardDimensions('Number of rows must be greater than or equal to 1')
    } else if (boardDimensions.columns < 1) {
      throw new InvalidBoardDimensions('Number of columns must be greater than or equal to 1')
    }
    this.board = this.#createBoard(boardDimensions)
    this.players = this.#createPlayers(boardDimensions)
  }

  getBoard() {
    return deepClone(this.board)
  }

  getPlayerStats(playerNumber: PlayerNumber): PlayerStats {
    return this.players[playerNumber]
  }

  #createBoard({ rows, columns }: BoardDimensions): Board {
    const callback = () => new Array(columns).fill(undefined).map(() => ({ player: undefined }))
    const board = new Array(rows).fill(undefined).map(callback)
    return board
  }

  #createPlayers({ rows, columns }: BoardDimensions): Record<PlayerNumber, PlayerStats> {
    const calculateRemainingDiscs = (rows * columns) / 2
    return {
      1: { playerNumber: 1, remainingDiscs: calculateRemainingDiscs },
      2: { playerNumber: 2, remainingDiscs: calculateRemainingDiscs },
    }
  }
}

export default GameFactory
