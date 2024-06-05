import { Board, BoardCell, PlayerMove } from './game'

function isVerticalWin(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  const threeCellsBelowPlayerMove = board.slice(-4, -1)
  const isWin = threeCellsBelowPlayerMove.reduce(
    (isWinningMove: boolean, currentRow: Array<BoardCell>): boolean => {
      const column = playerMove.targetCell.column
      const player = playerMove.player
      return currentRow[column].player === player && isWinningMove
    },
    true,
  )
  return {
    isWin,
  }
}

function isWinningMove(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  return isVerticalWin(board, playerMove)
}

export default isWinningMove
