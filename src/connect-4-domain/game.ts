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

interface Game {
  getBoard: () => ReadonlyArray<Array<BoardCell>>
}
export class InvalidBoardDimensionsError extends RangeError {}

class GameFactory implements Game {
  private board: Board
  private players: Record<PlayerNumber, PlayerStats>
  private activePlayer: PlayerNumber | undefined

  constructor({ boardDimensions }: GameParameters = { boardDimensions: { rows: 6, columns: 7 } }) {
    this.#validateBoardDimensions(boardDimensions)
    this.board = this.#createBoard(boardDimensions)
    this.players = this.#createPlayers(boardDimensions)
    this.activePlayer = 1
  }

  #validateBoardDimensions(boardDimensions: BoardDimensions) {
    if (boardDimensions.rows < 1) {
      throw new InvalidBoardDimensionsError('Number of rows must be greater than or equal to 1')
    } else if (boardDimensions.columns < 1) {
      throw new InvalidBoardDimensionsError('Number of columns must be greater than or equal to 1')
    } else if ((boardDimensions.rows * boardDimensions.columns) % 2 !== 0) {
      throw new InvalidBoardDimensionsError(
        `Total number of cells on a board must be even. Supplied board dimensions (${boardDimensions.rows} rows x ${boardDimensions.columns} columns) results in an odd number of cells (${boardDimensions.rows * boardDimensions.columns})`,
      )
    }
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

  getBoard() {
    return deepClone(this.board)
  }

  getPlayerStats(playerNumber: PlayerNumber): PlayerStats {
    return this.players[playerNumber]
  }

  getActivePlayer() {
    return this.activePlayer
  }
}

export default GameFactory
