import { BoardCell } from '@/connect-4-ui/BoardCell'

type BoardCell = {
  player: 1 | 2 | undefined
}

type GameParameters = {
  boardDimensions: { rows: number; columns: number }
}

interface Game {
  getBoard: () => ReadonlyArray<Array<BoardCell>>
}

class GameFactory implements Game {
  private board: Array<Array<BoardCell>>

  constructor({ boardDimensions }: GameParameters = { boardDimensions: { rows: 6, columns: 7 } }) {
    this.board = this.#createBoard(boardDimensions)
  }

  getBoard() {
    return this.board
  }

  #createBoard(boardDimensions: { rows: number; columns: number }): Array<Array<BoardCell>> {
    const callback = () =>
      new Array(boardDimensions.columns).fill(undefined).map(() => ({ player: undefined }))
    const board = new Array(boardDimensions.rows).fill(undefined).map(callback)
    return board
  }
}

export default GameFactory
