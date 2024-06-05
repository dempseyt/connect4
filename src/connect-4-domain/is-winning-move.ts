import { Board, BoardCell, PlayerMove } from './game'

function isVerticalWin(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  console.log(board, board.length)
  if (board.length < 4) {
    return { isWin: false }
  }
  const threeCellsBelowPlayerMove = board.slice(
    playerMove.targetCell.row - 4,
    playerMove.targetCell.row - 1,
  )
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
