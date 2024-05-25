import { BoardCell } from '@/connect-4-ui/BoardCell'

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

interface PlayerStats {
  playerNumber: 1 | 2
  remainingDiscs: number
}

type PlayerNumber = 1 | 2

interface Game {
  getBoard: () => ReadonlyArray<Array<BoardCell>>
}

class GameFactory implements Game {
  private board: Array<Array<BoardCell>>
  private players: Record<PlayerNumber, PlayerStats>

  constructor({ boardDimensions }: GameParameters = { boardDimensions: { rows: 6, columns: 7 } }) {
    this.board = this.#createBoard(boardDimensions)
    this.players = this.#createPlayers(boardDimensions)
  }

  getBoard() {
    return this.board
  }

  getPlayerStats(playerNumber: PlayerNumber): PlayerStats {
    return this.players[playerNumber]
  }

  #createBoard(boardDimensions: BoardDimensions): Array<Array<BoardCell>> {
    const callback = () =>
      new Array(boardDimensions.columns).fill(undefined).map(() => ({ player: undefined }))
    const board = new Array(boardDimensions.rows).fill(undefined).map(callback)
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
